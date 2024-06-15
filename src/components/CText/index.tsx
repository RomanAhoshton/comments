import { Text } from 'react-native';
import React from 'react';

interface TextProps {
  styles: {
    color: string;
    fontSize: number;
    marginBottom?: number;
  };
  text: string;
}

export default ({ styles, text }: TextProps) => {
  return (
    <Text
      style={{
        ...styles,
      }}
    >
      {text}
    </Text>
  );
};
