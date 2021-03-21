import React from 'react';
import { Pressable, StyleSheet, PressableProps } from 'react-native';

export const OverlayBackdrop = (props: PressableProps) => {
  return (
    <Pressable
      accessibilityLabel="Close Popover"
      style={[StyleSheet.absoluteFill]}
      {...props}
    />
  );
};
