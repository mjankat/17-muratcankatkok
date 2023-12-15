import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../services/firebase";

const intialState = {
  auths: [],
  status: "idle",
  error: null,
};

export const getAuths = createAsyncThunk(
  "auths/getAuth",
  async () => {
    const user = auth.currentUser;
    const userData = {
      uid: user.uid,
      email: user.email,
    };
    return userData;
  }
);

const authsSlice = createSlice({
  name: "auths",
  initialState: intialState,
  reducers: {
    setAuths: (state, action) => {
      state.auths = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAuths.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAuths.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAuths.fulfilled, (state, action) => {
        state.status = "idle";
        //@ts-ignore
        state.auths = action.payload;
      });
  },
});

export const selectAuths = (state) => state.auth.auths;


export const { setAuths } = authsSlice.actions;
export default authsSlice;
