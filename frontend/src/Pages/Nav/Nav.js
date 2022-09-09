import React, { useState, useContext, useEffect } from "react";
import Logout from "../../Composants/Log/Logout";
import { UidContext } from "../../AppContext";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Nav.css";

export default function () {
  const [toggle, setToggle] = useState(false);
  const connected = useContext(UidContext);

  return (
    <header>
      <nav>
        <a
          href={window.location.href}
          className="nav-icon"
          aria-label="visit homepage"
          aria-current="page"
        >
          <span className="tittle-nav">
            <img
              className="groupo-sign"
              src="./img//icons/icon-left-font-monochrome-white.svg"
              alt="logo d'entreprise"
            />
          </span>
        </a>

        <div className="main-navlinks">
          <button
            onClick={(_) => {
              setToggle(!toggle);
            }}
            className={toggle ? "hamburger open" : "hamburger"}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded="false"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div
            className={
              toggle ? "navlinks-container open" : "navlinks-container"
            }
          >
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? "active" : "";
              }}
            >
              Actualité
            </NavLink>
            <NavLink to="/login">
              {connected.connect ? "Profil" : "Connexion/Inscription"}
            </NavLink>
          </div>
        </div>
        {connected.connect ? <Logout /> : ""}
      </nav>
    </header>
  );
}
