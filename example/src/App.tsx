import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { OverlayProvider, Popover } from 'react-native-popover';

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const triggerRef = React.useRef<any>(null);
  const toggleVisible = () => setVisible(!visible);

  return (
    <OverlayProvider>
      <View style={styles.wrapper}>
        <Pressable ref={triggerRef} onPress={toggleVisible}>
          <Text>Hey there</Text>
        </Pressable>
      </View>

      {visible && (
        <Popover triggerRef={triggerRef}>
          <Popover.Backdrop onPress={toggleVisible}></Popover.Backdrop>
          <Popover.Arrow />
          <Popover.Content>
            <View style={styles.popover}>
              <Text>Hello from popover</Text>
            </View>
          </Popover.Content>
        </Popover>
      )}
    </OverlayProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popover: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'blue',
  },
});
