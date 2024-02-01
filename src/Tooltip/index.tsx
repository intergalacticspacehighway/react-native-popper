import React from 'react';
import { Overlay } from '../Overlay/Overlay';
import { useControllableState, useOn, useTooltip } from '../hooks';
import { Popper } from '../Popper/Popper';
import type { IPopoverProps } from '../types';
import { OverlayBackdrop } from '../Overlay/OverlayBackdrop';
import { Platform } from 'react-native';

// Tooltip's code is almost same as Popover with some exceptions. Defaults to on="hover"
// and focusable=false and also has different ARIA attributes via useTooltip hook.
const Tooltip = (props: IPopoverProps) => {
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

  let triggerElem = null;
  const isTriggerElement = React.isValidElement(props.trigger);
  const isTriggerRef = props.trigger.hasOwnProperty('current');

  if (!isTriggerElement && !isTriggerRef) {
    console.warn(
      `Tooltip: Invalid 'trigger' prop received, please pass a valid ReactElement or a Ref`
    );
  }

  // @ts-ignore - We already checked isValidElement above.
  const triggerExistingProps = isTriggerElement ? props.trigger.props : {};

  const handlers = useOn({
    on: props.on ?? Platform.OS === 'web' ? 'hover' : 'press',
    onClose: handleClose,
    onOpen: handleOpen,
    ...triggerExistingProps,
  });

  // Received a trigger ref
  if (isTriggerRef) {
    // @ts-ignore
    triggerRef = props.trigger;
  }
  // Received a trigger element
  else if (isTriggerElement) {
    // @ts-ignore - We already checked isValidElement above.
    triggerElem = React.cloneElement(props.trigger, {
      ref: triggerRef,
      ...handlers,
    });
  }

  // ARIA props
  const { triggerProps, contentProps } = useTooltip({
    isOpen,
    disableAriaAttributes: props.disableAriaAttributes,
  });

  if (triggerElem) {
    triggerElem = React.cloneElement(triggerElem, { ...triggerProps });
  }

  return (
    <>
      {triggerElem}
      <Overlay
        isOpen={isOpen}
        onClose={handleClose}
        isKeyboardDismissable={props.isKeyboardDismissable}
        focusable={false}
        mode={props.mode}
        statusBarTranslucent={props.statusBarTranslucent}
        animated={props.animated}
        animationEntryDuration={props.animationEntryDuration}
        animationExitDuration={props.animationExitDuration}
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

Tooltip.Content = Popper.Content;
Tooltip.Arrow = Popper.Arrow;
Tooltip.Backdrop = OverlayBackdrop;

export { Tooltip };
