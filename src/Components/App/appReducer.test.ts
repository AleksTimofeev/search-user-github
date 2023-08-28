import {appReducer, AppReducerInitialStateType, changeGetUserInfoStatus, changeGetUsersStatus} from "./appReducer";
import {getUsersByName} from "../Users/usersReducer";
import {RequestStatus} from "../../constants/requestStatus";


let state = {} as AppReducerInitialStateType

beforeEach(() => {
  state = {
    getUsersStatus: RequestStatus.IDLE,
    getUserInfoStatus: RequestStatus.IDLE
  }
})

test('change status get users', () => {

  const action1 = changeGetUsersStatus(RequestStatus.SUCCEEDED)
  const newState1 = appReducer(state, action1)
  expect(state.getUsersStatus).toBe(RequestStatus.IDLE)
  expect(newState1.getUsersStatus).toBe(RequestStatus.SUCCEEDED)

  const action2 = changeGetUsersStatus(RequestStatus.FAILED)
  const newState2 = appReducer(newState1, action2)
  expect(newState2.getUsersStatus).toBe(RequestStatus.FAILED)

})

test('change status get users info', () => {

  const action1 = changeGetUserInfoStatus(RequestStatus.SUCCEEDED)
  const newState1 = appReducer(state, action1)
  expect(state.getUserInfoStatus).toBe(RequestStatus.IDLE)
  expect(newState1.getUserInfoStatus).toBe(RequestStatus.SUCCEEDED)

  const action2 = changeGetUserInfoStatus(RequestStatus.FAILED)
  const newState2 = appReducer(newState1, action2)
  expect(newState2.getUserInfoStatus).toBe(RequestStatus.FAILED)
})