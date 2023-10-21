import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const PopularCelebs = () => {
  const [popularCelebsList, setPopularCelebsList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "e445b44c41f808c68cbd39eecc915331";

  useEffect(() => {
    const popular = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/person/day?language=en-US&api_key=${apiKey}`,
          { method: "GET", headers: { accept: "application/json" } }
        );

        if (!response.ok) {
          throw new Error("Data fetching failed");
        }
        const result = await response.json();
        const list = result.results;

        setPopularCelebsList(list);
      } catch (error) {
        console.error(error);
        setError(error);
      }
      setIsLoading(false);
    };
    popular();
  }, [apiKey]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="horizontal-scroll">
          {popularCelebsList.map((item) => (
            <Link to={`/celebs/${item.id}`} key={item.id}>
              <li>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                  alt={item.title}
                  onClick={() => {
                    localStorage.setItem("clickedCelebsID", item.id);
                    localStorage.setItem(
                      "clickedCelebsName",
                      item.original_name
                    );
                  }}
                />
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};

export default PopularCelebs;
