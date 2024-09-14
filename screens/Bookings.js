import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { auth, db } from '../firebaseConfig'; // Adjust the path as necessary
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Bookings() {
  const [userId, setUserId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        // Handle user not logged in
        setUserId(null);
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchBookings = async () => {
        try {
          // Fetch requests where userId matches the logged-in user
          const requestsRef = collection(db, 'requests');
          const q = query(requestsRef, where('userId', '==', userId));
          const querySnapshot = await getDocs(q);

          const bookingsData = [];

          for (const docSnap of querySnapshot.docs) {
            const requestData = docSnap.data();

            // Fetch service details using serviceId
            const serviceRef = doc(db, 'services', requestData.serviceId);
            const serviceSnap = await getDoc(serviceRef);

            if (serviceSnap.exists()) {
              const serviceData = serviceSnap.data();

              bookingsData.push({
                id: docSnap.id,
                requestId: docSnap.id,
                serviceId: requestData.serviceId,
                status: requestData.status,
                serviceName: serviceData.serviceName,
                serviceType: serviceData.serviceType,
                price: serviceData.price,
                // Add any other fields you need from serviceData
              });
            } else {
              console.log('No such service!');
            }
          }

          setBookings(bookingsData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching bookings: ', error);
          setLoading(false);
        }
      };

      fetchBookings();
    }
  }, [userId]);

  const handleMakePayment = (booking) => {
    // Handle payment logic here
    // For example, navigate to a payment screen or use a payment API
    console.log('Make payment for booking:', booking);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Bookings</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : bookings.length === 0 ? (
        <Text style={styles.noBookingsText}>No bookings found.</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookingItem}>
              <Text style={styles.item}>{item.serviceName}</Text>
              <Text style={styles.type}>{item.serviceType}</Text>
              <Text style={styles.amount}>Price: ${item.price}</Text>
              <View style={styles.statusContainer}>
                {item.status === 'pending' ? (
                  <Text style={styles.pendingBadge}>Pending</Text>
                ) : item.status === 'accepted' ? (
                  <TouchableOpacity
                    style={styles.paymentButton}
                    onPress={() => handleMakePayment(item)}
                  >
                    <Text style={styles.paymentButtonText}>Make Payment</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.statusText}>{item.status}</Text>
                )}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
    marginLeft: 20,
  },
  bookingItem: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignSelf: 'center',
  },
  item: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  type: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  amount: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  statusContainer: {
    marginTop: 10,
  },
  pendingBadge: {
    backgroundColor: 'orange',
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  paymentButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  statusText: {
    fontSize: 16,
    color: '#777',
  },
  noBookingsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#777',
  },
});
