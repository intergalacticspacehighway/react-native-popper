import React from 'react';
import { useOverlayPosition } from '@react-native-aria/overlays';
import { OverlayContainer } from '../Overlay';
import { ScrollView, View, Platform, Modal } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import type {
  IPopoverArrowImplProps,
  IPopoverArrowProps,
  IPopoverProps,
  IPopoverContent,
  IPopoverContentImpl,
  IScrollContentStyle,
  IArrowStyles,
} from '../types';
import { useElementByType, useKeyboardDismissable } from '../hooks';
import { OverlayBackdrop } from '../Overlay/Backdrop';

const defaultArrowHeight = 5;
const defaultArrowAspectRatio = 1030 / 638;

const Popover = (props: IPopoverProps) => {
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
  let arrowAspectRatio = 0;

  useKeyboardDismissable({
    enabled: props.isKeyboardDismissable ?? true,
    onClose: props.onClose ? props.onClose : () => {},
  });

  if (arrowElement) {
    arrowHeight = defaultArrowHeight;
    arrowAspectRatio = defaultArrowAspectRatio;
    // No custom Arrow Icon passed
    if (!arrowElement.props.children) {
      arrowHeight = arrowElement.props.height ?? defaultArrowHeight;
      arrowElement = (
        <PopoverArrow
          height={arrowHeight}
          aspectRatio={defaultArrowAspectRatio}
        >
          <ArrowSVG color={arrowElement.props.color || '#000'} />
        </PopoverArrow>
      );
    }
    // Custom Arrow
    else {
      arrowHeight = arrowElement.props.height;
      arrowAspectRatio = arrowElement.props.aspectRatio;
    }
  }

  return (
    <View
      ref={overlayRef}
      collapsable={false}
      style={[
        overlayProps.style,
        { opacity: rendered ? 1 : 0, position: 'absolute' },
      ]}
    >
      {contentElement && (
        <PopoverContentImpl
          children={contentElement.props.children}
          arrowHeight={arrowHeight}
          arrowAspectRatio={arrowAspectRatio}
          placement={placement}
          arrowProps={arrowProps}
        />
      )}
      {arrowElement && (
        <PopoverArrowImpl
          children={arrowElement.props.children}
          height={arrowHeight}
          aspectRatio={arrowAspectRatio}
          arrowProps={arrowProps}
          placement={placement}
        />
      )}
    </View>
  );
};

const PopoverContent = ({ children }: IPopoverContent) => {
  return <>{children}</>;
};

const PopoverArrow = ({ children }: IPopoverArrowProps) => {
  return <>{children}</>;
};

// This is an internal implmentation of PopoverContent
const PopoverContentImpl = (props: IPopoverContentImpl) => {
  const { placement } = props;
  let arrowWidth = props.arrowAspectRatio * props.arrowHeight;

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
  children,
  height,
  aspectRatio,
  arrowProps,
  placement,
}: IPopoverArrowImplProps) => {
  let width = aspectRatio * height;
  const additionalStyles = React.useMemo(
    () => getArrowStyles({ placement, height, width }),
    [height, width, placement]
  );

  return (
    <View style={[arrowProps.style, additionalStyles]} collapsable={false}>
      {children}
    </View>
  );
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

const ArrowSVG = ({ color }: { color: string }) => {
  return (
    <Svg
      viewBox="0 0 1030 638"
      aria-labelledby="bfsi-ant-caret-up-title"
      fill={color}
      // SVGs are focusable in rn-svg!
      // https://github.com/react-native-svg/react-native-svg/issues/1471
      //@ts-ignore
      tabIndex="-1"
    >
      <Path d="M1017 570L541 12Q530 0 515 0t-26 12L13 570q-16 19-7 43.5T39 638h952q24 0 33-24.5t-7-43.5z"></Path>
    </Svg>
  );
};

// This component just uses original Popover by wrapping it with OverlayContainer, to make sure it gets rendered in OverlayProvider
const PopoverWithOverlayContainer = (props: IPopoverProps) => {
  let overlayBackdrop = useElementByType(props.children, 'OverlayBackdrop');

  let OverlayWrapper: any = ({ children }: any) => (
    <Modal
      visible
      transparent
      // Closes popover on Back press on Android and iOS
      onRequestClose={props.onClose}
      // Closes popover on accessibility gesture
      onAccessibilityEscape={props.onClose}
    >
      {overlayBackdrop}
      {children}
    </Modal>
  );

  if (Platform.OS === 'web') {
    OverlayWrapper = OverlayContainer;
  }

  return (
    <OverlayWrapper>
      {overlayBackdrop}
      <Popover {...props} />
    </OverlayWrapper>
  );
};

PopoverWithOverlayContainer.Arrow = PopoverArrow;
PopoverWithOverlayContainer.Content = PopoverContent;
PopoverWithOverlayContainer.Backdrop = OverlayBackdrop;

export { PopoverWithOverlayContainer as Popover };
export { Popover as PlainPopover };
export { PopoverContent };
export { PopoverArrow };
