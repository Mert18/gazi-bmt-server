import express from "express";

import connectDB from "./config/db.js";
import cors from "cors";

import eventRoutes from "./routes/eventRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (_, res) => {
  res.send("API is running!");
});

app.use("/api/events", eventRoutes);
app.use("/api/admins", adminRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
