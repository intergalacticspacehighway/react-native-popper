import React from 'react';

export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !((event as unknown) as Event).defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}

function createContext<ContextValueType extends object>(
  rootComponentName: string
) {
  const Context = React.createContext<ContextValueType>(null as any);

  function Provider(props: ContextValueType & { children: React.ReactNode }) {
    const { children, ...providerProps } = props;
    // Only re-memoize when prop values change
    const value = React.useMemo(
      () => providerProps,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(providerProps)
    ) as ContextValueType;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useContext(consumerName: string) {
    const context = React.useContext(Context);
    if (context === null) {
      throw new Error(
        `\`${consumerName}\` must be used within \`${rootComponentName}\``
      );
    }
    return context;
  }

  Provider.displayName = rootComponentName + 'Provider';
  return [Provider, useContext] as const;
}

export { createContext };
