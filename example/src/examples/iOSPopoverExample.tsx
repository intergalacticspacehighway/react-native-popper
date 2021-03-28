import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import { Popover } from 'react-native-popover';
import { AntDesign } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
const MySVGIcon = () => {
  return (
    <Svg viewBox="0 0 45.871 45.871" fill="#fff">
      <Path
        d="M44.68,29.383L26.728,11.52c-2.098-2.087-5.488-2.087-7.585,0L1.19,29.383c-1.16,1.155-1.509,2.707-0.884,4.222
          c0.624,1.512,2.099,2.311,3.735,2.311h37.786c1.638,0,3.112-0.799,3.736-2.312C46.189,32.09,45.84,30.539,44.68,29.383z"
      />
    </Svg>
  );
};

export default function IOSPopoverExample() {
  return (
    <View style={styles.wrapper}>
      <Popover
        defaultIsOpen
        placement="bottom right"
        trigger={
          <Pressable style={{ height: 30, width: 30 }}>
            <AntDesign name="plus" size={30} color="black" />
          </Pressable>
        }
      >
        <Popover.Content>
          <Popover.Arrow height={12} width={24} style={[{ marginTop: 2 }]}>
            <View
              style={{
                height: 24,
                width: 24,
              }}
            >
              <MySVGIcon />
            </View>
          </Popover.Arrow>
          <MyPopoverView />
        </Popover.Content>
      </Popover>
    </View>
  );
}

export function MyPopoverView() {
  return (
    <View style={[styles.boxShadow, styles.shadow]}>
      <View style={[styles.row, styles.justifyBetween, styles.header]}>
        <Pressable>
          <Text style={{ color: '#DC2626' }}>Cancel</Text>
        </Pressable>
        <Text style={{ fontWeight: 'bold', color: '#1F2937' }}>New Event</Text>
        <Pressable>
          <Text style={{ color: '#DC2626' }}>Add</Text>
        </Pressable>
      </View>
      <View style={{ height: 20, backgroundColor: '#F3F4F6' }}></View>
      <Pressable>
        <View style={[styles.row, styles.justifyBetween, styles.header]}>
          <Text style={{ color: '#1F2937' }}>Pick up groceries</Text>
        </View>
      </Pressable>
      <Spacer width={'95%'} height={2} />
      <Pressable>
        <View style={[styles.row, styles.justifyBetween, styles.header]}>
          <Text style={{ color: '#1F2937' }}>Market</Text>
        </View>
      </Pressable>
      <Spacer height={30} />
      <Pressable>
        <View style={[styles.row, styles.justifyBetween, styles.header]}>
          <Text style={{ color: '#1F2937' }}>All-day</Text>
        </View>
      </Pressable>
      <Spacer width={'95%'} height={2} />
      <View style={[styles.row, styles.justifyBetween, styles.header]}>
        <Text style={{ color: '#1F2937' }}>Starts</Text>
        <Pressable>
          <Text style={{ color: '#DC2626' }}>Nov 14, 2018 {'  '} 6:00 PM</Text>
        </Pressable>
      </View>
    </View>
  );
}

const Spacer = ({ height, width }: any) => {
  return (
    <View
      style={{
        height: height,
        backgroundColor: '#F3F4F6',
        width: width ?? '100%',
        marginHorizontal: 'auto',
      }}
    ></View>
  );
};
const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  justifyBetween: { justifyContent: 'space-between' },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  boxShadow: {
    minWidth: 300,
    borderRadius: 5,
    // borderColor: '#F3F4F6',
    // borderWidth: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
