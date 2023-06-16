import React, { useContext, useState } from "react";
import GlobalContext from "../Context/GloablContext";
import "./header.css";
import HeaderUserMenu from "./HeaderUserMenu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate=useNavigate()
  const { openNav, setOpenNav, setIsAuthenticated, user, breakpoint } =
    useContext(GlobalContext);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user-info");
    navigate("/")
  };
  return (
    <section
      className="header-container"
      style={{
        left: breakpoint("mobile")
          ? 0
          : openNav
          ? "var(--side-width)"
          : "7.5rem",
        width: breakpoint("mobile")
          ? "100vw"
          : openNav
          ? "calc(100vw - var(--side-width))"
          : "calc(100vw - 7.5rem)",
        padding: breakpoint("mobile")
          ? "1rem 0.5rem 0 0.5rem"
          : "1rem 1rem 0 0",
      }}>
      <header className="header" data-aos="fade-down">
        <div className="header-left">
          <button onClick={() => setOpenNav(!openNav)}>
            <span className="material-icons">menu</span>
          </button>
        </div>
        <div className="header-right" onClick={() => setOpenUserMenu(true)}>
          <div className="header-right-user">
            <img src="https://static.vecteezy.com/system/resources/previews/015/119/100/original/businessman-icon-man-icon-design-illustration-free-png.png" style={{width:"20px", height:"20px"}}alt="A" />
          </div>
        </div>
      </header>
      {openUserMenu && (
        <HeaderUserMenu
          logout={logoutUser}
          close={() => setOpenUserMenu(false)}
        />
      )}
    </section>
  );
};

export default Header;
