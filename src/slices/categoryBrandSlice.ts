import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBrands } from "../services/api";

const intialState = {
  categoryBrands: [],
  status: "idle",
  error: null,
};

export const getCategoryBrand = createAsyncThunk(
  "categoryBrands/getCategoryBrands",
  async () => {
    const data = await getBrands();
    return data;
  }
);

const categoriesBrandSlice = createSlice({
    name: "categoryBrands",
    initialState: intialState,
    reducers: {
        setCategoryBrand: (state, action) => {
        state.categoryBrands = action.payload;
      },
    },
    extraReducers(builder) {
        builder
          .addCase(getCategoryBrand.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(getCategoryBrand.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(getCategoryBrand.fulfilled, (state, action) => {
            state.status = "idle";
            state.categoryBrands = action.payload;
          });
      },
  });
  

export const selectCategoryBrands = (state) => state.categoryBrand.categoryBrands;


export const { setCategoryBrand } = categoriesBrandSlice.actions;
export default categoriesBrandSlice;
