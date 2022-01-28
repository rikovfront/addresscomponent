import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAddresses, sendAddress } from './addressAPI';

const initialState = {
  value: '',
  list: [],
  isListVisible: false,
  status: 'idle',
};

export const addressesAsync = createAsyncThunk('address/getAll', async () => {
  const response = await fetchAddresses();
  return response.data;
});

export const sendAsync = createAsyncThunk('address/set', async (addr) => {
  const response = await sendAddress(addr);
  return response.data;
});

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    changeValue: (state, action) => {
      state.value = action.payload;
    },
    changeListVisible: (state, action) => {
      state.isListVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addressesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addressesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload;
      })
      .addCase(sendAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      });
  },
});

export const { changeValue, changeListVisible } = addressSlice.actions;

export const selectListVisible = (state) => state.address.isListVisible;

export const selectValue = (state) => state.address.value;

export const selectList = (state) =>
  state.address.list.filter((x) => x.name.toLowerCase().indexOf(state.address.value.toLowerCase()) !== -1);

export default addressSlice.reducer;
