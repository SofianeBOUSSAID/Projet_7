import React, { useContext, useState } from "react";
import { UidContext } from "../../AppContext";
import axios from "axios";
import "../InputFiles/InputFiles.css";
import "./CreatePost.css";

export default function CreatePost(props) {
  const [files, setFiles] = useState();
  const [dataPost, setDataPost] = useState();
  const connected = useContext(UidContext);
  const [imgRead, setImgRead] = useState();
  const submit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", files);
    formData.append("message", dataPost);
    formData.append("posterId", connected.data.id);

    axios({
      method: "POST",
      url: "http://localhost:5000/api/post/",
      data: formData,
      withCredentials: true,
    })
      .then((x) => {
        setDataPost("");
        setImgRead();
        props.fetch();
        setFiles("");
      })
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <div className="container-post-submit">
      <form action="submit">
        <textarea
          onChange={(x) => {
            setDataPost(x.target.value);
          }}
          value={dataPost}
          className="post-aera"
          placeholder="Comment s'est passée votre journée ?"
          name="post"
          id="post"
          cols="100"
          maxLength="290"
          rows="10"
        ></textarea>
        {imgRead && <img src={imgRead} alt="photo d'utilisateur" />}
        <div className="container-aera-info">
          <div className="file-input">
            <input
              onChange={(e) => {
                setFiles(e.target.files[0]);
                const img = URL.createObjectURL(e.target.files[0]);
                setImgRead(img);
              }}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              name="file-input"
              id="file-input"
              className="file-input__input"
            />
            <label className="file-input__label" htmlFor="file-input">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="upload"
                className="svg-inline--fa fa-upload fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                ></path>
              </svg>
              <span>Joindre une image</span>
            </label>
          </div>
          <button type="submit" className="submit-btn-post" onClick={submit}>
            Envoyer le post
          </button>
        </div>
      </form>
    </div>
  );
}
