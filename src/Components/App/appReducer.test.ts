import {appReducer, AppReducerInitialStateType, changeAppStatus} from "./appReducer";
import {getUsersByName} from "../Users/usersReducer";
import {RequestStatus} from "../../constants/requestStatus";


let state = {} as AppReducerInitialStateType

beforeEach(() => {
  state = {
    appStatus: RequestStatus.IDLE
  }
})

test('change status get users', () => {

  const action1 = changeAppStatus(RequestStatus.SUCCEEDED)
  const newState1 = appReducer(state, action1)
  expect(state.appStatus).toBe(RequestStatus.IDLE)
  expect(newState1.appStatus).toBe(RequestStatus.SUCCEEDED)

  const action2 = changeAppStatus(RequestStatus.FAILED)
  const newState2 = appReducer(newState1, action2)
  expect(newState2.appStatus).toBe(RequestStatus.FAILED)

})