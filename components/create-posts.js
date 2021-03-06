import React, { useState } from "react";
import firebase from "../config/firebase-config";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    firebase.firestore().collection("blog").add({
      title: title,
      content: content,
    });
    setTitle("");
    setContent("");
    setNotification("Blog post created");

    setTimeout(() => {
      setNotification("");
    }, 4000);
  };

  return (
    <div>
      <h2>Add Blog</h2> {notification}
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <br />
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Content
          <br />
          <textarea
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreatePost;
