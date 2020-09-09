import fire from "../../config/firebase-config";
import Link from "next/link";
import Head from "next/head";

const Blog = (props) => {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
      </Head>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const content = {};
  await fire
    .firestore()
    .collection("blog")
    .doc(query.id)
    .get()
    .then((result) => {
      content.title = result.data().title;
      content.content = result.data().content;
    });

  return {
    props: {
      title: content.title,
      content: content.content,
    },
  };
};

export default Blog;
