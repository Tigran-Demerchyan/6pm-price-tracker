import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addNewProduct, fetchProductByEmail, deleteById } from './productAPI';

const initialState = {
  page: { items : []},

};


export const fetchProductByEmailAsync = createAsyncThunk(
  'product/fetchProductByEmai',
  async ({email, pageNumber}) => {
    const response = await fetchProductByEmail(email, pageNumber);

    return response;
  }
);


export const addProductAsync = createAsyncThunk(
  'product/addProduct',
  async (product) => {
    const response = await addNewProduct(product);
    fetchProductByEmailAsync( { email:"", pageNumber: 0})
    return response;
  }
);


export const deleteProductAsync = createAsyncThunk(
  'product/deleteProductAsync',
  async (id) => {
    const response = await deleteById(id);
    return response;
  }
);


function refreshProducts(state, action) {
  action.asyncDispatch(fetchProductByEmailAsync({email: "", pageNumber: 0}));
}



export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },


  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByEmailAsync.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(fetchProductByEmailAsync.fulfilled, (state, action) => {


        state.page = action.payload;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {


        refreshProducts(state, action)
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {


        refreshProducts(state, action)
      })
      ;
  },
});


// export const { changePage} = productSlice.actions;

export const selectPage = (state) => state.product.page;


export default productSlice.reducer;
