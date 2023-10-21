import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { set, ref, getDatabase } from "firebase/database";
import "./SearchDropdownMenu.css";

const DropdownMenu = ({ items, onSelect }) => {
  if (items.length === 0) {
    return <div className="modal">No such movies in database</div>;
  }

  return (
    <div className="modal">
      <div className="content">
        <ul>
          {items.map((item) => (
            <Link to={`/movies/search/${item.id}`} key={item.id}>
              <li
                className="items"
                key={item.id}
                onClick={() => onSelect(item.id, item.name)}
              >
                {item.name ? item.name : item.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SearchDropdownMenu = ({ toggleMenu }) => {
  const searchItem = localStorage.getItem("searchedItm");

  const [error, setError] = useState(null);
  const [searchList, setSearchList] = useState([]);

  const db = getDatabase();

  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${searchItem}&include_adult=false&language=en-US&page=1&api_key=e445b44c41f808c68cbd39eecc915331`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error, data not found");
        }
        const result = await response.json();
        const list = result.results;
        console.log(list);

        setSearchList(list);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    data();
  }, [searchItem]);

  const handleSelect = (id, name) => {
    // try {
    //   const searchIdRef = ref(db, `IMDbData/searchId/${id}/`);
    //   await set(searchIdRef, id);
    // } catch (error) {
    //   console.error(error.code);
    // }
    localStorage.setItem("searchedId", id);
    localStorage.setItem("searchedName", name);

    toggleMenu();
  };

  return (
    <div className="search-results">
      <ul>
        {ReactDOM.createPortal(
          <DropdownMenu items={searchList} onSelect={handleSelect} />,
          document.getElementById("dropdown-root")
        )}
      </ul>
    </div>
  );
};

export default SearchDropdownMenu;
