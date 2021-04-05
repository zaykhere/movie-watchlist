import React, { useReducer, createContext } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  watchlist: [],
  watched: []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = props => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const addMovieToWatchlist = movie => {
    dispatch({type: "ADD_TO_WATCHLIST",payload:movie})
  }

  return (
    <GlobalContext.Provider value={{
      watchlist: state.watchlist,
      watched: state.watched,
      addMovieToWatchlist
    }}>
      {props.children}
    </GlobalContext.Provider>
  )
}
