import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Tooltip } from 'react-native-popper';

export default function App() {
  return (
    <>
      <View style={styles.wrapper}>
        <Tooltip
          on="longPress"
          offset={10}
          trigger={
            <Pressable>
              <Text>Press me</Text>
            </Pressable>
          }
        >
          <Tooltip.Backdrop />
          <Tooltip.Content>
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>Hello world </Text>
            </View>
          </Tooltip.Content>
        </Tooltip>
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
  tooltipText: {
    color: '#fff',
  },
  tooltip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#616161e6',
    borderRadius: 4,
  },
});
