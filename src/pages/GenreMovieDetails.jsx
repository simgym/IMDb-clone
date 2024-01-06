import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IDAction } from "../store/IDStorage";
import "./PopularMoviesDetails.css"; 
import { getDatabase, ref, push, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const GenreMovieDetails = () => {
  const { similarID } = useParams();
  const dispatch = useDispatch();
  const [posterDetails, setPosterDetails] = useState({});
  const [video, setVideo] = useState([]);

  const auth = getAuth();

  const [watchlistMessage, setWatchlistMessage] = useState("");

  
  const [isLoading, setIsLoading] = useState(false);

  // Movie Details
  const [genresList, setGenresList] = useState([]);
  const [overview, setOverview] = useState("");
  const [status, setStatus] = useState("");
  const [tagline, setTagline] = useState("");
  const [originalLanguage, setOriginalLanguage] = useState("");
  const [title, setTitle] = useState("");

  const IDNumber = localStorage.getItem("genremovieID");
  const apiKey = "e445b44c41f808c68cbd39eecc915331";

  // Name of API: Images
  // To get the poster
  useEffect(() => {
    const itemPosters = async () => {
      try {
        setIsLoading(true);
        if (IDNumber) {
          const posterApiUrl = `https://api.themoviedb.org/3/movie/${IDNumber}?language=en-US&api_key=${apiKey}`;

          const response = await fetch(posterApiUrl, {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Error fetching data");
          }

          const result = await response.json();
          setPosterDetails(result);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    itemPosters();
  }, [IDNumber, apiKey, similarID]);

  // Name of API: Videos
  // To get the video
  useEffect(() => {
    const itemVideos = async () => {
      try {
        setIsLoading(true);
        if (IDNumber) {
          const videoApiUrl = `https://api.themoviedb.org/3/movie/${IDNumber}/videos?language=en-US&api_key=${apiKey}`;
          const response = await fetch(videoApiUrl, {
            method: "GET",
            headers: { accept: "application/json" },
          });

          if (!response.ok) {
            throw new Error("Error fetching Data");
          }

          const result = await response.json();
          setVideo(result.results);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    itemVideos();
  }, [apiKey, IDNumber, similarID]);

  // Name of API: Details
  // For overview, genres, release date, status, original language information
  useEffect(() => {
    const movieDetails = async () => {
      try {
        if (IDNumber) {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${IDNumber}?language=en-US&api_key=${apiKey}`,
            {
              method: "GET",
              headers: { accept: "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error("Error fetching data");
          }
          const result = await response.json();
          setGenresList(result.genres);
          setOverview(result.overview);
          setStatus(result.status);
          setTagline(result.tagline);
          setOriginalLanguage(result.original_language);
          setTitle(result.original_title);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    movieDetails();
  }, [IDNumber, apiKey, similarID]);

  //storing IDNumber in database
  const watchlistHandler = async () => {
    if (!auth.currentUser) {
      setWatchlistMessage("Create an account to access watchlist");

      setTimeout(() => {
        setWatchlistMessage(""); 
      }, 3000);

      return;
    }
    const db = getDatabase();
    const idRef = ref(
      db,
      `IMDbData/watchlistmovies/${auth.currentUser.uid}/idNumber/`
    );

    // Getting the current data
    const snapshot = await get(idRef);

    // Checking if the IDNumber already exists
    if (!snapshot.val() || !Object.values(snapshot.val()).includes(IDNumber)) {
      // If it doesn't exist then push the new IDNumber
      await push(idRef, IDNumber);
    }
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <div className="movie_title">
        <h1>{title}</h1>
      </div>
      <div className="movie-details-container">
        <div className="poster-container">
          <div className="detail_poster">
            {posterDetails.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/original${posterDetails.backdrop_path}`}
                alt="Backdrop"
              />
            )}
            <p className="movie_tagline">{tagline}</p>
            <button onClick={watchlistHandler}>+ watchlist</button>
          </div>
        </div>

        <div className="movie_details">
          <div className="movie_overview">
            <p>{overview}</p>
          </div>
          <div className="movie_genres_details genres-list">
            <p className="genres_title">Genres:</p>
            {genresList.map((item, index) => (
              <div className="genre-item" key={index}>
                <li>{`${item.name} `}</li>
              </div>
            ))}
            <p className="movie_status">
              | <span className="movie_status-yellow">Status:</span>{" "}
              {` ${status} |`}
            </p>
            <p className="movie_language">
              <span className="movie_language-yellow">Language:</span>{" "}
              {originalLanguage}
            </p>
          </div>
        </div>

        <div className="detail_container">
          <ul className="video_container">
            {video.map((videoItem) => (
              <li key={videoItem.id}>
                <iframe
                  title={videoItem.name}
                  width="320"
                  height="180"
                  src={`https://www.youtube.com/embed/${videoItem.key}`}
                  allowFullScreen
                ></iframe>
              </li>
            ))}
          </ul>
          {watchlistMessage && (
            <div>
              <p className="watchlist_error">{watchlistMessage}</p>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GenreMovieDetails;
