import * as express from "express";
import functions from "../../functions";

const router = express.Router();

router.get("/stream", functions.file.stream);
// router.get("/data", functions.file.size);

export default router;
