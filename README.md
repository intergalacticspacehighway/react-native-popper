# react-native-headless-popover

Create fully customizable popovers.

- This library is built for maximum customizablity and out of the box accessibility.

## Features

- Fully customizable even pointing arrows and backdrop.
- Can be controlled or uncontrolled.
- Handles focus trap, autofocus and focus contain on web.
- Dismiss with Escape key on web.
- Shifts accessibility focus to first item on Android and iOS.
- Has "tooltip" mode which can be used to open multiple popovers on Android/iOS.

## Install

```
// yarn
yard add react-native-headless-popover

// npm
npm i react-native-headless-popover
```

### Import

import { Popover } from "react-native-headless-popover"

### Usage

1. Uncontrolled

```
<Popover
    trigger={
        <Pressable>
            <Text>Press me</Text>
        </Pressable>
    }>
    <Popover.Backdrop />
    <Popover.Content>
        <Popover.Arrow />
        <Text>Hello World</Text>
    </Popover.Content>
</Popover>
```

2. Controlled

```
const [isOpen, setIsOpen] = React.useState(false);

<Popover
    isOpen={isOpen}
    onOpenChange={setIsOpen}
    trigger={
        <Pressable>
            <Text>Press me</Text>
        </Pressable>
    }>
    <Popover.Backdrop />
    <Popover.Content>
        <Popover.Arrow />
        <Text>Hello World</Text>
    </Popover.Content>
</Popover>
```

### API

#### Popover

| Prop                             | Type                      | Default   | Description                                                                                                                                      |
| -------------------------------- | ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| trigger (Required)               | React Element             | -         | Element will be used as a Trigger                                                                                                                |
| isOpen                           | boolean                   | false     | Useful for controlled popovers                                                                                                                   |
| onOpenChange                     | (isOpen: boolean) => void | -         | Use this to listen change events. Also to set state for controlled popovers.                                                                     |
| defaultIsOpen                    | boolean                   | false     | Specifies initial visibility of popover                                                                                                          |
| placement                        | string                    | bottom    | "top", "bottom", "left", "right", "top left", "top right", "left top", "left bottom", "right top", "right bottom", "bottom left", "bottom right" |
| shouldOverlapWithTrigger         | boolean                   | false     | Whether the popover should overlap with trigger                                                                                                  |
| offset                           | number                    | 0         | Distance between popover and trigger's main axis                                                                                                 |
| crossOffset                      | number                    | 0         | Distance between popover and trigger's cross axis                                                                                                |
| shouldFlip                       | boolean                   | true      | Whether the popover should flip if there's less space.                                                                                           |
| mode                             | 'popover' \| 'tooltip'    | 'popover' | If you need to render multiple popovers at once on Android/iOS, use 'tooltip' option. Note - Accessibility focus won't be shifted in this case.  |
| isKeyboardDismissable (Web only) | boolean                   | true      | Specify whether popover can be dismissed with Escape key on web                                                                                  |
| autoFocus (Web only)             | boolean                   | true      | Shifts focus to first focusable element on web.                                                                                                  |
| trapFocus (Web only)             | boolean                   | true      | Traps focus into the opened popover                                                                                                              |
| restoreFocus (Web only)          | boolean                   | true      | Restores focus to the triggered element                                                                                                          |

#### Popover.Backdrop

- Renders a Pressable component. Useful to add click outside to close functionality.

- Accepts all [Pressable Props](https://reactnative.dev/docs/pressable#props).

#### Popover.Content

- Pass the popover content as children here.

#### Popover.Arrow

| Props    | Type      | Required | Default | Description                                                    |
| -------- | --------- | -------- | ------- | -------------------------------------------------------------- |
| height   | number    | No       | 10      | Arrow height                                                   |
| width    | number    | No       | 16      | Arrow width                                                    |
| color    | string    | No       | #000    | Arrow color                                                    |
| style    | ViewStyle | No       | -       | Style will be passed to the View which is used as Arrow        |
| children | ReactNode | No       | -       | Supply custom Arrow. Make sure the arrow is pointing upward. ▲ |

Phew, That's it!

### Tradeoffs

- I am still figuring out how to support fully configurable entry/exit animation configs.
- However, I'll be adding some common animation examples which one can copy paste and tweak as needed.

## Credits

- This library is built on top of [useOverlayPosition](https://react-spectrum.adobe.com/react-aria/useOverlayPosition.html) which is a customized version of [useOverlayPosition](https://react-spectrum.adobe.com/react-aria/useOverlayPosition.html) from Adobe's React ARIA.

## Accessibility

### Web

#### ARIA attributes

- If the mode is set to 'popover', the Popover.Content element has role set to dialog. If the mode is set to 'tooltip', the Popover.Content has role set to tooltip.
- The trigger has aria-haspopup set to true to denote that it triggers a popover.
- The trigger has aria-controls set to the id of the Popover.Content to associate the popover and the trigger.
- The trigger has aria-expanded set to true or false depending on the open/closed state of the popover.

#### Behaviour

- When the popover is opened, focus is moved to the first focusable element inside Popover.Content. If you set `autoFocus` to false, focus will not return.
- When the popover is closed, focus returns to the trigger. If you set `restoreFocus` to false, focus will not return.
- Hitting the Esc key while the popover is open will close the popover. If you set `isKeyboardDismissable` to false, it will not close.
- Focus will be contained within the Popver.Content. If you set `trapFocus` to false, it will not be contained.

## Installation

```sh
npm install react-native-headless-popover
```

## Usage

```js
import { Popover } from 'react-native-headless-popover';

// ...

const result = await Popover.multiply(3, 7);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
