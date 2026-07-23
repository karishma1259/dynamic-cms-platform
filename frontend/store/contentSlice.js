import { createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
  name: 'content',
  initialState: { items: [], loading: false },
  reducers: {
    setContent: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setContent, setLoading } = contentSlice.actions;
export default contentSlice.reducer;
