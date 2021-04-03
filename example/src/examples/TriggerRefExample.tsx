import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Popover } from 'react-native-popper';
export default function App() {
  const triggerRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <View style={styles.wrapper}>
      <Pressable ref={triggerRef} onPress={() => setIsOpen(!isOpen)}>
        <Text>Press me</Text>
      </Pressable>
      <Popover trigger={triggerRef} isOpen={isOpen} onOpenChange={setIsOpen}>
        <Popover.Backdrop />
        <Popover.Content>
          <Popover.Arrow color="#D1D5DB"></Popover.Arrow>
          <View style={styles.popover}>
            <Text>Hello from popover</Text>
            <Pressable>
              <Text>Hello</Text>
            </Pressable>
          </View>
        </Popover.Content>
      </Popover>
    </View>
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
