import { getRepository } from "typeorm";
import { ObjectID } from "mongodb";

import { Unit } from "../../entities/Unit";
import { Access } from "../../models/Access";
import { User } from "../../entities/User";
import { isUnitType, UnitDate, UnitType } from "../../models/Unit";
import functions from "..";
import utils from "../../../utils";

/**
 * @author domutala
 *
 * @description
 * Ajout d'un nouvelle objet de type Unit dans la base
 */
export default async ({
  user,
  data,
  type,
  parent,
}: {
  user: User;
  type: UnitType;
  data: UnitDate;
  parent?: string;
}) => {
  // vérifier si le type est correcte
  if (!isUnitType(type)) {
    const error = new Error();
    error.name = "invalidData";
    error.message = "Le type de donnée n'est pas connu";
    throw error;
  }

  const access: Access[] = [];

  // vérifier les donnée pour `school`
  if (type === "school") {
    parent = undefined;

    // vérifier les données
    await functions.unit.utils.school.verify_data(data as any);

    if (!(data as any).name || !utils.regex.name((data as any).name)) {
      const error = Error();
      error.name = "invalidData";
      error.message =
        "Le nom de l'objet de School(Etablissement Scolaire) n'est pas valide";
      throw error;
    }

    // créer un accès de type admin
    access.push({
      role: "admin",
      owner: true,
      user: user.id.toString(),
    });
    // ...
  } else {
    // vérifier si le type en fonction du parent
    if (!parent || parent.length !== 24) {
      // renvoyer une erreur
      const error = new Error();
      error.name = "invalidData";
      error.message =
        "Seul les objets de School(Etablissement Scolaire)" +
        "peut avoir un parent null";
      throw error;
    }

    const unit_parent = await getRepository(Unit).findOne({
      where: { _id: { $eq: ObjectID(parent) } },
    });

    // vérifier si unit_parent existe
    if (!unit_parent) {
      // renvoyer une erreur
      const error = new Error();
      error.name = "notFoundUnit";
      error.message = "L'objet parent n'existe pas.";
      throw error;
    }

    const user_access_index = unit_parent.access.findIndex(
      (ac) => ac.user === user.id.toString()
    );

    // vérifier l'accès de l'utilisateur
    if (user_access_index === -1) {
      const error = new Error();
      error.name = "noAccess";
      error.message = "Aucun accès trouvé pour cette objet.";
      throw error;
    }

    const user_access = unit_parent.access[user_access_index];

    // vérifier si l'utilisateur peut apporter des modification
    if (!["admin", "write"].includes(user_access.role)) {
      const error = new Error();
      error.name = "notAuthorized";
      error.message = "Non autorisé à apporter des modification à cette objet.";
      throw error;
    }

    // vérifier les donnée pour `year`
    if (type === "year") {
      // ...
    }

    // vérifier les donnée pour `classroom`
    else if (type === "classroom") {
      // ...
    }

    // vérifier les donnée pour `student`
    else if (type === "student") {
      // ...
    }

    for (const ac of unit_parent.access) {
      // ajouter un accès à tous les utilisateur qui ont
      // un accès de type admin ou write du parent
      if (["admin", "write"].includes(ac.role) && !ac.suspended) {
        access.push({
          ...ac,
          owner: ac.user === user.id.toString(),
        });
      }
    }
  }

  const unit = new Unit();

  unit.parent = parent;
  unit.access = access;
  unit.type = type;
  unit.data = data;

  await unit.save();
  return unit;
};
