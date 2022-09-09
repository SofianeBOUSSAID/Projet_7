import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { UidContext } from "./AppContext";
import Logs from "./Pages/Login/Logs";
import Home from "./Pages/Home/Home";
import Nav from "./Pages/Nav/Nav";
import axios from "axios";
import "./index.css";

function App() {
  const [uid, SetUid] = useState({
    connect: false,
    data: {
      pseudo: null,
      id: null,
      email: null,
      createdAt: null,
      imageUrl: null,
    },
  });

  const authFetch = async () => {
    await axios({
      method: "get",
      url: `http://localhost:5000/api/user/auth`,
      withCredentials: true,
    })
      .then((res) => {
        SetUid({
          connect: res.data.connect,
          data: {
            pseudo: res.data.info.pseudo,
            id: res.data.info._id,
            email: res.data.info.email,
            createdAt: res.data.info.createdAt,
            imageUrl: res.data.info.picture,
            admin: res.data.info.admin
          }
        });
      })

      .catch((err) => { });
  };

  useEffect(() => {
    authFetch();
  }, []);

  return (
    <BrowserRouter>
      <UidContext.Provider value={uid}>
        <main>
          <Nav />
          <Routes>
            <Route path="/login" element={<Logs />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </UidContext.Provider>
    </BrowserRouter>
  );
}

export default App;
