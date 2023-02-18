import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  postTitle: { type: String, required: "Question must have a title" },
  postBody: { type: String, required: "Question must hava a body" },
  upVote: { type: [String], default: [] },
  downVote: { type: [String], default: [] },
  userPosted: { type: String, required: "Question must have an author" },
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
