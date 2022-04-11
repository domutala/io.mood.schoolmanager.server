import { NextFunction, Request, Response } from "express";
import sender from "../utils/sender";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!["/rest/session/login/step_1"].includes(req.path)) {
    if (!req.session) {
      return sender(req, res, { error: { text: "notSessionFound" } });
    }
  }

  return next();
};
