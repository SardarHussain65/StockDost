// This component is a custom input field that can be used throughout the application.
import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { colors } from '../../styles/colors';

const CustomInput = ({ control, name, rules = {}, placeholder, secureTextEntry, label }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <Text style={styles.label}>{label}</Text>
          <View style={[styles.container, { borderColor: error ? 'red' : colors.border }]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={colors.border}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && <Text style={styles.errorText}>{error.message || 'Error'}</Text>}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '100%',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    height: 50,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
});

export default CustomInput;
