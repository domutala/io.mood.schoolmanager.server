import * as data from "./data";
import * as server from "./server";
import * as controllers from "./controllers";
import utils from "./utils";

(async () => {
  try {
    if (process.env.NODE_ENV !== "production") {
      const rsa_keys = utils.rsa.generate();
      process.env.RSA_KEYS = JSON.stringify(rsa_keys);

      const fire_config = JSON.stringify(require("../firebase.config.json"));
      process.env.FIREBASE_CONFIG = fire_config;
    }

    await data.init();
    const _server = await server.init();
    await controllers.init(_server.app);
  } catch (error) {
    console.log(error);
  }
})();
