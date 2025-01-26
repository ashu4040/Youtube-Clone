import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/navSlice";
import { cacheResults } from "../utils/searchSlice";
import { setSearchQuery } from "../utils/searchResultSlice";
import { Search_Api } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Head = () => {
  const [searchQueryLocal, setSearchQueryLocal] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  const navigate = useNavigate();

  const suggestionsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQueryLocal]) {
        setSuggestion(searchCache[searchQueryLocal]);
      } else {
        getSearch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQueryLocal]);

  const getSearch = async () => {
    try {
      const data = await fetch(Search_Api + searchQueryLocal);
      const json = await data.json();
      setSuggestion(json[1] || []);
      dispatch(
        cacheResults({
          [searchQueryLocal]: json[1] || [],
        })
      );
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const toggleMenuOpen = () => dispatch(toggleMenu());

  const handleSuggestionClick = (query) => {
    if (query !== searchQueryLocal) {
      dispatch(setSearchQuery(query));
    }
    navigate(`/search`);
  };

  const handleSearchSubmit = () => {
    if (searchQueryLocal.trim()) {
      dispatch(setSearchQuery(searchQueryLocal));
      navigate(`/search`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      suggestionsRef.current && !suggestionsRef.current.contains(e.target);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-3 mb-2 shadow-md fixed top-0 w-full z-10 bg-white h-auto ">
      <div className="flex flex-col sm:flex-row w-full ">
        <div className="flex sm:w-1/4 items-center  ">
          <img
            onClick={toggleMenuOpen}
            className="h-8 sm:h-10 cursor-pointer"
            src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-4.png"
            alt="Toggle Menu"
          />
          <img
            className="h-8 sm:h-10 mx-2"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/2560px-Logo_of_YouTube_%282015-2017%29.svg.png"
            alt="YouTube Logo"
          />
        </div>

        {/* Search Bar */}
        <div className=" sm:w-1/2 mt-2 sm:mt-0">
          <form
            className="flex w-full mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchSubmit();
            }}
          >
            <input
              className="border border-gray-400 p-2 rounded-l-full w-full"
              type="text"
              placeholder="Search"
              value={searchQueryLocal}
              onChange={(e) => setSearchQueryLocal(e.target.value)}
            />
            <button
              className="border border-gray-600 bg-gray-200 p-2 rounded-r-full"
              type="submit"
            >
              Search
            </button>
          </form>

          {/* Suggestions */}
          {searchQueryLocal && (
            <ul
              ref={suggestionsRef}
              className="absolute bg-white border border-gray-300 rounded-md mt-2 w-full sm:w-2/4 max-h-48 overflow-y-auto z-20"
            >
              {suggestion.map((e) => (
                <li
                  key={e}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => handleSuggestionClick(e)}
                >
                  {e}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Head;
