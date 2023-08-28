import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../../types/stateTypes";
import {getUserInfo, getUsersByName} from "../Users/usersReducer";
import {RequestStatus} from "../../constants/requestStatus";


const slice = createSlice({
  name: 'app',
  initialState: {
    getUsersStatus: RequestStatus.IDLE,
    getUserInfoStatus: RequestStatus.IDLE
  } as AppReducerInitialStateType,
  reducers: {
    changeGetUsersStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.getUsersStatus = action.payload
    },
    changeGetUserInfoStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.getUserInfoStatus = action.payload
    }
  }
})

export const {changeGetUsersStatus, changeGetUserInfoStatus} = slice.actions
export const appReducer = slice.reducer

export type AppReducerInitialStateType = {
  getUsersStatus: RequestStatusType
  getUserInfoStatus: RequestStatusType
}