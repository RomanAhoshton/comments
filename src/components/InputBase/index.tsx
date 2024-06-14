import React, { useState } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../../helpers/index';

interface InputProps {
  label: string;
  value: string;
  setValue: (arg: string) => void;
  errors?: any;
  secure?: boolean;
}

export default ({ label, value, errors, setValue, secure }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const translateY = useState(new Animated.Value(20))[0];

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    if (!value.trim()) {
      setIsFocused(false);
      Animated.timing(translateY, {
        toValue: 20,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.label,
          {
            transform: [{ translateY }],
            fontSize: isFocused ? fontSizes.small : fontSizes.medium,
            color: errors?.message ? colors.red : colors.blue,
          },
        ]}
      >
        {errors?.message ? errors.message : label}
      </Animated.Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: errors?.message ? colors.red : colors.blue,
          },
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChangeText={(text) => setValue(text)}
        cursorColor={colors.white}
        secureTextEntry={secure}
        textContentType='oneTimeCode'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginBottom: 20,
    height: 50,
  },
  label: {
    position: 'absolute',
    left: 12,
    color: colors.blue,
  },
  input: {
    borderBottomWidth: 2,
    fontSize: fontSizes.medium,
    color: colors.blue,
    paddingVertical: 2,
    paddingHorizontal: 12,
  },
});
