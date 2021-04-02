import React from 'react';
import ReactDOM from 'react-dom';
import { Animated, StyleSheet } from 'react-native';
import { useCloseOnOutsideClick, useKeyboardDismissable } from '../hooks';
import { FocusScope } from '@react-native-aria/focus';
import type { IOverlayProps } from '../types';
import { OverlayContext } from './context';
import { useAnimatedStyles } from '../hooks';

export function Overlay(props: IOverlayProps): any {
  let {
    isOpen,
    children,
    autoFocus = true,
    restoreFocus = true,
    trapFocus = true,
    onClose,
    isKeyboardDismissable = true,
    shouldCloseOnOutsideClick = true,
    focusable = true,
    animated = true,
    animationEntryDuration,
    animationExitDuration,
    overlayRef,
    triggerRef,
  } = props;

  const { styles, isExited } = useAnimatedStyles({
    animated,
    animationEntryDuration,
    animationExitDuration,
    isOpen,
  });

  useKeyboardDismissable({
    enabled: isKeyboardDismissable,
    onClose: onClose ? onClose : () => {},
  });

  useCloseOnOutsideClick({
    refs: [overlayRef, triggerRef],
    enabled: shouldCloseOnOutsideClick,
    onClose: onClose ? onClose : () => {},
  });

  if (!isOpen && isExited) {
    return null;
  }

  let content = (
    <OverlayContext.Provider value={{ onClose }}>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles]}
        pointerEvents="box-none"
      >
        {focusable ? (
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
      </Animated.View>
    </OverlayContext.Provider>
  );

  return ReactDOM.createPortal(content, document.body);
}
