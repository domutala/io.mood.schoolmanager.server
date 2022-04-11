import { User } from "../../entities/User";

import { UnitDate } from "../../models/Unit";
import { build as school_build } from "../../models/School";
import functions from "..";

/**
 * @author domutala
 *
 * @description
 * Modifier objet de type Unit dans la base
 */
export default async ({
  unit_id,
  user,
  data,
}: {
  unit_id: string;
  user: User;
  data: UnitDate;
}) => {
  const unit = (await functions.unit.find({ user, id: unit_id }))[0];

  if (!unit) {
    const error = Error();
    error.name = "notUnitFound";
    error.message = "Le donnée à modifier sont introuvable";
    throw error;
  }

  const acc = unit.access.findIndex((ac) => {
    if (!["write", "admin"].includes(ac.role)) return false;
    if (ac.user !== user.id.toString()) return false;

    return true;
  });

  if (acc === -1) {
    const error = Error();
    error.name = "notAuthorized";
    error.message = "Non autorisé à apporter des modification à cette donnée";
    throw error;
  }

  // vérifier l'accès de l'utilisateur
  const user_access_index = unit.access.findIndex(
    (ac) => ac.user === user.id.toString()
  );

  if (user_access_index === -1) {
    const error = new Error();
    error.name = "noAccess";
    error.message = "Aucun accès trouvé pour cette objet.";
    throw error;
  }

  const access = unit.access[user_access_index];

  // vérifier si l'utilisateur peut apporter des modification
  if (!["admin", "write"].includes(access.role)) {
    const error = new Error();
    error.name = "notAuthorized";
    error.message = "Non autorisé à apporter des modification à cette objet.";
    throw error;
  }

  // `school`
  if (unit.type === "school") data = await school_build(unit.data, data);
  // vérifier les donnée pour `year`
  else if (unit.type === "year") {
    // ...
  }

  // vérifier les donnée pour `classroom`
  else if (unit.type === "classroom") {
    // ...
  }

  // vérifier les donnée pour `student`
  else if (unit.type === "student") {
    // ...
  }

  unit.data = data;
  await unit.save();

  return unit;
};
