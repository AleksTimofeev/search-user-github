import React from 'react';
import styles from './App.module.scss'
import {SearchBar} from "../SearchBar/SearchBar";
import {Users} from "../Users/Users";
import {Notification} from "../Notification/Notification";
import {useAppSelector} from "../../store/store";
import {Loader} from "../Loader/Loader";
import {RequestStatus} from "../../constants/requestStatus";


function App() {

  const error = useAppSelector(state => state.users.getDataError)
  const appStatus = useAppSelector(state => state.app.appStatus)

  return (
    <div className={styles.appWrapper}>
      {appStatus === RequestStatus.LOADING && <Loader/>}
      <SearchBar />
      <Users />
      {error && <Notification type={'error'} text={error}/>}
    </div>
  );
}

export default App;
