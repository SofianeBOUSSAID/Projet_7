import { UidContext } from "../../AppContext";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";



export default function InfoSupp(props) {
  const connected = useContext(UidContext);
  const [toggle, setToggle] = useState(props.post.likers.includes(connected.data.id));
  const fetchLike = async () => {

    axios({
      method: "PUT",
      url: `http://localhost:5000/api/post/like-post/${props.post._id}`,
      data: { id: connected.data.id },
      withCredentials: true,
    })
      .then(() => {
        setToggle(true)
      })
      .catch((err) => alert(err.response.data.message));
  };

  const fetchUnlike = async () => {

    axios({
      method: "PUT",
      url: `http://localhost:5000/api/post/unlike-post/${props.post._id}`,
      data: { id: connected.data.id },
      withCredentials: true,
    })
      .then(() => {
        setToggle(false)
      })
      .catch((err) => alert(err.response.data.message));
  };
  return (
    <div>
      <div className="container-info-supp">
        <p className="date">{props.dateFr}</p>
        {<p>{props.post.likers.length}</p>}
        <div onClick={toggle ? fetchUnlike : fetchLike} className={"heartDeux"}>
          <i
            className={
              toggle
                ? "far fa-heart heartIcone scale-0"
                : "far fa-heart heartIcone scale-1"
            }
          ></i>
          <i
            className={
              toggle
                ? "fas fa-heart heartIcone scale-1"
                : "fas fa-heart heartIcone scale-0"
            }
          ></i>
        </div>
      </div>
    </div>
  );
}
