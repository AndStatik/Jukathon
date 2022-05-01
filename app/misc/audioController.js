//play audio
export const play = async (playbackObj, uri) => {
  try {
    return await playbackObj.loadAsync(
      { uri },
      {shouldPlay: true}
    );
  } catch (error) {
    console.error('error inside play helper method', error.message)
  }
}

//pause audio
export const pause = async (playbackObj) => {
  try {
    return await playbackObj.setStatusAsync({
      shouldPlay: false
    });
  } catch (error) {
    console.error('error inside pause helper method', error.message)
  }
}

//resume audio
export const resume = async (playbackObj) => {
  try {
    return await playbackObj.playAsync();
  } catch (error) {
    console.error('error inside resume helper method', error.message)
  }
}

//select another audio
