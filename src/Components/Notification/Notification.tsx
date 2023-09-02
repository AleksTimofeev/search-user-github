import React, {useEffect} from 'react';
import styles from './Notification.module.scss'
import {useAppDispatch} from "../../store/store";
import {clearNotification} from "../Users/usersReducer";

type PropsType = {
  type: 'success' | 'info' | 'warning' | 'error'
  text: string
}

export const Notification: React.FC<PropsType> = ({type, text}) => {

  const dispatch = useAppDispatch()

  const style = `${styles.wrapper} ${styles[type]}`

  useEffect(() => {
    setTimeout(() => dispatch(clearNotification()), 3000)
  }, [])

  return (
    <>
      <div className={style}>
        <span>{text}</span>
      </div>
    </>
  );
}