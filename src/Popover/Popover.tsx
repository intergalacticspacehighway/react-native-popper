import React from 'react';
import type { IPopoverProps } from '../types';
import { Overlay } from '../Overlay/Overlay';
import { useControllableState, useOn, usePopover } from '../hooks';
import { Popper } from '../Popper/Popper';
import { OverlayBackdrop } from '../Overlay/OverlayBackdrop';

const Popover = (props: IPopoverProps) => {
  let triggerRef = React.useRef<any>(null);
  let [overlayRef, setOverlayRef] = React.useState<any>({ current: null });

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

  const isTriggerElement = React.isValidElement(props.trigger);
  const isTriggerRef = props.trigger.hasOwnProperty('current');

  if (!isTriggerElement && !isTriggerRef) {
    console.warn(
      `Popover: Invalid 'trigger' prop received, please pass a valid ReactElement or a Ref`
    );
  }

  // @ts-ignore - We already checked isValidElement above.
  const triggerExistingProps = isTriggerElement ? props.trigger.props : {};

  const handlers = useOn({
    on: props.on,
    onClose: handleClose,
    onOpen: handleOpen,
    overlayRef,
    ...triggerExistingProps,
  });

  let triggerElem = null;

  if (isTriggerRef) {
    // @ts-ignore
    triggerRef = props.trigger;
  } else if (isTriggerElement) {
    // @ts-ignore - We already checked isValidElement above.
    triggerElem = React.cloneElement(props.trigger, {
      ref: triggerRef,
      ...handlers,
    });
  }

  // ARIA props
  const { triggerProps, contentProps } = usePopover({
    isOpen,
    disableAriaAttributes: props.disableAriaAttributes,
  });

  if (triggerElem) {
    triggerElem = React.cloneElement(triggerElem, { ...triggerProps });
  }

  // If trigger is hover, we shouldn't shift user's focus
  const isFocusabe = props.on !== 'hover';

  return (
    <>
      {triggerElem}
      <Overlay
        isOpen={isOpen}
        onClose={handleClose}
        isKeyboardDismissable={props.isKeyboardDismissable}
        focusable={props.focusable ?? isFocusabe}
        animated={props.animated}
        mode={props.mode}
        statusBarTranslucent={props.statusBarTranslucent}
        animationEntryDuration={props.animationEntryDuration}
        animationExitDuration={props.animationExitDuration}
        overlayRef={overlayRef}
        triggerRef={triggerRef}
        shouldCloseOnOutsideClick={props.shouldCloseOnOutsideClick}
        onRequestClose={props.onRequestClose}
      >
        <Popper
          {...props}
          onClose={handleClose}
          triggerRef={triggerRef}
          contentProps={contentProps}
          setOverlayRef={setOverlayRef}
        />
      </Overlay>
    </>
  );
};

Popover.Content = Popper.Content;
Popover.Arrow = Popper.Arrow;
Popover.Backdrop = OverlayBackdrop;

export { Popover as Popover };
