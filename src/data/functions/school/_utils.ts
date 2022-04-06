import functions from "..";
import utils from "../../../utils";

/**
 * Teste si le s données
 * @author domutala
 * @version 0.2.0
 */
const test_data = async ({
  id,
  name,
  user_id,
}: {
  id?: string;
  name?: string;
  user_id?: string;
}) => {
  if (id && (typeof id !== "string" || id.length !== 24)) {
    const error = Error();
    error.name = "invalidData";
    error.message = "L'id de l'établissement n'est valide";
    throw error;
  }

  if (user_id) {
    // vérifier si l'utilisateur existe
    if (user_id) {
      const user = await functions.user.find({ id: user_id });
      if (!user) {
        const error = Error();
        error.name = "userNotFound";
        error.message = "Aucun utilisateur n'est trouvé";
        throw error;
      }
    }
  }

  if (name && !utils.regex.name(name)) {
    const error = Error();
    error.name = "invalidData";
    error.message = "Le nom de l'établissement n'est pas valide";
    throw error;
  }

  return true;
};

export default { test_data };
