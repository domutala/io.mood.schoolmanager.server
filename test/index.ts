import data from "../src/data";
import services from "../src/services";
import utils from "../src/utils";

(async () => {
  const db = await data.init();

  try {
    const keys = utils.rsa.get();
    const user_id = "6244833cd3ef103f480743b6";
    const account_id = "62448cb9d4348a2c70cd2108";

    // const val = await data.functions.user.update({
    //   id: user_id,
    //   pin: "1197",
    //   pinConfirmation: "1197",
    // });

    // const val = await services.session.login.step_1({
    //   public_key: keys.private_key,
    // });

    // const val = await services.session.login.step_2({
    //   phone: "+221764037313",
    //   id: "6245e1c54f5f502cc835a20b",
    // });

    // const val = await services.session.login.step_3({
    //   id: "6245e1c54f5f502cc835a20b",
    //   code: "6764",
    // });

    // const val = await services.session.login.resend_code({
    //   id: "6245e1c54f5f502cc835a20b",
    // });

    // const val = await services.user.update({
    //   session_id: "6245e1c54f5f502cc835a20b",
    //   body: {
    //     pin: "1197",
    //     pinConfirmation: "1197",
    //     firstname: "Mamadou",
    //     lastname: "DIA",
    //   },
    // });

    // const val = await services.session.logout({ id: session_id });

    // user_get_min
    // const val = await services.user.get_mine({
    //   session_id: "6245e1c54f5f502cc835a20b",
    // });

    // account_get_min
    const val = await services.account.get_mine({
      session_id: "6245e1c54f5f502cc835a20b",
    });

    console.log(val);
  } catch (error) {
    console.log((error as Error).name);
    console.log(error);
  }

  await db.close();
})();
