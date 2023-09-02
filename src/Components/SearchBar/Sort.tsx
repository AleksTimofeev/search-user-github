import React, {ChangeEvent} from 'react';
import styles from './SearchBar.module.scss'

type PropsType = {
  sort: string
  changeSort: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Sort: React.FC<PropsType> = ({
  sort, changeSort
                                          }) => {
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
          onChange={changeSort}
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
          onChange={changeSort}
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
          onChange={changeSort}
        />
        <label htmlFor="desc">descending count repo &#8595;</label>
      </div>
    </div>
  );
}