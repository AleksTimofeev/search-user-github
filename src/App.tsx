import React from 'react';
import styles from './App.module.scss'
import {SearchBar} from "./Components/SearchBar/SearchBar";
import {Users} from "./Components/Users/Users";


function App() {
  return (
    <div className={styles.appWrapper}>
      <SearchBar />
      <Users />
    </div>
  );
}

export default App;
