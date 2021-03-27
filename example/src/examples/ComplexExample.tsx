import React from 'react';
import { Popover } from 'react-native-popover';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

export default function ContextPopover() {
  const [isOpen, setIsOpen] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (isOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
        duration: 250,
      }).start();
    }
  }, [isOpen, fadeAnim]);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 150,
    }).start(() => {
      // Set state when animation ends
      setIsOpen(false);
    });
  };

  const animatedStyle: any = {
    opacity: fadeAnim,
    transform: [
      { translateX: -80 },
      { translateY: -90 },
      { scale: fadeAnim },
      { translateX: 80 },
      { translateY: 90 },
    ],
  };

  return (
    <View style={styles.wrapper}>
      <Popover
        isOpen={isOpen}
        mode="tooltip"
        placement="bottom left"
        onOpenChange={(val) => {
          // Open request
          if (val) {
            setIsOpen(true);
          }
          // Close request
          else {
            handleClose();
          }
        }}
        trigger={
          <Pressable>
            <MaterialIcons name="more-vert" size={36} color="#374151" />
          </Pressable>
        }
      >
        <Popover.Content>
          <Animated.View style={[styles.popoverWrapper, animatedStyle]}>
            <OverlayView onClose={handleClose} />
          </Animated.View>
        </Popover.Content>
      </Popover>
    </View>
  );
}

const OverlayView = ({ onClose }: any) => {
  return (
    <>
      {commands.map((c) => {
        return (
          <View key={c.name} style={{ marginVertical: 8, padding: 10 }}>
            <Pressable onPress={onClose} style={styles.menuButton}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[{ marginRight: 8 }]}>{c.iconLeft}</View>
                <Text style={styles.text}>{c.name}</Text>
              </View>
              <Text style={styles.text}>{c.iconRight}</Text>
            </Pressable>
          </View>
        );
      })}
    </>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 256,
  },
  text: {
    color: '#4B5563',
  },
  iconRightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popoverWrapper: {
    backgroundColor: '#F3F4F6',
    shadowColor: '#E5E7EB',
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    // borderRadius: 10,
    width: 160,
  },
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const commands = [
  {
    iconLeft: <Feather name="scissors" size={24} color="#4B5563" />,
    name: 'Cut',
    iconRight: (
      <View style={styles.iconRightWrapper}>
        <MaterialCommunityIcons
          name="apple-keyboard-command"
          size={18}
          color="#6B7280"
        />
        <Text style={{ marginLeft: 2 }}>X</Text>
      </View>
    ),
  },
  {
    iconLeft: <Feather name="copy" size={24} color="#4B5563" />,
    name: 'Copy',
    iconRight: (
      <View style={styles.iconRightWrapper}>
        <MaterialCommunityIcons
          name="apple-keyboard-command"
          size={18}
          color="#6B7280"
        />
        <Text style={{ marginLeft: 2 }}>C</Text>
      </View>
    ),
  },
  {
    iconLeft: <Fontisto name="paste" size={24} color="#4B5563" />,
    name: 'Paste',
    iconRight: (
      <View style={styles.iconRightWrapper}>
        <MaterialCommunityIcons
          name="apple-keyboard-command"
          size={18}
          color="#6B7280"
        />
        <Text style={{ marginLeft: 2 }}>V</Text>
      </View>
    ),
  },
];
