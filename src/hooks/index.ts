import React from 'react';
import { Platform } from 'react-native';
import { composeEventHandlers } from '../utils';

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

export const usePopover = (props: { isOpen: boolean }) => {
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
  contentProps.accessibilityRole = 'dialog';

  return {
    triggerProps,
    contentProps,
  };
};

export const useTooltip = (props: { isOpen: boolean }) => {
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
  contentProps.accessibilityRole = 'tooltip';

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
};

export const useOn = (props: IOnProps) => {
  let { on = 'press', onOpen, onClose } = props;

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

  if (on === 'hover') {
    return {
      onHoverIn: composeEventHandlers(props.onHoverIn, () => {
        onOpen();
      }),
      onHoverOut: composeEventHandlers(props.onHoverOut, () => {
        onClose();
      }),
      onFocus: composeEventHandlers(props.onFocus, () => {
        onOpen();
      }),
      onBlur: composeEventHandlers(props.onBlur, () => {
        onClose();
      }),
    };
  }

  return {};
};
