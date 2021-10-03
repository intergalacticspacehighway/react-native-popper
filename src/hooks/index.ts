import React, { RefObject } from 'react';
import { Animated, Platform } from 'react-native';
import { composeEventHandlers } from '../utils';

const isPlatformWeb = Platform.OS === 'web';

let idCounter = 0;

const generateId = (prefix: string) => {
  idCounter++;
  return 'react-native-popper-' + prefix + '-' + idCounter;
};

type IParams = {
  enabled?: boolean;
  onClose: () => void;
};

export const useKeyboardDismissable = ({ enabled, onClose }: IParams) => {
  React.useEffect(
    function closeOverlayOnEscapeEffectCallback() {
      let escapeKeyListener: any = null;
      if (Platform.OS === 'web') {
        escapeKeyListener = (e: KeyboardEvent) => {
          if (e.key === 'Escape' && enabled) {
            onClose();
          }
        };
        document.addEventListener('keydown', escapeKeyListener);
      }
      return () => {
        if (Platform.OS === 'web') {
          document.removeEventListener('keydown', escapeKeyListener);
        }
      };
    },
    [enabled, onClose]
  );
};

export const useElementByType = (children: React.ReactNode, name: string) => {
  let element;
  React.Children.forEach(children, (child) => {
    //@ts-ignore
    if (child.type.displayName === name) {
      element = child;
    }
  });

  return element;
};

interface UseControllableStateProps<T> {
  /**
   * The value to used in controlled mode
   */
  value?: T;
  /**
   * The initial value to be used, in uncontrolled mode
   */
  defaultValue?: T | (() => T);
  /**
   * The callback fired when the value changes
   */
  onChange?: (value: T) => void;
  /**
   * The component name (for warnings)
   */
  name?: string;
}

/**
 * React hook for using controlling component state.
 * @param props
 */
export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const { value: valueProp, defaultValue, onChange } = props;

  const [valueState, setValue] = React.useState(defaultValue as T);
  const isControlled = valueProp !== undefined;

  const value = isControlled ? (valueProp as T) : valueState;

  const updateValue = React.useCallback(
    (next: any) => {
      const nextValue = typeof next === 'function' ? next(value) : next;
      if (!isControlled) {
        setValue(nextValue);
      }
      onChange && onChange(nextValue);
    },
    [isControlled, onChange, value]
  );

  return [value, updateValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}

export const usePopover = (props: {
  isOpen: boolean;
  disableAriaAttributes?: boolean;
}) => {
  const triggerId = React.useRef(generateId('trigger')).current;
  const contentId = React.useRef(generateId('content')).current;

  const { isOpen } = props;

  let triggerProps: any = {
    nativeID: triggerId,
    accessibilityRole: 'button',
  };

  let contentProps: any = {
    nativeID: contentId,
  };

  triggerProps['aria-expanded'] = !!isOpen;
  triggerProps['aria-haspopup'] = true;
  triggerProps['aria-controls'] = isOpen ? contentId : undefined;
  contentProps.accessibilityRole = Platform.OS === 'web' ? 'dialog' : undefined;

  if (props.disableAriaAttributes) {
    return { triggerProps: {}, contentProps: {} };
  }

  return {
    triggerProps,
    contentProps,
  };
};

export const useTooltip = (props: {
  isOpen: boolean;
  disableAriaAttributes?: boolean;
}) => {
  const triggerId = React.useRef(generateId('trigger')).current;
  const contentId = React.useRef(generateId('content')).current;
  const { isOpen } = props;

  let triggerProps: any = {
    nativeID: triggerId,
    accessibilityRole: 'button',
  };

  let contentProps: any = {
    nativeID: contentId,
  };

  triggerProps['aria-describedby'] = isOpen ? contentId : undefined;
  contentProps.accessibilityRole =
    Platform.OS === 'web' ? 'tooltip' : undefined;

  if (props.disableAriaAttributes) {
    return { triggerProps: {}, contentProps: {} };
  }

  return {
    triggerProps,
    contentProps,
  };
};

type IOnProps = {
  on?: 'press' | 'longPress' | 'hover';
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onPress?: () => void;
  onLongPress?: () => void;
  onOpen: () => void;
  onClose: () => void;
  overlayRef?: any;
};

export const useOn = (props: IOnProps) => {
  let { on = 'press', onOpen } = props;

  let events = useHoverInteraction(props, {
    enabled: on === 'hover' && isPlatformWeb,
  });

  if (events) {
    return events;
  }

  if (on === 'press') {
    return {
      onPress: composeEventHandlers(props.onPress, () => {
        onOpen();
      }),
    };
  }

  if (on === 'longPress') {
    return {
      onLongPress: composeEventHandlers(props.onLongPress, () => {
        onOpen();
      }),
    };
  }

  return {};
};

