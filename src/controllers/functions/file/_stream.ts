import { Request, Response } from "express";
import { Readable } from "stream";

import sender from "../../utils/sender";
import services from "../../../services";

export default async (req: Request, res: Response) => {
  try {
    const jwt = req.jwt;
    if (!jwt) return sender(req, res, { error: { text: "tokenNotFound" } });

    const fi = await services.file.get({ file_id: jwt.read as string });
    if (!fi) return sender(req, res, { error: { text: "notFileFound" } });

    const file = Buffer.from(fi.value, "base64");
    const size = file.toString().length;
    const type = fi.type;

    let responseCode = 200;

    let start = 0;
    let end = size - 1;

    const range = req.headers.range;
    if (range) {
      responseCode = 206;
      const r = range.replace("bytes=", "").split("-");
      start = parseInt(r[0], 10);

      if (r[1]) end = parseInt(r[1], 10);
    }

    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": type,
    };

    delete req.jwt;
    delete req.headers.session_id;
    delete req.session;

    res.writeHead(responseCode, headers);

    const stream = Readable.from(file);
    stream.pipe(res);
  } catch (error: any) {
    sender(req, res, { error });
  }
};
