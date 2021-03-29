import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, View } from 'react-native';
import { useKeyboardDismissable } from '../hooks';
import { FocusScope } from '@react-native-aria/focus';
import type { IOverlayProps } from '../types';
import { OverlayContext } from './context';

export function Overlay(props: IOverlayProps): any {
  const {
    isOpen,
    children,
    autoFocus = true,
    restoreFocus = true,
    trapFocus = true,
    onClose,
    isKeyboardDismissable = true,
    mode = 'popover',
  } = props;

  useKeyboardDismissable({
    enabled: isKeyboardDismissable,
    onClose: onClose ? onClose : () => {},
  });

  if (!isOpen) {
    return null;
  }

  let content = (
    <OverlayContext.Provider value={{ onClose }}>
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {mode === 'popover' ? (
          <FocusScope
            contain={trapFocus}
            autoFocus={autoFocus}
            restoreFocus={restoreFocus}
          >
            {children}
          </FocusScope>
        ) : (
          children
        )}
      </View>
    </OverlayContext.Provider>
  );

  return ReactDOM.createPortal(content, document.body);
}
