import * as React from 'react';
import { StyleSheet, Pressable, Image, Text, View } from 'react-native';
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
        placement="left"
        defaultIsOpen
      >
        <Popover.Backdrop />
        <Popover.Content>
          <Popover.Arrow height={20} width={20}>
            <Image
              source={require('../../assets/square.png')}
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
              }}
            />
          </Popover.Arrow>
          <View style={styles.popover}>
            <Text>Hello from popover</Text>
          </View>
        </Popover.Content>
      </Popover>

      <View style={{ marginVertical: 100 }} />
      <Popover
        trigger={
          <Pressable>
            <Text>Press me</Text>
          </Pressable>
        }
        placement="left"
        defaultIsOpen
      >
        <Popover.Backdrop />
        <Popover.Content>
          <Popover.Arrow height={20} width={20}>
            <View style={{ width: 20, height: 20, backgroundColor: 'pink' }} />
          </Popover.Arrow>
          <View style={styles.popover}>
            <Text>Hello from popover</Text>
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
    backgroundColor: 'white',
  },
});
