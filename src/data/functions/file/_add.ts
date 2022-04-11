import * as fileUpload from "express-fileupload";

import { File } from "../../entities/File";
import functions from "..";
import { User } from "../../entities/User";

/**
 * @author domutala
 */
export default async ({
  user,
  file,
  unit,
}: {
  user: User;
  file: fileUpload.UploadedFile;
  unit?: string;
}) => {
  // vérifier si unit existe
  if (unit) {
    const u = (await functions.unit.find({ user, id: unit }))[0];

    if (!u) {
      const error = Error();
      error.name = "notUnitFound";
      error.message = "Aucun donnée trouvé.";
      throw error;
    }

    const my_access = u.access.filter(
      (ac) =>
        ac.user === user.id.toString() && ["admin", "write"].includes(ac.role)
    )[0];

    if (!my_access) {
      const error = Error();
      error.name = "notAuthorised";
      error.message = "Non Autorisé à enregistrer des fichier.";
      throw error;
    }
  }

  const _file = new File();
  _file.type = file.mimetype;
  _file.name = file.name;
  _file.value = file.data.toString("base64");
  _file.user = user.id.toString();
  _file.unit = unit as string;

  await _file.save();

  return _file;
};
