import * as express from "express";
import * as routes from "./routes";

export const init = async (App: express.Express) => {
  routes.init(App);
};
