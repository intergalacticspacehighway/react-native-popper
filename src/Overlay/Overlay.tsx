import React from 'react';
import { Modal } from 'react-native';
import type { IOverlayProps } from '../types';
import { OverlayContainer } from './index';
import { OverlayContext } from './context';

// This is iOS/Android only implementation. Refer Overlay.web.tsx for Web implementation
export function Overlay(props: IOverlayProps) {
  const { isOpen, children, onClose, focusable = true } = props;

  if (!isOpen) {
    return null;
  }

  // If focusable we render it in RN modal so it shifts accessibility focus
  const content = focusable ? (
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
