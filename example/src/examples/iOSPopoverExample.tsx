//@ts-nocheck
import React from 'react';
import { Pressable, View, StyleSheet, Text, ScrollView } from 'react-native';
import { Popover } from 'react-native-popper';
import { AntDesign } from '@expo/vector-icons';

export default function IOSPopoverExample() {
  return (
    <View style={styles.wrapper}>
      <Popover
        placement="bottom right"
        trigger={
          <Pressable style={{ height: 26, width: 24 }}>
            <AntDesign name="plus" size={26} color="black" />
          </Pressable>
        }
      >
        <Popover.Backdrop style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
        <Popover.Content>
          <Popover.Arrow
            style={[
              {
                backgroundColor: '#fff',
                borderColor: 'transparent',
                zIndex: 1,
                borderRadius: 4,
              },
            ]}
          />
          <MyPopoverView />
        </Popover.Content>
      </Popover>
    </View>
  );
}

export function MyPopoverView() {
  return (
    <View style={[styles.boxShadow]}>
      <ScrollView>
        <View style={[styles.row, styles.justifyBetween, styles.header]}>
          <Pressable>
            <Text style={{ color: '#DC2626' }}>Cancel</Text>
          </Pressable>
          <Text style={{ fontWeight: 'bold', color: '#1F2937' }}>
            New Event
          </Text>
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
            <Text style={{ color: '#DC2626' }}>
              Nov 14, 2018 {'  '} 6:00 PM
            </Text>
          </Pressable>
        </View>
        <Spacer width={'95%'} height={2} />
        <View style={[styles.row, styles.justifyBetween, styles.header]}>
          <Text style={{ color: '#1F2937' }}>Ends</Text>
          <Pressable>
            <Text style={{ color: '#DC2626' }}>
              Nov 15, 2018 {'  '} 6:00 PM
            </Text>
          </Pressable>
        </View>
        <Spacer width={'95%'} height={2} />
        <View style={[styles.row, styles.justifyBetween, styles.header]}>
          <Text style={{ color: '#1F2937' }}>Reschedule</Text>
        </View>
        <Pressable>
          <View style={[styles.row, styles.justifyBetween, styles.header]}>
            <Text style={{ color: '#1F2937' }}>Mark as Complete</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={[styles.row, styles.justifyBetween, styles.header]}>
            <Text style={{ color: '#1F2937' }}>Remind me</Text>
          </View>
        </Pressable>
      </ScrollView>
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxShadow: {
    minWidth: 300,
    borderRadius: 5,
    // borderColor: '#F3F4F6',
    // borderWidth: 1,
    backgroundColor: '#fff',
    maxHeight: 400,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
