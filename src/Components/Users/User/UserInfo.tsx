import React, {useEffect} from 'react';
import styles from './User.module.scss'
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {getUserInfo} from "../usersReducer";

type PropsType = {
  closeInfo: () => void
  url: string
}

export const UserInfo: React.FC<PropsType> = ({closeInfo, url}) => {

  const userInfo = useAppSelector(state => state.users.userInfo)
  const userInfoStatus = useAppSelector(state => state.users.userInfoStatus)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    closeInfo()
  }

  useEffect(() => {
    dispatch(getUserInfo({url}))
  }, [])

  return (
    <div className={styles.userInfo}>
      <button onClick={handleClose}>X</button>
      {userInfoStatus === 'idle' && userInfo && <>
        {/*<button onClick={handleClose}>X</button>*/}
        <div className={styles.header}>
          <img src={userInfo.avatar_url} width='100' alt="img"/>
          <div className={styles.title}>
            <h3>{userInfo.login}</h3>
            <a href={userInfo.html_url}>github</a>
          </div>
        </div>
        <span>location - {userInfo.location}</span>
        <span>email - {userInfo.email}</span>
        <span>company - {userInfo.company}</span>
        <span>followers - {userInfo.followers}</span>
        <span>public repos - {userInfo.public_repos}</span>
      </>}
    </div>
  );
}