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
    <div className="Navbar">
      <nav>
        <Link to="/" className="nav-item  nav-logo">
          <img src="" alt="logo" className="logo" />
        </Link>

        <div>
          {User === null ? (
            <Link to="/Auth" className="nav-item nav-link">
              Log In
            </Link>
          ) : (
            <div className="user-details-logout">
              <Link
                to={`/Users/${User?.result?._id}`}
                style={{ textDecoration: "none" }}>
                <Avatar
                  backgroundColor={"#009dff"}
                  px="35px"
                  py="35px"
                  color={"white"}
                  borderRadius="50%">
                  {" " + User.result.name.charAt(0).toUpperCase() + " "}
                </Avatar>
              </Link>
              <button className="nav-item nav-link" onClick={handleLogout}>
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
