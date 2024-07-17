import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const chats = [
  { id: '1', name: 'John Doe', message: 'Hey, how are you?' },
  { id: '2', name: 'Jane Smith', message: 'What’s up?' },
  // Add more chat data here
];

const ChatList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { name: item.name })}>
            <View style={styles.chatItem}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatMessage}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatName: {
    fontWeight: 'bold',
  },
  chatMessage: {
    color: '#666',
  },
});

export default ChatList;
