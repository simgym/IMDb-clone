import { useState, useEffect } from "react";
import SearchedCommentSection from "../components/SearchedCommentSection";
import "./ShowsSearchDetails.css";

const ShowsSearchDetails = () => {
  const showName = localStorage.getItem("searchedName");
  const searchResult = localStorage.getItem("searchedItm");
  const IDNumber = localStorage.getItem("searchedId");

  //Show Details
  const [showDetailsObj, setShowDetailsObj] = useState({});
  const [showVideosList, setShowVideosList] = useState("");
  const [showBackdrop, setShowBackdrop] = useState("");
  const [showDate, setShowDate] = useState("");
  const [showOverview, setShowOverview] = useState("");
  const [showCountry, setShowCountry] = useState("");
  const [showLanguage, setShowLanguage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "e445b44c41f808c68cbd39eecc915331";

  // API for getting show data like overview , poster , language , date,country
  useEffect(() => {
    const showDetails = async () => {
      setIsLoading(true);
      try {
        if (showName || searchResult) {
          const showApiUrl = `https://api.themoviedb.org/3/search/tv?query=${
            showName ? showName : searchResult
          }&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
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
          setShowBackdrop(showData.backdrop_path);
          setShowDate(showData.first_air_date);
          setShowOverview(showData.overview);
          setShowCountry(showData.origin_country);
          setShowLanguage(showData.original_language);

          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    showDetails();
  }, [showName, apiKey]);

  //API for getting videos of shows
  // https://api.themoviedb.org/3/movie/${IDNumber}/videos?language=en-US&api_key=${apiKey}
  useEffect(() => {
    const showVideos = async () => {
      setIsLoading(true);
      try {
        if (IDNumber) {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${IDNumber}/videos?language=en-US&api_key=${apiKey}`,
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

          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    showVideos();
  }, [IDNumber, apiKey]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <main>
          {" "}
          <div className="show_title">
            <h1>{showName}</h1>
          </div>
          <div className="show-details-container">
            <div className="show_poster-container">
              <div className="show_detail_poster">
                {showBackdrop && (
                  <img
                    src={`https://image.tmdb.org/t/p/original${showBackdrop}`}
                    alt="Backdrop"
                  />
                )}
                <p className="show_tagline">{`Release Date : ${showDate}`}</p>
              </div>
            </div>

            <div className="show_details">
              <div className="show_overview">
                <p>{showOverview}</p>
              </div>
              <div className="show_genres_details genres-list">
                <p className="show_status">
                  <span className="show_status-yellow">Country:</span>
                  {` ${showCountry} |`}
                </p>
                <p className="show_language">
                  <span className="show_language-yellow">Language:</span>{" "}
                  {showLanguage}
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
              <div>
                <SearchedCommentSection />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default ShowsSearchDetails;
