import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: [],
    basketCurrent: 0,
  },
  reducers: {
    addProductToBasket(state, action) {
      state.basket.push(action.payload.newProduct)
    },
    changeProductToBasket(state, action) {
      const { newProduct } = action.payload;
      const changeProduct = state.basket.find(item => item.id === newProduct.id)
      changeProduct.current = newProduct.current
    },
    removeProductToBasket(state, action) {
      state.basket.splice(action.payload.indexProduct, 1)
    },
    changeBasketCurrent(state, action) {
      state.basketCurrent = state.basketCurrent + action.payload
    },
  },
});

export const { addProductToBasket, changeProductToBasket, removeProductToBasket, changeBasketCurrent } =
basketSlice.actions;

export default basketSlice.reducer;
