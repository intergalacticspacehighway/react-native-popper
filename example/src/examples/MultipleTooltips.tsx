import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Tooltip } from 'react-native-popper';

export default function App() {
  const [visible, setVisible] = React.useState(true);
  const toggleVisible = () => setVisible(!visible);
  const trigger = React.useRef<any>(null);
  const trigger2 = React.useRef<any>(null);
  const trigger3 = React.useRef<any>(null);
  const trigger4 = React.useRef<any>(null);
  const trigger5 = React.useRef<any>(null);
  const trigger6 = React.useRef<any>(null);

  return (
    <>
      <View style={{ flexDirection: 'row', marginTop: 50 }}>
        <View style={styles.wrapper}>
          <Pressable ref={trigger} onPress={toggleVisible}>
            <Text>Trigger</Text>
          </Pressable>
        </View>
        <View style={styles.wrapper}>
          <Pressable ref={trigger2} onPress={toggleVisible}>
            <Text>Trigger</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.wrapper}>
        <Pressable ref={trigger3} onPress={toggleVisible}>
          <Text>Trigger</Text>
        </Pressable>
      </View>

      <View style={styles.wrapper}>
        <Pressable ref={trigger4} onPress={toggleVisible}>
          <Text>Trigger</Text>
        </Pressable>
      </View>

      <View style={styles.wrapper}>
        <Pressable ref={trigger5} onPress={toggleVisible}>
          <Text>Trigger</Text>
        </Pressable>
      </View>

      <View style={styles.wrapper}>
        <Pressable ref={trigger6} onPress={toggleVisible}>
          <Text>Trigger</Text>
        </Pressable>
      </View>

      {['top', 'left', 'right', 'bottom'].map((p) => {
        return (
          <Tooltip
            isOpen={visible}
            trigger={trigger}
            key={p}
            onOpenChange={setVisible}
            //@ts-ignore
            placement={p}
          >
            <Tooltip.Content>
              <Tooltip.Arrow />
              <View style={styles.Tooltip}>
                <Text>{p}</Text>
              </View>
            </Tooltip.Content>
          </Tooltip>
        );
      })}

      {['top right', 'bottom right'].map((p) => {
        return (
          <Tooltip
            isOpen={visible}
            trigger={trigger3}
            key={p}
            onOpenChange={toggleVisible}
            //@ts-ignore
            placement={p}
          >
            <Tooltip.Content>
              <Tooltip.Arrow />
              <View style={styles.Tooltip}>
                <Text>{p}</Text>
              </View>
            </Tooltip.Content>
          </Tooltip>
        );
      })}
      {['right bottom', 'left bottom'].map((p) => {
        return (
          visible && (
            <Tooltip
              isOpen={visible}
              trigger={trigger4}
              key={p}
              onOpenChange={toggleVisible}
              //@ts-ignore
              placement={p}
            >
              <Tooltip.Content>
                <Tooltip.Arrow />
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
          <Tooltip
            isOpen={visible}
            trigger={trigger5}
            key={p}
            onOpenChange={toggleVisible}
            //@ts-ignore
            placement={p}
          >
            <Tooltip.Content>
              <Tooltip.Arrow />
              <View style={styles.Tooltip}>
                <Text>{p}</Text>
              </View>
            </Tooltip.Content>
          </Tooltip>
        );
      })}

      {['top left', 'bottom left'].map((p) => {
        return (
          <Tooltip
            isOpen={visible}
            trigger={trigger2}
            key={p}
            onOpenChange={toggleVisible}
            //@ts-ignore
            placement={p}
          >
            <Tooltip.Content>
              <Tooltip.Arrow />
              <View style={styles.Tooltip}>
                <Text>{p}</Text>
              </View>
            </Tooltip.Content>
          </Tooltip>
        );
      })}

      {['Top - overlap with trigger'].map((p) => {
        return (
          <Tooltip
            trigger={trigger6}
            key={p}
            onOpenChange={toggleVisible}
            placement={'top'}
            isOpen={visible}
            shouldOverlapWithTrigger
          >
            <Tooltip.Content>
              <View style={styles.Tooltip}>
                <Text>{p}</Text>
              </View>
            </Tooltip.Content>
          </Tooltip>
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
