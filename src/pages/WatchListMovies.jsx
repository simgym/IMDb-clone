import { useEffect, useState } from "react";
import { ref, get, getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import "./WatchListMovies.css";
const WatchListMovies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [watchlistMoviePosterDetails, setWatchlistMoviePosterDetails] =
    useState([]); // Change this to an array
  const [IDNumberList, setIDNumberList] = useState([]);

  const auth = getAuth();
  const apiKey = "e445b44c41f808c68cbd39eecc915331";

  // Fetching idNumber from Firebase
  const fetchIdNumbers = async () => {
    if (auth.currentUser) {
      const db = getDatabase();
      const idRef = ref(
        db,
        `IMDbData/watchlistmovies/${auth.currentUser.uid}/idNumber/`
      );
      const idSnapshot = await get(idRef);

      // Get the idNumbers
      const idNumbers = Object.values(idSnapshot.val() || {});

      setIDNumberList(idNumbers);
    } else {
      console.log("user not logged in");
    }
  };

  useEffect(() => {
    fetchIdNumbers();
  }, []);

  // Fetching movie details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const results = await Promise.all(
          IDNumberList.map(async (IDNumber) => {
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

              return response.json();
            }
          })
        );

        setWatchlistMoviePosterDetails(results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (IDNumberList.length > 0) {
      fetchMovieDetails();
    }
  }, [IDNumberList, apiKey]);

  return (
    <>
      <div>
        <ul className="watchlist_horizontal-scroll">
          {watchlistMoviePosterDetails.map((movieDetail, index) => (
            <li key={index}>
              {movieDetail.backdrop_path && (
                <img
                  src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
                  alt="Backdrop"
                  style={{ width: "100%", maxWidth: "500px" }}
                />
              )}
              <p>{movieDetail.original_title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WatchListMovies;
