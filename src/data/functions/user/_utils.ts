import functions from "..";
import utils from "../../../utils";

/**
 * Teste si le s données d'utilisateut sont valide
 * @author domutala
 * @version 0.2.0
 */
const test_data = async ({
  id,
  name,
  phone,
  email,
  avatar,
}: {
  id?: string;
  name?: { first: string; last?: string };
  phone?: string;
  email?: string;
  avatar?: string;
}) => {
  if (id && (typeof id !== "string" || id.length !== 24)) {
    const error = Error();
    error.name = "invalidData";
    error.message = "L'id de l'utilisateur n'est valide";
    throw error;
  }

  if (name) {
    if (!utils.regex.name(name.first)) {
      const error = Error();
      error.name = "invalidData";
      error.message = "Le prénom n'est pas valide";
      throw error;
    }

    if (name.last && !utils.regex.name(name.last)) {
      const error = Error();
      error.name = "invalidData";
      error.message = "Le nom n'est pas valide";
      throw error;
    }
  }

  if (email && !utils.regex.mail(email)) {
    const error = Error();
    error.name = "invalidData";
    error.message = "L'adresse mail n'est pas valide";
    throw error;
  }

  if (phone && !utils.phone.is_valid(phone)) {
    const error = Error();
    error.name = "invalidData";
    error.message = "Le numéro de téléphone n'est pas valide";
    throw error;
  }

  if (avatar) {
    const f = await functions.file.find({ id: avatar });

    if (!f || f.user !== id) {
      const error = Error();
      error.name = "invalidData";
      error.message = "Aucun fichier trouvé pour l'avatar";
      throw error;
    }
  }

  return true;
};

export default { test_data };
