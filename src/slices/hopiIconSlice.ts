import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../services/firebase";

const intialState = {
  iconUrls: '',
  status: "idle",
  error: null,
};

export const getIconUrl = createAsyncThunk(
    "getIconUrl/getIconUrl",
    async () => {
      try {
        const storageRef = ref(storage, 'icons/hopi.png');
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (error) {
        throw error;
      }
    }
  );

const iconUrlsSlice = createSlice({
  name: "iconurl",
  initialState: intialState,
  reducers: {
    setIconUrl: (state, action) => {
      state.iconUrls = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getIconUrl.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getIconUrl.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getIconUrl.fulfilled, (state, action) => {
        state.status = "idle";
        //@ts-ignore
        state.iconUrls = action.payload;
      });
  },
});

export const selectIconUrls = (state) => state.iconurl.iconUrls;


export const { setIconUrl} = iconUrlsSlice.actions;
export default iconUrlsSlice;
