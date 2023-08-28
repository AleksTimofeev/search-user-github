import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {usersReducer} from "../Components/Users/usersReducer";
import {appReducer} from "../Components/App/appReducer";


export const store = configureStore({
  reducer: {
    app: appReducer,
    users: usersReducer
  }
})

export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector