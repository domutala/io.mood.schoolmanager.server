import { getRepository } from "typeorm";

import { Unit } from "../../entities/Unit";
import { User } from "../../entities/User";

/**
 * @author domutala
 *
 * @description
 * Trouver un objet de type Unit dans la base en fonction d'un utilisateur
 */
export default async ({ user, parent }: { user: User; parent?: string }) => {
  const where: any = {
    access: {
      $elemMatch: {
        user: user.id.toString(),
        suspended: { $ne: true },
      },
    },
  };

  // si parent n'est pas défini on ne
  // cherche des units de type school
  if (!parent) where.type = { $eq: "school" };
  else where.parent = { $eq: parent };

  const units = await getRepository(Unit).find({ where });

  return units;
};
