import React, {useState} from 'react';
import styles from './User.module.scss'
import {ResponseUserType} from "../../../api/usersApi";
import {UserInfo} from "./UserInfo";

type PropsType = ResponseUserType

export const User: React.FC<PropsType> = ({
                                            id, avatar_url, html_url, login, url
                                          }) => {

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
          onClick={handleShowMoreInformation}
        >show more information</button>
      </div>
      {showInfo && <UserInfo closeInfo={handleCloseMoreInformation} url={url} />}
    </div>
  );
}