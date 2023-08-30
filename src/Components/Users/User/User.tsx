import React from 'react';
import styles from './User.module.scss'
import {ResponseUserType} from "../../../api/usersApi";
import {useAppSelector} from "../../../store/store";
import {RequestStatus} from "../../../constants/requestStatus";

type PropsType = {
  getMoreInfo: (url: string) => void
} & ResponseUserType

export const User: React.FC<PropsType> = ({
                                            id, avatar_url, html_url, login, url, getMoreInfo
                                          }) => {

  const getUserInfoStatus = useAppSelector(state => state.users.userInfoStatus)

  const handleShowMoreInformation = () => {
    getMoreInfo(url)
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
    </div>
  );
}