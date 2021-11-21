import Admin from "../models/adminModel.js";

export const getAdmins = async (_, res) => {
  try {
    const admins = await Admin.findOne({});
    res.json(admins);
  } catch (err) {
    console.log("Error getting admins.", err);
  }
};

export const createAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res
      .status(201)
      .send({ message: "Admin created successfully.", createAdmin: admin });
  } catch (err) {
    console.log("Error creating admin.", err);
  }
};
