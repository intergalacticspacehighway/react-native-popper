//@ts-nocheck
import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Tooltip } from 'react-native-popover';

export default function App() {
  const [visible, setVisible] = React.useState(true);
  const triggerRef = React.useRef<any>(null);
  const toggleVisible = () => setVisible(!visible);
  const triggerRef2 = React.useRef<any>(null);
  const triggerRef3 = React.useRef<any>(null);
  const triggerRef4 = React.useRef<any>(null);
  const triggerRef5 = React.useRef<any>(null);
  const triggerRef6 = React.useRef<any>(null);

  return (
    <>
      <View style={{ flexDirection: 'row', marginTop: 50 }}>
        <View style={styles.wrapper}>
          <Pressable ref={triggerRef} onPress={toggleVisible}>
            <Text>Trigger</Text>
          </Pressable>
        </View>
        <View style={styles.wrapper}>
          <Pressable ref={triggerRef2} onPress={toggleVisible}>
            <Text>Trigger</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.wrapper}>
        <Pressable ref={triggerRef3} onPress={toggleVisible}>
          <Text>Trigger</Text>
        </Pressable>
      </View>

      <View style={styles.wrapper}>
        <Pressable ref={triggerRef4} onPress={toggleVisible}>
          <Text>Trigger</Text>
        </Pressable>
      </View>

      <View style={styles.wrapper}>
        <Pressable ref={triggerRef5} onPress={toggleVisible}>
          <Text>Trigger</Text>
        </Pressable>
      </View>

      <View style={styles.wrapper}>
        <Pressable ref={triggerRef6} onPress={toggleVisible}>
          <Text>Trigger</Text>
        </Pressable>
      </View>

      {['top', 'left', 'right', 'bottom'].map((p) => {
        return (
          visible && (
            <Tooltip triggerRef={triggerRef} placement={p}>
              <Tooltip.Arrow />
              <Tooltip.Content>
                <View style={styles.Tooltip}>
                  <Text>{p}</Text>
                </View>
              </Tooltip.Content>
            </Tooltip>
          )
        );
      })}

      {['top right', 'bottom right'].map((p) => {
        return (
          visible && (
            <Tooltip
              triggerRef={triggerRef3}
              onClose={toggleVisible}
              placement={p}
            >
              <Tooltip.Arrow />
              <Tooltip.Content>
                <View style={styles.Tooltip}>
                  <Text>{p}</Text>
                </View>
              </Tooltip.Content>
            </Tooltip>
          )
        );
      })}

      {['right bottom', 'left bottom'].map((p) => {
        return (
          visible && (
            <Tooltip
              triggerRef={triggerRef4}
              onClose={toggleVisible}
              placement={p}
            >
              <Tooltip.Arrow />
              <Tooltip.Content>
                <View style={styles.Tooltip}>
                  <Text>{p}</Text>
                </View>
              </Tooltip.Content>
            </Tooltip>
          )
        );
      })}

      {['right top', 'left top'].map((p) => {
        return (
          visible && (
            <Tooltip
              triggerRef={triggerRef5}
              onClose={toggleVisible}
              placement={p}
            >
              <Tooltip.Arrow />
              <Tooltip.Content>
                <View style={styles.Tooltip}>
                  <Text>{p}</Text>
                </View>
              </Tooltip.Content>
            </Tooltip>
          )
        );
      })}

      {['top left', 'bottom left'].map((p) => {
        return (
          visible && (
            <Tooltip
              triggerRef={triggerRef2}
              onClose={toggleVisible}
              placement={p}
            >
              <Tooltip.Arrow />
              <Tooltip.Content>
                <View style={styles.Tooltip}>
                  <Text>{p}</Text>
                </View>
              </Tooltip.Content>
            </Tooltip>
          )
        );
      })}

      {['Top - overlap with trigger'].map((p) => {
        return (
          visible && (
            <Tooltip
              triggerRef={triggerRef6}
              onClose={toggleVisible}
              placement={'top'}
              shouldOverlapWithTrigger
            >
              <Tooltip.Content>
                <View style={styles.Tooltip}>
                  <Text>{p}</Text>
                </View>
              </Tooltip.Content>
            </Tooltip>
          )
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Tooltip: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'blue',
  },
});
