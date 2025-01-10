import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  product: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.product.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.product.push({
          id: newItem.id,
          name: newItem.name,
          category: newItem.category,
          description: newItem.description,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
          image: newItem.image,
        });
      }

      state.totalPrice += newItem.price;
      state.totalQuantity++;
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const findItem = state.product.find((item) => item.id === id);
      if (findItem) {
        state.totalPrice -= findItem.totalPrice;
        state.totalQuantity -= findItem.quantity;
        state.product = state.product.filter((item) => item.id !== id);
      }
    
    },

    increaseQuantity(state, action) {
      const id = action.payload;
      const productIndex = state.product.findIndex((item) => item.id === id);
    
      if (productIndex !== -1) {
        const updatedProduct = { 
          ...state.product[productIndex],
          quantity: state.product[productIndex].quantity + 1,
          totalPrice: state.product[productIndex].totalPrice + state.product[productIndex].price 
        };
    
        state.product = [
          ...state.product.slice(0, productIndex),
          updatedProduct,
          ...state.product.slice(productIndex + 1)
        ];
    
        state.totalPrice += updatedProduct.price;
        state.totalQuantity++;
      }
    },
    
    decreaseQuantity(state, action) {
      const id = action.payload;
      const productIndex = state.product.findIndex((item) => item.id === id);
    
      if (productIndex !== -1) {
        const currentProduct = state.product[productIndex];
    
        if (currentProduct.quantity > 1) {
          const updatedProduct = { 
            ...currentProduct,
            quantity: currentProduct.quantity - 1,
            totalPrice: currentProduct.totalPrice - currentProduct.price
          };
    
          state.product = [
            ...state.product.slice(0, productIndex),
            updatedProduct,
            ...state.product.slice(productIndex + 1)
          ];
    
          state.totalPrice -= currentProduct.price;
          state.totalQuantity--;
        } else {
          state.product = state.product.filter((item) => item.id !== id);
          state.totalPrice -= currentProduct.price;
          state.totalQuantity--;
        }
      }
    }
    
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
