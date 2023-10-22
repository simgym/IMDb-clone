import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PopularMoviesDetails from "./pages/PopularMoviesDetails";
import TrendingShowDetails from "./pages/TrendingShowsDetails";
import Signup from "./Authorization/Signup";
import Login from "./Authorization/Login";
import WatchList from "./pages/WatchList";
import Signout from "./Authorization/Signout";
import SearchDetails from "./pages/SearchDetails";
import UpcomingDetails from "./pages/UpcomingDetails";
import TopRatedMoviesDetails from "./pages/TopRatedMoviesDetails";
import TopRatedShowsDetails from "./pages/TopRatedShowsDetails";

import TrendingSimilarShowDetails from "./pages/TrendingSimilarShowDetails";
import TrendingSimilarMovieDetails from "./pages/TrendingSimilarMovieDetails";
import UpcomingSimilarDetails from "./pages/UpcomingSimilarDetails";
import TopRatedSimilarMovieDetails from "./pages/TopRatedSimilarMovieDetails";
import TopRatedSimilarShowDetails from "./pages/TopRatedSimilarShowDetails";
import SimilarSearchedMovieDetails from "./pages/SimilarSearchedMovieDetails";
import SimilarSearchedShowDetails from "./pages/SimilarSearchedShowDetails";

import CelebDetails from "./pages/CelebDetails";

/*------------------------------------------------------------------------ 
                              STEPS LEFT                                                              


1. Add watchList  to searchedshows , searchedMovies , trendingShows 
2. Get an API for shows that will give you poster based on id of show or name for getting data into watchlist (i have already put the id number for trending shows in firebase when watchlist in trending shows is clicked)
3. In watchList and in trending section below the poster add names of movies and shows

-------------------------------------------------------------------------*/
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/movies/:popularMoviesId", element: <PopularMoviesDetails /> },
        { path: "/shows/:popularShowsId", element: <TrendingShowDetails /> },
        { path: "/upcoming/:upcomingId", element: <UpcomingDetails /> },
        { path: "/topRatedMovie/:movieId", element: <TopRatedMoviesDetails /> },
        { path: "/TopRatedShow/:showId", element: <TopRatedShowsDetails /> },
        { path: "/celebs/:celebId", element: <CelebDetails /> },
        {
          path: "/similartrendingshow/:trendingsimilarshowId",
          element: <TrendingSimilarShowDetails />,
        },
        {
          path: "/similartrendingmovie/:trendingsimilarmovieId",
          element: <TrendingSimilarMovieDetails />,
        },
        {
          path: "/upcomingsimilar/:movieID",
          element: <UpcomingSimilarDetails />,
        },
        {
          path: "/topratedsimilarmovie/:movieID",
          element: <TopRatedSimilarMovieDetails />,
        },
        {
          path: "/topratedsimilarshow/:showID",
          element: <TopRatedSimilarShowDetails />,
        },
        {
          path: "/similarsearchedmovie/:movieID",
          element: <SimilarSearchedMovieDetails />,
        },
        {
          path: "/similarsearchedshow/:showID",
          element: <SimilarSearchedShowDetails />,
        },
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login /> },
        { path: "/signout", element: <Signout /> },
        { path: "/watchlist/:userdata", element: <WatchList /> },
        {
          path: "/movies/search/:searchId",
          element: <SearchDetails />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
