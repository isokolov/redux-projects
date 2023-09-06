import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./CounterAPI";
const initialState = {
  value: 0,
  status: "idle",
};

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += parseInt(action.payload);
    },
    decrementByAmount: (state, action) => {
      state.value -= parseInt(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += parseInt(action.payload);
      });
  },
});

export const { decrement, increment, incrementByAmount, decrementByAmount } =
  counterSlice.actions;

export default counterSlice.reducer;
