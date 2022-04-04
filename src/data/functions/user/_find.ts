import { getMongoRepository } from "typeorm";
import { ObjectID } from "mongodb";

import { User } from "../../entities/User";
import functions from "..";

/**
 * Trouver un utilisateur
 * @author domutala
 * @version 0.2.0
 */
export default async ({ id, email }: { id?: string; email?: string }) => {
  if (!id && !email) {
    const error = Error();
    error.name = "invalidData";
    throw error;
  }

  // vérifier si les données sont correctes
  await functions.user.utils.test_data({ id, email });

  const where: any = { $or: [] };
  if (id) where.$or.push({ _id: { $eq: ObjectID(id) } });
  if (email) where.$or.push({ email: { $eq: email } });

  const user = await getMongoRepository(User).findOne({ where });

  return user;
};
