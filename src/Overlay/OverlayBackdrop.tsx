import React from 'react';
import { StyleSheet, Pressable, Platform, PressableProps } from 'react-native';

type IOverlayCloseButtonProps = PressableProps;

const defaultStyles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    ...(Platform.OS === 'web' ? { cursor: 'default' } : {}),
  },
});

export function OverlayBackdrop({ style, ...rest }: IOverlayCloseButtonProps) {
  return (
    <Pressable
      accessible={false}
      focusable={false}
      style={StyleSheet.flatten([
        defaultStyles.wrapper,
        style,
        { backgroundColor: '#000', opacity: 0.5 },
      ])}
      {...rest}
    />
  );
}
