import React from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Header2 } from '../../../components/common/Header2';
import CustomInput from '../../../components/common/CustomInput';
import { CustomButton } from '../../../components/common/CustomButton';
import { styles } from './styles';
import { onboarding3 } from '../../../assets/images';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignInScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate('Main', { screen: 'Home' });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <Header2 title="Sign In" />
        <View style={styles.formContainer}>
          <Image source={onboarding3} style={styles.logo} />
          <CustomInput
            name="email"
            placeholder="Email"
            control={control}
            rules={{ required: true }}
            label="Email"
          />
          <CustomInput
            name="password"
            placeholder="Password"
            control={control}
            rules={{ required: true }}
            label="Password"
          />
          <CustomButton title="Sign In" onPress={handleSubmit(onSubmit)} style={styles.button} />
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
