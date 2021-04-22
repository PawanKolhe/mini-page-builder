import { InlineIcon } from '@iconify/react-with-api';
import React, { FormEvent, useEffect, useState } from 'react';
import FormButton from '../FormButton/FormButton';
import FormInput from '../FormInput/FormInput';
import styles from './modal.module.scss';
import { ElementConfig, useApp } from '../../context/appContext';

type Props = {
  open: boolean;
  closeModal: () => void;
  updateBoardElement: (elementId: string, elementConfig: ElementConfig) => void;
};

const Modal: React.FC<Props> = ({ open, closeModal, updateBoardElement }) => {
  const { selectedBoardElementItem } = useApp();
  const [formState, _setFormState] = useState<ElementConfig>({
    text: '',
    x: '',
    y: '',
    fontSize: '',
    fontWeight: '',
  });

  const setFormState = (name: string, value: string) => {
    _setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    // Set initial form values
    if (selectedBoardElementItem) {
      _setFormState({
        text: selectedBoardElementItem.config.text,
        x: selectedBoardElementItem.config.x,
        y: selectedBoardElementItem.config.y,
        fontSize: selectedBoardElementItem.config.fontSize,
        fontWeight: selectedBoardElementItem.config.fontWeight,
      });
    }
  }, [selectedBoardElementItem]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateBoardElement(selectedBoardElementItem.id, formState);
  };

  return (
    <div className={`${styles.Modal} ${open ? styles.Modal__open : ''}`}>
      <div className={styles.Modal__overlay}>
        <div className={styles.Modal__content}>
          <div className={styles.Modal__header}>
            <div className={styles.Modal__headerTitle}>Edit Label</div>
            <button type="button" className={styles.Modal__headerCloseButton} onClick={closeModal}>
              <InlineIcon icon="uil:times" />
            </button>
          </div>

          <div className={styles.Modal__body}>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.Modal__inputs}>
                <FormInput
                  id="text"
                  label="Text"
                  value={formState.text}
                  onChange={(value) => setFormState('text', value)}
                />
                <FormInput id="x" label="X" value={formState.x} onChange={(value) => setFormState('x', value)} />
                <FormInput id="y" label="Y" value={formState.y} onChange={(value) => setFormState('y', value)} />
                <FormInput
                  id="fontSize"
                  label="Font Size"
                  value={formState.fontSize}
                  onChange={(value) => setFormState('fontSize', value)}
                />
                <FormInput
                  id="fontWeight"
                  label="Font Weight"
                  value={formState.fontWeight}
                  onChange={(value) => setFormState('fontWeight', value)}
                />
              </div>
              <div className={styles.Modal__actionButtons}>
                <FormButton text="Save Changes" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
