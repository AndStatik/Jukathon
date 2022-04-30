import { Text, StyleSheet, ScrollView, View } from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from '../contextAPI/AudioProvider'

export default class AudioList extends Component {
  static contextType = AudioContext;
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
        {this.context.audioFiles.map(item => (
          <Text
            style={styles.item}
            key={item.id}
          >
            {item.filename}
          </Text>
        ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B3D3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#2f3032',
    alignSelf: 'stretch',
    color: '#898a8b',
    marginTop: 10,
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#898a8b',
    shadowColor: '#cbe91e',
  }
})
