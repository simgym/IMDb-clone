import React, { useState, useEffect } from "react";
import { ref, get, push, getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import "./SearchedCommentSection.css";

const SearchedCommentSection = () => {
  const [newComment, setNewComment] = useState("");
  const [searchedCommentsList, setSearchedCommentList] = useState([]);

  const searchedItemId = localStorage.getItem("searchedId");

  const auth = getAuth();

  const fetchComments = async () => {
    const db = getDatabase();

    const searchedCommentRef = ref(
      db,
      `IMDbData/searchedComments/${searchedItemId}`
    );

    const searchedCommentSnapshot = await get(searchedCommentRef);

    const searchedComments = Object.values(searchedCommentSnapshot.val() || {});

    setSearchedCommentList(searchedComments);
  };

  useEffect(() => {
    fetchComments();
  }, [auth, searchedItemId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (auth.currentUser) {
      const db = getDatabase();

      const newSearchedItemCommentRef = ref(
        db,
        `IMDbData/searchedComments/${searchedItemId}/`
      );

      // Push the new comment to the database

      await push(newSearchedItemCommentRef, newComment);

      // Clear the input field
      setNewComment("");

      // After adding a new comment, refetch the comments
      fetchComments();
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <div className="searchedcommment_section">
      <h1 className="searchedcommment_heading">Comment Section</h1>
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
        {searchedCommentsList.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchedCommentSection;
