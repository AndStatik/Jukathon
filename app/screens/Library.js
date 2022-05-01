import { Text, StyleSheet, ScrollView, View, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from '../contextAPI/AudioProvider'
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import LibraryItem from '../components/LibraryItem';
import OptionModal from '../components/OptionModal';
import { Audio } from 'expo-av';
import { pause, play, playNext, resume } from '../misc/audioController';

export default class AudioList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
    }

    this.currentItem = {}
  }

  layoutProvider = new LayoutProvider((index) => 'audio', (type, dim) => {
    dim.width = Dimensions.get('window').width;
    dim.height = 70;
  });

  handleAudioPress = async (audioItem) => {
    try {
      const { soundsObj, playbackObj, currentAudio, updateState, audioFiles} = this.context;
      // playing audio for the first time
      if (soundsObj === null) {
        const playbackObj = new Audio.Sound();
        const status = await play(playbackObj, audioItem.uri)
        const index = audioFiles.indexOf(audioItem)
        return updateState(this.context, {
          currentAudio: audioItem,
          playbackObj: playbackObj,
          soundsObj: status,
          isPlaying: true,
          currentAudioIndex: index
        });
      }
      // pause audio
      if (soundsObj.isLoaded && soundsObj.isPlaying && currentAudio.id === audioItem.id) {
        const status = await pause(playbackObj);
        return updateState(this.context, {
          soundsObj: status,
          isPlaying: false
        });
      }
      // resume audio
      if (soundsObj.isLoaded && !soundsObj.isPlaying && currentAudio.id === audioItem.id) {
        const status = await resume(playbackObj);
        return updateState(this.context, {
          soundsObj: status,
          isPlaying: true
        });
      }
      // select another audio
      if (soundsObj.isLoaded && currentAudio.id !== audioItem.id) {
        const status = await playNext(playbackObj, audioItem.uri);
        const index = audioFiles.indexOf(audioItem)
        return updateState(this.context, {
          currentAudio: audioItem,
          soundsObj: status,
          isPlaying: true,
          currentAudioIndex: index
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  rowRenderer = (type, item, index, extendedState) => {
    return <View style={styles.container}>
      <LibraryItem
        title={item.filename}
        isPlaying={extendedState.isPlaying}
        activeItem={this.context.currentAudioIndex === index}
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
      <AudioContext.Consumer>
        {({ dataProvider, isPlaying }) => {
          return (
          <>
            <RecyclerListView
              dataProvider={dataProvider}
              layoutProvider={this.layoutProvider}
              rowRenderer={this.rowRenderer}
              extendedState={{isPlaying}}
            />
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
