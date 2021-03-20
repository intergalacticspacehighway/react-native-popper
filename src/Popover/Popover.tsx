import React from 'react';
import type { RefObject } from 'react';
import { useOverlayPosition } from '@react-native-aria/overlays';
import { ScrollView, View } from 'react-native';

type IPopoverProps = {
  isVisible: boolean;
  triggerRef: RefObject<any>;
  shouldFlip?: boolean;
  crossOffset?: number;
  offset?: number;
  shouldOverlapWithTrigger?: boolean;
  children: React.ReactNode;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'
    | 'right top'
    | 'right bottom'
    | 'left top'
    | 'left bottom';

  arrowComponent: React.FC;
  arrowHeight: number;
  arrowWidth: number;
};

export const Popover = (props: IPopoverProps) => {
  const overlayRef = React.useRef(null);
  const { overlayProps, rendered, arrowProps, placement } = useOverlayPosition({
    targetRef: props.triggerRef,
    overlayRef,
    shouldFlip: props.shouldFlip,
    crossOffset: props.crossOffset,
    isOpen: props.isVisible,
    offset: props.offset,
    placement: props.placement,
    containerPadding: 0,
  });

  const ArrowComponent = props.arrowComponent;

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
    <View
      ref={overlayRef}
      style={[
        overlayProps.style,
        { opacity: rendered ? 1 : 0, position: 'absolute' },
      ]}
    >
      <ScrollView contentContainerStyle={scrollContainerStyle}>
        {props.children}
      </ScrollView>
      <Arrow
        placement={placement}
        arrowProps={arrowProps}
        height={props.arrowHeight}
        width={props.arrowWidth}
      >
        <ArrowComponent />
      </Arrow>
    </View>
  );
};

export const Arrow = ({
  placement,
  arrowProps,
  children,
  height,
  width,
}: any) => {
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

type IArrowStyles = {
  placement: string;
  height: number;
  width: number;
};

type IScrollContentStyle = {
  placement?: string;
  arrowHeight: number;
  arrowWidth: number;
};
