import { Text, View, Alert, StyleSheet } from 'react-native'
import React, { Component, createContext } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { DataProvider } from 'recyclerlistview';

export const AudioContext = createContext();

export default class AudioProvider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      audioFiles: [],
      permissionError: false,
      dataProvider: new DataProvider((r1, r2) => r1 !== r2),
      playbackObj: null,
      soundsObj: null,
      currentAudio: {},
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
      const { dataProvider, audioFiles } = this.state;
      let media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio'
      })
      media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: media.totalCount
      })
      this.setState({...this.state, dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]), audioFiles: [...audioFiles, ...media.assets]})
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

  updateState = (prevState, newState = {}) => {
    this.setState({...prevState, ...newState})
  }

  render() {
    const { permissionError, audioFiles, dataProvider, playbackObj, soundsObj, currentAudio } = this.state;
    if (permissionError) return <View style={styles.container}>
      <Text>Please grant access to file system in order to use the app!</Text>
    </View>
    return <AudioContext.Provider value={{ audioFiles, dataProvider, playbackObj, soundsObj, currentAudio, updateState: this.updateState }}>
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
