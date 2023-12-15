import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAndroidPhones } from "../services/api";

const intialState = {
  androidPhones: [],
  status: "idle",
  error: null,
};

export const getAndroidPhone = createAsyncThunk(
  "androidPhone/getAndroidPhones",
  async () => {
    const data = await getAndroidPhones();
    return data;
  }
);

const androidPhonesSlice = createSlice({
  name: "androidPhones",
  initialState: intialState,
  reducers: {
    setAndroidPhones: (state, action) => {
      state.androidPhones = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAndroidPhone.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAndroidPhone.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAndroidPhone.fulfilled, (state, action) => {
        state.status = "idle";
        state.androidPhones = action.payload;
      });
  },
});

export const selectAndroidPhones = (state) => state.androidPhone.androidPhones;


export const { setAndroidPhones } = androidPhonesSlice.actions;
export default androidPhonesSlice;
