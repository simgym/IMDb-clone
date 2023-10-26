import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TopRatedMovies.css";

const TopRatedMovies = () => {
  const [topMoviesList, setTopMoviesList] = useState([]);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = "e445b44c41f808c68cbd39eecc915331";
  // for Movies
  useEffect(() => {
    const topMovie = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`,
          { method: "GET", headers: { accept: "application/json" } }
        );

        if (!response.ok) {
          throw new Error("Data fetching failed");
        }
        const result = await response.json();
        const list = result.results;

        setTopMoviesList(list);
      } catch (error) {
        console.log(error);

        setError(error);
      }
      setIsLoading(false);
    };
    topMovie();
  }, [apiKey]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="topratedMovies_container">
          {" "}
          <ul className="horizontal-scroll">
            {topMoviesList.map((item) => (
              <Link to={`/topRatedMovie/${item.id}`} key={item.id}>
                <li>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    onClick={() => {
                      localStorage.setItem("clickedTopRatedMovieID", item.id);
                    }}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TopRatedMovies;
