import { Text, StyleSheet, ScrollView, View, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from '../contextAPI/AudioProvider'
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import LibraryItem from '../components/LibraryItem';
import OptionModal from '../components/OptionModal';

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

  rowRenderer = (type, item) => {
    return <View style={styles.container}><LibraryItem title={item.filename} duration={item.duration} onOptionPress={() => {
      this.currentItem = item;
      this.setState({...this.state, optionModalVisible: true})
    }}/></View>
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
