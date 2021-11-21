import Message from "../models/messageModel.js";

export const getMessages = async (_, res) => {
  try {
    const messages = await Message.findOne({});
    res.json(messages);
  } catch (err) {
    console.log("Error getting messages.", err);
  }
};

export const createMessage = async (req, res) => {
  const { title, email, message } = req.body;

  try {
    const mymessage = new Message({
      title: title,
      email: email,
      message: message,
    });
    await mymessage.save();
    return res.status(200).send("OK");
  } catch (err) {
    console.log(error);
    return res.status(422).json({ message: "Something went wrong" });
  }
};
