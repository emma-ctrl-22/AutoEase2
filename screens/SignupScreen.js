import React, { useState } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, Pressable, Alert
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 
import { auth, db } from '../firebaseConfig'; // Firebase imports
import Ionicons from '@expo/vector-icons/Ionicons';

// Custom Tabs Component
const Tab = ({ selectedTab, onPress, title }) => (
  <TouchableOpacity
    style={[styles.tabButton, selectedTab === title && styles.activeTab]}
    onPress={() => onPress(title)}
  >
    <Text style={[styles.tabText, selectedTab === title && styles.activeTabText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const SignupScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('User');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  // Business-specific state
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [location, setLocation] = useState(''); // Will handle location logic here

  const handleSignup = async () => {
    if (!email || !password || (selectedTab === 'User' && !fullName)) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (selectedTab === 'User') {
        // Save user details in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          fullName: fullName,
          role: 'customer',
        });
      } else if (selectedTab === 'Business Owner') {
        if (!businessName || !businessType || !location) {
          Alert.alert('Error', 'Please fill all business fields.');
          return;
        }
        // Save business details in Firestore
        await setDoc(doc(db, 'businesses', user.uid), {
          email: user.email,
          businessName: businessName,
          businessType: businessType,
          location: location,
          role: 'businessOwner',
        });
      }

      Alert.alert('Sign Up Successful', `Welcome, ${selectedTab}! Log in to start using AutoEase`);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Sign up error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/car1.png')} style={styles.imageStyle} />
        <Text style={styles.logoText}>
          Welcome! Please sign up to continue.
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <Tab selectedTab={selectedTab} onPress={setSelectedTab} title="User" />
        <Tab selectedTab={selectedTab} onPress={setSelectedTab} title="Business Owner" />
      </View>

      <View style={styles.formContainer}>
        {/* Render form based on selected tab */}
        {selectedTab === 'User' ? (
          <>
            <View style={styles.inputGroup}>
              <Ionicons name="person" size={24} color="black" style={styles.sideIcon} />
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
                placeholder="Full Name"
              />
            </View>
            <View style={styles.inputGroup}>
              <Ionicons name="mail" size={24} color="black" style={styles.sideIcon} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputGroup}>
              <Ionicons name="lock-closed-sharp" size={24} color="black" style={styles.sideIcon} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Password"
                secureTextEntry
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.inputGroup}>
              <Ionicons name="business" size={24} color="black" style={styles.sideIcon} />
              <TextInput
                value={businessName}
                onChangeText={setBusinessName}
                style={styles.input}
                placeholder="Business Name"
              />
            </View>
            <View style={styles.inputGroup}>
              <Ionicons name="mail" size={24} color="black" style={styles.sideIcon} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputGroup}>
              <Ionicons name="lock-closed-sharp" size={24} color="black" style={styles.sideIcon} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Password"
                secureTextEntry
              />
            </View>
            <View style={styles.inputGroup}>
              <Ionicons name="briefcase" size={24} color="black" style={styles.sideIcon} />
              <TextInput
                value={businessType}
                onChangeText={setBusinessType}
                style={styles.input}
                placeholder="Business Type (e.g., Car Wash, Rentals)"
              />
            </View>
            <View style={styles.inputGroup}>
              <Ionicons name="location-sharp" size={24} color="black" style={styles.sideIcon} />
              <TextInput
                value={location}
                onChangeText={setLocation}
                style={styles.input}
                placeholder="Business Location"
                // In real implementation, trigger map location picker here
              />
            </View>
          </>
        )}
      </View>

      <View style={styles.loginGroup}>
        <TouchableOpacity style={styles.registerBtn} onPress={handleSignup}>
          <Text style={{ color: "#fff", fontSize: 16 }}>Sign Up</Text>
        </TouchableOpacity>

        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signTxt}>Already have an account? Log In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

// Styles copied and adapted from LoginScreen
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  logoContainer: {
    width: "75%",
    height: "15%",
    display: "flex",
    flexDirection: "column",
    gap: "0.3%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "5%",
  },
  logoText: {
    textAlign: 'center',
    width: "95%",
    color: "#000000",
    marginBottom: "2%"
  },
  
  imageStyle: {
    width: 150,
    height: '80%'
  },
  formContainer: {
    width: "100%",
    height: "50%",
    marginTop: "2%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  inputGroup: {
    backgroundColor: "#ECECEC",
    width: "85%",
    height: "15%",
    borderRadius: 5,
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between"
  },
  sideIcon: {
    marginLeft: "4%"
  },
  registerBtn: {
    width: "100%",
    height: "30%",
    backgroundColor: "#1C3530",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
    fontSize: 18,
    marginLeft: "2%"
  },
  loginGroup: {
    position: 'absolute',
    width: "90%",
    marginBottom: 0,
    top: "80%",
    height: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  tabContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    marginVertical: 10
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
    borderRadius: 5
  },
  activeTab: {
    backgroundColor: '#1C3530'
  },
  activeTabText: {
    color: '#fff'
  },
  tabText: {
    fontSize: 16,
    color: '#000'
  },
  signTxt: {
    color: '#1C3530',
    fontWeight: '600'
  }
});

export default SignupScreen;
