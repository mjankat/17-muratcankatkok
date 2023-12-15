import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getShoppingMiddleCarousel } from "../services/api";

const intialState = {
  myshoppingcarousels: [],
  status: "idle",
  error: null,
};

export const getMyShoppingCarousel = createAsyncThunk(
  "myShoppingCarousel/getMyShoppingCarousel",
  async () => {
    const data = await getShoppingMiddleCarousel();
    return data;
  }
);

const myShoppingCarouselSlice = createSlice({
  name: "myshoppingcarousels",
  initialState: intialState,
  reducers: {
    setMyShoppingCarousels: (state, action) => {
      state.myshoppingcarousels = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMyShoppingCarousel.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMyShoppingCarousel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMyShoppingCarousel.fulfilled, (state, action) => {
        state.status = "idle";
        state.myshoppingcarousels = action.payload;
      });
  },
});

export const selectMyShoppingCarousels = (state) => state.myshoppingcarousel.myshoppingcarousels;


export const { setMyShoppingCarousels } = myShoppingCarouselSlice.actions;
export default myShoppingCarouselSlice;
