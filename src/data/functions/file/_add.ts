import * as fileUpload from "express-fileupload";

import { File } from "../../entities/File";
import functions from "..";

/**
 * @author domutala
 */
export default async (file: fileUpload.UploadedFile, user_id: string) => {
  const user = await functions.user.find({ id: user_id });
  if (!user) {
    const error = Error();
    error.name = "userNotFound";
    error.message = "Aucun utilisateur n'est trouvé";
    throw error;
  }

  const _file = new File();
  _file.type = file.mimetype;
  _file.name = file.name;
  _file.value = file.data.toString("base64");
  _file.user = user_id;

  await _file.save();

  return _file;
};
