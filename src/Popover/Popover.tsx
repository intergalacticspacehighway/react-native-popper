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
};

const PopoverContext = React.createContext(null);

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

  console.log('arrow ', arrowProps, overlayProps, placement);

  return (
    <PopoverContext.Provider value={{ arrowProps, placement }}>
      <View
        ref={overlayRef}
        style={[
          overlayProps.style,
          { opacity: rendered ? 1 : 0, position: 'absolute' },
        ]}
      >
        <ScrollView>{props.children}</ScrollView>
      </View>
    </PopoverContext.Provider>
  );
};

export const Arrow = (props: any) => {
  console.log('arrow props ', props);
  const { arrowProps, placement } = React.useContext(PopoverContext);

  let transform: any = [];
  if (placement === 'right') {
    transform.push({ translateY: -12 });
    transform.push({ rotate: '-90deg' });
  }

  const CustomArrow = props.as;

  return (
    <View
      style={[
        arrowProps.style,
        { position: 'absolute' },
        { transform: transform },
      ]}
      collapsable={false}
    >
      <CustomArrow />
    </View>
  );
};
