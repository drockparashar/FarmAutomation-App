import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePolyhouseScreen = ({ navigation }) => {
  const [polyhouseName, setPolyhouseName] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create a new polyhouse
  const handleCreatePolyhouse = async () => {
    if (!polyhouseName || !location) {
      Alert.alert('Validation Error', 'Please enter both a name and a location.');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('user-token');
      const response = await axios.post(
        'http://192.168.71.243:3000/api/polyhouses',
        {
          name: polyhouseName,
          location: { address: location },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert('Success', 'Polyhouse created successfully!');
      setPolyhouseName('');
      setLocation('');
      navigation.goBack(); // Go back to the list page
    } catch (error) {
      console.error('Error creating polyhouse:', error);
      Alert.alert('Error', 'Unable to create polyhouse. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a New Polyhouse</Text>
      <TextInput
        placeholder="Enter Polyhouse Name"
        style={styles.input}
        value={polyhouseName}
        onChangeText={setPolyhouseName}
      />
      <TextInput
        placeholder="Enter Location (Address)"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreatePolyhouse}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.createButtonText}>Create Polyhouse</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CreatePolyhouseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
