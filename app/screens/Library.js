import { Text, StyleSheet, ScrollView, View, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from '../contextAPI/AudioProvider'
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';

export default class AudioList extends Component {
  static contextType = AudioContext;

  layoutProvider = new LayoutProvider((index) => 'audio', (type, dim) => {
    dim.width = Dimensions.get('window').width;
    dim.height = 70;
  });

  rowRenderer = (type, item) => {
    return <View style={styles.container}><Text style={styles.item}>{item.filename}</Text></View>
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
          return <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} />
        }}
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
