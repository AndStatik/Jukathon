import { Text, View, Alert, StyleSheet } from 'react-native'
import React, { Component, createContext } from 'react'
import * as MediaLibrary from 'expo-media-library'

export const AudioContext = createContext();

export default class AudioProvider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      audioFiles: [],
      permissionError: false
    }
  }

  permissionAlert = () => {
    Alert.alert("Permission Required", "This app need to read audio files to work", [{
      text: 'grant permission',
      onPress: () => this.getPermission()
    }, {
      text: 'cancel',
      onPress: () => this.permissionAlert()
    }])
  }

  getAudioFiles = async () => {
    try{
      let media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio'
      })
      media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: media.totalCount
      })
      console.log(media)
      this.setState({...this.state, audioFiles: media.assets})
    } catch (error) {
      console.log(error);
    }
  }

  getPermission = async () => {
  // {
  //   "canAskAgain": true,
  //   "expires": "never",
  //   "granted": false,
  //   "status": "undetermined",
  // }
    const persmission = await MediaLibrary.getPermissionsAsync();
    if (persmission.granted) {
      // get audio files
      this.getAudioFiles();
    }
    if (!persmission.granted && persmission.canAskAgain) {
      const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
      if (status === 'denied' && canAskAgain) {
        // display and alert that user must allow to proceed
        this.permissionAlert();
      }
      if (status === 'denied' && !canAskAgain) {
        // display error to user
        this.setState({...this.state, permissionError: true})
      }
      if (status === 'granted') {
        // get audio files
      this.getAudioFiles();
      }
    }
  }

  componentDidMount() {
    this.getPermission()
  }
  render() {
    if (this.state.permissionError) return <View style={styles.container}>
      <Text>Please grant access to file system in order to use the app!</Text>
    </View>
    return <AudioContext.Provider value={{audioFiles: this.state.audioFiles}}>
      {this.props.children}
    </AudioContext.Provider>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B3D3F',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
