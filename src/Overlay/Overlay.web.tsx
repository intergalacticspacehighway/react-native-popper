import React from 'react';
import ReactDOM from 'react-dom';
import { Animated, StyleSheet } from 'react-native';
import { useKeyboardDismissable } from '../hooks';
import { FocusScope } from '@react-native-aria/focus';
import { OverlayBackdrop } from './OverlayBackdrop';
import type { IOverlayProps } from '../types';

export function Overlay(props: IOverlayProps): any {
  const {
    isOpen,
    children,
    closeOnOutsideClick = true,
    autoFocus = true,
    restoreFocus = true,
    trapFocus = true,
    onClose,
  } = props;

  const handleClose = React.useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  useKeyboardDismissable({
    enabled: props.isKeyboardDismissable ?? true,
    onClose: props.onClose ? props.onClose : () => {},
  });

  if (!isOpen) {
    return null;
  }

  const Modal = () => (
    <Animated.View style={StyleSheet.absoluteFill}>
      <OverlayBackdrop onPress={handleClose} disabled={!closeOnOutsideClick} />
      <FocusScope
        contain={trapFocus}
        autoFocus={autoFocus}
        restoreFocus={restoreFocus}
      >
        {children}
      </FocusScope>
    </Animated.View>
  );

  return ReactDOM.createPortal(<Modal />, document.body);
}
