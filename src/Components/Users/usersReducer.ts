import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersApi, ResponseUserType, ResponseUserInfoType, UsersListType} from "../../api/usersApi";
import {isAxiosError} from "axios";

export const getUsersByName = createAsyncThunk<
  UsersListType, {name: string, sort: string, page?: number, pageSize?: number }, {rejectValue: {message: string}}
  >('users/getUsers', async (arg, thunkAPI) => {
    try {
      let users
      if(arg.sort === 'rel') users = await usersApi.getUserByName(arg.name, arg.page, arg.pageSize)
      if(arg.sort === 'asc') users = await usersApi.getUsersByNameAscSortByRepo(arg.name, arg.page, arg.pageSize)
      else users = await usersApi.getUsersByNameDescSortByRepo(arg.name, arg.page, arg.pageSize)
      if(users.total_count > 0){
        return users
      }
      else {
        return thunkAPI.rejectWithValue({message: 'user not found...'})
      }
    } catch (e) {
      console.log(e)
      if(isAxiosError(e)){
        return thunkAPI.rejectWithValue({message: e.response?.data?.message || e.message})
      }else{
        return thunkAPI.rejectWithValue({message: 'network error!!!'})
      }
    }
  }
)

export const getUserInfo = createAsyncThunk<ResponseUserInfoType, {url: string}, {rejectValue: {message: string}}>(
  'users/getUserInfo', async (arg, thunkAPI) => {
    try {
      return await usersApi.getUserInfo(arg.url)
    } catch (e) {
      if(isAxiosError(e)){
        return thunkAPI.rejectWithValue({message: e.response?.data?.message || e.message})
      }else{
        return thunkAPI.rejectWithValue({message: 'network error!!!'})
      }
    }
  }
)

const slice = createSlice({
  name: 'users',
  initialState: {
    users: {},
    usersStatus: 'idle',
    userInfoStatus: 'idle',
    getDataError: null
  } as UsersReducerInitialStateType,
  reducers: {
    clearNotification: (state) => {
      state.getDataError = null
    }
  },
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
    builder.addCase(getUsersByName.rejected, (state, action) => {
      if (action.payload?.message){
        state.getDataError = action.payload.message
      }
    })
    builder.addCase(getUserInfo.pending, (state, action) => {
      state.userInfoStatus = 'loading'
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      if (action.payload) state.userInfo = action.payload
      state.userInfoStatus = 'idle'
    })
    builder.addCase(getUserInfo.rejected, (state, action) => {
      if(action.payload?.message)
        state.getDataError = action.payload.message
    })
  }
})

export const {clearNotification} = slice.actions
export const usersReducer = slice.reducer

export type UsersReducerInitialStateType = {
  users: {
    incomplete_results: boolean
    items: ResponseUserType[]
    total_count: number
  }
  userInfo: UserInfoType | null
  usersStatus: 'idle' | 'loading' | 'failed'
  userInfoStatus: 'idle' | 'loading' | 'failed'
  getDataError: null | string
}

type UserInfoType = ResponseUserInfoType