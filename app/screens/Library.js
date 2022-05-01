import { Text, StyleSheet, ScrollView, View, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from '../contextAPI/AudioProvider'
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import LibraryItem from '../components/LibraryItem';
import OptionModal from '../components/OptionModal';
import { Audio } from 'expo-av';

export default class AudioList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
      playbackObj: null,
      soundsObj: null,
      currentAudio: {},
    }

    this.currentItem = {}
  }

  layoutProvider = new LayoutProvider((index) => 'audio', (type, dim) => {
    dim.width = Dimensions.get('window').width;
    dim.height = 70;
  });

  handleAudioPress = async (audioItem) => {
    try {
      // playing audio for the first time
      if (this.state.soundsObj === null) {
        const playbackObj = new Audio.Sound();
        const status = await playbackObj.loadAsync(
          {uri: audioItem.uri},
          {shouldPlay: true}
        );
        return this.setState({
          ...this.state,
          currentAudio: audioItem,
          playbackObj: playbackObj,
          soundsObj: status}
        );
      }
      // pause audio
      if (this.state.soundsObj.isLoaded && this.state.soundsObj.isPlaying) {
        const status = await this.state.playbackObj.setStatusAsync({shouldPlay: false});
        return this.setState({...this.state, soundsObj: status})
      }
      // resume audio
      if (this.state.soundsObj.isLoaded && !this.state.soundsObj.isPlaying && this.state.currentAudio.id === audioItem.id) {
        const status = await this.state.playbackObj.playAsync();
        return this.setState({...this.state, soundsObj: status})
      }
    } catch (error) {
      console.error(error);
    }
  }

  rowRenderer = (type, item) => {
    return <View style={styles.container}>
      <LibraryItem
        title={item.filename}
        duration={item.duration}
        onAudioPress={() => this.handleAudioPress(item)}
        onOptionPress={() => {
          this.currentItem = item;
          this.setState({...this.state, optionModalVisible: true})
        }}
      />
    </View>
  }

  render() {
    return (
      // Prone to errors if over 100 items are loading
      // <ScrollView>
      //   <View style={styles.container}>
      //   {this.context.audioFiles.map(item => (
      //     <Text
      //       style={styles.item}
      //       key={item.id}
      //     >
      //       {item.filename}
      //     </Text>
      //   ))}
      //   </View>
      // </ScrollView>
      <AudioContext.Consumer>
        {({ dataProvider, }) => {
          return (
          <>
            <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} />
            <OptionModal
              onPlayPress={() => console.log('Playing music')}
              onPlaylistPress={() => console.log('Adding to playlist')}
              currentItem={this.currentItem}
              onClose={() => this.setState({...this.state, optionModalVisible: false})}
              visible={this.state.optionModalVisible}
            />
          </>
        )}}
      </AudioContext.Consumer>
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
})
