import React from "react";
import Blogs from "./Blogs";
import "./Blogs.css";
function BlogsList({ blogslist }) {
  return (
    <div className="container section-story">
      {blogslist.map((blog) => (
        <Blogs blog={blog} key={blog._id} />
      ))}
    </div>
  );
}

export default BlogsList;
