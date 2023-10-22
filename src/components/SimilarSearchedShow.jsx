import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TrendingSimilarShows.css";

const SimilarSearchedShow = () => {
  const [similarShowList, setSimilarShowList] = useState([]);
  const showID = localStorage.getItem("searchedId");
  const apiKey = "e445b44c41f808c68cbd39eecc915331";
  useEffect(() => {
    const trendSimShow = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${showID}/similar?language=en-US&page=1&api_key=${apiKey}`,
          {
            method: "GET",
            headers: { accept: "application/json" },
          }
        );

        const result = await response.json();
        const list = result.results;
        setSimilarShowList(list);
      } catch (error) {
        console.error(error);
      }
    };
    trendSimShow();
  }, [showID, apiKey]);

  return (
    <>
      <div>
        <h2 className="more_like_this">More Like This</h2>
        <ul className="similar_horizontal-scroll">
          {similarShowList.map((item) => (
            <li>
              <Link
                to={`/similarsearchedshow/${item.id}`}
                onClick={() => {
                  localStorage.setItem("similarsearchedshowID", item.id);
                  localStorage.setItem(
                    "similarsearchedshowname",
                    item.original_name
                  );
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SimilarSearchedShow;
