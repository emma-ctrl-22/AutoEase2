import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { db, auth } from '../firebaseConfig'; // Adjust the import based on your Firebase config
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function AllRequest({ navigation }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert('Error', 'No user is logged in.');
          navigation.goBack();
          return;
        }

        const userId = user.uid;

        // Step 1: Fetch services for the logged-in user
        const servicesQuery = query(
          collection(db, 'services'),
          where('businessId', '==', userId) // Filter services by user's business ID
        );
        const servicesSnapshot = await getDocs(servicesQuery);
        const servicesMap = {};
        servicesSnapshot.docs.forEach(doc => {
          servicesMap[doc.id] = doc.data(); // Store service details by ID
        });

        // Step 2: Fetch requests based on the service IDs
        const requestsQuery = query(
          collection(db, 'requests'),
          where('serviceId', 'in', Object.keys(servicesMap)) // Filter requests by service IDs
        );
        const requestsSnapshot = await getDocs(requestsQuery);

        const fetchedRequests = await Promise.all(requestsSnapshot.docs.map(async (doc) => {
          const requestData = { id: doc.id, ...doc.data() };
          console.log(requestData);

          // Fetch user details based on userId in the request
          const userQuery = query(
            collection(db, 'users'),
            where('userId', '==', requestData.userId) // Assuming userId is stored in requests
          );
          const userSnapshot = await getDocs(userQuery);
          const userData = userSnapshot.docs.length > 0 ? userSnapshot.docs[0].data() : null;

          return {
            ...requestData,
            service: servicesMap[requestData.serviceId], // Add service details
            userFullName: userData ? userData.fullName : 'Unknown User', // Add user full name
          };
        }));

        setRequests(fetchedRequests);
      } catch (error) {
        console.error("Error fetching data: ", error);
        Alert.alert('Error', 'Failed to fetch requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [navigation]);

  const handleAccept = (id) => {
    Alert.alert('Request Accepted', `You have accepted request ${id}`);
    // Here you can update the request status in Firestore
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };

  const handleReject = (id) => {
    Alert.alert('Request Rejected', `You have rejected request ${id}`);
    // Here you can update the request status in Firestore
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Image source={{ uri: item?.service.imageUrl }} style={styles.serviceImage} />
      <View style={styles.requestInfo}>
        <Text style={styles.customerName}>{item.userFullName}</Text>
        <Text style={styles.serviceName}>{item.service.serviceName}</Text>
        <Text style={styles.servicePrice}>Price: {item.service.price}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => handleAccept(item.id)}
          style={styles.button}
        >
          <Ionicons name="checkmark-circle" size={28} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleReject(item.id)}
          style={styles.button}
        >
          <Ionicons name="close-circle" size={28} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading requests...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No requests available.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  requestInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceName: {
    fontSize: 16,
    color: '#555',
  },
  servicePrice: {
    fontSize: 14,
    color: '#888',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
