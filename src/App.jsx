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

/*------------------------------------------------------------------------ 
                                STEPS LEFT                                                          
1. Add a better API for movies and shows in MainData and other info too

3. Add rating based on 5 stars for each movie & show

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
