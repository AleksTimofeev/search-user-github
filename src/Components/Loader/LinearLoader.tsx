import React from 'react';
import styles from './LinearLoader.module.scss'

export const LinearLoader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.linearActivity}>
        <div className={styles.indeterminate}></div>
      </div>
    </div>

  );
}