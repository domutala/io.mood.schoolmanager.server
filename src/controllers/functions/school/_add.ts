import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";

export default async (req: Request, res: Response) => {
  try {
    const response = await services.school.add({
      session: req.session as any,
      body: req.body,
    });

    sender(req, res, { value: response });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
