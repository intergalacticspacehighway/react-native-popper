import * as React from 'react';
import { Pressable, Text, View, ScrollView } from 'react-native';
import { OverlayProvider } from 'react-native-popper';
import * as Examples from './examples';

let ExamplesArray = Object.keys(Examples).map((key: any) => {
  return {
    name: key,
  };
});

export default function App() {
  const [selected, setSelected] = React.useState(ExamplesArray[0].name);
  //@ts-ignore
  let SelectedExample = Examples[selected];

  return (
    <OverlayProvider>
      <View style={{ flex: 1.5, marginTop: 40 }}>
        <ScrollView horizontal>
          {ExamplesArray.map((item) => {
            return (
              <Pressable
                key={item.name}
                onPress={() => setSelected(item.name)}
                style={{
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                  backgroundColor: '#F9A8D4',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  borderWidth: selected === item.name ? 4 : 0,
                }}
              >
                <Text>{item.name}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <View style={{ flex: 20 }}>
        <SelectedExample />
      </View>
    </OverlayProvider>
  );
}
