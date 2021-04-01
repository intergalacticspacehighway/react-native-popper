import React from 'react';
import { Overlay } from '../Overlay/Overlay';
import { useControllableState, useOn, useTooltip } from '../hooks';
import { Popper } from '../Popper/Popper';
import type { IPopoverProps } from '../types';
import { OverlayBackdrop } from '../Overlay/OverlayBackdrop';

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
      on: props.on ?? 'hover',
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
      `Tooltip: Invalid 'trigger' prop received, please pass a valid ReactElement or a Ref`
    );
  }

  const { triggerProps, contentProps } = useTooltip({ isOpen });

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
