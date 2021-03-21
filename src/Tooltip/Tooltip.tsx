import React from 'react';
import { PlainPopover, PopoverArrow, PopoverContent } from '../Popover/Popover';
import type { IPopoverProps } from '../types';
import { OverlayContainer } from '../Overlay';
import { useElementByType } from '../hooks';
import { OverlayBackdrop } from '../Overlay';

// Tooltip doesn't alter focus behaviour, so we'll just use OverlayContainer
const Tooltip = (props: IPopoverProps) => {
  let overlayBackdrop = useElementByType(props.children, 'OverlayBackdrop');

  return (
    <OverlayContainer>
      {overlayBackdrop}
      <PlainPopover {...props} />
    </OverlayContainer>
  );
};

Tooltip.Arrow = PopoverArrow;
Tooltip.Content = PopoverContent;
Tooltip.Backdrop = OverlayBackdrop;

export { Tooltip };
