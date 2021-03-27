import type { ReactElement, RefObject } from 'react';
import type { ViewStyle } from 'react-native';

export type IPopoverArrowProps = {
  height?: number;
  width?: number;
  children?: React.ReactNode;
  color?: string;
};

export type IPopoverArrowImplProps = {
  placement?: string;
  arrowProps: IArrowProps;
  width: number;
  height: number;
  style: ViewStyle;
} & IPopoverArrowProps;

export type IArrowProps = {
  style: Object;
};

export type IPopoverProps = {
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  shouldFlip?: boolean;
  crossOffset?: number;
  offset?: number;
  shouldOverlapWithTrigger?: boolean;
  children: React.ReactNode;
  isKeyboardDismissable?: boolean;
  onChange?: (value: boolean) => void;
  closeOnOutsideClick?: boolean;
  trigger: ReactElement | RefObject<any>;
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

export type IPopoverContentImpl = {
  arrowHeight: number;
  arrowWidth: number;
  placement?: string;
  arrowProps: IArrowProps;
  children: any;
};

export type IPopoverContent = {
  children: React.ReactNode;
};

export type IArrowStyles = {
  placement?: string;
  height?: number;
  width?: number;
};

export type IScrollContentStyle = {
  placement?: string;
  arrowHeight: number;
  arrowWidth: number;
};

export type IOverlayProps = {
  mode?: 'single' | 'multiple';
  isOpen: boolean;
  children: any;
  onClose: any;
  closeOnOutsideClick?: boolean;
  isKeyboardDismissable?: boolean;
  autoFocus?: boolean;
  restoreFocus?: boolean;
  trapFocus?: boolean;
};
