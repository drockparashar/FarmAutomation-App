import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// You'll need to install these icons from @expo/vector-icons
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const Card = ({ title, value, icon, color }) => (
  <View style={[styles.card, { borderColor: color }]}>
    <MaterialCommunityIcons name={icon} size={24} color={color} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const ControlButton = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.controlButton} onPress={onPress}>
    <Feather name={icon} size={24} color="#FFF" />
    <Text style={styles.controlButtonText}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradientBackground}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Polyhouse</Text>
            <Text style={styles.subtitle}>Automation System</Text>
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Feather name="settings" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Status Cards */}
          <View style={styles.statusContainer}>
            <Card 
              title="Temperature"
              value="25°C"
              icon="thermometer"
              color="#FF6B6B"
            />
            <Card 
              title="Humidity"
              value="70%"
              icon="water-percent"
              color="#4ECDC4"
            />
            <Card 
              title="Light"
              value="1200 lux"
              icon="white-balance-sunny"
              color="#FFE66D"
            />
          </View>

          {/* Control Section */}
          <Text style={styles.sectionTitle}>Controls</Text>
          <View style={styles.controlsGrid}>
            <ControlButton 
              title="Irrigation"
              icon="droplet"
              onPress={() => {/* Control logic */}}
            />
            <ControlButton 
              title="Temperature"
              icon="thermometer"
              onPress={() => {/* Control logic */}}
            />
            <ControlButton 
              title="Humidity"
              icon="cloud"
              onPress={() => {/* Control logic */}}
            />
            <ControlButton 
              title="Lighting"
              icon="sun"
              onPress={() => {/* Control logic */}}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  gradientBackground: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop:80
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    opacity: 0.8,
  },
  settingsButton: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    width: '48%',
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  controlsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  controlButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  controlButtonText: {
    color: '#FFF',
    marginTop: 8,
    fontSize: 16,
  },
});

export default HomeScreen;