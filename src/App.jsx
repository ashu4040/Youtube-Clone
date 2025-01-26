import React from "react";
import Head from "./Components/Head";
import Body from "./Components/Body";
import store from "./utils/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./Components/MainContainer";
import WatchPage from "./Components/WatchPage";
import SearchResults from "./Components/SearchResults"; // Import SearchResults

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Head />
        <Body />
      </>
    ),

    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      {
        path: "search", // New path for Search Results
        element: <SearchResults />, // Route to SearchResults component
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <Head /> */}
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
};

export default App;
