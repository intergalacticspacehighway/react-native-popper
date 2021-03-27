import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, View } from 'react-native';
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
    mode,
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

  let Parent = ({ children }: any) => (
    <View style={StyleSheet.absoluteFill}>
      <OverlayBackdrop onPress={handleClose} disabled={!closeOnOutsideClick} />
      <FocusScope
        contain={trapFocus}
        autoFocus={autoFocus}
        restoreFocus={restoreFocus}
      >
        {children}
      </FocusScope>
    </View>
  );

  // Tooltips don't shift focus or add a backdrop
  if (mode === 'tooltip') {
    Parent = ({ children }: any) => children;
  }

  const Modal = () => <Parent>{children}</Parent>;

  return ReactDOM.createPortal(<Modal />, document.body);
}
