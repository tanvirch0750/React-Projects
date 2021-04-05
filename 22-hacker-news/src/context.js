import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

import reducer from "./reducer";

const API_ENDPOINT =
  "https://cors-anywhere.herokuapp.com/https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  hits: [],
  query: "react",
  pages: 0,
  nbPages: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // REDUCER
  const [state, dispatch] = useReducer(reducer, initialState);

  // FETCH STORIES DATA
  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // remove stories
  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };

  // search form / query
  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.pages}`);
  }, [state.query]);

  return (
    <AppContext.Provider value={{ ...state, removeStory, handleSearch }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
