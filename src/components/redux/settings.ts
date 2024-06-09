import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type SliceState = {
  theme: "dark" | "light" | "system";
  selectTheme: boolean;
  language: string;
};

// First approach: define the initial state using that type
const initialState: SliceState = {
  theme: "system",
  language: "fa",
  selectTheme: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState, // type SliceState is inferred for the state of the slice
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      state.selectTheme = true;
    },
    setAppLanguage(state, action) {
      state.language = action.payload;
    },
    changeAppTheme(state, action) {
      if (action.payload === "system") {
        state.theme = "system";
        state.selectTheme = false;
      }
      if (action.payload === "dark") {
        state.theme = "dark";
        state.selectTheme = true;
      }
      if (action.payload === "light") {
        state.theme = "light";
        state.selectTheme = true;
      }
    },
  },
  extraReducers: (builder) => {},
});

export const { setTheme, setAppLanguage, changeAppTheme } =
  settingsSlice.actions;
export default settingsSlice.reducer;
