import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCampaings } from "../services/api";

const intialState = {
  campaigns: [],
  status: "idle",
  error: null,
};

export const getCampaigns = createAsyncThunk(
  "campaigns/getCampaigns",
  async () => {
    const data = await getCampaings();
    return data;
  }
);

const campaignsSlice = createSlice({
    name: "campaigns",
    initialState: intialState,
    reducers: {
      setCampaigns: (state, action) => {
        state.campaigns = action.payload;
      },
    },
    extraReducers(builder) {
        builder
          .addCase(getCampaigns.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(getCampaigns.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(getCampaigns.fulfilled, (state, action) => {
            state.status = "idle";
            state.campaigns = action.payload;
          });
      },
  });
  

export const selectCampaigns = (state) => state.campaign.campaigns;


export const { setCampaigns } = campaignsSlice.actions;
export default campaignsSlice;
