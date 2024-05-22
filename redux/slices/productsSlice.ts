import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
};

type FetchProductsData = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

interface ProductState {
  products: Product[];
  skip: number;
}

const initialState: ProductState = {
  products: [],
  skip: 0,
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async (offset: number) => {
  const { data } = await axios.get<FetchProductsData>(
    `https://dummyjson.com/products?limit=10&skip=${offset}&select=title,description,price,images`,
  );

  return data as FetchProductsData;
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products = state.products;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<FetchProductsData>) => {
        const newData = action.payload.products;

        state.products = [...state.products, ...newData];
        state.skip += 10;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.products = [];
        state.skip = 0;
      });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
