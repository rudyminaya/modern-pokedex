"use client";
import { State } from "@/types";
import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react";
import { Action } from "./actionTypes";

type IProps = {
  children: ReactNode;
};

const enum StorageType {
  LOCALSTORAGE,
  SESSIONSTORAGE,
}

const InitialState: State = {
  loading: false,
  pokemon_all: {
    timestamp: 0,
    data: [],
  },
  pokemon_detail: undefined,
  pokemon_pagination: {
    loading: false,
    page: {
      next: null,
      previous: null,
      results: [],
    },
  },
  favorites: [],
  regions: {
    timestamp: 0,
    data: [],
  },
  types: { timestamp: 0, data: [] },
  pokemon_search: {
    searching: false,
    loading: false,
    results: [],
  },
};

export const StoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: InitialState,
  dispatch: () => null,
});

function reducer(state: State, action: Action): State {
  let newState = state;
  switch (action.type) {
    case "ADD_FAVORITE":
      newState = { ...state, favorites: [...state.favorites, action.payload] };
      break;
    case "REMOVE_FAVORITE":
      newState = {
        ...state,
        favorites: state.favorites.filter((fav) => fav !== action.payload),
      };
      break;
    case "SET_POKEMON_ALL":
      newState = {
        ...state,
        pokemon_all: action.payload,
      };
      break;
    case "SET_REGIONS":
      newState = {
        ...state,
        regions: action.payload,
      };
      break;
    case "SET_TYPES":
      newState = {
        ...state,
        types: action.payload,
      };
      break;
    case "LOAD_FAVORITES": {
      newState = {
        ...state,
        favorites: [],
      };
      break;
    }
    case "SET_POKEMON_DETAIL":
      newState = {
        ...state,
        pokemon_detail: action.payload,
      };
      break;
    case "SET_POKEMON_SEARCH_RESULTS":
      newState = {
        ...state,
        pokemon_search: action.payload,
      };
      break;
    case "SET_POKEMON_PAGINATION":
      newState = {
        ...state,
        pokemon_pagination: action.payload,
      };
      break;
    default:
      break;
  }
  return newState;
}

export const StoreProvider = (props: IProps) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
