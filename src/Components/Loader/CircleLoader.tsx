import React from 'react';
import styles from './CircleLoader.module.scss'

export const CircleLoader = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader}></span>
    </div>
  );
}