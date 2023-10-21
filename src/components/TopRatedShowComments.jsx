import React, { useState, useEffect } from "react";
import { ref, get, push, getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import "./TopRatedShowComments.css";

const TopRatedShowComment = () => {
  const [commentsList, setCommentsList] = useState([]);
  const [newComment, setNewComment] = useState("");

  const topShowId = localStorage.getItem("clickedTopRatedShowID");

  const auth = getAuth();

  const fetchComments = async () => {
    const db = getDatabase();
    const commentRef = ref(db, `IMDbData/topRatedShowcomments/${topShowId}`);

    const commentSnapshot = await get(commentRef);

    const comments = Object.values(commentSnapshot.val() || {});

    setCommentsList(comments);
  };

  useEffect(() => {
    fetchComments();
  }, [auth, topShowId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (auth.currentUser) {
      const db = getDatabase();
      const newCommentsRef = ref(
        db,
        `IMDbData/topRatedShowcomments/${topShowId}/`
      );

      // Push the new comment to the database
      await push(newCommentsRef, newComment);

      // Clear the input field
      setNewComment("");

      // After adding a new comment, refetch the comments
      fetchComments();
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <div className="tsccomment_section">
      <h1 className="tsccomment_heading">Comment Section</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {commentsList.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopRatedShowComment;
