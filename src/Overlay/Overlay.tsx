import React, { useEffect } from 'react';
import {
  Animated,
  BackHandler,
  Modal,
  StatusBar,
  StyleSheet,
} from 'react-native';
import type { IOverlayProps } from '../types';
import { OverlayContainer } from './index';
import { OverlayContext } from './context';
import { useAnimatedStyles } from '../hooks';

// This is iOS/Android only implementation. Refer Overlay.web.tsx for Web implementation
export function Overlay(props: IOverlayProps) {
  const {
    isOpen,
    children,
    onClose,
    focusable = true,
    animated = true,
    mode = 'single',
    animationEntryDuration,
    animationExitDuration,
    onRequestClose,
  } = props;

  const { styles, isExited } = useAnimatedStyles({
    animated,
    animationEntryDuration,
    animationExitDuration,
    isOpen,
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      function closePopover() {
        if (typeof onRequestClose === 'function' && isOpen) {
          onRequestClose();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [onRequestClose, isOpen]);

  if (!isOpen && isExited) {
    return null;
  }

  // If focusable we render it in RN modal so it shifts accessibility focus
  const content =
    focusable && mode === 'single' ? (
      <Modal visible={true} transparent onRequestClose={onRequestClose}>
        <Animated.View
          style={[StyleSheet.absoluteFill, styles]}
          pointerEvents="box-none"
        >
          <OverlayContext.Provider value={{ onClose }}>
            {children}
          </OverlayContext.Provider>
        </Animated.View>
      </Modal>
    ) : (
      <OverlayContainer>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles,
            { marginTop: StatusBar.currentHeight },
          ]}
          pointerEvents="box-none"
        >
          <OverlayContext.Provider value={{ onClose }}>
            {children}
          </OverlayContext.Provider>
        </Animated.View>
      </OverlayContainer>
    );

  return content;
}
