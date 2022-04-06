import * as express from "express";

import middlewares from "../middlewares";
import session from "./_session";
import user from "./_user";
import school from "./_school";

export const init = async (App: express.Express) => {
  const router = express.Router();

  App.use(middlewares.decrypt_headers);
  App.use(middlewares.decrypt_body);
  App.use(middlewares.decrypt_query);
  App.use(middlewares.verify_session);

  router.use("/session", session);
  router.use("/user", user);
  router.use("/school", school);

  App.use(router);
};
