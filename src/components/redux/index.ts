import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk, { ThunkDispatch } from "redux-thunk";
import settingReducer from "./settings";

const rootReducer = combineReducers({
  settings: settingReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
