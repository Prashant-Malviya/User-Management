// src/store/slice/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseApiUrl } from '../../api/api';

// Define an initial state for the authentication slice
const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null, 
  expirationTime: null, 
};

// Async thunk for logging in the user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    const response = await axios.post(`${baseApiUrl}/login`, credentials);
    return response.data; 
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null; 
      state.token = null; 
      state.expirationTime = null; 
    },
    setUser: (state, action) => {
      state.user = action.payload.user; 
      state.token = action.payload.token; 
      state.expirationTime = Date.now() + 3600000; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true; 
        state.error = null; 
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false; 
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.expirationTime = Date.now() + 3600000; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.error.message; 
      });
  },
});


export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer; 