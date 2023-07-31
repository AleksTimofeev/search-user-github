import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersApi, ResponseUserType, ResponseUserInfoType} from "../../api/usersApi";

export const getUsersByName = createAsyncThunk(
  'users/getUsers', async (arg: { name: string }) => {
    try {
      return await usersApi.getUserByName(arg.name)
    } catch (e) {

    }
  }
)

export const getUserInfo = createAsyncThunk(
  'users/getUserInfo', async (arg: { url: string }) => {
    try {
      return await usersApi.getUserInfo(arg.url)
    } catch (e) {
      console.log(e)
    }
  }
)

const slice = createSlice({
  name: 'users',
  initialState: {
    users: {},
    usersStatus: 'idle',
    userInfoStatus: 'idle'
  } as UsersReducerInitialStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersByName.pending, (state) => {
      state.usersStatus = 'loading'
    })
    builder.addCase(getUsersByName.fulfilled, (state, action) => {
      if (action.payload) {
        state.users = action.payload
      }
      state.usersStatus = 'idle'
    })
    builder.addCase(getUserInfo.pending, (state, action) => {
      state.userInfoStatus = 'loading'
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      if (action.payload) state.userInfo = action.payload
      state.userInfoStatus = 'idle'
    })
  }
})

export const usersReducer = slice.reducer

type UsersReducerInitialStateType = {
  users: {
    incomplete_results: boolean
    items: ResponseUserType[]
    total_count: number
  }
  userInfo: UserInfoType
  usersStatus: 'idle' | 'loading' | 'failed'
  userInfoStatus: 'idle' | 'loading' | 'failed'
}

type UserInfoType = ResponseUserInfoType