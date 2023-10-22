import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, get } from "firebase/database";

const TopRatedSimilarShowDetails = () => {
  const [showDetailsObj, setShowDetailsObj] = useState({});
  const [showVideosList, setShowVideosList] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [watchlistMessage, setWatchlistMessage] = useState("");

  const showName = localStorage.getItem("topratedsimilarshowname");
  const showID = localStorage.getItem("topratedsimilarshowid");

  const auth = getAuth();

  const apiKey = "e445b44c41f808c68cbd39eecc915331";
  // API for getting show data like overview , poster , language , date,country
  useEffect(() => {
    const showDetails = async () => {
      try {
        if (showName) {
          const showApiUrl = `https://api.themoviedb.org/3/search/tv?query=${showName}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
          const response = await fetch(showApiUrl, {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Error fetching data");
          }

          const result = await response.json();
          const showData = result.results[0];
          setShowDetailsObj(showData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set isLoading to false once the data has been fetched or in case of an error
      }
    };
    showDetails();
  }, [showName, apiKey]);

  //API for getting videos of shows
  // https://api.themoviedb.org/3/movie/${IDNumber}/videos?language=en-US&api_key=${apiKey}
  useEffect(() => {
    const showVideos = async () => {
      try {
        if (showID) {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${showID}/videos?language=en-US&api_key=${apiKey}`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Error fetching Data");
          }
          const result = await response.json();
          setShowVideosList(result.results);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    showVideos();
  }, [showID, apiKey]);

  //storing IDNumber in database
  const watchlistHandler = async () => {
    if (!auth.currentUser) {
      setWatchlistMessage("Create an account to access watchlist");

      setTimeout(() => {
        setWatchlistMessage(""); // This will clear the message after 2 seconds
      }, 3000);

      return;
    }
    const db = getDatabase();
    const idRef = ref(db, `IMDbData/${auth.currentUser.uid}/idNumber/`);

    // Get the current data
    const snapshot = await get(idRef);

    // Check if the IDNumber already exists
    if (!snapshot.val() || !Object.values(snapshot.val()).includes(showID)) {
      // If it doesn't exist, push the new IDNumber
      await push(idRef, showID);
    }
  };

  if (isLoading) {
    return "Loading..."; // Show a loading message while fetching data
  }

  return (
    <>
      <div className="show_title">
        <h1>{showDetailsObj.name}</h1>
      </div>
      <div className="show-details-container">
        <div className="show_poster-container">
          <div className="show_detail_poster">
            {showDetailsObj.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/original${showDetailsObj.backdrop_path}`}
                alt="Backdrop"
              />
            )}
            <p className="show_tagline">{`Release Date : ${showDetailsObj?.first_air_date}`}</p>
            <button onClick={watchlistHandler}>+ watchlist</button>
          </div>
        </div>

        <div className="show_details">
          <div className="show_overview">
            <p>{showDetailsObj.overview}</p>
          </div>
          <div className="show_genres_details genres-list">
            {/* Include your code for genresList and other properties here */}

            <p className="show_status">
              <span className="show_status-yellow">Country:</span>{" "}
              {` ${showDetailsObj.origin_country} |`}
            </p>
            <p className="show_language">
              <span className="show_language-yellow">Language:</span>{" "}
              {showDetailsObj.original_language}
            </p>
          </div>
        </div>

        <div className="show_detail_container">
          {showVideosList && Array.isArray(showVideosList) && (
            <ul className="show_video_container">
              {showVideosList.map((videoItem) => (
                <li key={videoItem.id}>
                  {" "}
                  {/* Use the 'id' property as the key */}
                  {videoItem.key &&
                    videoItem.key.trim() !== "" && ( // Check if 'key' exists and is not empty
                      <iframe
                        title={videoItem.name}
                        width="320"
                        height="180"
                        src={`https://www.youtube.com/embed/${videoItem.key}`}
                        allowFullScreen
                      ></iframe>
                    )}
                </li>
              ))}
            </ul>
          )}
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

export default TopRatedSimilarShowDetails;
