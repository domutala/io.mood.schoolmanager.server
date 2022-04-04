import { Request, Response } from "express";
import utils from "../../utils";

export type IResponse = { value?: any; error?: { text: string } };

export const token_encrypter = (req: Request, res: Response) => {
  delete req.headers.session_id;
  delete req.headers.publickey;
  delete res.req.headers.session_id;
  delete res.req.headers.publickey;

  delete res.req.session;
  delete req.session;

  return { req, res };
};

export const data_encrypter = (req: Request, data: any) => {
  let publickey = req.public_key as string;
  let encrypt_data: any;

  if (data && publickey) {
    publickey = publickey.replace(/--n--/gm, "\n");
    encrypt_data = utils.rsa.encrypter({
      key: publickey,
      data: JSON.stringify(data),
    });
  }

  return encrypt_data;
};

export const jsoniffer = async (
  _req: Request,
  _res: Response,
  data: any,
  status = 200
) => {
  data = data_encrypter(_req, data);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { req, res } = token_encrypter(_req, _res);

  res.status(status).json(data);
};

export const error = async (_req: Request, _res: Response, error: any) => {
  console.log(error);

  let data: any = {};

  if (error.text) data = { error: true, message: error.text };
  else data = { error: true, message: "unknowError" };

  jsoniffer(_req, _res, data, 400);
};

export default async (req: Request, res: Response, response: IResponse) => {
  if (response.error) error(req, res, response.error);
  else jsoniffer(req, res, response.value);
};
