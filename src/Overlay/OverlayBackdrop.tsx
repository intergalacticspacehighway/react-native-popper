import React from 'react';
import type { PressableProps } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';
import { useKeyboardDismissable } from '../hooks';

type IOverlayBackdropProps = {
  closeOnEscape?: boolean;
  onBackdropPress?: () => void;
} & PressableProps;

export const OverlayBackdrop = (props: IOverlayBackdropProps) => {
  useKeyboardDismissable({
    enabled: props.closeOnEscape,
    onClose: props.onBackdropPress ? props.onBackdropPress : () => {},
  });

  return (
    <Pressable
      style={StyleSheet.absoluteFill}
      {...props}
      //   accessibilityLabel="Close overlay"
    />
  );
};
