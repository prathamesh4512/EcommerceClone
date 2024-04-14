import { createSlice } from "@reduxjs/toolkit";



const initialState = { bag: [], wishList: [], numberOfReviews: 0, allProducts: [] };

const BagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    addInBag: (state, action) => {
      if (state.bag.findIndex((item) => item.id === action.payload.id) === -1) state.bag.push(action.payload);
    },
    addInWishlist: (state, action) => {
      if (state.wishList.findIndex((item) => item.id === action.payload.id) === -1) state.wishList.push(action.payload);
    },
    removeInWishList: (state, action) => {
      state.wishList = state.wishList.filter((item) => item.id !== action.payload);
    },
    removeInBag: (state, action) => {
      state.bag = state.bag.filter((item) => item.id !== action.payload);
    },
    clearBag: (state) => {
      state.bag = [];
    },
    updateInBag: (state, action) => {
      state.bag = state.bag.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else return item;
      });
    },
  },
});

export const { addInBag, addInWishlist, removeInBag, removeInWishList, setAllProducts, updateInBag, clearBag } = BagSlice.actions;

export default BagSlice.reducer;
