import functions from "..";

/**
 * ajouter un nouvel utilisateur
 * @author domutala
 * @version 0.2.0
 */
export default async ({
  id,
  name,
  phone,
  email,
  avatar,
}: {
  id: string;
  name?: { first: string; last?: string };
  phone?: string;
  email?: string;
  avatar?: string;
}) => {
  // vérifier si les données sont correctes
  await functions.user.utils.test_data({ id, name, phone, email, avatar });

  // vérifier si l'utilisateur existe
  const user = await functions.user.find({ id });
  if (!user) {
    const error = Error();
    error.name = "userNotFound";
    error.message = "Aucun utilisateur n'est trouvé";
    throw error;
  }

  user.name = name || user.name;
  user.avatar = avatar || user.avatar;
  user.phone = phone || user.phone;
  user.email = email || user.email;

  await user.save();

  return user;
};
