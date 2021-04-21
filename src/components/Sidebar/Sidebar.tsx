import React from 'react';
import ElementList from '../ElementList/ElementList';
import styles from './sidebar.module.scss';
import { Label, Input, Button } from '../Elements';
import { Element } from '../../context/elementContext';

const elements: Element[] = [
  {
    name: 'Label',
    JSX: Label,
  },
  {
    name: 'Input',
    JSX: Input,
  },
  {
    name: 'Button',
    JSX: Button,
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
