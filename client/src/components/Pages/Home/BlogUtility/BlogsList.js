import React from "react";
import Blogs from "./Blogs";
function BlogsList({ blogsList }) {
  return (
    <>
      {blogsList.map((blog) => (
        <Blogs blog={blog} key={blog._id} />
      ))}
    </>
  );
}

export default BlogsList;
