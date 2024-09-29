import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  foundProducts: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    findProduct: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      
      const products = state.products.filter((product) =>
        product.title
          .toLowerCase()
          .split(' ')
          .some((word) => word.includes(searchTerm))
      );

      state.foundProducts = products.length > 0 ? products : [];
    },
  },
});

export const { setProducts, findProduct } = productSlice.actions;
export default productSlice.reducer;
