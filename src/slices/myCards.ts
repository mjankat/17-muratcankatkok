import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../services/firebase";

const intialState = {
  myCards: '',
  status: "idle",
  error: null,
};

export const getMyCards = createAsyncThunk(
    "myCards/getMyCards",
    async () => {
      try {
        const storageRef = ref(storage, 'icons/mycards.png');
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (error) {
        throw error;
      }
    }
  );

const myCardsSlice = createSlice({
  name: "mycards",
  initialState: intialState,
  reducers: {
    setMyCards: (state, action) => {
      state.myCards = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMyCards.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMyCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMyCards.fulfilled, (state, action) => {
        state.status = "idle";
        //@ts-ignore
        state.myCards = action.payload;
      });
  },
});

export const selectMyCards = (state) => state.mycard.myCards;


export const { setMyCards } = myCardsSlice.actions;
export default myCardsSlice;
