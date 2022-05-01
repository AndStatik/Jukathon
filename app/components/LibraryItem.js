import { View, StyleSheet, Text, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';

const convertTime = (duration) => {
  let ms = duration * 1000; // specific to my case
  let min = Math.floor(ms / 60000);
  let sec = ((ms % 60000) / 1000).toFixed(0);
  return min + ':' + (sec < 10 ? '0' : '') + sec;
}

export default function LibraryItem({title, duration, onOptionPress, onAudioPress}) {
  return (
    <>
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onAudioPress}>
        <View style={styles.leftContainer}>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailText}>{title[0]}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <Text style={styles.timeText}>{convertTime(duration)}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.rightContainer}>
        <SimpleLineIcons
          onPress={onOptionPress}
          name="options-vertical"
          size={20}
          color="orange"
          style={{padding: 10}}
        />
      </View>
    </View>
    <View style={styles.separator} />
    </>
  )
}

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#3B3D3F',
    alignSelf: 'center',
    width: width - 50,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    backgroundColor: 'orange',
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
  timeText: {
    fontSize: 14,
    color: '#898a8b'
  },
  separator: {
    width: width - 50,
    backgroundColor: 'orange',
    opacity: 0.3,
    height: 1.5,
    alignSelf: 'center',
    marginTop: 10,
  },
})