const useHoverInteraction = (
  props: IOnProps,
  { enabled }: { enabled: boolean }
) => {
  const { overlayRef, onOpen, onClose } = props;
  const { isHovered: isOverlayHovered } = useHover(overlayRef, { enabled });
  const { isFocused: isOverlayFocused } = useFocus(overlayRef, { enabled });
  const [isTriggerHovered, setIsTriggerHovered] = React.useState(false);
  const [isTriggerFocused, setIsTriggerFocused] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) return;
    if (isTriggerHovered || isTriggerFocused) {
      onOpen();
    }
  }, [isTriggerHovered, isTriggerFocused, onOpen, enabled]);

  React.useEffect(() => {
    if (!enabled) return;
    let timeout = setTimeout(() => {
      if (
        !isOverlayHovered &&
        !isTriggerHovered &&
        !isTriggerFocused &&
        !isOverlayFocused
      ) {
        onClose();
      }
    });
    return () => {
      clearTimeout(timeout);
    };
  }, [
    isOverlayHovered,
    isTriggerHovered,
    isTriggerFocused,
    isOverlayFocused,
    onClose,
    enabled,
  ]);

  React.useEffect(() => {
    if (!enabled) return;
    if (isTriggerFocused) {
      onOpen();
    }
  }, [isTriggerFocused, onOpen, enabled]);

  // We don't return above to prevent hooks conditional rules
  if (!enabled) return;
  return {
    onHoverIn: composeEventHandlers(props.onHoverIn, () => {
      setIsTriggerHovered(true);
    }),
    onHoverOut: composeEventHandlers(props.onHoverOut, () => {
      setIsTriggerHovered(false);
    }),
    onFocus: composeEventHandlers(props.onFocus, () => {
      setIsTriggerFocused(true);
    }),
    onBlur: composeEventHandlers(props.onBlur, () => {
      setIsTriggerFocused(false);
    }),
  };

  /* eslint-enable react-hooks/rules-of-hooks */
};

const useHover = (targetRef: any, { enabled }: { enabled: boolean }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  React.useEffect(() => {
    if (!enabled) return;
    if (targetRef && targetRef.current) {
      targetRef.current.onmouseover = () => {
        setIsHovered(true);
      };
      targetRef.current.onmouseout = () => {
        setIsHovered(false);
      };
    }
  }, [targetRef, enabled]);

  return { isHovered };
};

const useFocus = (targetRef: any, { enabled }: { enabled: boolean }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  React.useEffect(() => {
    if (!enabled) return;
    let focusInistener = () => {
      setIsFocused(true);
    };

    let focusOutListener = () => {
      setIsFocused(false);
    };

    let currentTarget = targetRef ? targetRef.current : undefined;
    if (currentTarget) {
      currentTarget.addEventListener('focusin', focusInistener);
      currentTarget.addEventListener('focusout', focusOutListener);
    }

    return () => {
      if (currentTarget) {
        currentTarget.removeEventListener('focusin', focusInistener);
        currentTarget.removeEventListener('focusout', focusOutListener);
      }
    };
  }, [targetRef, enabled]);

  return { isFocused };
};

type IProps = {
  animated: boolean;
  animationEntryDuration?: number;
  animationExitDuration?: number;
  isOpen?: boolean;
};

export const useAnimatedStyles = ({
  animated,
  animationEntryDuration = 150,
  animationExitDuration = 150,
  isOpen,
}: IProps) => {
  // do not animate if opened by default
  let opacity = React.useRef(new Animated.Value(isOpen ? 1 : 0));
  const [isExited, setIsExited] = React.useState(isOpen ? false : true);
  let prevIsOpen = React.useRef(isOpen);

  React.useEffect(() => {
    // Opened
    if (!prevIsOpen.current && isOpen) {
      Animated.timing(opacity.current, {
        toValue: 1,
        duration: animationEntryDuration,
        useNativeDriver: true,
      }).start(() => setIsExited(false));
    }
    // Closed
    else if (prevIsOpen.current && !isOpen) {
      Animated.timing(opacity.current, {
        toValue: 0,
        duration: animationExitDuration,
        useNativeDriver: true,
      }).start(() => setIsExited(true));
    }

    prevIsOpen.current = isOpen;
  }, [isOpen, animationEntryDuration, animationExitDuration]);

  if (!animated) {
    return {
      styles: {},
      isExited,
    };
  }

  return {
    styles: {
      opacity: opacity.current,
    },
    isExited,
  };
};

type IOutsideClickListener = {
  refs?: Array<RefObject<any> | undefined>;
  onClose: any;
  enabled?: boolean;
};

export const useCloseOnOutsideClick = ({
  refs,
  onClose,
  enabled,
}: IOutsideClickListener) => {
  React.useEffect(() => {
    if (!enabled) return;

    let listener = (e: MouseEvent) => {
      let clickedInRefs = false;
      if (refs) {
        refs.forEach((ref) => {
          if (ref && ref.current && ref.current.contains(e.target)) {
            clickedInRefs = true;
          }
        });
      }

      if (!clickedInRefs) onClose();
    };
    if (isPlatformWeb) {
      // Register at capture phase as Touchable prevents event bubbling.
      document.addEventListener('click', listener, true);
    }

    return () => {
      if (isPlatformWeb) {
        document.removeEventListener('click', listener, true);
      }
    };
  }, [refs, onClose, enabled]);
};
