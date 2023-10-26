import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TopRatedShows.css";

const TopRatedShows = () => {
  const [topShowsList, setTopShowsList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = "e445b44c41f808c68cbd39eecc915331";

  //for Shows
  useEffect(() => {
    const topTvShow = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=${apiKey}`,
          { method: "GET", headers: { accept: "application/json" } }
        );

        if (!response.ok) {
          throw new Error("Data fetching failed");
        }

        const result = await response.json();

        const list = result.results;

        setTopShowsList(list);
      } catch (error) {
        console.error(error);

        setError(error);
      }
      setIsLoading(false);
    };

    topTvShow();
  }, [apiKey]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="topratedShows_container">
          {" "}
          <ul className="horizontal-scroll">
            {topShowsList.map((item) => (
              <Link to={`/TopRatedShow/${item.id}`} key={item.id}>
                <li>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    onClick={() => {
                      localStorage.setItem("clickedTopRatedShowID", item.id);
                      localStorage.setItem(
                        "clickedTopRatedShowName",
                        item.original_name
                      );
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

export default TopRatedShows;
