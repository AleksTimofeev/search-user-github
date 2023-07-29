import axios from "axios";


const axiosInstance = axios.create({
  baseURL: 'https://api.github.com/'
})

export const usersApi = {
  getUserByName(name: string){
    return axiosInstance.get(`search/users?q=${name}`)
      .then(data => data.data)
  },
  getUsersByNameDescSortByRepo(name: string){
    return axiosInstance.get(`search/users?q=${name}+sort:repositories-desc`)
      .then(data => console.log(data.data))
  },
  getUsersByNameAscSortByRepo(name: string){
    return axiosInstance.get(`search/users?q=${name}+sort:repositories-asc`)
      .then(data => console.log(data.data))
  },
}
