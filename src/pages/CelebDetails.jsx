import { useEffect, useState } from "react";
import "./CelebDetails.css";

const CelebDetails = () => {
  const [celebList, setCelebList] = useState([]);

  const [error, setError] = useState(null);

  const celebName = localStorage.getItem("clickedCelebsName");

  const apiKey = "e445b44c41f808c68cbd39eecc915331";

  useEffect(() => {
    const celebDeets = async () => {
      try {
        const response = await fetch(
          `https://actor-movie-api1.p.rapidapi.com/getid/${celebName}?apiKey=62ffac58c57333a136053150eaa1b587`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "8116e9937fmsh44ca7e6a22d1dcbp114475jsn0d3778ce4935",
              "X-RapidAPI-Host": "actor-movie-api1.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Data fetching failed");
        }

        const result = await response.json();

        const list = result;

        setCelebList(list);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    celebDeets();
  }, [celebName, apiKey]);

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="celeb_layout_container">
          <h1 className="celeb_name">Name : {celebName}</h1>

          <ul className="celeb_details">
            {celebList.map((item, index) => (
              <li key={index}>
                {item.poster_path ? (
                  <img
                    className="celeb_images"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.original_title}
                  />
                ) : (
                  <p>No image available</p>
                )}
                <div className="details_box">
                  <p className="celeb_movie_title">{item.original_title}</p>

                  <p>{item.overview}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default CelebDetails;
