import React from 'react';
import ElementProvider from '../context/elementContext';
import Board from '../components/Board/Board';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './home.module.scss';

const Home: React.FC = () => {
  return (
    <ElementProvider>
      <div className={styles.Home}>
        <div className={styles.Home__board}>
          <Board />
        </div>
        <div className={styles.Home__sidebar}>
          <Sidebar />
        </div>
      </div>
    </ElementProvider>
  );
};

export default Home;
