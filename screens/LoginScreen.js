// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { login } from './services/authService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userInfo = await login(email, password);

      console.log('Login successful:', userInfo);

      // Navigate to the appropriate screen based on user data
      navigation.navigate('RegistrationScreen', { userInfo });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput
        placeholder="Enter your username"
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password</Text>
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
