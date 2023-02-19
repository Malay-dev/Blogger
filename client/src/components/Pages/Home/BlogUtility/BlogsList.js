import React from "react";
import Blogs from "./Blogs";
function BlogsList({ blogslist }) {
  return (
    <>
      {blogslist.map((blog) => (
        <Blogs blog={blog} key={blog._id} />
      ))}
    </>
  );
}

export default BlogsList;
