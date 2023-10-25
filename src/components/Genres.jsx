import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Genres.css";

const Genres = () => {
  const [genresList, setGenresList] = useState([]);
  const apiKey = "e445b44c41f808c68cbd39eecc915331";
  useEffect(() => {
    const genreData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Data fetching failed");
      }
      const result = await response.json();
      const list = result.genres;
      setGenresList(list);
      console.log(list);
    };

    genreData();
  }, [apiKey]);

  return (
    <>
      <main>
        <div className="genres_list">
          <ul>
            {genresList.map((item) => (
              <Link to={`/genre/${item.id}`}>
                <li
                  key={item.id}
                  onClick={() => localStorage.setItem("genreID", item.id)}
                >
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Genres;
