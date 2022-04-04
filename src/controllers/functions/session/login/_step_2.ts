import { Request, Response } from "express";

import services from "../../../../services";
import sender from "../../../utils/sender";

export default async (req: Request, res: Response) => {
  try {
    const firebase_id_token = req.body.firebase_id_token;

    if (!firebase_id_token) {
      return sender(req, res, { error: { text: "firebaseTokenError" } });
    }

    await services.session.login.step_2({
      session: req.session as any,
      firebase_id_token,
    });

    sender(req, res, { value: true });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
