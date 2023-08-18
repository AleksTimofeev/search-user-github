import {getUserInfo, getUsersByName, usersReducer, UsersReducerInitialStateType} from "./usersReducer";

let initialState = {
  users: {},
  usersStatus: 'idle',
  userInfoStatus: 'idle',
  userInfo: null,
  getDataError: null
} as UsersReducerInitialStateType

beforeEach(() => {
  initialState = {
    users: {
      incomplete_results: false,
      items: [],
      total_count: 0
    },
    userInfo: null,
    usersStatus: 'idle',
    userInfoStatus: 'idle',
    getDataError: null
  }
})

const usersResp = {
  incomplete_results: true,
  items: [],
  total_count: 137
}
const userInfoResp = {
  "login": 'string',
  "id": 1,
  "node_id": 'string',
  "avatar_url": 'string',
  "gravatar_id": 'string',
  "url": 'string',
  "html_url": 'string',
  "followers_url": 'string',
  "following_url": 'string',
  "gists_url": 'string',
  "starred_url": 'string',
  "subscriptions_url": 'string',
  "organizations_url": 'string',
  "repos_url": 'string',
  "events_url": 'string',
  "received_events_url": 'string',
  "type": 'string',
  "site_admin": false,
  "name": 'string',
  "company": 'string',
  "blog": 'string',
  "location": 'string',
  "email": 'string',
  "hireable": 'string',
  "bio": 'string',
  "twitter_username": 'string',
  "public_repos": 10,
  "public_gists": 10,
  "followers": 10,
  "following": 10,
  "created_at": 'string',
  "updated_at": 'string',
}

test('get users by name', () => {
  const actionPending = getUsersByName.pending
  const newStatePending = usersReducer(initialState, actionPending)
  expect(newStatePending.usersStatus).toBe('loading')

  const action = getUsersByName.fulfilled(usersResp, '', {name: 'aleks', sort: 'rel'})
  const newState = usersReducer(initialState, action)
  expect(newState.users).toEqual(usersResp)
  expect(newState.usersStatus).toBe('idle')
})
test('get user info', () => {
  const actionPending = getUserInfo.pending
  const newStatePending = usersReducer(initialState, actionPending)
  expect(newStatePending.userInfoStatus).toBe('loading')

  const action = getUserInfo.fulfilled(userInfoResp, '', {url: 'url'})
  const newState = usersReducer(initialState, action)
  expect(newState.userInfo).toEqual(userInfoResp)
  expect(newState.userInfoStatus).toBe('idle')
})