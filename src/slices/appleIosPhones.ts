import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIPhones } from "../services/api";

const intialState = {
  appleIosPhones: [],
  status: "idle",
  error: null,
};

export const getAppleIosPhone = createAsyncThunk(
  "appleIosPhone/getAppleIosPhones",
  async () => {
    const data = await getIPhones();
    return data;
  }
);

const appleIosPhonesSlice = createSlice({
  name: "appleIosPhones",
  initialState: intialState,
  reducers: {
    setAppleIosPhones: (state, action) => {
      state.appleIosPhones = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAppleIosPhone.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAppleIosPhone.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAppleIosPhone.fulfilled, (state, action) => {
        state.status = "idle";
        state.appleIosPhones = action.payload;
      });
  },
});

export const selectAppleIosPhones = (state) => state.appleIosPhone.appleIosPhones;


export const { setAppleIosPhones } = appleIosPhonesSlice.actions;
export default appleIosPhonesSlice;
