import { getMongoRepository } from "typeorm";
import { ObjectID } from "mongodb";

import { School } from "../../entities/School";
import functions from "..";

/**
 * Trouver un school
 * @author domutala
 * @version 0.2.0
 */
export default async ({ id }: { id?: string }) => {
  // vérifier si les données sont correctes
  await functions.school.utils.test_data({ id });

  const where: any = { $or: [] };
  if (id) where.$or.push({ _id: { $eq: ObjectID(id) } });

  const school = await getMongoRepository(School).findOne({ where });

  return school;
};
