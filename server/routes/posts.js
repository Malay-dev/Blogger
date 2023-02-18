import express from "express";

import { askQuestion } from "../controllers/question.js";
import { getAllQuestions } from "../controllers/question.js";
import { deleteQuestion } from "../controllers/question.js";
import { voteQuestion } from "../controllers/question.js";

import auth from "../middlewares/auth.js";

const postRoutes = express.Router();
postRoutes.post("/Ask", auth, askQuestion);
postRoutes.get("/get", getAllQuestions);
postRoutes.delete("/delete/:id", auth, deleteQuestion);
postRoutes.patch("/vote/:id", auth, voteQuestion);
export default postRoutes;
