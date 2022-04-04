import { NextFunction, Request, Response } from "express";

import data from "../../data";
import utils from "../../utils";
import sender from "../utils/sender";

export default async (req: Request, res: Response, next: NextFunction) => {
  const sid = req.headers.session_id as string;

  if (sid) {
    req.headers.session_id = utils.rsa.decrypter({ data: JSON.parse(sid) });
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

  const public_key = req.headers.public_key as string;
  if (public_key) req.public_key = public_key.replace(/--n--/gm, "\n");
  else return sender(req, res, { error: { text: "notPublicKeyFound" } });

  return next();
};
