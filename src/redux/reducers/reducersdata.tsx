import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define the state shape
interface UserState {
  data: [];
}


const initialState: UserState = {
  data: []
};
const userdataSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    // Define a reducer to set user data
    storedata(state, action: PayloadAction<UserData>) {
      state.data = action.payload;
    },
    // Define a reducer to clear user data
  },
});

// Export the actions
export const { storedata } = userdataSlice.actions;

// Export the reducer
export default userdataSlice.reducer;
