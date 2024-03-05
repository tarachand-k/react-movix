import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imgUrls: {},
  genres: {},
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setApiConfiguration: (state, action) => {
      state.imgUrls = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setApiConfiguration, setGenres } = homeSlice.actions;

export default homeSlice.reducer;
