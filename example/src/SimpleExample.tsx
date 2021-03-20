import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import {
  OverlayProvider,
  OverlayContainer,
  Popover,
  Arrow,
} from 'react-native-popover';

import { AntDesign } from '@expo/vector-icons';

const MyArrow = () => {
  return <AntDesign name="caretup" size={24} color="black" />;
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
          <Popover triggerRef={triggerRef} isVisible={visible}>
            <Arrow as={MyArrow}></Arrow>
            <Text>Hello from popover</Text>
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
});
