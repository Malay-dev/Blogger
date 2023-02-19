import { BrowserRouter as Router } from "react-router-dom";
import RouterTemp from "./RouterTemp";
import "./App.css";

import Navbar from "./components/Navbar/Navbar.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchAllBlogs } from "./actions/post";
import { fetchAllUsers } from "./actions/users";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBlogs());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <RouterTemp />
      </Router>
    </div>
  );
}

export default App;
