import { useEffect, useState } from "react";
import { ref, get, getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import "./WatchListMovies.css";
const WatchListShows = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [watchlistShowPosterDetails, setWatchlistShowPosterDetails] = useState(
    []
  ); 
  const [showNameList, setShowNameList] = useState([]);

  const auth = getAuth();
  const apiKey = "e445b44c41f808c68cbd39eecc915331";

  // Fetching showName from Firebase
  useEffect(() => {
    const fetchShowNames = async () => {
      if (auth.currentUser) {
        const db = getDatabase();
        const idRef = ref(
          db,
          `IMDbData/watchlistshows/${auth.currentUser.uid}/idNumber/`
        );
        const idSnapshot = await get(idRef);

        // Get the showNames
        const showName = Object.values(idSnapshot.val() || {});

        setShowNameList(showName);
      } else {
        console.log("user not logged in");
      }
    };

    fetchShowNames();
  }, [auth]);

  // API for getting show data like overview , poster , language , date,country
  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        setIsLoading(true);
        const results = await Promise.all(
          showNameList.map(async (showName) => {
            if (showName) {
              const posterApiUrl = `https://api.themoviedb.org/3/search/tv?query=${showName}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

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

        setWatchlistShowPosterDetails(results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (showNameList.length > 0) {
      fetchShowDetails();
    }
  }, [showNameList, apiKey]);

  return (
    <>
      <div>
        <ul className="watchlist_horizontal-scroll">
          {watchlistShowPosterDetails.map((showDetail, index) => (
            <li key={index}>
              {showDetail.results[0] && (
                <img
                  src={`https://image.tmdb.org/t/p/original${showDetail.results[0].backdrop_path}`}
                  alt="Backdrop"
                />
              )}
              <p>{showDetail.results[0].original_name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WatchListShows;
