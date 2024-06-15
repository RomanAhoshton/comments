import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { User } from '../../types';
import { styles } from './styles';
import { useAvatar } from '../../hooks/useAvatar';

export default ({ user }: any) => {
  const { pickImage, image } = useAvatar();

  return (
    <Pressable style={styles.user} onPress={() => pickImage()}>
      {image ? (
        <View>
          <Image
            style={styles.avatar}
            source={{
              uri: image,
            }}
          />
        </View>
      ) : (
        <View style={[styles.noImageAvatar]}>
          <Text style={styles.textLogo}>{user?.displayName?.charAt(0)}</Text>
        </View>
      )}
    </Pressable>
  );
};
