import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../services/firebase";

const intialState = {
  hopiPayButtonImage: '',
  status: "idle",
  error: null,
};

export const getHopiPayButtonImage = createAsyncThunk(
    "hopipayButtonImage/getHopiPayButtonImage",
    async () => {
      try {
        const storageRef = ref(storage, 'icons/hopipaybutton.png');
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (error) {
        throw error;
      }
    }
  );

const hopiPayButtonImageSlice = createSlice({
  name: "hopipaybuttonimage",
  initialState: intialState,
  reducers: {
    setHopiPayButtonImage: (state, action) => {
      state.hopiPayButtonImage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getHopiPayButtonImage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getHopiPayButtonImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getHopiPayButtonImage.fulfilled, (state, action) => {
        state.status = "idle";
        //@ts-ignore
        state.hopiPayButtonImage = action.payload;
      });
  },
});

export const selectHopiPayButtonImage = (state) => state.hopipaybuttonimage.hopiPayButtonImage;


export const { setHopiPayButtonImage } = hopiPayButtonImageSlice.actions;
export default hopiPayButtonImageSlice;
