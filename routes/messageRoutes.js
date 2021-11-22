import express from "express";

import {
  getMessages,
  createMessage,
  updateMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.route("/").get(getMessages);

router.route("/create").post(createMessage);

router.route("/update/:id").put(updateMessage);

export default router;
