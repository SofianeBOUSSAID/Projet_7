import React, { useContext, useState } from "react";
import { UidContext } from "../../AppContext";
import "./Logs.css";
import Sign from "../../Composants/Sign/Sign";
import Profil from "../Profil/Profil";

export default function Login() {
  const userConnected = useContext(UidContext);

  return (
    <div>
      {userConnected.connect ? <Profil value={userConnected} /> : <Sign />}
    </div>
  );
}
