import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import {
  OverlayProvider,
  OverlayContainer,
  Popover,
  Arrow,
  // OverlayBackdrop,
} from 'react-native-popover';

import { AntDesign } from '@expo/vector-icons';

const MyArrow = () => {
  return <AntDesign name="caretup" color="black" />;
};

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
          <Popover
            triggerRef={triggerRef}
            isVisible={visible}
            placement="bottom"
          >
            <Popover.Arrow height={10} width={5}>
              <MyArrow />
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