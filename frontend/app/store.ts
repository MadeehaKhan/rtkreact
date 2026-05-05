import { configureStore } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import todosReducer from "./store/todosSlice";

// Define RootState based on reducer structure to avoid circular reference
export type RootState = {
  todos: ReturnType<typeof todosReducer>;
};

export const createStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      todos: todosReducer,
    },
    preloadedState,
  });
};

export const store = createStore();

export type AppDispatch = typeof store.dispatch;

// Export pre-typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
