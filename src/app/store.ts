import { configureStore } from "@reduxjs/toolkit";
import campaignsSlice from "../slices/campaignsSlice";
import bannersSlice from "../slices/bannersSlice";
import offersSlice from "../slices/offersSlice";
import categoriesHomeSlice from "../slices/categoryHomeSlice";
import categoriesBrandSlice from "../slices/categoryBrandSlice";
import authsSlice from "../slices/authsSlice";
import myPaginatedCarouselsSlice from "../slices/myPaginatedCarouselSlice";
import iconUrlsSlice from "../slices/hopiIconSlice";
import myShoppingCarouselSlice from "../slices/myShoppingCarouselSlice";
import phonesSlice from "../slices/phonesSlice";
import androidPhonesSlice from "../slices/androidPhones";
import appleIosPhonesSlice from "../slices/appleIosPhones";
import hopiPayImageSlice from "../slices/hopiPayImages";
import hopiPayButtonImageSlice from "../slices/hopiPayButtonImages";
import myCardsSlice from "../slices/myCards";
import myCardsBottomSlice from "../slices/myCardsBottom";
import myOtherCardsSlice from "../slices/myOtherCards";

const store = configureStore({
  reducer: {
    campaign: campaignsSlice.reducer,
    banner: bannersSlice.reducer,
    offer: offersSlice.reducer,
    category: categoriesHomeSlice.reducer,
    categoryBrand: categoriesBrandSlice.reducer,
    auth: authsSlice.reducer,
    mypaginatedcarousel: myPaginatedCarouselsSlice.reducer,
    iconurl: iconUrlsSlice.reducer,
    myshoppingcarousel: myShoppingCarouselSlice.reducer,
    phone: phonesSlice.reducer,
    androidPhone: androidPhonesSlice.reducer,
    appleIosPhone: appleIosPhonesSlice.reducer,
    hopipayimage: hopiPayImageSlice.reducer,
    hopipaybuttonimage: hopiPayButtonImageSlice.reducer,
    mycard: myCardsSlice.reducer,
    mycardbottom: myCardsBottomSlice.reducer,
    myothercard: myOtherCardsSlice.reducer
  }
});

export default store;
