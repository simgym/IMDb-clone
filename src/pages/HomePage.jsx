import Popular from "./Popular";
import TrendingShows from "./TrendingShows";
import Upcoming from "../components/Upcoming";
import TopRatedMovies from "../components/TopRatedMovies";
import TopRatedShows from "../components/TopRatedShows";
import PopularCelebs from "../components/PopularCelebs";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage_wrapper">
      {" "}
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
        <div className="section-container">
          <h1 className="popular">Upcoming</h1>
          <div className="scroll-container">
            <div className="content-container">
              <Upcoming />
            </div>
          </div>
        </div>
        <div className="section-container">
          <h1 className="popular">Top Rated</h1>
          <h2 className="popular_moviesHeading">Movies</h2>
          <div className="scroll-container">
            <div className="content-container">
              <TopRatedMovies />
            </div>
          </div>
        </div>
        <div className="section-container">
          <h2 className="popular_showsHeading">Shows</h2>
          <div className="scroll-container">
            <div className="content-container">
              <TopRatedShows />
            </div>
          </div>
        </div>
        <div className="section-container">
          <h1 className="popular">Popular Celebs</h1>
          <div className="scroll-container">
            <div className="content-container">
              <PopularCelebs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
