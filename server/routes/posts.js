import express from "express";

import { postBlog } from "../controllers/post.js";
import { getAllBlogs } from "../controllers/post.js";
import { deleteBlog } from "../controllers/post.js";
import { voteBlog } from "../controllers/post.js";

import auth from "../middlewares/auth.js";

const postRoutes = express.Router();
postRoutes.post("/post", auth, postBlog);
postRoutes.get("/get", getAllBlogs);
postRoutes.delete("/delete/:id", auth, deleteBlog);
postRoutes.patch("/vote/:id", auth, voteBlog);
export default postRoutes;
