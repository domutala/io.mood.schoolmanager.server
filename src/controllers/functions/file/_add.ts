import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";

export default async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.files) return sender(req, res, { value: [] });

    const files_id = await services.file.add({
      session: req.session as any,
      files: req.files.files,
      unit: req.query.unit as string,
    });

    sender(req, res, { value: files_id });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
