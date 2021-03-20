import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import {
  OverlayProvider,
  OverlayContainer,
  Popover,
  // OverlayBackdrop,
} from 'react-native-popover';

import { AntDesign } from '@expo/vector-icons';

const MyArrow = () => {
  return <AntDesign name="caretup" size={16} color="black" />;
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
          {/* <OverlayBackdrop onPress={toggleVisible} /> */}
          <Popover
            triggerRef={triggerRef}
            isVisible={visible}
            placement="bottom"
            arrowHeight={10}
            arrowWidth={10}
            arrowComponent={() => <MyArrow />}
          >
            <View style={styles.popover}>
              <Text>Hello from popover</Text>
            </View>
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
