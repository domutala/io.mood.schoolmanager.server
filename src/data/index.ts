import { Connection, createConnection } from "typeorm";
import * as config from "./config";
import functions from "./functions";
/**
 * @author domutala
 * @description Cette fonction initialise la base données.
 * @version 0.2.0
 */
export const init = async () => {
  let odb: Connection;

  try {
    const env = process.env.NODE_ENV;
    const conf = env !== "production" ? config.dev : config.prod;
    odb = await createConnection(conf);
  } catch (err) {
    throw { err };
  }

  return odb;
};

export default { init, functions };
