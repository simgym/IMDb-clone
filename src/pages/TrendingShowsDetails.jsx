import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, get } from "firebase/database";
import PopularShowCommentSection from "../components/PopularShowsCommentSection";
import TrendingSimilarShows from "../components/TrendingSimilarShows";
import "./TrendingShowsDetails.css";

const TrendingShowDetails = () => {
  const [showDetailsObj, setShowDetailsObj] = useState({});
  const [showVideosList, setShowVideosList] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Start with isLoading set to true
  const [watchlistMessage, setWatchlistMessage] = useState("");

  const showName = localStorage.getItem("clickedPopularShowsName");
  const showID = localStorage.getItem("clickedPopularShowsID");

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

      <div className="item_comment_section">
        <PopularShowCommentSection />
      </div>
      <div>
        <TrendingSimilarShows />
      </div>
    </>
  );
};

export default TrendingShowDetails;

/*
---------------------------------------------------------------------------------------------------------
SAMPLE DATA FROM 1st API

{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/5SEEBS5qXgL5rgivTiAROy1Qt2q.jpg",
      "genre_ids": [
        35,
        18
      ],
      "id": 81356,
      "origin_country": [
        "GB"
      ],
      "original_language": "en",
      "original_name": "Sex Education",
      "overview": "Inexperienced Otis channels his sex therapist mom when he teams up with rebellious Maeve to set up an underground sex therapy clinic at school.",
      "popularity": 702.187,
      "poster_path": "/zn6VNUOHGWKvSGRL6KiMtAe9ELy.jpg",
      "first_air_date": "2019-01-11",
      "name": "Sex Education",
      "vote_average": 8.299,
      "vote_count": 6688
      ------------------------------------------------------------------------------------------------------
    }*/

/*
------------------------------------------------------------------------------------------------------------
SAMPLE DATA FROM 2nd API 
{
  "id": 30984,
  "results": [
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Bleach - Opening 16 | Scar",
      "key": "mjeR7vUrDvM",
      "site": "YouTube",
      "size": 1080,
      "type": "Opening Credits",
      "official": true,
      "published_at": "2022-10-17T15:49:36.000Z",
      "id": "634ea2a3389da10079e657a5"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Ichigo vs Aizen English Dub [2160p] (60FPS)",
      "key": "IIw60tE6oDw",
      "site": "YouTube",
      "size": 2160,
      "type": "Clip",
      "official": false,
      "published_at": "2022-04-30T13:09:44.000Z",
      "id": "64ab5003e24b930100c66de9"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "All Bleach Openings [Subtitled]",
      "key": "ofvaakyqiF4",
      "site": "YouTube",
      "size": 1080,
      "type": "Featurette",
      "official": true,
      "published_at": "2019-02-16T18:00:08.000Z",
      "id": "6320218567dcc9007afb67d7"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Bleach - Opening 15 | Harukaze",
      "key": "E-ejE--Q3UE",
      "site": "YouTube",
      "size": 1080,
      "type": "Opening Credits",
      "official": true,
      "published_at": "2019-02-13T18:00:00.000Z",
      "id": "61b030421684f7001cc60de7"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Bleach - Opening 2 | D-tecnoLife",
      "key": "oeqvhwjYBws",
      "site": "YouTube",
      "size": 1080,
      "type": "Opening Credits",
      "official": true,
      "published_at": "2019-01-05T18:00:05.000Z",
      "id": "5fe19e1c2b2108003fe8aaf2"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "BLEACH Set 1 Blu-ray - Official Anime Trailer - VIZ Media",
      "key": "0c4IoCA5fY0",
      "site": "YouTube",
      "size": 1080,
      "type": "Trailer",
      "official": true,
      "published_at": "2016-07-13T20:24:33.000Z",
      "id": "5fe19e046ee3d7003fea14a9"
    }
  ]
}
---------------------------------------------------------------------------------------------
*/
