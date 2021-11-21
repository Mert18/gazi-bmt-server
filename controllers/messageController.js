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

  const { title, email, message, captcha } = body;

  if (method === "POST") {
    if (!email || !captcha) {
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
        // Replace this with the API that will save the data received
        // to your backend
        // Return 200 if everything is successful
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
      }

      return res.status(422).json({
        message: "Unproccesable request, Invalid captcha code",
      });
    } catch (err) {
      console.log("Error creating message.", err);
    }
  }
  return res.status(404).send("Not found the thing.");
};
