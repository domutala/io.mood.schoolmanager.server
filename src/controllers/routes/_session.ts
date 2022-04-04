import * as express from "express";
import functions from "../functions";

const router = express.Router();

router.post("/login/step_1", functions.session.login.step_1);
router.post("/login/step_2", functions.session.login.step_2);

export default router;
