import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Header2 } from '../../../components/common/Header2';
import CustomInput from '../../../components/common/CustomInput';
import { CustomButton } from '../../../components/common/CustomButton';
import { styles } from './styles';
import { logo, onboarding1 } from '../../../assets/images';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

const SignUpScreen = () => {
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
      <Header2 title="Sign Up" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.formContainer}>
          <Image source={onboarding1} style={styles.logo} />
          <CustomInput
            name="name"
            placeholder="Name"
            control={control}
            rules={{ required: true }}
            label="Name"
          />
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
            // secureTextEntry
            rules={{ required: true }}
            label="Password"
          />
          <CustomInput
            name="confirmPassword"
            placeholder="Confirm Password"
            control={control}
            // secureTextEntry
            rules={{ required: true }}
            label="Confirm Password"
          />
          <CustomButton title="Sign Up" onPress={handleSubmit(onSubmit)} style={styles.button} />
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
