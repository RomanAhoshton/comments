import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../helpers';

export default () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size='large' color={colors.blue} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    top: '50%',
  },
});
