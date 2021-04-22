import React from 'react';
import ElementList from '../ElementList/ElementList';
import styles from './sidebar.module.scss';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.Sidebar}>
      <div className={styles.Sidebar__header}>BLOCKS</div>
      <ElementList />
    </div>
  );
};

export default Sidebar;
