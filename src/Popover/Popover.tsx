import React from 'react';
import { useOverlayPosition } from '@react-native-aria/overlays';
import { ScrollView, View } from 'react-native';
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

const [defaultArrowHeight, defaultArrowWidth] = [5, 10];

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
    shouldOverlapWithTrigger: props.shouldOverlapWithTrigger,
  });

  let arrowElement: any;
  let contentElement: any;

  React.Children.forEach(props.children, (child) => {
    //@ts-ignore
    if (child.type.name === 'PopoverContent') {
      contentElement = child;
    }
    //@ts-ignore
    if (child.type.name === 'PopoverArrow') {
      arrowElement = child;
    }
  });

  // Use default ArrowSVG if no custom arrow is used but <Popover.Arrow /> is present
  if (arrowElement && !arrowElement.props.children) {
    arrowElement = (
      <PopoverArrow
        height={arrowElement.props.height ?? defaultArrowHeight}
        width={arrowElement.props.width ?? defaultArrowWidth}
      >
        <ArrowSVG color={arrowElement.props.color || '#000'} />
      </PopoverArrow>
    );
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
          arrowHeight={
            arrowElement ? arrowElement.props.height ?? defaultArrowHeight : 0
          }
          arrowWidth={
            arrowElement ? arrowElement.props.width ?? defaultArrowWidth : 0
          }
          placement={placement}
          arrowProps={arrowProps}
        />
      )}
      {arrowElement && (
        <PopoverArrowImpl
          children={arrowElement.props.children}
          height={arrowElement.props.height ?? defaultArrowHeight}
          width={arrowElement.props.width ?? defaultArrowWidth}
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

  const scrollContainerStyle = React.useMemo(
    () =>
      getScrollContentStyle({
        placement,
        arrowHeight: props.arrowHeight,
        arrowWidth: props.arrowWidth,
      }),
    [props.arrowHeight, props.arrowWidth, placement]
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
  width,
  arrowProps,
  placement,
}: IPopoverArrowImplProps) => {
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
  arrowWidth,
}: IScrollContentStyle) => {
  if (placement === 'top') {
    return { marginBottom: arrowHeight };
  }

  if (placement === 'bottom') {
    return { marginTop: arrowHeight };
  }

  if (placement === 'left') {
    return { marginRight: arrowWidth };
  }

  if (placement === 'right') {
    return { marginLeft: arrowWidth };
  }

  return {};
};

const ArrowSVG = ({ color }: { color: string }) => {
  return (
    <Svg
      viewBox="0 0 1030 638"
      aria-labelledby="bfsi-ant-caret-up-title"
      id="si-ant-caret-up"
      fill={color}
    >
      <Path d="M1017 570L541 12Q530 0 515 0t-26 12L13 570q-16 19-7 43.5T39 638h952q24 0 33-24.5t-7-43.5z"></Path>
    </Svg>
  );
};

Popover.Arrow = PopoverArrow;
Popover.Content = PopoverContent;

export { Popover };
