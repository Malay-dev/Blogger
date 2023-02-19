import React from "react";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import Auth from "./components/Pages/Auth/Auth";
import Blog from "./components/Pages/Blogs/Blog";
import DisplayBlog from "./components/Pages/Blogs/DisplayBlog";
import PostBlog from "./components/Pages/Home/PostBlog/PostBlog";
import Users from "./components/Pages/Users/Users";
import UserProfile from "./components/Pages/UserProfile/UserProfile";
function RouterTemp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Auth" element={<Auth></Auth>}></Route>
      <Route path="/Posts" element={<Blog></Blog>}></Route>
      <Route path="/PostBlog" element={<PostBlog></PostBlog>}></Route>
      <Route path="/Post/:id" element={<DisplayBlog></DisplayBlog>}></Route>
      <Route path="/Users" element={<Users></Users>}></Route>
      <Route path="/Users/:id" element={<UserProfile></UserProfile>}></Route>
    </Routes>
  );
}

export default RouterTemp;
