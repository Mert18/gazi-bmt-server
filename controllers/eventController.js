import Event from "../models/eventModel.js";

export const getEvents = async (_, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (err) {
    console.log("Error getting events.", err);
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404);
      throw new Error("Event not found.");
    }
  } catch (err) {
    console.log("Error getting event.", err);
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res
      .status(201)
      .send({ message: "Event created successfully.", createEvent: event });
  } catch (err) {
    console.log("Error creating event.", err);
  }
};
