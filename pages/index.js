import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import fire from "../config/firebase-config";
import CreatePost from "../components/create-posts";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserData(fire.auth().currentUser);
      } else {
        setLoggedIn(false);
      }
    });

    fire.firestore()
      .collection("blog")
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogs);
      });
  }, []);

  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        //setNotification("Logged out");
        /*setTimeout(() => {
          setNotification("");
        }, 2000);*/
      });
  };

  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1>Blog</h1>
      {notification}
      {!loggedIn ? (
        <div>
          <Link href="/users/register">
            <a>Register</a>
          </Link>
          |
          <Link href="/users/login">
            <a> Login</a>
          </Link>
        </div>
      ) : (
        <button onClick={handleLogout}>
          ({userData && userData.email}) Logout
        </button>
      )}

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href="/blog/[id]" as={"/blog/" + blog.id}>
              <a itemProp="hello">{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      {loggedIn && <CreatePost />}
    </div>
  );
};

export default Home;
