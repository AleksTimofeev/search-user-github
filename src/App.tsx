import React from 'react';
import styles from './App.module.scss'
import {SearchBar} from "./Components/SearchBar/SearchBar";


function App() {
  return (
    <div className={styles.appWrapper}>
      <SearchBar />
    </div>
  );
}

export default App;
