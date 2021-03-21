import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { OverlayProvider, Tooltip } from 'react-native-popover';

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
        <Tooltip triggerRef={triggerRef}>
          <Tooltip.Arrow />
          <Tooltip.Content>
            <View style={styles.tooltip}>
              <Text>Hello from Tooltip</Text>
            </View>
          </Tooltip.Content>
        </Tooltip>
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
  tooltip: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'blue',
  },
});
