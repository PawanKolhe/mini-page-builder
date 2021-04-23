import { InlineIcon } from '@iconify/react-with-api';
import React, { FormEvent, useEffect, useState } from 'react';
import FormButton from '../FormButton/FormButton';
import FormInput from '../FormInput/FormInput';
import styles from './modal.module.scss';
import { Element, ElementConfig } from '../../context/appContext';

type Props = {
  open: boolean;
  closeModal: () => void;
  onElementSave: (elementId: string, elementConfig: ElementConfig) => void;
  onNewElementSave: (elementConfig: ElementConfig) => void;
  selectedElement: Element | null;
  initialElement: Element | null;
};

const Modal: React.FC<Props> = ({
  open,
  closeModal,
  onElementSave,
  onNewElementSave,
  selectedElement,
  initialElement,
}) => {
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
    if (initialElement) {
      _setFormState({
        text: initialElement.config.text,
        x: initialElement.config.x,
        y: initialElement.config.y,
        fontSize: initialElement.config.fontSize,
        fontWeight: initialElement.config.fontWeight,
      });
    } else if (selectedElement) {
      _setFormState({
        text: selectedElement.config.text,
        x: selectedElement.config.x,
        y: selectedElement.config.y,
        fontSize: selectedElement.config.fontSize,
        fontWeight: selectedElement.config.fontWeight,
      });
    } else {
      _setFormState({
        text: '',
        x: '',
        y: '',
        fontSize: '',
        fontWeight: '',
      });
    }
  }, [selectedElement, initialElement]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedElement) {
      onElementSave(selectedElement.id, formState);
    } else {
      onNewElementSave(formState);
    }
  };

  const getModalTitle = () => {
    if (initialElement) {
      return `Add ${initialElement.elementType}`;
    }
    if (selectedElement) {
      return `Edit ${selectedElement.elementType}`;
    }
    return '';
  };

  return (
    <div className={`${styles.Modal} ${open ? styles.Modal__open : ''}`}>
      <div className={styles.Modal__overlay}>
        <div className={styles.Modal__content} tabIndex={-1}>
          <div className={styles.Modal__header}>
            <div className={styles.Modal__headerTitle}>{getModalTitle()}</div>
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
                <FormInput
                  type="number"
                  id="x"
                  label="X"
                  value={formState.x}
                  onChange={(value) => setFormState('x', value)}
                />
                <FormInput
                  type="number"
                  id="y"
                  label="Y"
                  value={formState.y}
                  onChange={(value) => setFormState('y', value)}
                />
                <FormInput
                  type="number"
                  id="fontSize"
                  label="Font Size"
                  value={formState.fontSize}
                  onChange={(value) => setFormState('fontSize', value)}
                  min={0}
                />
                <FormInput
                  type="number"
                  id="fontWeight"
                  label="Font Weight"
                  value={formState.fontWeight}
                  onChange={(value) => setFormState('fontWeight', value)}
                  step={100}
                  min={100}
                  max={900}
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
