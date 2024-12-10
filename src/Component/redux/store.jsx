import { configureStore } from "@reduxjs/toolkit";
import productSlice from './productSlice'
import cartProduct from './cartProduct'

const store = configureStore({
  reducer:{
    cart:cartProduct,
    product:productSlice
  }
})
export default store