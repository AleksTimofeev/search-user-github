import {createSlice} from "@reduxjs/toolkit";
import {UsersListType} from "../../api/usersApi";


const slice = createSlice({
  name: 'users',
  initialState: {
    users: {},
    usersStatus: 'idle'
  } as UsersReducerInitialStateType,
  reducers: {},
  extraReducers: (builder) => {

  }
})

export const usersReducer = slice.reducer

type UsersReducerInitialStateType = {
  users: UsersListType
  usersStatus: 'idle' | 'loading' | 'failed'
}