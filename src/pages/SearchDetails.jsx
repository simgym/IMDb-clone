import { useState, useEffect } from "react";
import "./SearchDetails.css";
import MovieSearchDetails from "./MovieSearchDetails";
import ShowsSearchDetails from "./ShowsSearchDetails";

const SearchDetails = () => {
  const [moviesIdList, setMoviesIdList] = useState([]);
  const [showMovie, setShowMovie] = useState(false);

  const movieId = localStorage.getItem("searchedId");
  const showName = localStorage.getItem("searchedName");

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
