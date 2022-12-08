import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cryptos: [],
  status: null,
};

export const fetchCrypto = createAsyncThunk('crypto/fetch', async () => {
  const response = await axios.get('https://api.coincap.io/v2/assets');
  return response.data;
});

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => ({
        ...state,
        status: 'pending',
      }))
      .addCase(fetchCrypto.rejected, (state) => ({
        ...state,
        status: 'rejected',
      }))
      .addCase(fetchCrypto.fulfilled, (state, { payload }) => ({
        ...state,
        status: 'fulfilled',
        cryptos: payload.data,
      }));
  },
});

export default cryptoSlice.reducer;
