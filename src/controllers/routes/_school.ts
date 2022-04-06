import * as express from "express";
import functions from "../functions";

const router = express.Router();

router.post("/add", functions.school.add);

export default router;
