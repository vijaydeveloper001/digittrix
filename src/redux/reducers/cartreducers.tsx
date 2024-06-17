import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state shape
interface userCart {
  data: [];
}


const initialState: userCart = {
  data: []
};
const userCartData = createSlice({
  name: 'userCart',
  initialState,
  reducers: {
    // Define a reducer to set user data
    userCart(state, action: PayloadAction<userCart>) {
      state.data = action.payload;
    },
  },
});

// Export the actions
export const { userCart } = userCartData.actions;

// Export the reducer
export default userCartData.reducer;
