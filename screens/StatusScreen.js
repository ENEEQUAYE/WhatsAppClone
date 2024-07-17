import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Status Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StatusScreen;
