import { useEffect, useState } from "react";
import "./Home.css";

import user from "../../image/user.png";
import Post from "../../components/Post/Post";

// firestore
import {
  collection,
  query,
  updateDoc,
  arrayUnion,
  getDocs,
  arrayRemove,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../Firebase/Firebase-init";

function Home() {
  const [posts, setPosts] = useState(null);

  async function likePost(postId) {
    let id;
    const selectedPost = query(
      collection(db, "posts"),
      where("postId", "==", postId)
    );
    const postSnapshot = await getDocs(selectedPost);
    postSnapshot.forEach((doc) => {
      id = doc.id;
    });

    const postReference = doc(db, "posts", id);
    await updateDoc(postReference, {
      likes: arrayUnion(auth.currentUser.displayName),
    });
  }

  async function unlikePost(postId) {
    let id;
    const selectedPost = query(
      collection(db, "posts"),
      where("postId", "==", postId)
    );
    const postSnapshot = await getDocs(selectedPost);
    postSnapshot.forEach((doc) => {
      id = doc.id;
    });
    const postReference = doc(db, "posts", id);
    await updateDoc(postReference, {
      likes: arrayRemove(auth.currentUser.displayName),
    });
  }

  async function bookmarkPost(postId) {
    let id;
    const selectedPost = query(
      collection(db, "posts"),
      where("postId", "==", postId)
    );
    const postSnapshot = await getDocs(selectedPost);
    postSnapshot.forEach((doc) => {
      id = doc.id;
    });
    const postReference = doc(db, "posts", id);
    await updateDoc(postReference, {
      saved: arrayUnion(auth.currentUser.displayName),
    });
  }

  async function unbookmarkPost(postId) {
    let id;
    const selectedPost = query(
      collection(db, "posts"),
      where("postId", "==", postId)
    );
    const postSnapshot = await getDocs(selectedPost);
    postSnapshot.forEach((doc) => {
      id = doc.id;
    });
    const postReference = doc(db, "posts", id);
    await updateDoc(postReference, {
      saved: arrayRemove(auth.currentUser.displayName),
    });
  }

  // async function checkPostLike() {}

  useEffect(() => {
    async function getPosts() {
      const allPosts = query(collection(db, "posts"));
      onSnapshot(allPosts, (documents) => {
        const postDocs = [];
        documents.forEach((doc) => {
          postDocs.push(doc.data());
          setPosts(postDocs);
        });
      });
    }
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
                key={post.postId}
                posterPicture={post.posterProfileURL ?? user}
                posterUsername={post.poster}
                postPicture={post.postImage}
                altText={post.poster}
                caption={post.caption}
                postId={post.postId}
                likes={post.likes}
                likePost={likePost}
                unlikePost={unlikePost}
                date={post.createAt}
                bookmark={post.saved}
                bookmarkPost={bookmarkPost}
                unbookmarkPost={unbookmarkPost}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default Home;
