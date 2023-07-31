import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './SearchBar.module.scss'
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getUsersByName} from "../Users/usersReducer";
import {Pagination} from "../Pagination/Pagination";

export const SearchBar = () => {

  const dispatch = useAppDispatch()
  const usersCount = useAppSelector(state => state.users.users.total_count)
  const [name, setName] = useState('')
  const [sort, setSort] = useState('rel')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.code === 'Enter'){
      handleSearchUser()
    }
  }

  const handleSearchUser = () => {
    if (name) {
      dispatch(getUsersByName({name, sort, page, pageSize}))
    }
  }

  const handleChangeSort = (e: ChangeEvent<HTMLInputElement>) => {
    setSort(e.currentTarget.value)
  }

  const handleChangePage = (page: number) => {
    setPage(page)
  }
  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize)
  }

  useEffect(() => {
    handleSearchUser()
  },[sort, page, pageSize])

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder='Введите имя пользователя.'
          value={name}
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
        <button
          disabled={!name}
          onClick={handleSearchUser}
        >
          search
        </button>
      </div>
      <div className={styles.sort}>
        <span>sort:</span>
        <label htmlFor="rel">
          relevant
          <input
            type="radio"
            id='rel'
            value='rel'
            name='rel'
            checked={'rel' === sort}
            onChange={handleChangeSort}
          />
        </label>
        <label htmlFor="asc">
          ascending count repo &#8593;
          <input
            type="radio"
            id='asc'
            value='asc'
            name='asc'
            checked={'asc' === sort}
            onChange={handleChangeSort}
          />
        </label>
        <label htmlFor="desc">
          descending count repo &#8595;
          <input
            type="radio"
            id='desc'
            value='desc'
            name='desc'
            checked={'desc' === sort}
            onChange={handleChangeSort}
          />
        </label>
      </div>
      <Pagination
        totalUsersCount={usersCount ? usersCount : 1}
        changeCurrentPage={handleChangePage}
        changePageSize={handleChangePageSize}
      />
    </div>
  );
}