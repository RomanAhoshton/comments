import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { styles } from './styles';
import { useAvatar } from '../../hooks/useAvatar';
import { useTheme } from '../../hooks/useTheme';
import { colors } from '../../helpers';

export default ({ user }: any) => {
  const { pickImage, image } = useAvatar();
  const { theme } = useTheme();

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
        <View
          style={[
            styles.noImageAvatar,
            { backgroundColor: theme === 'dark' ? colors.dark : colors.white },
          ]}
        >
          <Text style={styles.textLogo}>{user?.displayName?.charAt(0)}</Text>
        </View>
      )}
    </Pressable>
  );
};
