import React from 'react';
import { useOverlayPosition } from '@react-native-aria/overlays';
import { ScrollView, View } from 'react-native';
import type {
  IPopoverArrowImplProps,
  IPopoverArrowProps,
  IPopoverProps,
  IPopoverContent,
  IPopoverContentImpl,
  IScrollContentStyle,
  IArrowStyles,
} from '../types';

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
  });

  const childArray = React.Children.toArray(props.children);

  const arrowElement = childArray.find((child) => {
    if (React.isValidElement(child)) {
      //@ts-ignore
      return child.type.name === 'PopoverArrow';
    }
    return null;
  }) as React.ReactElement;

  const contentElement = childArray.find((child) => {
    if (React.isValidElement(child)) {
      //@ts-ignore
      return child.type.name === 'PopoverContent';
    }
    return null;
  }) as React.ReactElement;

  return (
    <View
      ref={overlayRef}
      style={[
        overlayProps.style,
        { opacity: rendered ? 1 : 0, position: 'absolute' },
      ]}
    >
      {contentElement && (
        <PopoverContentImpl
          children={contentElement.props.children}
          arrowHeight={arrowElement ? arrowElement.props.height : 0}
          arrowWidth={arrowElement ? arrowElement.props.width : 0}
          placement={placement}
          arrowProps={arrowProps}
        />
      )}
      {arrowElement && (
        <PopoverArrowImpl
          children={arrowElement.props.children}
          height={arrowElement.props.height}
          width={arrowElement.props.width}
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

// This is an internal implmentation of PopoverContent
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
  };

  if (props.placement === 'top') {
    additionalStyles.transform.push({ translateX: -props.width / 2 });
    additionalStyles.transform.push({ rotate: '180deg' });
    additionalStyles.bottom = 0;
  }

  if (props.placement === 'bottom') {
    additionalStyles.transform.push({ translateX: -props.width / 2 });
    // No rotation in bottom as arrow is already bottom rotated!
    // additionalStyles.transform.push({ rotate: '180deg' });
    additionalStyles.top = 0;
  }

  if (props.placement === 'left') {
    additionalStyles.transform.push({ translateY: -props.height / 2 });
    additionalStyles.transform.push({ rotate: '90deg' });
    additionalStyles.right = 0;
  }

  if (props.placement === 'right') {
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

Popover.Arrow = PopoverArrow;
Popover.Content = PopoverContent;

export { Popover };
