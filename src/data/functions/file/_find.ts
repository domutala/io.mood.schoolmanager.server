import { getMongoRepository } from "typeorm";
import { ObjectID } from "mongodb";
import { File } from "../../entities/File";

/**
 * @author domutala
 */
export default async ({ id }: { id: string }) => {
  if (typeof id !== "string" || id.length !== 24) {
    const error = Error();
    error.name = "invalidData";
    error.message = "id n'est valide";
    throw error;
  }

  const file = await getMongoRepository(File).findOne({
    where: { _id: { $eq: ObjectID(id) } },
  });

  return file;
};
