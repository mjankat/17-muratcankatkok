import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOffers } from "../services/api";

const intialState = {
  offers: [],
  status: "idle",
  error: null,
};

export const getOffer = createAsyncThunk(
  "offers/getOffers",
  async () => {
    const data = await getOffers();
    return data;
  }
);

const offersSlice = createSlice({
    name: "offers",
    initialState: intialState,
    reducers: {
      setOffers: (state, action) => {
        state.offers = action.payload;
      },
    },
    extraReducers(builder) {
        builder
          .addCase(getOffer.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(getOffer.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(getOffer.fulfilled, (state, action) => {
            state.status = "idle";
            state.offers = action.payload;
          });
      },
  });
  

export const selectOffers = (state) => state.offer.offers;


export const { setOffers } = offersSlice.actions;
export default offersSlice;
