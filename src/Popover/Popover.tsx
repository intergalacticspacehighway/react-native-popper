import React from 'react';
import type { IPopoverProps } from '../types';
import { Overlay } from '../Overlay/Overlay';
import { useControllableState, useOn, usePopover } from '../hooks';
import { Popper } from '../Popper/Popper';
import { OverlayBackdrop } from '../Overlay/OverlayBackdrop';

const Popover = (props: IPopoverProps) => {
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

  // Received a trigger ref
  if (props.trigger.hasOwnProperty('current')) {
    // @ts-ignore
    triggerRef = props.trigger;
  }
  // Received a trigger element
  else if (React.isValidElement(props.trigger)) {
    const triggerExistingProps = props.trigger.props;
    // Trigger won't be changes in rerenders, so this seems safe
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handlers = useOn({
      on: props.on,
      onClose: handleClose,
      onOpen: handleOpen,
      ...triggerExistingProps,
    });

    triggerElem = React.cloneElement(props.trigger, {
      ref: triggerRef,
      ...handlers,
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

  const isHoverTriggerEvent = props.on === 'hover';

  let focusProps = React.useMemo(() => {
    return {
      trapFocus: !isHoverTriggerEvent,
      autoFocus: !isHoverTriggerEvent,
      restoreFocus: !isHoverTriggerEvent,
    };
  }, [isHoverTriggerEvent]);

  return (
    <>
      {triggerElem}
      <Overlay
        isOpen={isOpen}
        onClose={handleClose}
        isKeyboardDismissable={props.isKeyboardDismissable}
        mode={mode}
        {...focusProps}
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

Popover.Content = Popper.Content;
Popover.Arrow = Popper.Arrow;
Popover.Backdrop = OverlayBackdrop;

export { Popover as Popover };
