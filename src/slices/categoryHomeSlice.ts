import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../services/api";

const intialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const getCategory = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const data = await getCategories();
    return data;
  }
);

const categoriesHomeSlice = createSlice({
    name: "categories",
    initialState: intialState,
    reducers: {
      setCategories: (state, action) => {
        state.categories = action.payload;
      },
    },
    extraReducers(builder) {
        builder
          .addCase(getCategory.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(getCategory.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(getCategory.fulfilled, (state, action) => {
            state.status = "idle";
            state.categories = action.payload;
          });
      },
  });
  

export const selectCategories = (state) => state.category.categories;


export const { setCategories } = categoriesHomeSlice.actions;
export default categoriesHomeSlice;
