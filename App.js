import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import ChatList from './screens/ChatList';
import ChatScreen from './screens/ChatScreen';
import StatusScreen from './screens/StatusScreen'; 
import CallsScreen from './screens/CallsScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Chats') {
            iconName = 'chatbubble';
          } else if (route.name === 'Status') {
            iconName = 'ellipse';
          } else if (route.name === 'Calls') {
            iconName = 'call';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#075E54',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [
          {
            display: 'flex'
          },
          null
        ]
      })}
    >
      <Tab.Screen name="Chats" component={ChatList} />
      <Tab.Screen name="Status" component={StatusScreen} />
      <Tab.Screen name="Calls" component={CallsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isSearchVisible, setSearchVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeTabs"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#075E54', // WhatsApp header color
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={toggleSearch} style={{ marginRight: 15 }}>
                <Ionicons name="search" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal} style={{ marginRight: 15 }}>
                <Ionicons name="ellipsis-vertical" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            title: 'WhatsApp',
            headerTitle: () => (
              <View>
                {isSearchVisible ? (
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus
                  />
                ) : (
                  <Text style={styles.headerTitle}>WhatsApp</Text>
                )}
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({ route, navigation }) => ({
            title: route.params.name,
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={24}
                color="white"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              />
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
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
        useNativeDriver
      >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => { toggleModal(); alert('New group'); }}>
            <Text style={styles.modalItem}>New group</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { toggleModal(); alert('New broadcast'); }}>
            <Text style={styles.modalItem}>New broadcast</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { toggleModal(); alert('Linked devices'); }}>
            <Text style={styles.modalItem}>Linked devices</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { toggleModal(); alert('Starred messages'); }}>
            <Text style={styles.modalItem}>Starred messages</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { toggleModal(); alert('Settings'); }}>
            <Text style={styles.modalItem}>Settings</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    margin: 0,
    paddingTop: 60,
    paddingRight: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: width * 0.5,
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 10,
    fontSize: 16,
  },
  searchInput: {
    height: 40,
    width: width - 100,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'black',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
