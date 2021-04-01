import React from 'react';
import { Animated, Modal, StatusBar, StyleSheet } from 'react-native';
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
    animationEntryDuration,
    animationExitDuration,
  } = props;

  const { styles, isExited } = useAnimatedStyles({
    animated,
    animationEntryDuration,
    animationExitDuration,
    isOpen,
  });

  if (!isOpen && isExited) {
    return null;
  }

  // If focusable we render it in RN modal so it shifts accessibility focus
  const content = focusable ? (
    <Modal visible={true} transparent>
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
