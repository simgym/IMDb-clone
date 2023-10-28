import WatchListMovies from "./WatchListMovies";
import WatchListShows from "./WatchListShows";
import "./WatchList.css";

const WatchList = () => {
  return (
    <>
      <main className="watchlist_container">
        <h1>Watchlist</h1>
        <h2>Movies</h2>
        <div>
          <WatchListMovies />
        </div>
        <h2>Shows</h2>
        <div>
          <WatchListShows />
        </div>
      </main>
    </>
  );
};

export default WatchList;
