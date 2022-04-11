import * as express from "express";

import middlewares from "../../middlewares";
import session from "./_session";
import user from "./_user";
import unit from "./_unit";
import file from "./_file";

const router = express.Router();

router.use(middlewares.decrypt_headers_rest);
router.use(middlewares.decrypt_body);
router.use(middlewares.decrypt_query);
router.use(middlewares.verify_session);

router.use("/session", session);
router.use("/user", user);
router.use("/unit", unit);
router.use("/file", file);

export default router;
