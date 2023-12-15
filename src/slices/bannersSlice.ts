import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBanners } from "../services/api";

const intialState = {
  banners: [],
  status: "idle",
  error: null,
};

export const getBanner = createAsyncThunk(
  "banners/getBanners",
  async () => {
    const data = await getBanners();
    return data;
  }
);

const bannersSlice = createSlice({
  name: "banners",
  initialState: intialState,
  reducers: {
    setBanners: (state, action) => {
      state.banners = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBanner.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.status = "idle";
        state.banners = action.payload;
      });
  },
});

export const selectBanners = (state) => state.banner.banners;


export const { setBanners } = bannersSlice.actions;
export default bannersSlice;
