import { getRepository } from "typeorm";
import { ObjectID } from "mongodb";

import { Unit } from "../../entities/Unit";
import { User } from "../../entities/User";

/**
 * @author domutala
 *
 * @description
 * Trouver un objet de type Unit dans la base en fonction d'un utilisateur
 */
export default async ({
  user,
  id,
  parent,
  types,
}: {
  user: User;
  id?: string;
  parent?: string;
  types?: string[];
}) => {
  const where: any = {
    access: {
      $elemMatch: {
        user: user.id.toString(),
        suspended: { $ne: true },
      },
    },
  };

  if (id && (typeof id !== "string" || id.length !== 24)) {
    const error = Error();
    error.name = "invalidData";
    error.message = "L'id n'est valide";
    throw error;
  }

  if (id) where._id = { $eq: ObjectID(id) };
  else if (!parent) where.type = { $eq: "school" };
  else {
    where.parent = { $eq: parent };
    if (types) where.type = { $in: types };
  }

  const units = await getRepository(Unit).find({ where });

  return units;
};
