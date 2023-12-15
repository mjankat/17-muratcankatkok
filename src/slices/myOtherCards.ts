import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../services/firebase";

const intialState = {
  myOtherCards: '',
  status: "idle",
  error: null,
};

export const getMyOtherCards = createAsyncThunk(
    "myOtherCards/getMyOtherCards",
    async () => {
      try {
        const storageRef = ref(storage, 'icons/istanbulkart.png');
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (error) {
        throw error;
      }
    }
  );

const myOtherCardsSlice = createSlice({
  name: "myothercards",
  initialState: intialState,
  reducers: {
    setMyOtherCards: (state, action) => {
      state.myOtherCards = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMyOtherCards.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMyOtherCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMyOtherCards.fulfilled, (state, action) => {
        state.status = "idle";
        //@ts-ignore
        state.myOtherCards = action.payload;
      });
  },
});

export const selectMyOtherCards = (state) => state.myothercard.myOtherCards;


export const { setMyOtherCards } = myOtherCardsSlice.actions;
export default myOtherCardsSlice;
