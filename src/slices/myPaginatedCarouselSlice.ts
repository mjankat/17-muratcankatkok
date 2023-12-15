import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getShopping } from "../services/api";

const intialState = {
  myPaginatedCarousels: [],
  status: "idle",
  error: null,
};

export const getMyPaginatedCarousels = createAsyncThunk(
  "myPaginatedCarousels/getMyPaginatedCarousels",
  async () => {
    const data = await getShopping();
    return data;
  }
);

const myPaginatedCarouselsSlice = createSlice({
  name: "mypaginatedcarousel",
  initialState: intialState,
  reducers: {
    setMyPaginatedCarousels: (state, action) => {
      state.myPaginatedCarousels = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMyPaginatedCarousels.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMyPaginatedCarousels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMyPaginatedCarousels.fulfilled, (state, action) => {
        state.status = "idle";
        //@ts-ignore
        state.myPaginatedCarousels = action.payload;
      });
  },
});

export const selectMyPaginatedCarousels = (state) => state.mypaginatedcarousel.myPaginatedCarousels;


export const { setMyPaginatedCarousels} = myPaginatedCarouselsSlice.actions;
export default myPaginatedCarouselsSlice;
