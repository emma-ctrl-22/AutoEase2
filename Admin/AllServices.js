import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AllServices() {
  // Fake data for services
  const [services, setServices] = useState([
    {
      id: '1',
      serviceName: 'Premium Wash',
      price: '25',
      businessType: 'carWash',
    },
    {
      id: '2',
      serviceName: 'SUV Rental',
      price: '80',
      carName: 'Toyota Highlander',
      carDescription: 'Spacious SUV perfect for family trips.',
      businessType: 'carRental',
    },
    // Add more services as needed
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Service',
      'Are you sure you want to delete this service?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setServices((prevServices) =>
              prevServices.filter((service) => service.id !== id)
            );
          },
        },
      ]
    );
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const handleSave = () => {
    // Update the service in the services list
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === selectedService.id ? selectedService : service
      )
    );
    setModalVisible(false);
    Alert.alert('Success', 'Service updated successfully!');
  };

  const handleChange = (field, value) => {
    setSelectedService({ ...selectedService, [field]: value });
  };

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        <Text style={styles.servicePrice}>${item.price}</Text>
        {item.businessType === 'carRental' && (
          <>
            <Text style={styles.carName}>{item.carName}</Text>
            <Text style={styles.carDescription}>{item.carDescription}</Text>
          </>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => handleEdit(item)}
          style={styles.actionButton}
        >
          <Ionicons name="pencil" size={24} color="#1C3530" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.actionButton}
        >
          <Ionicons name="trash" size={24} color="#D9534F" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Services</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderServiceItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>You have no services.</Text>
        }
        contentContainerStyle={
          services.length === 0 && styles.emptyContainer
        }
      />

      {/* Edit Service Modal */}
      {selectedService && (
        <Modal visible={modalVisible} animationType="slide">
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Service</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Service Name</Text>
              <TextInput
                style={styles.input}
                value={selectedService.serviceName}
                onChangeText={(value) => handleChange('serviceName', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={selectedService.price}
                onChangeText={(value) => handleChange('price', value)}
                keyboardType="numeric"
              />
            </View>

            {selectedService.businessType === 'carRental' && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Car Name</Text>
                  <TextInput
                    style={styles.input}
                    value={selectedService.carName}
                    onChangeText={(value) => handleChange('carName', value)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Car Description</Text>
                  <TextInput
                    style={styles.textArea}
                    value={selectedService.carDescription}
                    onChangeText={(value) =>
                      handleChange('carDescription', value)
                    }
                    multiline
                    numberOfLines={4}
                  />
                </View>
              </>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.buttonText, { color: '#555' }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C3530',
    textAlign: 'center',
    marginBottom: 16,
  },
  serviceItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C3530',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 18,
    color: '#28A745',
    marginBottom: 8,
  },
  carName: {
    fontSize: 18,
    color: '#555',
    marginBottom: 4,
  },
  carDescription: {
    fontSize: 16,
    color: '#777',
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  actionButton: {
    marginLeft: 8,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  // Modal styles
  modalContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1C3530',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:20
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#1C3530',
    marginBottom: 5,
  },
  input: {
    height: 48,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
  },
  textArea: {
    height: 100,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  modalButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#1C3530',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
});
