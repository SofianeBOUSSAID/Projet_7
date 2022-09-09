import "./PutDelet.css";
import axios from "axios";
import { useState } from "react";

export default function Put(props) {
  const [toggle, setToggle] = useState(false);
  const [modifInput, setModifInput] = useState();
  const toggleFunc = () => {
    setToggle(!toggle);
  };
  const deletePost = async () => {
    axios({
      method: "DELETE",
      url: `http://localhost:5000/api/post/${props.x._id}`,
      withCredentials: true,
    })
      .then(() => {
        props.fetch();
      })
      .catch();
  };
  const modifyPost = async () => {
    axios({
      method: "PUT",
      url: `http://localhost:5000/api/post/${props.x._id}`,
      data: {
        message: modifInput,
      },
      withCredentials: true,
    })
      .then(() => {
        setToggle(false);
        props.fetch();
      })
      .catch();
  };
  return (
    <div className="box-put">
      {toggle && (
        <textarea
          onChange={(e) => {
            setModifInput(e.target.value);
          }}
          cols="30"
          maxLength="290"
          rows="5"
          className="modif-input"
          defaultValue={props.x.post}
        ></textarea>
      )}
      <p onClick={toggleFunc} className="modifier">
        <i className="fas fa-edit"></i>
      </p>
      <p onClick={deletePost} className="supprimer">
        X
      </p>
      {toggle && (
        <button className="modifier-btn">
          <i onClick={modifyPost} className="fas fa-arrow-right"></i>
        </button>
      )}
    </div>
  );
}
