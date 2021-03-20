import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import {
  OverlayProvider,
  OverlayContainer,
  Popover,
} from 'react-native-popover';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const triggerRef = React.useRef<any>(null);
  const toggleVisible = () => setVisible(!visible);

  return (
    <OverlayProvider>
      <View style={styles.wrapper}>
        <Pressable ref={triggerRef} onPress={toggleVisible}>
          <Text>Hey there</Text>
        </Pressable>
      </View>

      {visible && (
        <OverlayContainer>
          <Popover triggerRef={triggerRef} placement="bottom">
            <Popover.Arrow height={10} width={10}>
              <AntDesign name="caretup" color="black" />
            </Popover.Arrow>
            <Popover.Content>
              <View style={styles.popover}>
                <Text>Hello from popover</Text>
              </View>
            </Popover.Content>
          </Popover>
        </OverlayContainer>
      )}
    </OverlayProvider>
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
