import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Popover } from 'react-native-popper';
import Svg, { Path } from 'react-native-svg';

const MySVGIcon = () => {
  return (
    <Svg viewBox="0 0 45.871 45.871" fill="#10B981">
      <Path
        d="M44.68,29.383L26.728,11.52c-2.098-2.087-5.488-2.087-7.585,0L1.19,29.383c-1.16,1.155-1.509,2.707-0.884,4.222
        c0.624,1.512,2.099,2.311,3.735,2.311h37.786c1.638,0,3.112-0.799,3.736-2.312C46.189,32.09,45.84,30.539,44.68,29.383z"
      />
    </Svg>
  );
};

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
          <Popover.Arrow height={20} width={30}>
            <MySVGIcon />
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
  },
});
