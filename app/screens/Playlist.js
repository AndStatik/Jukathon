import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Playlist() {
  return (
    <View style={styles.container}>
      <Text>Playlist</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B3D3F',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
