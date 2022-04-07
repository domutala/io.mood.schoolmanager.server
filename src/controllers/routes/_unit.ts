import * as express from "express";
import functions from "../functions";

const router = express.Router();

router.post("/add", functions.unit.add);

export default router;
