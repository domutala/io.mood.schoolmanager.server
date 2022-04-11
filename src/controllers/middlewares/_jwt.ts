import { NextFunction, Request, Response } from "express";
import * as jwtoken from "jsonwebtoken";

import data from "../../data";
import utils from "../../utils";
import sender from "../utils/sender";

export default async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.token as string;

  if (token && token.split(" ")[0] === "Bearer") token = token.split(" ")[1];
  else token = req.query.token as string;

  try {
    const verify: any = jwtoken.verify(
      token,
      Buffer.from(utils.rsa.get().public_key, "base64")
    );

    req.jwt = verify;
    req.session = await data.functions.session.find({
      id: req.jwt?.session_id,
    });

    if (req.session) {
      if (req.session.user) {
        req.session._user = await data.functions.user.find({
          id: req.session.user,
        });
      }
    }
  } catch (error) {
    return sender(req, res, { error: { text: "tokenNotValid" } });
  }

  delete req.query.token;

  return next();
};
