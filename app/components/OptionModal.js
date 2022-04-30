import { View, Text, Modal, StatusBar, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import React from 'react'

export default function OptionModal({ visible, currentItem, onClose, onPlayPress, onPlaylistPress }) {
  const { filename } = currentItem;
  return (
    <>
      <StatusBar hidden />
      <Modal animationType='slide' transparent visible={visible}>
        <View style={styles.modal}>
          <Text style={styles.title} numberOfLines={2}>{filename}</Text>
          <View style={styles.optionContainer}>
          <TouchableWithoutFeedback onPress={onPlayPress}>
            <Text style={styles.option}>Play</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPlaylistPress}>
            <Text style={styles.option}>Add to Playlist</Text>
          </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#3B3D3F',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    zIndex: 1000,
  },
  optionContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
    color: '#898a8b',
  },
  option: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: 'white',
    letterSpacing: 0.8
  },
  modalBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  }
})
