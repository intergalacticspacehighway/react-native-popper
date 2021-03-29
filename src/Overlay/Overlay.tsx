import React from 'react';
import { Modal } from 'react-native';
import type { IOverlayProps } from '../types';
import { OverlayContainer } from './index';
import { OverlayContext } from './context';

export function Overlay(props: IOverlayProps) {
  const { isOpen, children, onClose, mode = 'popover' } = props;

  if (!isOpen) {
    return null;
  }

  const content =
    mode === 'popover' ? (
      <Modal visible={true} transparent>
        {children}
      </Modal>
    ) : (
      <OverlayContainer>{children}</OverlayContainer>
    );

  return (
    <OverlayContext.Provider value={{ onClose }}>
      {content}
    </OverlayContext.Provider>
  );
}
