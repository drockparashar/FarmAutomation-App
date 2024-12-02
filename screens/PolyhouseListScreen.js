import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PolyhouseListScreen = ({ navigation }) => {
  const [polyhouses, setPolyhouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user's polyhouses
  const fetchPolyhouses = async () => {
    try {
      setIsLoading(true); // Show loading indicator
      const token = await AsyncStorage.getItem('user-token'); // Get the token
  
      if (!token) {
        Alert.alert('Authentication Error', 'User token not found. Please log in again.');
        return;
      }
  
      const response = await axios.get('http://192.168.55.243:3003/api/polyhouses', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setPolyhouses(response.data); // Assuming response.data contains the polyhouses array
    } catch (error) {
      console.error('Error fetching polyhouses:', error);
      Alert.alert(
        'Error',
        error.response?.data?.error || 'Unable to fetch polyhouses. Please try again later.'
      );
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  useEffect(() => {
    fetchPolyhouses();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#4ECDC4" />
      ) : (
        <>
          <FlatList
            data={polyhouses}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.polyhouseItem}
                onPress={() => navigation.navigate('PolyhouseDetail', { polyhouse: item })}
              >
                <Text style={styles.polyhouseName}>{item.name}</Text>
                <Text style={styles.polyhouseLocation}>{item.location.address || 'No address provided'}</Text>
              </TouchableOpacity>
            )}
            ListHeaderComponent={
              <Text style={styles.headerText}>My Polyhouses</Text>
            }
          />
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('CreatePolyhouse')}
          >
            <Text style={styles.createButtonText}>Add New Polyhouse</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default PolyhouseListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  polyhouseItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  polyhouseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  polyhouseLocation: {
    fontSize: 14,
    color: '#666',
  },
  createButton: {
    marginTop: 20,
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
