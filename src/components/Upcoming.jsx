import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Upcoming.css";
const Upcoming = () => {
  const [error, setError] = useState(null);
  const [upcomingList, setUpcomingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "e445b44c41f808c68cbd39eecc915331";

  useEffect(() => {
    const upcomingData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error("Data fetching failed");
        }

        const list = result.results;

        setUpcomingList(list);
      } catch (error) {
        console.error(error);
        setError(error);
      }
      setIsLoading(false);
    };

    upcomingData();
  }, [apiKey]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="upcoming_container">
          {" "}
          <ul className="horizontal-scroll">
            {upcomingList.map((item) => (
              <Link to={`/upcoming/${item.id}`} key={item.id}>
                <li>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    onClick={() => {
                      localStorage.setItem("clickedUpcomingID", item.id);
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

export default Upcoming;
