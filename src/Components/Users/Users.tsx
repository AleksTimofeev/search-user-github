import React, {useState} from 'react';
import styles from './Users.module.scss'
import {useAppSelector} from "../../store/store";
import {User} from "./User/User";
import {UserInfo} from "./User/UserInfo";

export const Users = () => {

  const users = useAppSelector(state => state.users.users)

  const [showInfo, setShowInfo] = useState<string | null>(null)

  const handleShowMoreInformation = (url: string) => {
    setShowInfo(url)
  }
  const handleCloseMoreInformation = () => {
    setShowInfo(null)
  }

  return (
    <div className={styles.wrapper}>
      {users.items?.map(u => (
        <div key={u.id} className={styles.listItem}>
          <User getMoreInfo={handleShowMoreInformation} {...u} />
        </div>
      ))}
      {showInfo && <UserInfo closeInfo={handleCloseMoreInformation} url={showInfo}/>}
    </div>
  );
}