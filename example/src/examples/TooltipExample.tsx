import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Popover } from 'react-native-popover';

export default function App() {
  return (
    <>
      <View style={styles.wrapper}>
        <Popover
          mode="tooltip"
          trigger={
            <Pressable>
              <Text>Press me</Text>
            </Pressable>
          }
        >
          <Popover.Arrow />
          <Popover.Content>
            <View style={styles.Popover}>
              <Text>Hello from Popover</Text>
            </View>
          </Popover.Content>
        </Popover>
      </View>
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
