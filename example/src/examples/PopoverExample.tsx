import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Popover } from 'react-native-popper';
export default function App() {
  return (
    <View style={styles.wrapper}>
      <Popover
        trigger={
          <Pressable>
            <Text>Press me</Text>
          </Pressable>
        }
      >
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
