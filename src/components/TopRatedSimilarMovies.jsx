import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TrendingSimilarShows.css";

const TopRatedSimilarMovies = () => {
  const [similarShowList, setSimilarShowList] = useState([]);
  const movieID = localStorage.getItem("clickedTopRatedMovieID");
  const apiKey = "e445b44c41f808c68cbd39eecc915331";
  useEffect(() => {
    const trendSimShow = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&page=1&api_key=${apiKey}`,
          {
            method: "GET",
            headers: { accept: "application/json" },
          }
        );

        const result = await response.json();
        const list = result.results;
        setSimilarShowList(list);
      } catch (error) {
        console.error(error);
      }
    };
    trendSimShow();
  }, [movieID, apiKey]);

  return (
    <>
      <div>
        <h2 className="more_like_this">More Like This</h2>
        <ul className="similar_horizontal-scroll">
          {similarShowList.map((item) => (
            <li>
              <Link
                to={`/topratedsimilarmovie/${item.id}`}
                onClick={() => {
                  localStorage.setItem("topratedsimilarmovieid", item.id);
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TopRatedSimilarMovies;
