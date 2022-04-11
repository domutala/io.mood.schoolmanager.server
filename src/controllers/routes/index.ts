import * as express from "express";

import rest from "./rest";
import stream from "./stream";

export const init = async (App: express.Express) => {
  const router = express.Router();

  router.use("/rest", rest);
  router.use("/stream", stream);

  App.use(router);
};
