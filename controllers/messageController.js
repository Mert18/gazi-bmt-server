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
  const { title, email, message, captcha } = req.body;

  if (method === "POST") {
    if (!email || !captcha || !title || !message) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }
    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();

      if (captchaValidation.success) {
        const mymessage = new Message({
          title: title,
          email: email,
          message: message,
        });
        await mymessage.save();
        return res.status(200).send("OK");
      }
      return res.status(422).json({
        message: "Unproccesable request, Invalid captcha code",
      });
    } catch (err) {
      console.log(error);
      return res.status(422).json({ message: "Something went wrong" });
    }
  }
  return res.status(404).send("Not found");
};
