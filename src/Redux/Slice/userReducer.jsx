import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
}


const userReducerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    userLogin: (state, action) => {
      state.user = action.payload
    }
    ,
    userLogout: (state) => {
      state.user = null;
    }

  }

});


export const selectUser = (state) => state.user;

export const { userLogin, userLogout } = userReducerSlice.actions;

export default userReducerSlice.reducer;