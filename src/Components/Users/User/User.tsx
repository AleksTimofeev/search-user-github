import React, {useEffect, useState} from 'react';
import styles from './User.module.scss'
import {ResponseUserType} from "../../../api/usersApi";
import {UserInfo} from "./UserInfo";
import {useAppSelector} from "../../../store/store";
import {RequestStatus} from "../../../constants/requestStatus";

type PropsType = ResponseUserType

export const User: React.FC<PropsType> = ({
                                            id, avatar_url, html_url, login, url
                                          }) => {

  const getUserInfoStatus = useAppSelector(state => state.users.userInfoStatus)
  const [showInfo, setShowInfo] = useState(false)

  const handleShowMoreInformation = () => {
    setShowInfo(true)
  }
  const handleCloseMoreInformation = () => {
    setShowInfo(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <img src={avatar_url} width='65' alt="avatar"/>
      </div>
      <div className={styles.login}><a href={html_url}>{login}</a></div>
      <div className={styles.showMore}>
        <button
          disabled={getUserInfoStatus === RequestStatus.LOADING}
          onClick={handleShowMoreInformation}
        >show more information
        </button>
      </div>
      {showInfo && <UserInfo closeInfo={handleCloseMoreInformation} url={url}/>}
    </div>
  );
}