import { Request, Response } from "express";
import * as jwtoken from "jsonwebtoken";

import sender from "../../../utils/sender";
import utils from "../../../../utils";
import services from "../../../../services";

export default async (req: Request, res: Response) => {
  try {
    const file_id = req.query.id as string;
    const file = await services.file.get({ file_id });
    if (!file) return sender(req, res, { error: { text: "notFileFound" } });

    if (file.unit) {
      const unit = await services.unit.get({
        session: req.session as any,
        id: file.unit,
      });

      if (!unit) return sender(req, res, { error: { text: "notAuthorised" } });
    } else if (file.user !== req.session?.user) {
      return sender(req, res, { error: { text: "notAuthorised" } });
    }

    const options: jwtoken.SignOptions = {
      expiresIn: "2h",
      header: {
        typ: "JWT",
        alg: "HS256",
      },
    };

    const token = jwtoken.sign(
      { session_id: req.session?.id.toString(), read: file_id },
      Buffer.from(utils.rsa.get().public_key, "base64"),
      options
    );

    sender(req, res, { value: token });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
