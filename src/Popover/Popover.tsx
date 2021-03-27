import React from 'react';
import type { IPopoverProps } from '../types';
import { Overlay } from '../Overlay/Overlay';
import { useControllableState, usePopover } from '../hooks';
import { composeEventHandlers } from '../utils';
import { Popper } from '../Popper/Popper';

// This component just uses original Popover by wrapping it with OverlayContainer, to make sure it gets rendered in OverlayProvider
const PopoverWithOverlayContainer = (props: IPopoverProps) => {
  let triggerRef = React.useRef<any>(null);

  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: props.defaultIsOpen,
    value: props.isOpen,
    onChange: props.onOpenChange,
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
      onPress: composeEventHandlers(props.trigger.props.onPress, toggle),
    });
  } else {
    console.warn(
      `Popover: Invalid 'trigger' prop received, please pass a valid ReactElement or a Ref`
    );
  }
  const { mode = 'popover' } = props;

  const { triggerProps, contentProps } = usePopover({ isOpen, mode });

  if (triggerElem) {
    triggerElem = React.cloneElement(triggerElem, { ...triggerProps });
  }

  return (
    <>
      {triggerElem}
      <Overlay
        isOpen={isOpen}
        closeOnOutsideClick={props.closeOnOutsideClick}
        onClose={handleClose}
        isKeyboardDismissable={props.isKeyboardDismissable}
        mode={mode}
      >
        <Popper
          {...props}
          onClose={handleClose}
          triggerRef={triggerRef}
          contentProps={contentProps}
        />
      </Overlay>
    </>
  );
};

PopoverWithOverlayContainer.Content = Popper.Content;
PopoverWithOverlayContainer.Arrow = Popper.Arrow;

export { PopoverWithOverlayContainer as Popover };
