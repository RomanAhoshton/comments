import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Keyboard,
  Pressable,
  Text,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames, colors, fontSizes, space } from '../../helpers';
import { styles } from './styles';
import InputBase from '../../components/InputBase';
import { useLogin } from '../../hooks/useLogin';
import SButton from '../../components/SButton';
import CText from '../../components/CText';
import { FormData } from '../../types';
import CLoader from '../../components/CLoader';

const LoginScreen = () => {
  const formRef = useRef<null | ScrollView>(null);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { Login, isLoading } = useLogin({ reset });

  const onSubmit = (data: FormData) => {
    Login(data);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {isLoading && <CLoader />}
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={100}
        style={styles.keyboardAvoiding}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container} ref={formRef}>
            <View style={styles.textBlock}>
              <Text style={styles.subtitle}> Comment App</Text>
              <CText
                styles={{
                  color: colors.blue,
                  fontSize: fontSizes.medium,
                  marginBottom: space.medium,
                }}
                text='Log in and add your first comment'
              />
            </View>

            <Controller
              control={control}
              rules={{
                required: 'This field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <InputBase
                  label='Email'
                  value={value}
                  setValue={onChange}
                  errors={errors.email}
                />
              )}
              name='email'
            />

            <Controller
              control={control}
              rules={{
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <InputBase
                  label='Password'
                  value={value}
                  setValue={onChange}
                  errors={errors.password}
                  secure={true}
                />
              )}
              name='password'
            />
            <View style={styles.actions}>
              <SButton
                text='Log in'
                handleSubmit={handleSubmit(onSubmit)}
                color={colors.blue}
              />
              <Pressable
                onPress={() =>
                  navigation.navigate(ScreenNames.RegisterScreen as never)
                }
                style={{ marginTop: 20 }}
              >
                <CText
                  styles={{
                    color: colors.blue,
                    fontSize: fontSizes.medium,
                  }}
                  text='Back to Create Account'
                />
              </Pressable>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
