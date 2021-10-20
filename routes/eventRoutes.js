import express from "express";

import {
  getEvents,
  getEventById,
  createEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.route("/").get(getEvents);

router.route("/:id").get(getEventById);

router.route("/create").post(createEvent);

export default router;
