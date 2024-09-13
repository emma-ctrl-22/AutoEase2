import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firebase configuration

const AddService = ({ navigation }) => {
  const [businessType, setBusinessType] = useState('carWash');
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [carName, setCarName] = useState('');
  const [carDescription, setCarDescription] = useState('');
  const [businessId, setBusinessId] = useState(''); // Fetch this dynamically or from context

  useEffect(() => {
    // Fetch the business ID from context or some global state if needed
    // For demonstration, using a placeholder value
    setBusinessId('sampleBusinessId');
  }, []);

  const handleAddService = async () => {
    if (!serviceName || !price || (businessType === 'carRental' && (!carName || !carDescription))) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      const serviceData = {
        serviceName,
        price,
        carName: businessType === 'carRental' ? carName : undefined,
        carDescription: businessType === 'carRental' ? carDescription : undefined,
        businessId,
      };

      await setDoc(doc(collection(db, 'services')), serviceData);

      Alert.alert('Success', 'Service added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding service:', error);
      Alert.alert('Error', 'Failed to add service. Please try again.');
    }
  };

  // Define the tabs
  const tabs = [
    { label: 'Car Wash', value: 'carWash' },
    { label: 'Car Rental', value: 'carRental' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Service</Text>

      {/* Top Tabs for Business Type Selection */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.value}
            style={[
              styles.tab,
              businessType === tab.value && styles.activeTab,
            ]}
            onPress={() => setBusinessType(tab.value)}
          >
            <Text
              style={[
                styles.tabLabel,
                businessType === tab.value && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Inputs for Service Details */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Service Name</Text>
        <TextInput
          style={styles.input}
          value={serviceName}
          onChangeText={setServiceName}
          placeholder="Enter service name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter price"
          keyboardType="numeric"
        />
      </View>

      {/* Additional Inputs for Car Rental */}
      {businessType === 'carRental' && (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Car Name</Text>
            <TextInput
              style={styles.input}
              value={carName}
              onChangeText={setCarName}
              placeholder="Enter car name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Car Description</Text>
            <TextInput
              style={styles.input}
              value={carDescription}
              onChangeText={setCarDescription}
              placeholder="Enter car description"
            />
          </View>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddService}>
        <Text style={styles.buttonText}>Add Service</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#eee',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  activeTab: {
    backgroundColor: '#1C3530',
    borderColor: '#1C3530',
  },
  tabLabel: {
    fontSize: 16,
    color: '#000',
  },
  activeTabLabel: {
    color: '#fff',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#1C3530',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, // Added marginTop for spacing
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddService;
