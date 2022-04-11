import * as express from "express";
import functions from "../../functions";

const router = express.Router();

router.post("/add", functions.file.add);
router.get("/access/read", functions.file.access.read);

export default router;
