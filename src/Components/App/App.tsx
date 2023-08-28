import React from 'react';
import styles from './App.module.scss'
import {SearchBar} from "../SearchBar/SearchBar";
import {Users} from "../Users/Users";
import {Notification} from "../Notification/Notification";
import {useAppSelector} from "../../store/store";


function App() {

  const error = useAppSelector(state => state.users.getDataError)

  return (
    <div className={styles.appWrapper}>
      <SearchBar />
      <Users />
      {error && <Notification type={'error'} text={error}/>}
    </div>
  );
}

export default App;
