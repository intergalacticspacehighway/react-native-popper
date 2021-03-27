import React from 'react';
import { useOverlayPosition } from '@react-native-aria/overlays';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import type {
  IPopoverArrowImplProps,
  IPopoverArrowProps,
  IPopoverProps,
  IPopoverContentImpl,
  IScrollContentStyle,
  IArrowStyles,
  IPopoverContent,
} from '../types';
import { Overlay } from '../Overlay/Overlay';
import { useControllableState, useElementByType } from '../hooks';

const defaultArrowHeight = 10;
const defaultArrowWidth = 16;

const PopoverImpl = (
  props: IPopoverProps & { triggerRef: any; onClose: any }
) => {
  const overlayRef = React.useRef(null);

  const { overlayProps, rendered, arrowProps, placement } = useOverlayPosition({
    targetRef: props.triggerRef,
    overlayRef,
    shouldFlip: props.shouldFlip,
    crossOffset: props.crossOffset,
    isOpen: true,
    offset: props.offset,
    placement: props.placement,
    containerPadding: 0,
    onClose: props.onClose,
    shouldOverlapWithTrigger: props.shouldOverlapWithTrigger,
  });

  let arrowElement: any = useElementByType(props.children, 'PopoverArrow');
  let contentElement: any = useElementByType(props.children, 'PopoverContent');

  let arrowHeight = 0;
  let arrowWidth = 0;

  if (arrowElement) {
    arrowHeight = arrowElement.props.height ?? defaultArrowHeight;
    arrowWidth = arrowElement.props.width ?? defaultArrowWidth;
  }

  const overlayStyle = React.useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          ...overlayProps.style,
          opacity: rendered ? 1 : 0,
          position: 'absolute',
        },
      }),
    [rendered, overlayProps.style]
  );

  return (
    <View ref={overlayRef} collapsable={false} style={overlayStyle.overlay}>
      {contentElement && (
        <PopoverContentImpl
          children={contentElement}
          arrowHeight={arrowHeight}
          arrowWidth={arrowWidth}
          placement={placement}
          arrowProps={arrowProps}
        />
      )}
      {arrowElement && (
        <PopoverArrowImpl
          {...arrowElement.props}
          height={arrowHeight}
          width={arrowWidth}
          arrowProps={arrowProps}
          placement={placement}
        />
      )}
    </View>
  );
};

// This is an internal implmentation of PopoverContent
const PopoverContentImpl = (props: IPopoverContentImpl) => {
  const { placement } = props;
  let arrowWidth = props.arrowWidth;

  const scrollContainerStyle = React.useMemo(
    () =>
      getScrollContentStyle({
        placement,
        arrowHeight: props.arrowHeight,
        arrowWidth,
      }),
    [props.arrowHeight, arrowWidth, placement]
  );

  return (
    <ScrollView contentContainerStyle={scrollContainerStyle}>
      {props.children}
    </ScrollView>
  );
};

// This is an internal implementation of PopoverArrow
const PopoverArrowImpl = ({
  height,
  width,
  arrowProps,
  placement,
  ...rest
}: IPopoverArrowImplProps) => {
  const additionalStyles = React.useMemo(
    () => getArrowStyles({ placement, height, width }),
    [placement, height, width]
  );

  let triangleStyle: ViewStyle = React.useMemo(
    () => ({
      position: 'absolute',
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: width / 2,
      borderRightWidth: width / 2,
      borderBottomWidth: height,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: rest.color,
    }),
    [width, height, rest.color]
  );

  let arrowStyles = React.useMemo(
    () => [triangleStyle, additionalStyles, arrowProps.style, rest.style],
    [triangleStyle, additionalStyles, arrowProps.style, rest.style]
  );

  return <View style={arrowStyles}></View>;
};

const getArrowStyles = (props: IArrowStyles) => {
  let additionalStyles: any = {
    transform: [],
    position: 'absolute',
    height: props.height,
    width: props.width,
    justifyContent: 'center',
    alignItems: 'center',
  };

  if (props.placement === 'top' && props.width) {
    additionalStyles.transform.push({ translateX: -props.width / 2 });
    additionalStyles.transform.push({ rotate: '180deg' });
    additionalStyles.bottom = 0;
  }

  // No rotation is needed in bottom as arrow is already pointing top!
  // additionalStyles.transform.push({ rotate: '-180deg' });
  if (props.placement === 'bottom' && props.width) {
    additionalStyles.transform.push({ translateX: -props.width / 2 });
    additionalStyles.top = 0;
  }

  if (props.placement === 'left' && props.height) {
    additionalStyles.transform.push({ translateY: -props.height / 2 });
    additionalStyles.transform.push({ rotate: '90deg' });
    additionalStyles.right = 0;
  }

  if (props.placement === 'right' && props.height) {
    additionalStyles.transform.push({ translateY: -props.height / 2 });
    additionalStyles.transform.push({ rotate: '-90deg' });
    additionalStyles.left = 0;
  }

  return additionalStyles;
};

const getScrollContentStyle = ({
  placement,
  arrowHeight,
}: IScrollContentStyle) => {
  if (placement === 'top') {
    return { marginBottom: arrowHeight };
  }

  if (placement === 'bottom') {
    return { marginTop: arrowHeight };
  }

  if (placement === 'left') {
    return { marginRight: arrowHeight };
  }

  if (placement === 'right') {
    return { marginLeft: arrowHeight };
  }

  return {};
};

// This component just uses original Popover by wrapping it with OverlayContainer, to make sure it gets rendered in OverlayProvider
const PopoverWithOverlayContainer = (props: IPopoverProps) => {
  let triggerRef = React.useRef<any>(null);

  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: props.defaultIsOpen,
    value: props.isOpen,
    onChange: props.onChange,
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  let triggerElem = null;

  // Received a trigger ref
  if (props.trigger.hasOwnProperty('current')) {
    // @ts-ignore
    triggerRef = props.trigger;
  }
  // Received a trigger element
  else if (React.isValidElement(props.trigger)) {
    triggerElem = React.cloneElement(props.trigger, {
      ref: triggerRef,
      onPress: toggle,
    });
  } else {
    console.warn(
      `Popover: Invalid 'trigger' prop received, please pass a valid ReactElement or a Ref`
    );
  }

  return (
    <>
      {triggerElem}
      <Overlay
        isOpen={isOpen}
        closeOnOutsideClick={props.closeOnOutsideClick}
        onClose={handleClose}
        isKeyboardDismissable={props.isKeyboardDismissable}
      >
        <PopoverImpl {...props} onClose={handleClose} triggerRef={triggerRef} />
      </Overlay>
    </>
  );
};

export const PopoverArrow = (_props: IPopoverArrowProps) => {
  return <></>;
};

const PopoverContent = ({ children }: IPopoverContent) => {
  return <>{children}</>;
};

PopoverArrow.displayName = 'PopoverArrow';
PopoverContent.displayName = 'PopoverContent';

PopoverWithOverlayContainer.Content = PopoverContent;
PopoverWithOverlayContainer.Arrow = PopoverArrow;

export { PopoverWithOverlayContainer as Popover };
