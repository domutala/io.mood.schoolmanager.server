import { getMongoRepository } from "typeorm";
import { ObjectID } from "mongodb";
import { Session } from "../../entities/Session";

/**
 * @author domutala
 * @description trouver une sssion
 * @version 0.2.0
 */
export default async ({ id, user_id }: { id?: string; user_id?: string }) => {
  if (!user_id && !id) {
    const error = Error();
    error.name = "invalidData";
    throw error;
  }

  if (id) {
    if (typeof id !== "string" || id.length !== 24) {
      const error = Error();
      error.name = "invalidData";
      error.message = "L'id n'est valide";
      throw error;
    }
  }

  if (user_id) {
    if (typeof user_id !== "string" || user_id.length !== 24) {
      const error = Error();
      error.name = "invalidData";
      error.message = "L'id de l'utilisateur n'est valide";
      throw error;
    }
  }

  const where: any = {};
  if (id) where._id = { $eq: ObjectID(id) };
  else if (user_id) where.user = { $eq: user_id };

  const session = await getMongoRepository(Session).findOne({ where });

  return session;
};
