import functions from "..";

/**
 * Modifier une session: une session ne peur etre modifier
 * que si elle n'est pas expirée
 * @author domutala
 * @version 0.2.0
 */
export default async ({
  id,
  user_id,
  expired,
}: {
  id: string;
  user_id?: string;
  expired?: boolean;
}) => {
  // vérifier si la existe
  const session = await functions.session.find({ id });
  if (!session) {
    const error = Error();
    error.name = "sessionNotFound";
    error.message = "Aucune session n'est trouvé";
    throw error;
  }

  // vérifie si la session est expirée
  if (session.expired) {
    const error = Error();
    error.name = "sessionExpired";
    error.message = "Impossible de modifier un session expirée";
    throw error;
  }

  // vérifier si l'utilisateur existe
  if (user_id) {
    const user = await functions.user.find({ id: user_id });
    if (!user) {
      const error = Error();
      error.name = "userNotFound";
      error.message = "Aucun utilisateur n'est trouvé";
      throw error;
    }

    if (session.user) {
      const error = Error();
      error.name = "sessionHaveAlreadyUser";
      error.message = "Cette session est déjà lié à un utilisateur";
      throw error;
    }
  }

  session.user = user_id || session.user;
  session.expired = expired || session.expired;

  await session.save();

  return session;
};
