import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../services/firebase";

const intialState = {
  hopiPayImage: '',
  status: "idle",
  error: null,
};

export const getHopiPayImage = createAsyncThunk(
    "hopipayImage/getHopiPayImage",
    async () => {
      try {
        const storageRef = ref(storage, 'icons/hopipay.png');
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (error) {
        throw error;
      }
    }
  );

const hopiPayImageSlice = createSlice({
  name: "hopipayimage",
  initialState: intialState,
  reducers: {
    setHopiPayImage: (state, action) => {
      state.hopiPayImage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getHopiPayImage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getHopiPayImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getHopiPayImage.fulfilled, (state, action) => {
        state.status = "idle";
        //@ts-ignore
        state.hopiPayImage = action.payload;
      });
  },
});

export const selectHopiPayImage = (state) => state.hopipayimage.hopiPayImage;


export const { setHopiPayImage } = hopiPayImageSlice.actions;
export default hopiPayImageSlice;
