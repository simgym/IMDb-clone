/* HomePage.js */

import MainData from "../components/SearchDropdownMenu";
import Popular from "./Popular";
import TrendingShows from "./TrendingShows";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="section-container">
        <h1 className="popular">Trending</h1>
        <h2 className="popular_moviesHeading">Movies</h2>
        <div className="scroll-container">
          <div className="content-container">
            <Popular />
          </div>
        </div>
      </div>
      <div className="section-container">
        <h2 className="popular_showsHeading">Shows</h2>
        <div className="scroll-container">
          <div className="content-container">
            <TrendingShows />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
