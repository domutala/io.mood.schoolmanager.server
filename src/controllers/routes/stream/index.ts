import * as express from "express";

import middlewares from "../../middlewares";
import file from "./_file";

const router = express.Router();

router.use(middlewares.jwt);
router.use(middlewares.decrypt_body);
router.use(middlewares.decrypt_query);
router.use(middlewares.verify_session);

router.use("/file", file);

export default router;
