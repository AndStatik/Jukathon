import { Text, View } from 'react-native'
import React, { Component } from 'react'
import * as MediaLibrary from 'expo-media-library'

export default class AudioProvider extends Component {

  constructor(props) {
    super(props)
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
    }
    if (!persmission.granted && persmission.canAskAgain)
  }

  componentDidMount() {
    getPermission()
  }
  render() {
    return (
      <View>
        <Text>AudioProvider</Text>
      </View>
    )
  }
}
