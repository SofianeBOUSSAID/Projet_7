import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Sign.css";
export default function Sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSign, setSignPassword] = useState("");
  const [pseudo, setPseudo] = useState();
  const [emailSign, setSignEmail] = useState();
  const [error, setError] = useState();

  const submit = async (e) => {
    e.preventDefault();
    if (e.target.className === "btn-logs") {
      const res = await axios
        .post(
          "http://localhost:5000/api/user/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then(() => {
          window.location.replace("http://localhost:3000");
          setError();
        })
        .catch((err) => {
          console.log(err);
          setError([err.response.data.message]);
        });
    } else if (e.target.className === "btn-logs-sign") {
      console.log(e.target.className);

      const res = await axios
        .post(
          "http://localhost:5000/api/user/register",
          {
            pseudo,
            email: emailSign,
            password: passwordSign,
          },
          { withCredentials: true }
        )
        .then(() => {
          alert(
            "Votre inscription a bien été prise en compte, veuillez vous connectez"
          );
          setError();
        })
        .catch((err) => {
          console.log([err.response.data.data]);
          setError(err.response.data.data);
        });
    }
  };

  return (
    <div className="body-logs">
      <div className="main">
        <input
          className="input-logs"
          type="checkbox"
          id="chk"
          aria-hidden="true"
        />

        <div className="signup">
          <form>
            <label className="label-logs" htmlFor="chk" aria-hidden="true">
              Inscription
            </label>
            <input
              onInput={(e) => {
                setPseudo(e.target.value);
              }}
              className="input-logs"
              type="text"
              name="txt"
              placeholder="Pseudo"
              required={true}
            />
            <input
              className="input-logs"
              onInput={(e) => {
                setSignEmail(e.target.value);
                console.log(emailSign);
              }}
              type="mail"
              name="email"
              placeholder="Email"
              required={true}
            />
            <input
              className="input-logs"
              onInput={(e) => {
                setSignPassword(e.target.value);
              }}
              type="password"
              name="pswd"
              placeholder="Password"
              required={true}
            />
            <button type="submit" onClick={submit} className="btn-logs-sign">
              S'inscrire
            </button>
          </form>
        </div>

        <div className="login">
          <form>
            <label className="label-logs" htmlFor="chk" aria-hidden="true">
              Connexion
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="input-logs"
              type="email"
              name="email"
              pattern=".+@globex\.com"
              placeholder="Email"
              required={true}
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="input-logs"
              type="password"
              name="pswd"
              placeholder="Password"
              required={true}
            />
            <button className="btn-logs" onClick={submit}>
              Se connecter
            </button>
          </form>
        </div>
      </div>
      {error && (
        <div className="error-message">
          {
            <h3>
              {error.map((x, index) => {
                if (x.message) {
                  return <p key={index}>{x.message}</p>;
                } else {
                  return <p key={index}>{x}</p>;
                }
              })}
            </h3>
          }
        </div>
      )}
    </div>
  );
}
