import { NextFunction, Request, Response } from "express";

import data from "../../data";
import utils from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  const sid = req.query.session_id as string;

  if (sid) {
    req.headers.session_id = "624a6bb5894ba91ab425ffc5";
    // utils.rsa.decrypter({ data: JSON.parse(sid) });
    req.session = await data.functions.session.find({
      id: req.headers.session_id,
    });

    if (req.session) {
      if (req.session.user) {
        req.session._user = await data.functions.user.find({
          id: req.session.user,
        });
      }
    }
  }

  delete req.query.session_id;

  return next();
};
