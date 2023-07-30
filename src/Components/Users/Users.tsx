import React from 'react';
import styles from './Users.module.scss'
import {useAppSelector} from "../../store/store";
import {User} from "./User/User";

export const Users = () => {

  const {users, usersStatus} = useAppSelector(state => state.users)

  return (
    <div className={styles.wrapper}>
      {users.items?.map(u => (
        <div key={u.id} className={styles.listItem}>
          <User {...u} />
        </div>

      ))}
    </div>
  );
}