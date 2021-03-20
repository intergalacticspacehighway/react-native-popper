import type { RefObject } from 'react';

export type IPopoverArrowProps = {
  height: number;
  width: number;
  children: React.ReactNode;
};

export type IPopoverArrowImplProps = {
  placement?: string;
  arrowProps: IArrowProps;
} & IPopoverArrowProps;

export type IArrowProps = {
  style: Object;
};

export type IPopoverProps = {
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
  height: number;
  width: number;
};

export type IScrollContentStyle = {
  placement?: string;
  arrowHeight: number;
  arrowWidth: number;
};
