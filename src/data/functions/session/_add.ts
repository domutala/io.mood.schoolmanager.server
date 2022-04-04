import { Session } from "../../entities/Session";

/**
 * Ajouter une nouvelle session
 * @author domutala
 * @version 0.2.0
 */
export default async ({ public_key }: { public_key: string }) => {
  if (!public_key) {
    const error = Error();
    error.name = "invalidData";
    error.message = "Aucune clé public";
    throw error;
  }

  const session = new Session();

  session.public_key = public_key;
  session.expired = false;

  await session.save();

  return session;
};
