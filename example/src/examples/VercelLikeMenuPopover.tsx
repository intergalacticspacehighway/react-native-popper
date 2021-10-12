//@ts-nocheck
import React from 'react';
import { Pressable, View, StyleSheet, Text, Image } from 'react-native';
import { Popover } from 'react-native-popper';
import { Entypo } from '@expo/vector-icons';

export default function IOSPopoverExample() {
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={styles.body}>
      <View style={styles.wrapper}>
        <Popover
          placement="bottom left"
          offset={2}
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          trigger={
            <Pressable
              style={styles.menuTrigger}
              onPress={() => setVisible(true)}
            >
              <Entypo
                name="chevron-thin-down"
                size={16}
                color="rgb(253, 253, 253)"
              />
            </Pressable>
          }
        >
          <Popover.Backdrop onPress={() => setVisible(false)} />
          <Popover.Content>
            <Popover.Arrow
              style={{
                width: 12,
                height: 12,
                borderColor: '#333',
                borderWidth: 1,
                backgroundColor: '#000',
                zIndex: 1,
                borderBottomWidth: 0,
                borderRightWidth: 0,
              }}
            />
            <MyPopoverView />
          </Popover.Content>
        </Popover>
      </View>
    </View>
  );
}

export function MyPopoverView() {
  return (
    <View style={styles.menuWrapper}>
      <Text style={[styles.sectionText, styles.text]}>Personal Account</Text>
      <MenuItem
        image="https://vercel.com/api/www/avatar/?u=paco&s=44"
        text={'Paco'}
      />
      <Divider />
      <Spacer height={4} />
      <Text style={[styles.sectionText, styles.text]}>Teams</Text>
      <MenuItem
        image="https://vercel.com/api/www/avatar/?u=evilrabbit&s=44"
        text={'Acme'}
      />
      <Spacer height={4} />
      <MenuItem
        image="https://vercel.com/api/www/avatar/?u=rauchg&s=44"
        text={'Vercel'}
      />
      <Spacer height={4} />
      <MenuItem
        image="https://vercel.com/api/www/avatar/?u=skllcrn&s=44"
        text={'Zoo'}
      />

      <Divider />
      <View
        style={[
          styles.menuItem,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}
      >
        <Text style={styles.text}>Create a Team</Text>
        <Entypo name="plus" size={20} color="#888" />
      </View>
    </View>
  );
}

function Divider() {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: 'rgb(51, 51, 51)',
        marginVertical: 2,
      }}
    />
  );
}

export function MenuItem({ image, text }) {
  return (
    <Pressable
      style={[styles.menuItem, { flexDirection: 'row', alignItems: 'center' }]}
    >
      <View style={{ marginRight: 10 }}>
        <Image
          source={{ uri: image }}
          style={{ borderRadius: 9999, height: 25, width: 25 }}
        />
      </View>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

const Spacer = ({ height, width }: any) => {
  return (
    <View
      style={{
        height: height,
        width: width ?? '100%',
        marginHorizontal: 'auto',
      }}
    />
  );
};

const styles = StyleSheet.create({
  menuTrigger: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  text: {
    color: '#888',
  },
  sectionText: {
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  menuWrapper: {
    backgroundColor: '#000',
    borderRadius: 3,
    paddingVertical: 8,
    width: 240,
    borderWidth: 1,
    borderColor: '#333',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  body: {
    backgroundColor: '#000',
    flex: 1,
  },
});
