// src/services/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const storeToken = async (token) => {
	try {
		await AsyncStorage.setItem('access_token', token);
	} catch (error) {
		console.error('Error storing token:', error);
	}
};

const getAccessToken = async () => {
	try {
		const accessToken = await AsyncStorage.getItem('access_token');
		return accessToken;
	} catch (error) {
		console.error('Error getting access token:', error);
		return null;
	}
};

const login = async (email, password) => {
	try {
		const response = await axios.post(
			'https://thewiseowl.pythonanywhere.com/storeowner/login/',
			{
				email,
				password,
			}
		);

		const { store_name, token, username: Username } = response.data;

		// Store the token securely
		await storeToken(token);

		// Return user information if needed
		return { store_name, Username };
	} catch (error) {
		console.error('Login failed', error);
		throw error;
	}
};

const register = async (store_name, email, password) => {
	try {
		if (!store_name || !email || !password) {
			throw new Error('Name, email, and password are required fields.');
		}

		const accessToken = await getAccessToken();

		const response = await axios.post(
			'https://thewiseowl.pythonanywhere.com/salesperson/create/',
			{
				name: store_name,
				email,
				password,
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		console.log('Registration successful:', response.data);
		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 500 && error.response.data.error === 'Email already exists') {
			console.error('Registration failed. Email already exists.');
			// Handle the case where email already exists (e.g., show a message to the user)
		} else {
			console.error('Registration failed', error.response ? error.response.data : error.message);
		}
		throw error;
	}
};


export { login, register };