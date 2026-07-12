import React from 'react';
import { Modal, ModalProps } from './Modal';

export function GenericModal(props: ModalProps) {
  return <Modal {...props} />;
}

export default GenericModal;
