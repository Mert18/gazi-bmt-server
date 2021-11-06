import express from "express";

import { getAdmins, createAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.route("/").get(getAdmins);
router.route("/create").post(createAdmin);

export default router;
