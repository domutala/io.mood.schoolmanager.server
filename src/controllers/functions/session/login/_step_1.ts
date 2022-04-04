import { Request, Response } from "express";

import sender from "../../../utils/sender";
import services from "../../../../services";

export default async (req: Request, res: Response) => {
  try {
    const client_public_key = req.headers.public_key as string;
    const session_id = req.headers.session_id as string;

    const response = await services.session.login.step_1({
      public_key: client_public_key,
      session_id,
    });

    sender(req, res, { value: response });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
