import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native-web';

const convertTime = (duration) => {
  let ms = duration * 1000; // specific to my case
  let min = Math.floor(ms / 60000);
  let sec = ((ms % 60000) / 1000).toFixed(0);
  return min + ':' + (sec < 10 ? '0' : '') + sec;
}

export default function LibraryItem({title, duration, onOptionPress}) {
  return (
    <>
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.thumbnail}>
          <Text style={styles.thumbnailText}>{title[0]}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
          <Text style={styles.timeText}>{convertTime(duration)}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <SimpleLineIcons onPress={onOptionPress} name="options-vertical" size={20} color="black" />
      </View>
    </View>
    <View style={styles.separator}>

    </View>
    </>
  )
}

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#3B3D3F',
    alignSelf: 'center',
    width: width - 80,
    marginHorizontal: 19,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  rightContainer: {
    flexBasis: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    height: 50,
    flexBasis: 50,
    backgroundColor: '#898a8b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  thumbnailText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  titleContainer: {
    width: width - 180,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    color: '#898a8b'
  },
  separator: {
    width: width - 80,
    backgroundColor: '#333',
    opacity: 0.3,
    height: 0.5,
    alignSelf: 'center',
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: '#898a8b'
  }
})
