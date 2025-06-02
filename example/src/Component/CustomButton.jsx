import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomButton = ({
  text = 'Click Me',
  onPress = () => {},
  backgroundColor = '#3498db',
  textColor = '#fff',
  icon = null,
  iconSize = 20,
  iconColor = '#fff',
  width = 200,
  height = 50,
  borderRadius = 10,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor, width, height, borderRadius }]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 8,
  },
});
