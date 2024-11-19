// Importing createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Initial state defines the default values of the user-related data
const initialState = {
  user: null, // No user is logged in by default
  token: null // No authentication token by default
};

// Creating the slice using createSlice
export const userSlice = createSlice({
  // Slice name, used to identify the slice in the store
  name: "user",

  // Initial state defined above
  initialState,

  // Reducers are the functions that handle state updates based on actions
  reducers: {
    
    // Reducer to set the user and token when they log in
    setLogin: (state, action) => {
      state.user = action.payload.user;  // Set the user data from the action payload
      state.token = action.payload.token;  // Set the token from the action payload
    },

    // Reducer to reset the user and token when they log out
    setLogout: (state) => {
      state.user = null;  // Clear the user data
      state.token = null;  // Clear the token
    },

    // Reducer to set listings in the state
    setListings: (state, action) => {
      state.listings = action.payload.listings;  // Update listings with the data from the action
    },

    // Reducer to update the user's trip list
    setTripList: (state, action) => {
      state.user.tripList = action.payload;  // Set the user's trip list to the data in the action payload
    },

    // Reducer to update the user's wish list
    setWishList: (state, action) => {
      state.user.wishList = action.payload;  // Set the user's wish list
    },

    // Reducer to update the user's property list (e.g., properties they own)
    setPropertyList: (state, action) => {
      state.user.propertyList = action.payload;  // Set the user's property list
    },

    // Reducer to update the user's reservation list
    setReservationList: (state, action) => {
      state.user.reservationList = action.payload;  // Set the user's reservation list
    }
  }
});

// Exporting the actions (these are the action creators that can be dispatched)
export const { 
  setLogin, 
  setLogout, 
  setListings, 
  setTripList, 
  setWishList, 
  setPropertyList, 
  setReservationList 
} = userSlice.actions;

// Exporting the reducer to be used in the store configuration
export default userSlice.reducer;
