import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../services/firebase";

const intialState = {
  myCardsBottom: '',
  status: "idle",
  error: null,
};

export const getMyCardsBottom = createAsyncThunk(
    "myCardsBottom/getMyCardsBottom",
    async () => {
      try {
        const storageRef = ref(storage, 'icons/mycardsbottom.png');
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (error) {
        throw error;
      }
    }
  );

const myCardsBottomSlice = createSlice({
  name: "mycardsbottom",
  initialState: intialState,
  reducers: {
    setMyCardsBottom: (state, action) => {
      state.myCardsBottom = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMyCardsBottom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMyCardsBottom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMyCardsBottom.fulfilled, (state, action) => {
        state.status = "idle";
        //@ts-ignore
        state.myCardsBottom = action.payload;
      });
  },
});

export const selectMyCardsBottom = (state) => state.mycardbottom.myCardsBottom;


export const { setMyCardsBottom } = myCardsBottomSlice.actions;
export default myCardsBottomSlice;
