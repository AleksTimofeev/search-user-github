import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com/'
})

export const usersApi = {
  getUserByName(name: string, page: number = 1, pageSize: number = 30){
    return axiosInstance.get<UsersListType>(`search/users?q=${name}&page=${page}&per_page=${pageSize}`)
      .then(data => data.data)
  },
  getUserInfo(url: string){
    return axios.get<ResponseUserInfoType>(url)
      .then(data => data.data)
  },
  getUsersByNameDescSortByRepo(name: string, page: number = 1, pageSize: number = 30){
    return axiosInstance.get<UsersListType>(`search/users?q=${name}+sort:repositories-desc&page=${page}&per_page=${pageSize}`)
      .then(data => data.data)
  },
  getUsersByNameAscSortByRepo(name: string, page: number = 1, pageSize: number = 30){
    return axiosInstance.get<UsersListType>(`search/users?q=${name}+sort:repositories-asc&page=${page}&per_page=${pageSize}`)
      .then(data => data.data)
  },
}

export type UsersListType = {
  incomplete_results: boolean
  items: ResponseUserType[]
  total_count: number
}

export type ResponseUserType = {
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

export type ResponseUserInfoType = {
  "login": string
  "id": number
  "node_id": string
  "avatar_url": string
  "gravatar_id": string
  "url": string
  "html_url": string
  "followers_url": string
  "following_url": string
  "gists_url": string
  "starred_url": string
  "subscriptions_url": string
  "organizations_url": string
  "repos_url": string
  "events_url": string
  "received_events_url": string
  "type": string
  "site_admin": boolean
  "name": string
  "company": string
  "blog": string
  "location": string
  "email": null | string
  "hireable": null | string
  "bio": string
  "twitter_username": null | string
  "public_repos": number
  "public_gists": number
  "followers": number
  "following": number
  "created_at": string
  "updated_at": string
}