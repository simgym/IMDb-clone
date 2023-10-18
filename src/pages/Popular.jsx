import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Popular.css";

const Popular = () => {
  const [posterList, setPosterList] = useState([]);

  // API to get movie ID & poster
  useEffect(() => {
    const popularStuff = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=e445b44c41f808c68cbd39eecc915331",
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const result = await response.json();
        const dataList = result.results;
        setPosterList(dataList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    popularStuff();
  }, []);

  return (
    <>
      <div>
        <ul className="horizontal-scroll">
          {posterList.map((item) => (
            <Link to={`/movies/${item.id}`} key={item.id}>
              <li>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                  alt={item.title}
                  onClick={() => {
                    localStorage.setItem("clickedPopularMovieID", item.id);
                  }}
                />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Popular;
