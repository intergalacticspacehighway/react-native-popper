import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Popover } from 'react-native-popover';

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const triggerRef = React.useRef<any>(null);
  const toggleVisible = () => setVisible(!visible);

  return (
    <>
      <View style={styles.wrapper}>
        <Pressable ref={triggerRef} onPress={toggleVisible}>
          <Text>Press me</Text>
        </Pressable>
      </View>

      <Popover mode="tooltip" trigger={triggerRef} isOpen={visible}>
        <Popover.Arrow />
        <Popover.Content>
          <View style={styles.Popover}>
            <Text>Hello from Popover</Text>
          </View>
        </Popover.Content>
      </Popover>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Popover: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'blue',
  },
});
