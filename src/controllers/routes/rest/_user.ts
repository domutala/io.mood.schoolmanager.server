import * as express from "express";
import functions from "../../functions";

const router = express.Router();

router.get("/get_my", functions.user.get_my);

export default router;
