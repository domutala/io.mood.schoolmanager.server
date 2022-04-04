import { User } from "../../entities/User";
import functions from "..";

/**
 * @author domutala
 * @description ajouter un nouvel utilisateur
 * @version 0.2.0
 */
export default async ({
  email,
  name,
  phone,
}: {
  email: string;
  name?: { first: string; last?: string };
  phone?: string;
}) => {
  // vérifier si les données sont correctes
  await functions.user.utils.test_data({ name, phone, email });

  // vérifier si l'utilisateur existe
  const u = await functions.user.find({ email });
  if (u) {
    const error = Error();
    error.name = "userWithEmailAlreadyExist";
    error.message = "Un utilisateur avec cet email existe déjà";
    throw error;
  }

  const user = new User();

  user.name = name;
  user.phone = phone;
  user.email = email;

  await user.save();

  return user;
};
