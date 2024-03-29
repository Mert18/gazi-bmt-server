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
    return res.status(422).json({ message: "Something went wrong" });
  }
};

export const updateMessage = async (req, res) => {
  const { id } = req.body;
  try {
    const message = await Message.findById(id);
    if (message) {
      message.answered = true;

      const updatedMessage = await message.save();

      res.json({
        _id: updatedMessage._id,
        title: updatedMessage.name,
        email: updatedMessage.email,
        message: updatedMessage.message,
        answered: updatedMessage.answered,
      });
    }
  } catch (err) {
    return res.status(422).json({ message: "Something went wrong." });
  }
};
