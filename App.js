import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, TextInput, Alert } from 'react-native';
import Modal from 'react-native-modal';
import * as Contacts from 'expo-contacts'; // Import Contacts API
import ChatList from './screens/ChatList';
import ChatScreen from './screens/ChatScreen';
import StatusScreen from './screens/StatusScreen'; 
import CallsScreen from './screens/CallsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

export default function App() {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isSearchVisible, setSearchVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [contacts, setContacts] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        // Filter contacts that have WhatsApp
        const whatsappContacts = data.filter(contact => {
          return contact.phoneNumbers.some(
            phone => phone.label === 'WhatsApp' || phone.label === 'mobile'
          );
        });

        setContacts(whatsappContacts);
      } else {
        Alert.alert('Permissions required', 'Please grant contacts permission to use this feature.');
      }
    })();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const startChat = (contact) => {
    // Logic to start a new chat with the selected contact
    Alert.alert('Start Chat', `Starting chat with ${contact.name}`);
    // Implement your chat starting logic here
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
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
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
          <TouchableOpacity onPress={() => { toggleModal(); navigation.navigate('SettingsScreen'); }}>
            <Text style={styles.modalItem}>Settings</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Message Icon */}
      <TouchableOpacity style={styles.messageIcon} onPress={toggleModal}>
        <Ionicons name="chatbubble-ellipses" size={24} color="white" />
      </TouchableOpacity>
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
  messageIcon: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#075E54',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
