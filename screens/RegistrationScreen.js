// src/screens/RegistrationScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { register } from './services/authService';

const RegistrationScreen = ({ navigation }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleRegistration = async () => {
		try {
			const response = await register(name, email, password);

			// After registration, navigate to the login screen
			navigation.navigate('LoginScreen', { registeredUsername: email });
		} catch (error) {
			console.error('Registration failed', error);
		}
	};

	return (
		<View>
			<Text> Name</Text>
			<TextInput
				placeholder="Enter your store name"
				value={name}
				onChangeText={setName}
			/>
			<Text>Email</Text>
			<TextInput
				placeholder="Enter your email"
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
			<Button title="Register" onPress={handleRegistration} />
		</View>
	);
};

export default RegistrationScreen;
