import React from 'react';
import { Modal } from 'react-native';
import { OverlayBackdrop } from './OverlayBackdrop';
import type { IOverlayProps } from '../types';
import { OverlayContainer } from './index';

export function Overlay(props: IOverlayProps) {
  const {
    isOpen,
    children,
    closeOnOutsideClick = true,
    onClose,
    mode = 'popover',
  } = props;

  const handleClose = React.useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  let Parent = ({ children }: any) => (
    <Modal visible={true} transparent>
      <OverlayBackdrop
        onPress={handleClose}
        disabled={!closeOnOutsideClick}
        onAccessibilityEscape={handleClose}
      />
      {children}
    </Modal>
  );

  // Tooltips don't shift accessibility focus
  if (mode === 'tooltip') {
    Parent = ({ children }: any) => (
      <OverlayContainer>{children}</OverlayContainer>
    );
  }

  return <Parent>{children}</Parent>;
}
