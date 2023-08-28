import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../../types/stateTypes";
import {getUserInfo, getUsersByName} from "../Users/usersReducer";
import {RequestStatus} from "../../constants/requestStatus";


const slice = createSlice({
  name: 'app',
  initialState: {
    appStatus: RequestStatus.IDLE
  } as AppReducerInitialStateType,
  reducers: {
    changeAppStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.appStatus = action.payload
    }
  }
})

export const {changeAppStatus} = slice.actions
export const appReducer = slice.reducer

export type AppReducerInitialStateType = {
  appStatus: RequestStatusType
}