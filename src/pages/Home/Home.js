import { useEffect, useState } from "react";
import uniqid from "uniqid";
import "./Home.css";

import user from "../../image/user.png";
import Post from "../../components/Post/Post";

// firestore
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/Firebase-init";

function Home() {
  const [posts, setPosts] = useState(null);

  async function getPosts() {
    const allPosts = query(collection(db, "posts"));
    onSnapshot(allPosts, (documents) => {
      const cities = [];
      documents.forEach((doc) => {
        cities.push(doc.data());
        setPosts(cities);
      });
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="home-page">
      <div>
        <main className="home">
          {!posts && <div className="home-loader"></div>}
          {posts?.map((post) => {
            return (
              <Post
                key={uniqid()}
                posterPicture={post.posterProfileURL ?? user}
                posterUsername={post.poster}
                postPicture={post.postImage}
                altText={post.poster}
                caption={post.caption}
              />
            );
          })}
          {posts && console.log(posts)}
        </main>
      </div>
    </div>
  );
}

export default Home;
