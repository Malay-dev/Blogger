import React from "react";
import Blogs from "./Blogs";
import "./Blogs.css";
function BlogsList({ blogslist }) {
  blogslist.sort(
    (a, b) =>
      parseFloat(b.upVote.length - b.downVote.length) -
      parseFloat(a.upVote.length - a.downVote.length)
  );
  return (
    <div className="container section-story">
      {blogslist.map((blog) => (
        <Blogs blog={blog} key={blog._id} />
      ))}
    </div>
  );
}

export default BlogsList;
