import React from 'react';
import { Pressable, StyleSheet, PressableProps } from 'react-native';

export const OverlayBackdrop = React.forwardRef(function OverlayBackdrop(
  { style, ...rest }: PressableProps,
  ref: any
) {
  return (
    <Pressable
      style={StyleSheet.flatten([style, StyleSheet.absoluteFill])}
      {...rest}
      ref={ref}
    />
  );
});
