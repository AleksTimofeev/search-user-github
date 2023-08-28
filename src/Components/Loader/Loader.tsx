import React from 'react';
import styles from './Loader.module.scss'

export const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.linearActivity}>
        <div className={styles.indeterminate}></div>
      </div>
    </div>

  );
}