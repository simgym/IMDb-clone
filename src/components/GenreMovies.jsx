import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./GenreMovies.css";

const GenreMovies = () => {
  const { id } = useParams();
  const [genreMoviesList, setGenreMoviesList] = useState([]);
  const apiKey = "e445b44c41f808c68cbd39eecc915331";
  const genreId = localStorage.getItem("genreID");
  useEffect(() => {
    const genreMovieData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}&api_key=${apiKey}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        const result = await response.json();
        const list = result.results;
        console.log(list);
        setGenreMoviesList(list);
      } catch (error) {
        console.error("Data fetching failed");
      }
    };
    genreMovieData();
  }, [genreId, apiKey, id]);
  return (
    <>
      <main>
        <div className="grid">
          {genreMoviesList.map((item) => (
            <div className="movie-item">
              <Link to={`/genremoviedetails/${item.id}`}>
                <img
                  className="movie_image"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  onClick={() => localStorage.setItem("genremovieID", item.id)}
                />
              </Link>
              <p>{item.original_title}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default GenreMovies;
