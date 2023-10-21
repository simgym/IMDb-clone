import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SearchDetails.css";
import MovieSearchDetails from "./MovieSearchDetails";
import ShowsSearchDetails from "./ShowsSearchDetails";

const SearchDetails = () => {
  const { searchId } = useParams();
  const [movieId, setMovieId] = useState(localStorage.getItem("searchedId"));
  const [showName, setShowName] = useState(
    localStorage.getItem("searchedName")
  );

  useEffect(() => {
    setMovieId(localStorage.getItem("searchedId"));
    setShowName(localStorage.getItem("searchedName"));
  }, [searchId]);

  return (
    <>
      <div>
        {showName === "null" || showName === "undefined" ? (
          <div>
            <MovieSearchDetails />
          </div>
        ) : (
          <div>
            <ShowsSearchDetails />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchDetails;
