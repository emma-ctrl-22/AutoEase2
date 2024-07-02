import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabNavigator from './MainTabNavigator';
import PaymentMethod from '../screens/PaymentMethod';
import Settings from '../screens/Settings';
import { View ,TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: "AutoEase",
        headerRight: () => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}
              style={{
                height: "100%",
                width: 40,
                borderRadius: 20,
                overflow: "hidden",
                marginRight: 20,
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
              }}
            >
              <Avatar.Text size={30} label="EN" />
            </TouchableOpacity>
          );
        },
      }}
    >
      <Drawer.Screen name="Home" component={MainTabNavigator} />
      <Drawer.Screen name="PaymentMethods" component={PaymentMethod} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
