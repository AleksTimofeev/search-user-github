import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './SearchBar.module.scss'
import {useAppDispatch} from "../../store/store";
import {getUsersByName} from "../Users/usersReducer";

export const SearchBar = () => {

  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [sort, setSort] = useState('rel')

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
      dispatch(getUsersByName({name, sort}))
    }
  }

  const handleChangeSort = (e: ChangeEvent<HTMLInputElement>) => {
    setSort(e.currentTarget.value)
  }

  useEffect(() => {

  },[])

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
        <span>Сортировать по:</span>
        <label htmlFor="rel">
          релевантности
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
          количеству репозиториев &#8593;
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
          количеству репозиториев &#8595;
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
    </div>
  );
}