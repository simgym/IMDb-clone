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
import CelebDetails from "./pages/CelebDetails";

/*------------------------------------------------------------------------ 
                              STEPS LEFT                                                              

1. Add rating based on 5 stars for each movie & show
3. Add watchList  to searchedshows , searchedMovies , trendingShows 
4. Get an API for shows that will give you poster based on id of show or name for getting data into watchlist (i have already put the id number for trending shows in firebase when watchlist in trending shows is clicked)
5. Add similar to APIs in searchedDetails , trendingShows and popularMovies component too
6. In watchList and in trending section below the poster add names of movies and shows
7. Add APIs mentioned in Notion to the homepage
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
