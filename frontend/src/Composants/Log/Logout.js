import React from "react";
import axios from "axios";
import "./Logout.css";

export default function Logout() {
  const logout = async (e) => {
    await axios({
      method: "get",
      url: `http://localhost:5000/api/user/logout`,
      withCredentials: true,
    })
      .then((res) => {
        window.location.replace("http://localhost:3000");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div className="logout">
      <img
        className="logout-icon"
        src="./img/icons/logout.svg"
        alt="Icone de déconnexion"
      />
      <p className="logout-text" onClick={logout}>
        Déconnexion
      </p>
    </div>
  );
}
