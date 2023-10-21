import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./TrendingShows.css";

const TrendingShows = () => {
  const [showList, setShowList] = useState([]);

  //API to get TV shows ID & poster
  useEffect(() => {
    const shows = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=e445b44c41f808c68cbd39eecc915331",
          {
            method: "GET",
            headers: { accept: "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const result = await response.json();
        const showDataList = result.results;
        setShowList(showDataList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    shows();
  }, []);

  return (
    <>
      <div>
        <ul className="shows_horizontal-scroll">
          {showList.map((item) => {
            return (
              <Link to={`/shows/${item.name}`} key={item.id}>
                <li>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                    alt={item.name}
                    onClick={() => {
                      console.log("Image clicked"); // Add this line for debugging
                      localStorage.setItem(
                        "clickedPopularShowsName",
                        item.name
                      );
                      localStorage.setItem("clickedPopularShowsID", item.id);
                    }}
                  />
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TrendingShows;

/*
---------------------------------------------------------------------------------------------------------
SAMPLE DATA FROM THIS API

{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg",
      "id": 84958,
      "name": "Loki",
      "original_language": "en",
      "original_name": "Loki",
      "overview": "After stealing the Tesseract during the events of “Avengers: Endgame,” an alternate version of Loki is brought to the mysterious Time Variance Authority, a bureaucratic organization that exists outside of time and space and monitors the timeline. They give Loki a choice: face being erased from existence due to being a “time variant” or help fix the timeline and stop a greater threat.",
      "poster_path": "/voHUmluYmKyleFkTu3lOXQG702u.jpg",
      "media_type": "tv",
      "genre_ids": [
        18,
        10765
      ],
      "popularity": 2559.025,
      "first_air_date": "2021-06-09",
      "vote_average": 8.159,
      "vote_count": 10222,
      "origin_country": [
        "US"
      ]
    }
    ----------------------------------------------------------------------------------------------------
    */
