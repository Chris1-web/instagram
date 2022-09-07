import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Overlay from "../../components/Overlay/Overlay";
import user from "../../image/user.png";
import "./PostDetail.css";
import Form from "../../components/Form/Form";
import Button from "../../components/Button/Button";
import likeOutline from "../../image/like.png";
import Love from "../../image/love.png";
import Comment from "../../image/comment.png";
import bookmarkOutline from "../../image/bookmark-outline.png";
import bookmarkFill from "../../image/bookmark-fill.png";

// firebase
import { auth, db } from "../../Firebase/Firebase-init";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

function PostDetail() {
  const { postid } = useParams();
  let history = useNavigate();

  const [comment, setComment] = useState("");
  const [loadingPost, setLoadingPost] = useState(true);
  const [post, setPost] = useState(null);
  const [disablePost, setDisablePost] = useState(null);

  async function submitPostComment(e) {
    e.preventDefault();
    if (comment === "") return;
    setComment("");
    setDisablePost(true);
    let commentObject = {
      author: auth.currentUser.displayName,
      comment,
      photo: auth.currentUser.photoURL,
    };
    e.preventDefault();
    let id;
    const selectedPost = query(
      collection(db, "posts"),
      where("postId", "==", postid)
    );
    const postSnapshot = await getDocs(selectedPost);
    postSnapshot.forEach((doc) => {
      id = doc.id;
    });
    const postReference = doc(db, "posts", id);
    await updateDoc(postReference, {
      comments: arrayUnion(commentObject),
    });
    setDisablePost(false);
  }

  function getComment(e) {
    setComment(e.target.value);
  }

  function closeAddNewPost() {
    history("/");
  }

  async function likePost() {
    let id;
    const selectedPost = query(
      collection(db, "posts"),
      where("postId", "==", postid)
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

  async function unlikePost() {
    let id;
    const selectedPost = query(
      collection(db, "posts"),
      where("postId", "==", postid)
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

  async function bookmarkPost() {
    let id;
    const selectedPost = query(
      collection(db, "posts"),
      where("postId", "==", postid)
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

  async function unbookmarkPost() {
    let id;
    const selectedPost = query(
      collection(db, "posts"),
      where("postId", "==", postid)
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

  async function deletePost() {
    try {
      let id;
      const selectedPost = query(
        collection(db, "posts"),
        where("postId", "==", postid)
      );
      const postSnapshot = await getDocs(selectedPost);
      postSnapshot.forEach((doc) => {
        id = doc.id;
      });
      const postReference = doc(db, "posts", id);
      await deleteDoc(postReference);
      history("/");
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    async function getPosts() {
      const allPosts = query(
        collection(db, "posts"),
        where("postId", "==", postid)
      );
      onSnapshot(allPosts, (documents) => {
        const postDocs = [];
        documents.forEach((doc) => {
          postDocs.push(doc.data());
          setPost(postDocs[0]);
        });
      });
      setLoadingPost(false);
    }
    getPosts();
  }, []);

  return (
    <>
      <Overlay closeAddNewPost={closeAddNewPost}>
        <div className="post-details-containers">
          {loadingPost && <div className="loading-post"></div>}
          {!loadingPost && post && (
            <>
              <img
                src={post.postImage}
                alt={post.caption}
                className="postImage"
              />
              <div className="comments">
                <div>
                  <div className="top">
                    <div>
                      <img
                        src={auth.currentUser.photoURL ?? user}
                        alt="babie"
                      />
                      <p className="author-name">{post.poster}</p>
                    </div>
                    {post.poster === auth.currentUser.displayName && (
                      <button onClick={deletePost}>delete</button>
                    )}
                  </div>
                  <div className="middle">
                    <div>
                      <img
                        src={auth.currentUser.photoURL ?? user}
                        alt={post.caption}
                      />
                      <p className="author-name">{post.poster}</p>
                      <p className="author-comment">{post.caption}</p>
                    </div>
                    {post.comments.map((indiePost, index) => {
                      return (
                        <div key={index}>
                          <Link to={"/" + indiePost.author}>
                            <img
                              src={indiePost.photo ?? user}
                              alt={indiePost.author}
                            />
                          </Link>
                          <Link to={"/" + indiePost.author}>
                            <p className="author-name">{indiePost.author}</p>
                          </Link>
                          <p className="author-comment">{indiePost.comment}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="comment-box">
                  <div>
                    <div className="left">
                      {!post.likes.includes(auth.currentUser.displayName) && (
                        <img
                          src={likeOutline}
                          alt="love-outline"
                          onClick={likePost}
                        />
                      )}
                      {post.likes.includes(auth.currentUser.displayName) && (
                        <img
                          src={Love}
                          alt="love-outline"
                          onClick={unlikePost}
                        />
                      )}
                      <img src={Comment} className="comment" alt="comment" />
                    </div>
                    {post.saved.includes(auth.currentUser.displayName) && (
                      <img
                        src={bookmarkFill}
                        alt="love-outline"
                        onClick={unbookmarkPost}
                      />
                    )}
                    {!post.saved.includes(auth.currentUser.displayName) && (
                      <img
                        src={bookmarkOutline}
                        alt="book-outline"
                        onClick={bookmarkPost}
                      />
                    )}
                  </div>
                  <p>{post.likes.length} likes</p>
                  <p className="date">{post.createAt}</p>
                  <Form handleSubmit={submitPostComment}>
                    <input
                      className="comment"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={getComment}
                    />
                    <Button
                      classname="post-comment"
                      title="Post"
                      disabled={disablePost}
                    />
                  </Form>
                </div>
              </div>
            </>
          )}
        </div>
      </Overlay>
    </>
  );
}

export default PostDetail;
