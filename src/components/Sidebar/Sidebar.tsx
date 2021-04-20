import React from 'react';
import ElementList from '../ElementList/ElementList';
import styles from './sidebar.module.scss';

const elements = [
  {
    name: 'Label',
  },
  {
    name: 'Input',
  },
  {
    name: 'Button',
  },
];

const Sidebar: React.FC = () => {
  return (
    <div className={styles.Sidebar}>
      <div className={styles.Sidebar__header}>BLOCKS</div>
      <ElementList elements={elements} />
    </div>
  );
};

export default Sidebar;
