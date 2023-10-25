import { NavLink, useNavigate } from "react-router-dom";
import "./MainNavigation.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchAction } from "../store/searchStorage";
import { getAuth } from "firebase/auth";
import SearchDropdownMenu from "./SearchDropdownMenu";
import Genres from "./Genres";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [showMenu, setShowMenu] = useState(false);

  const [message, setMessage] = useState("");

  const [openGenreList, setOpenGenreList] = useState(false);

  const auth = getAuth();

  const navigateHandler = () => {
    navigate("/");
  };

  const toggleDrawerHandler = () => {
    setIsDrawerOpen((prevState) => !prevState);
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
        <button className="menu_button" onClick={toggleDrawerHandler}>
          ☰
        </button>

        <h1 onClick={navigateHandler}>ADVi</h1>
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
            ) : (
              <div>
                <p
                  onClick={() => {
                    setMessage("sign in to access");
                    setTimeout(() => setMessage(""), 2000);
                  }}
                >
                  WatchList
                </p>
                <p className="watchlist_access_message">{message}</p>
              </div>
            )}
            <li
              onClick={() => {
                setOpenGenreList((prevState) => !prevState);
              }}
            >
              Genres
              {openGenreList ? <Genres /> : undefined}
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  );
};

export default MainNavigation;
