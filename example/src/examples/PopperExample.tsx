import * as React from 'react';
import { StyleSheet, Pressable, Text, View, Modal } from 'react-native';
import { Popper } from 'react-native-popper';

export default function App() {
  const triggerRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={styles.wrapper}>
      <Pressable ref={triggerRef} onPress={() => setVisible(!visible)}>
        <Text>Press me</Text>
      </Pressable>
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
      >
        <Popper triggerRef={triggerRef}>
          <Popper.Content accessibilityLabel="this should be the label of this Popper">
            <Popper.Arrow style={{ backgroundColor: 'pink' }} />
            <View style={styles.Popper}>
              <Text>Hello from Popper</Text>
            </View>
          </Popper.Content>
        </Popper>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Popper: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'blue',
  },
});
