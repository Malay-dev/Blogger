import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import decode from "jwt-decode";

import "./Navbar.css";
import setCurrentUser from "../../actions/currentUser";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  return (
    <div>
      <nav className="nav">
        <Link to="/" className="nav-link nav-logo">
          <p className="nav-logo">B</p>
        </Link>

        <div className="nav-text">
          {User === null ? (
            <Link to="/Auth" className="nav-btn nav-link">
              Log In
            </Link>
          ) : (
            <div className="nav-item nav-link nav-logout">
              <Link
                to={`/Users/${User?.result?._id}`}
                style={{ textDecoration: "none" }}>
                <Avatar
                  backgroundColor={"#fff"}
                  px="50px"
                  py="50px"
                  color={"black"}
                  borderRadius="50%">
                  {" " + User.result.name.charAt(0).toUpperCase() + " "}
                </Avatar>
              </Link>
              <button className="nav-btn nav-link" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
          {/* <div></div> */}
        </div>
      </nav>
    </div>
  );
}
