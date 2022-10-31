/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DashboardScreen from '../screens/DashboardScreen';
import DoctorAppointment from '../screens/DoctorAppointment';
import LabAppointmentScreen from '../screens/LabAppointment';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import OrderMedicinesScreen from '../screens/OrderMedicines';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import axios from 'axios';
import { Badge } from 'react-native-paper';
import { useEffect, useState } from 'react';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [cartCount, setCartCount] = useState<number>(0);

  const updateCartCount = async () => {
    const response = await fetch("http://192.168.225.120:8080/cart/1")
    const data = await response.json()
    setCartCount(data.length)
  }

  useEffect(() => {
    updateCartCount();
  });

  function addToCart(productId: number, quantity: number) {
    axios.post('http://192.168.225.120:8080/cart/', {
        userId: '1',
        productId,
        quantity: `${quantity}`
    })
      .then(updateCartCount)
      .catch(console.log);
  }

  function OrderMedicinesWithCallbackFn(props: any) {
    return <OrderMedicinesScreen {...props} addToCart={addToCart}/>
  }

  function DashboardScreenWithCallbackFn(props: any) {
    return <DashboardScreen {...props} addToCart={addToCart}/>
  }

  return (
    <BottomTab.Navigator
      initialRouteName="OrderMedicines"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Dashboard') {
            return (
              <Ionicons
                name={
                  focused
                    ? 'md-list'
                    : 'md-list-outline'
                }
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'DoctorAppointment') {
            return (
              <Ionicons
              name={
                focused
                  ? 'ios-calendar'
                  : 'ios-calendar-outline'
              }
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'OrderMedicines') {
            return (
              <Ionicons
              name={
                focused
                  ? 'ios-cart'
                  : 'ios-cart-outline'
              }
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'tomato',
      })}>
      <BottomTab.Screen
        name="Dashboard"
        component={DashboardScreenWithCallbackFn}
        options={({ navigation }: RootTabScreenProps<'Dashboard'>) => ({
          title: 'Dashboard',
        })}
      />
      <BottomTab.Screen
        name="DoctorAppointment"
        component={DoctorAppointment}
        options={{
          title: 'Schedule Appointment',
        }}
      />
      <BottomTab.Screen
        name="OrderMedicines"
        component={OrderMedicinesWithCallbackFn}
        options={({ navigation }: RootTabScreenProps<'OrderMedicines'>) => ({
          title: 'Order Medicines',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              {cartCount > 0 ? <Badge>{cartCount}</Badge> : null}
              <FontAwesome
                name="shopping-cart"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
