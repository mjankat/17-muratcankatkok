import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPhones } from "../services/api";

const intialState = {
  phones: [],
  status: "idle",
  error: null,
};

export const getPhone = createAsyncThunk(
  "phone/getPhones",
  async () => {
    const data = await getPhones();
    return data;
  }
);

const phonesSlice = createSlice({
  name: "phones",
  initialState: intialState,
  reducers: {
    setPhones: (state, action) => {
      state.phones = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPhone.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPhone.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPhone.fulfilled, (state, action) => {
        state.status = "idle";
        state.phones = action.payload;
      });
  },
});

export const selectPhones = (state) => state.phone.phones;


export const { setPhones} = phonesSlice.actions;
export default phonesSlice;
