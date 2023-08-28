import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersApi, ResponseUserType, ResponseUserInfoType, UsersListType} from "../../api/usersApi";
import {isAxiosError} from "axios";
import {RequestStatusType} from "../../types/stateTypes";
import {RequestStatus} from "../../constants/requestStatus";
import {changeAppStatus} from "../App/appReducer";

export const getUsersByName = createAsyncThunk<
  UsersListType,
  { name: string, sort: string, page?: number, pageSize?: number },
  { rejectValue: { message: string } }
  >('users/getUsers', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeAppStatus(RequestStatus.LOADING))
    try {
      let users
      if (arg.sort === 'rel') users = await usersApi.getUserByName(arg.name, arg.page, arg.pageSize)
      if (arg.sort === 'asc') users = await usersApi.getUsersByNameAscSortByRepo(arg.name, arg.page, arg.pageSize)
      else users = await usersApi.getUsersByNameDescSortByRepo(arg.name, arg.page, arg.pageSize)
      if (users.total_count > 0) {
        thunkAPI.dispatch(changeAppStatus(RequestStatus.SUCCEEDED))
        return users
      } else {
        thunkAPI.dispatch(changeAppStatus(RequestStatus.FAILED))
        return thunkAPI.rejectWithValue({message: 'user not found...'})
      }
    } catch (e) {
      thunkAPI.dispatch(changeAppStatus(RequestStatus.FAILED))
      if (isAxiosError(e)) {
        return thunkAPI.rejectWithValue({message: e.response?.data?.message || e.message})
      } else {
        return thunkAPI.rejectWithValue({message: 'network error!!!'})
      }
    }
  }
)

export const getUserInfo = createAsyncThunk<ResponseUserInfoType, { url: string }, { rejectValue: { message: string } }>(
  'users/getUserInfo', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeAppStatus(RequestStatus.LOADING))
    try {
      const userInfo = await usersApi.getUserInfo(arg.url)
      thunkAPI.dispatch(changeAppStatus(RequestStatus.SUCCEEDED))
      return userInfo
    } catch (e) {
      thunkAPI.dispatch(changeAppStatus(RequestStatus.FAILED))
      if (isAxiosError(e)) {
        return thunkAPI.rejectWithValue({message: e.response?.data?.message || e.message})
      } else {
        return thunkAPI.rejectWithValue({message: 'network error!!!'})
      }
    }
  }
)

const slice = createSlice({
  name: 'users',
  initialState: {
    users: {},
    usersStatus: RequestStatus.IDLE,
    userInfoStatus: RequestStatus.IDLE,
    getDataError: null
  } as UsersReducerInitialStateType,
  reducers: {
    clearNotification: (state) => {
      state.getDataError = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersByName.pending, (state) => {
      state.usersStatus = RequestStatus.LOADING
    })
    builder.addCase(getUsersByName.fulfilled, (state, action) => {
      if (action.payload) {
        state.users = action.payload
      }
      state.usersStatus = RequestStatus.IDLE
    })
    builder.addCase(getUsersByName.rejected, (state, action) => {
      if (action.payload?.message) {
        state.getDataError = action.payload.message
      }
    })
    builder.addCase(getUserInfo.pending, (state, action) => {
      state.userInfoStatus = RequestStatus.LOADING
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      if (action.payload) state.userInfo = action.payload
      state.userInfoStatus = RequestStatus.IDLE
    })
    builder.addCase(getUserInfo.rejected, (state, action) => {
      if (action.payload?.message)
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
  usersStatus: RequestStatusType
  userInfoStatus: RequestStatusType
  getDataError: null | string
}

type UserInfoType = ResponseUserInfoType