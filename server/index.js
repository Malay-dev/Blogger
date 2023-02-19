import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL;

app.get("/", (req, res) => {
  res.send(`This is a Blogger api`);
});

app.use("/user", userRoutes);
app.use("/blogs", postRoutes);
app.use("/comments", commentRoutes);

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server Running on port - ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });
