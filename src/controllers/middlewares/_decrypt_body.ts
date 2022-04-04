import { NextFunction, Request, Response } from "express";
import utils from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  req.body = {};

  if (body && body.data) {
    req.body = JSON.parse(utils.rsa.decrypter({ data: body.data }));
  }

  return next();
};
