import React, {ChangeEvent} from 'react';
import styles from './SearchBar.module.scss'

type PropsType = {
  sort: string
  changeSort: (value: string) => void
}

export const Sort: React.FC<PropsType> = ({
  sort, changeSort
                                          }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSort(e.currentTarget.value)
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeSort(e.currentTarget.value)
  }

  return (
    <div className={styles.sort}>
      <div className={styles.checkboxContainer}>
        <input
          className={styles.checkbox}
          type="radio"
          id='rel'
          value='rel'
          name='rel'
          checked={'rel' === sort}
          onChange={handleChange}
        />
        <label htmlFor="rel">relevant</label>
      </div>
      <div className={styles.checkboxContainer}>
        <input
          type="radio"
          id='asc'
          value='asc'
          name='asc'
          checked={'asc' === sort}
          onChange={handleChange}
        />
        <label htmlFor="asc">ascending count repo &#8593;</label>
      </div>
      <div className={styles.checkboxContainer}>
        <input
          type="radio"
          id='desc'
          value='desc'
          name='desc'
          checked={'desc' === sort}
          onChange={handleChange}
        />
        <label htmlFor="desc">descending count repo &#8595;</label>
      </div>
      <div className={styles.sortSelect}>
        <span>Sort:</span>
      <select name="sort" value={sort} onChange={handleSelectChange}>
        <option value="" defaultValue="" disabled></option>
        <option value="rel">rel</option>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>
      </div>
    </div>
  );
}