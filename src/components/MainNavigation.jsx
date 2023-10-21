import { NavLink, useNavigate } from "react-router-dom";
import "./MainNavigation.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchAction } from "../store/searchStorage";
import { getAuth } from "firebase/auth";
import SearchDropdownMenu from "./SearchDropdownMenu";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isMoviesOpen, setIsMoviesOpen] = useState(false);
  const [isTvShowsOpen, setIsTvShowsOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [showMenu, setShowMenu] = useState(false);

  const auth = getAuth();

  const navigateHandler = () => {
    navigate("/");
  };

  const toggleDrawerHandler = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const toggleMoviesHandler = () => {
    setIsMoviesOpen((prevState) => !prevState);
    const dropdownButton = document.querySelector(".movies-dropdown-button");
    dropdownButton.classList.toggle("clicked");
  };
  const toggleTvShowsHandler = () => {
    setIsTvShowsOpen((prevState) => !prevState);
    const dropdownButton = document.querySelector(".tvshows-dropdown-button");
    dropdownButton.classList.toggle("clicked");
  };
  // const searchHandler = (event) => {
  //   dispatch(searchAction.search(event.target.value));
  // };
  const searchItemHandler = (event) => {
    setSearchValue(event.target.value);
    // dispatch(searchAction.search(event.target.value)); this was being used in searchDropdown inside searchItem but i changed it to localStorage.getItem()
    localStorage.setItem("searchedItm", event.target.value);
    setShowMenu(false);
  };

  const toggleHandler = () => {
    setShowMenu((prevState) => !prevState);

    setSearchValue("");
  };

  return (
    <>
      <header className="header">
        <button onClick={toggleDrawerHandler}>☰</button>

        <h1 onClick={navigateHandler}>IMDb</h1>
        <nav>
          <ul className="list">
            <li>
              <input
                id="search"
                type="search"
                placeholder="Search IMDb"
                className="searchBar"
                // onChange={searchHandler}
                onChange={searchItemHandler}
                value={searchValue}
              />
            </li>
            {searchValue ? (
              !showMenu ? (
                <SearchDropdownMenu toggleMenu={toggleHandler} />
              ) : null
            ) : null}
            {auth.currentUser ? (
              <li>
                <NavLink to="/signout" className="signIn">
                  Signout
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/signup" className="signIn">
                  Signup
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {isDrawerOpen ? (
        <nav className="drawer open">
          <button onClick={toggleDrawerHandler} className="close-button">
            ×
          </button>

          <ul className="menu">
            {auth.currentUser ? (
              <li>
                <NavLink
                  to={`/watchlist/${auth.currentUser.uid}`}
                  className="movies-dropdown-button"
                >
                  WatchList
                </NavLink>
              </li>
            ) : undefined}

            <li>
              <button
                className="movies-dropdown-button"
                onClick={toggleMoviesHandler}
              >
                Movies
              </button>
              {isMoviesOpen ? (
                <div className="dropdown-content">
                  <NavLink to="/english">English</NavLink>
                  <NavLink to="/hindi">Hindi</NavLink>
                  <NavLink to="tamil">Tamil</NavLink>
                </div>
              ) : (
                ""
              )}
            </li>
            <li>
              <button
                className="tvshows-dropdown-button"
                onClick={toggleTvShowsHandler}
              >
                TV Shows
              </button>
              {isTvShowsOpen ? (
                <div className="dropdown-content">
                  <NavLink to="/english">English</NavLink>
                  <NavLink to="/hindi">Hindi</NavLink>
                  <NavLink to="tamil">Tamil</NavLink>
                </div>
              ) : (
                ""
              )}
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  );
};

export default MainNavigation;
