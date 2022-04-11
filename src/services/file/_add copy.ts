import data from "../../data";
import fileUpload = require("express-fileupload");

export default async ({
  session_id,
  files,
}: {
  session_id: string;
  files?: fileUpload.UploadedFile | fileUpload.UploadedFile[];
}) => {
  // vérifier si la session existe et est valide
  const session = await data.functions.file.find({ id: session_id });
  if (!session) {
    const error = Error();
    error.name = "notSessionFound";
    error.message = "Aucune session n'est trouvé";
    throw error;
  }

  // véririfier si un utilisateur est lié à la session
  const user = await data.functions.user.find({ id: session.user });
  if (!user) {
    const error = Error();
    error.name = "userNotFound";
    error.message = "Aucun utilisateur n'est lié a cette session";
    throw error;
  }

  if (!files) {
    const error = Error();
    error.name = "invalidData";
    error.message = "Aucun fichier trouvé";
    throw error;
  }

  files = Array.isArray(files) ? files : [files];
  const fs: string[] = [];
  for (const file of files) {
    const f = await data.functions.file.add(file, user.id.toString());
    fs.push(f.id.toString());
  }

  return fs;
};
