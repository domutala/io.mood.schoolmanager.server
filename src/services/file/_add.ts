import data from "../../data";
import * as fileUpload from "express-fileupload";

import { ISession } from "../../../types/express-extend";

export default async ({
  session,
  files,
  unit,
}: {
  session: ISession;
  files: fileUpload.UploadedFile | fileUpload.UploadedFile[];
  unit?: string;
}) => {
  const fs: string[] = [];
  files = Array.isArray(files) ? files : [files];

  for (const file of files) {
    const f = await data.functions.file.add({
      file,
      user: session._user as any,
      unit,
    });
    fs.push(f.id.toString());
  }

  return fs;
};
