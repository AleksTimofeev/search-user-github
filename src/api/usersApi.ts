import axios from "axios";


const axiosInstance = axios.create({
  baseURL: 'https://api.github.com/'
})

export const usersApi = {
  getUserByName(name: string){
    return axiosInstance.get<UsersListType>(`search/users?q=${name}`)
      .then(data => data.data)
  },
  getUsersByNameDescSortByRepo<UsersListType>(name: string){
    return axiosInstance.get(`search/users?q=${name}+sort:repositories-desc`)
      .then(data => console.log(data.data))
  },
  getUsersByNameAscSortByRepo<UsersListType>(name: string){
    return axiosInstance.get(`search/users?q=${name}+sort:repositories-asc`)
      .then(data => console.log(data.data))
  },
}

export type UsersListType = {
  incomplete_results: boolean
  items: UserType[]
  total_count: number
}

export type UserType = {
  avatar_url: string
  events_url: string
  followers_url: string
  following_url: string
  gists_url: string
  gravatar_id: string
  html_url: string
  id: number
  login: string
  node_id: string
  organizations_url: string
  received_events_url: string
  repos_url: string
  score: number
  site_admin: boolean
  starred_url: string
  subscriptions_url: string
  type: string
  url: string
}