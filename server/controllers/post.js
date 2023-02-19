import blogs from "../models/blog.js";
import mongoose from "mongoose";

export const postBlog = async (req, res) => {
  const postBlogData = req.body;
  const userId = req?.body?.userId;

  const postBlog = new blogs({
    ...postBlogData,
    userId,
  });
  try {
    await postBlog.save();
    res.status(200).json("Posted a blog successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Error on posting blog");
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogList = await blogs.find();
    res.status(200).json(blogList);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Blog unavailable...");
  }
  try {
    await blogs.findByIdAndRemove(_id);
    res.status(200).json({ message: "Successfully deleted the blog..." });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const voteBlog = async (req, res) => {
  const { id: _id } = req.params;
  const { value, userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Blog unavailable...");
  }
  try {
    const blog = await blogs.findById(_id);
    const upIndex = blog.upVote.findIndex((id) => id === String(userId));
    const downIndex = blog.downVote.findIndex((id) => id === String(userId));
    if (String(value) === "upVote") {
      if (downIndex !== -1) {
        blog.downVote = blog.downVote.filter((id) => id !== String(userId));
      }
      if (upIndex === -1) {
        blog.upVote.push(userId);
      } else {
        blog.upVote = blog.upVote.filter((id) => id !== String(userId));
      }
    } else if (String(value) === "downVote") {
      if (upIndex !== -1) {
        blog.upVote = blog.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        blog.downVote.push(userId);
      } else {
        blog.downVote = blog.downVote.filter((id) => id !== String(userId));
      }
    }
    await blogs.findByIdAndUpdate(_id, blog);
    res.status(200).json({ message: "voted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
