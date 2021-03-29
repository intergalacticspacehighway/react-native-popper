import React from 'react';
import { StyleSheet, Pressable, Platform, PressableProps } from 'react-native';
import { OverlayContext } from './context';

type IOverlayCloseButtonProps = PressableProps;

const defaultStyles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    ...(Platform.OS === 'web' ? { cursor: 'default' } : {}),
  },
});

export function OverlayBackdrop({ style, ...rest }: IOverlayCloseButtonProps) {
  const { onClose } = React.useContext(OverlayContext);

  return (
    <Pressable
      accessible={false}
      focusable={false}
      style={StyleSheet.flatten([defaultStyles.wrapper, style])}
      onPress={onClose}
      {...rest}
    />
  );
}
