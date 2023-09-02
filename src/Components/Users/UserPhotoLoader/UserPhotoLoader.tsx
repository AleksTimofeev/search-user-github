import React from 'react';
import styles from './UserPhotoLoader.module.scss'

export const UserPhotoLoader = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader}></span>
    </div>
  );
}