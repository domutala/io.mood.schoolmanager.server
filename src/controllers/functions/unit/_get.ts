import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";

export default async (req: Request, res: Response) => {
  try {
    const response = await services.unit.get({
      session: req.session as any,
      parent: req.query.parent as string,
      id: req.query.id as string,
      types: req.query.types as string[],
    });

    sender(req, res, { value: response });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
