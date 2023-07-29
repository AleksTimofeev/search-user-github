import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersApi, UsersListType} from "../../api/usersApi";

export const getUsersByName = createAsyncThunk(
  'users/getUsers', async (arg: {name: string}) => {
    try {
      return await usersApi.getUserByName(arg.name)
    }catch (e) {

    }
  }
)

const slice = createSlice({
  name: 'users',
  initialState: {
    users: {},
    usersStatus: 'idle'
  } as UsersReducerInitialStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersByName.pending, (state) => {
      state.usersStatus = 'loading'
    })
    builder.addCase(getUsersByName.fulfilled, (state, action) => {
      if(action.payload){
        state.users = action.payload
      }
      state.usersStatus = 'idle'
    })
  }
})

export const usersReducer = slice.reducer

type UsersReducerInitialStateType = {
  users: UsersListType
  usersStatus: 'idle' | 'loading' | 'failed'
}