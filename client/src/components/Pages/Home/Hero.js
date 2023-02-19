import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Hero.css";

import BlogsList from "./BlogUtility/BlogsList";

function Hero() {
  const user = useSelector((state) => state.currentUserReducer);
  const blogsList = useSelector((state) => state.postsReducer);
//   console.log(blogsList);
  const navigate = useNavigate();
  const redirect = (link) => {
    console.log("redirecting....");
    if (link === "/Auth") {
      alert("Log in or Sign up to Ask blogs");
    }
    navigate(link);
  };
   
  const location = useLocation();
  return (
    <div className="home-main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? <h1>Top blogs</h1> : <h1>All blogs</h1>}
        <button
          onClick={() => {
            user === null ? redirect("/Auth") : redirect("/postBlog");
          }}
          className="ask-btn">
          Post Blogs
        </button>
      </div>
      <div>
        {blogsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{blogsList.data.length} blogs</p>
            <BlogsList blogslist={blogsList.data} />
          </>
        )}
      </div>
    </div>
  );
}

export default Hero;
