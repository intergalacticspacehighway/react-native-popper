# react-native-popper

Create fully customizable popovers.

- This library is built for maximum customizablity and out of the box accessibility.

## Features

- Fully customizable even pointing arrows and backdrop.
- Can be controlled or uncontrolled.
- Handles focus trap, autofocus and focus contain on web.
- Dismiss with Escape key on web.
- Shifts accessibility focus to first item on Android and iOS.
- Has "multiple" mode which can be used to open multiple popovers on Android/iOS.

## Install

```
// yarn
yard add react-native-popper

// npm
npm i react-native-popper
```

## Import

import { Popover } from "react-native-popper"

## Usage

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

## API

### Popover

| Prop                             | Type                          | Default   | Description                                                                                                                                      |
| -------------------------------- | ----------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| trigger (Required)               | React Element   or Ref              | -         | Element or ref which will be used as a Trigger
| on                               | "press", "longpress", "hover" | "press"   | The action type which should trigger the Popover                                                                                                                   |
| isOpen                           | boolean                       | false     | Useful for controlled popovers                                                                                                                   |
| onOpenChange                     | (isOpen: boolean) => void     | -         | Use this to listen change events. Also to set state for controlled popovers.                                                                     |
| defaultIsOpen                    | boolean                       | false     | Specifies initial visibility of popover                                                                                                          |
| placement                        | string                        | bottom    | "top", "bottom", "left", "right", "top left", "top right", "left top", "left bottom", "right top", "right bottom", "bottom left", "bottom right" |
| shouldOverlapWithTrigger         | boolean                       | false     | Whether the popover should overlap with trigger                                                                                                  |
| placement                        | string                        | bottom    | "top", "bottom", "left", "right", "top left", "top right", "left top", "left bottom", "right top", "right bottom", "bottom left", "bottom right" |                                                                                               |
| offset                           | number                        | 0         | Distance between popover and trigger's main axis                                                                                                 |
| crossOffset                      | number                        | 0         | Distance between popover and trigger's cross axis                                                                                                |
| shouldFlip                       | boolean                       | true      | Whether the popover should flip if there's less space.                                                                                           |
| mode                             | 'single' \| 'multiple'        | 'single' | If you need to render multiple popovers at once on Android/iOS, use 'multiple' option. Note - Accessibility focus won't be shifted in this case. Refer [mode section](#mode)  |
| isKeyboardDismissable (Web only) | boolean                       | true      | Specify whether popover can be dismissed with Escape key on web                                                                                  |
| autoFocus (Web only)             | boolean                       | true      | Shifts focus to first focusable element on web.                                                                                                  |
| trapFocus (Web only)             | boolean                       | true      | Traps focus into the opened popover                                                                                                              |
| restoreFocus (Web only)          | boolean                       | true      | Restores focus to the triggered element                                                                                                          |

### Popover.Backdrop

- Renders a Pressable component. Useful to add click outside to close functionality.

- Accepts all [Pressable Props](https://reactnative.dev/docs/pressable#props).

### Popover.Content

- Pass the popover content as children here.

### Popover.Arrow

| Props    | Type      | Required | Default | Description                                                    |
| -------- | --------- | -------- | ------- | -------------------------------------------------------------- |
| height   | number    | No       | 10      | Arrow height                                                   |
| width    | number    | No       | 16      | Arrow width                                                    |
| color    | string    | No       | #000    | Arrow color                                                    |
| style    | ViewStyle | No       | -       | Style will be passed to the View which is used as Arrow        |
| children | ReactNode | No       | -       | Supply custom Arrow. Make sure the arrow is pointing upward. ▲ |


### OverlayProvider
- When using mode="multiple", we use custom Portal to prevent shifting accessibility focus when opened. 
To use this Portal, we need to wrap the app with OverlayProvider.

```
import { OverlayProvider } from 'react-native-popper';

function App() {
    return <OverlayProvider>{/*Your app*/}</OverlayProvider>
}

```

Phew, That's it!
## Examples
- Checkout examples directory. It has a lot of examples including animations.
```
cd examples
// Install dependencies
yarn
// web
yarn web
// iOS 
yarn iOS
// Android
yarn android
```
## <a name="mode"/>Mode
- Mode prop accepts `single` and `multiple` values. Defaults to `single`.
- When set to `single`, it uses RN's built-in Modal which shifts accessibility focus to the first element when opened. 
- RN's built in modal doesn't support multiple popups at once. It does but they need to be nested. If you need multiple popup support without nesting use mode="multiple" instead.
- To use mode="multiple", wrap the entire app with OverlayProvider which enables custom Portal like functionality.
- I am still figuring out if we can make this simple.

## Tradeoffs

- I am still figuring out how to support fully configurable entry/exit animation configs.
- However, I'll be adding some common animation examples which one can copy paste and tweak as needed.


## Known issues

- When on="hover" is passed and Backdrop is used, it may lead to flickers as Backdrop hijacks pointer events. To mitigate this, either set pointerEvents= "none" on backdrop or remove backdrop completely. I am looking how to handle this in a more simple way.


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

### Android/iOS

- When mode is set to `popover`, accessibility focus will be automatically shifted to first element. [Check out this demo](https://twitter.com/nishanbende/status/1373699977801703424).



## Credits

- This library is built on top of [useOverlayPosition](https://react-spectrum.adobe.com/react-aria/useOverlayPosition.html) which is a customized version of [useOverlayPosition](https://react-spectrum.adobe.com/react-aria/useOverlayPosition.html) from Adobe's React ARIA.

## License

MIT
