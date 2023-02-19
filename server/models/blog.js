import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  blogTitle: { type: String, required: "Blog must have a title" },
  blogBody: { type: String, required: "Blog must hava a body" },
  upVote: { type: [String], default: [] },
  downVote: { type: [String], default: [] },
  userPosted: { type: String, required: "Blog must have an author" },
  userId: { type: String },
  postedOn: { type: Date, default: Date.now },
  comment: [
    {
      commentBody: String,
      userCommented: String,
      userId: String,
      commentedOn: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Blog", blogSchema);
