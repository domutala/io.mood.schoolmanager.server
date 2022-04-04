import { NextFunction, Request, Response } from "express";
import utils from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  const querys = req.query;
  if (querys) {
    for (const key in querys) {
      if (Object.prototype.hasOwnProperty.call(querys, key)) {
        const k = utils.rsa.decrypter({ data: JSON.parse(key as string) });
        const v = utils.rsa.decrypter({ data: querys[key] as string });
        req.query[k] = JSON.parse(v);
      }
    }
  }

  return next();
};
