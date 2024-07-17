import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatList from './screens/ChatList';
import ChatScreen from './screens/ChatScreen';
import { Ionicons } from '@expo/vector-icons'; // Importing icons

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ChatList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#075E54', // WhatsApp header color
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="ChatList"
          component={ChatList}
          options={{
            title: 'WhatsApp',
            headerRight: () => (
              <Ionicons name="search" size={24} color="white" style={{ marginRight: 15 }} />
            ),
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({ route }) => ({
            title: route.params.name,
            headerLeft: () => (
              <Ionicons name="arrow-back" size={24} color="white" style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="videocam" size={24} color="white" style={{ marginRight: 15 }} />
                <Ionicons name="call" size={24} color="white" style={{ marginRight: 15 }} />
                <Ionicons name="ellipsis-vertical" size={24} color="white" style={{ marginRight: 15 }} />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
