import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const SettingInput = ({ label, value, onChangeText, placeholder, icon, keyboardType = 'default', unit }) => {
  return (
    <View style={styles.settingCard}>
      <View style={styles.settingHeader}>
        <MaterialCommunityIcons name={icon} size={24} color="#4c669f" />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor="#999"
        />
        {unit && <Text style={styles.unitText}>{unit}</Text>}
      </View>
    </View>
  );
};

const SettingsScreen = ({ navigation }) => {
  const [temperature, setTemperature] = useState('25');
  const [humidity, setHumidity] = useState('70');
  const [irrigation, setIrrigation] = useState('6');
  const [light, setLight] = useState('1200');

  const handleSave = () => {
    // Save settings logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradientBackground}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Settings</Text>
          </View>

          <View style={styles.settingsContainer}>
            <SettingInput
              label="Target Temperature"
              value={temperature}
              onChangeText={setTemperature}
              placeholder="25"
              keyboardType="numeric"
              icon="thermometer"
              unit="°C"
            />

            <SettingInput
              label="Target Humidity"
              value={humidity}
              onChangeText={setHumidity}
              placeholder="70"
              keyboardType="numeric"
              icon="water-percent"
              unit="%"
            />

            <SettingInput
              label="Irrigation Interval"
              value={irrigation}
              onChangeText={setIrrigation}
              placeholder="6"
              keyboardType="numeric"
              icon="water-pump"
              unit="hours"
            />

            <SettingInput
              label="Light Intensity Threshold"
              value={light}
              onChangeText={setLight}
              placeholder="1200"
              keyboardType="numeric"
              icon="white-balance-sunny"
              unit="lux"
            />

            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save Settings</Text>
            </TouchableOpacity>
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
    paddingTop:60
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 15,
  },
  settingsContainer: {
    marginBottom: 20,
  },
  settingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 12,
    color: '#333',
  },
  unitText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  saveButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default SettingsScreen;