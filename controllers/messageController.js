import Message from "../models/messageModel.js";

export const getMessages = async (_, res) => {
  try {
    const messages = await Message.find({});
    res.json(messages);
  } catch (err) {
    console.log("Error getting messages.", err);
  }
};

export const createMessage = async (req, res) => {
  const { body, method } = req;

  const { title, email, message } = body;

  if (method === "POST") {
    try {
      const mymessage = new Message({
        title: title,
        email: email,
        message: message,
      });
      await mymessage.save();
      return res.status(201).send({
        message: "Message created successfully.",
        createMessage: mymessage,
      });
    } catch (err) {
      console.log("Error creating message.", err);
    }
  }
  return res.status(404).send("Not found the thing.");
};
