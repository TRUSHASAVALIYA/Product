import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductDetailAPI, getProductsApi } from "./productAPI";

const initialState = {
  loading: false,
  data: {},
  ProductDetail: {
    loading: false,
    data: {},
  }
}

export const getAllProducts = createAsyncThunk("product/getAllProducts", async () => {
  try {
    const response = await getProductsApi()
    if (response?.status == 200) {
      return response.data
    }
  } catch (error) {
    console.error(error.message)
  }
})

export const getProductDetail = createAsyncThunk("product/getProductDetail", async (productId) => {
  try {
    const response = await getProductDetailAPI(productId)
    if (response && response?.status == 200) {
      return response.data
    }
  } catch (error) {
    console.error(error.message)
  }
})

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true
    }).addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    }).addCase(getProductDetail.pending, (state) => {
      state.ProductDetail.loading = true
    }).addCase(getProductDetail.fulfilled, (state, action) => {
      state.ProductDetail.loading = false
      state.ProductDetail.data = action.payload
    })
  }
})

export default productSlice.reducer