import { getAuth } from 'firebase/auth';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Avatar from '../Avatar';
import { useLogOut } from '../../hooks/useLogOut';
import { colors } from '../../helpers';
import { useTheme } from '../../hooks/useTheme';
import React from 'react';

export default () => {
  const currentUser = getAuth().currentUser;
  const { theme } = useTheme();
  const { LogOut } = useLogOut();

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: theme === 'dark' ? colors.black : colors.white },
      ]}
    >
      <Avatar user={currentUser} />

      <Pressable
        onPress={LogOut}
        style={{
          borderWidth: 2,
          padding: 5,
          borderColor: colors.blue,
          borderRadius: 15,
          marginBottom: 10,
          marginLeft: 20,
        }}
      >
        <Text style={styles.logOutBtn}>Log out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    height: 100,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  logOutBtn: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    padding: 3,
  },
});
