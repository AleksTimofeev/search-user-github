import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './SearchBar.module.scss'
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getUsersByName} from "../Users/usersReducer";
import {Pagination} from "../Pagination/Pagination";
import {RequestStatus} from "../../constants/requestStatus";
import {Sort} from "./Sort";

export const SearchBar = () => {

  const dispatch = useAppDispatch()
  const usersCount = useAppSelector(state => state.users.users.total_count)
  const getUsersStatus = useAppSelector(state => state.users.usersStatus)
  const [name, setName] = useState('')
  const [sort, setSort] = useState('rel')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleSearchUser()
    }
  }

  const handleSearchUser = () => {
    if (name) {
      dispatch(getUsersByName({name, sort, page, pageSize}))
    }
  }

  const handleChangeSort = (value: string) => {
    setSort(value)
  }

  const handleChangePage = (page: number) => {
    setPage(page)
  }
  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize)
  }

  useEffect(() => {
    handleSearchUser()
  }, [sort, page, pageSize])

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Login...."
          value={name}
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
        <button
          disabled={!name || getUsersStatus === RequestStatus.LOADING}
          onClick={handleSearchUser}
        >
          search
        </button>
      </div>
      <Sort sort={sort} changeSort={handleChangeSort}/>
      <Pagination
        totalUsersCount={usersCount ? usersCount : 1}
        changeCurrentPage={handleChangePage}
        changePageSize={handleChangePageSize}
      />
    </div>
  );
}