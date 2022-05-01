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

//select another audio (need uri for next audio source)
export const playNext = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync(); // this will stop prev song even if currently playing (not paused)
    await playbackObj.unloadAsync(); // this will unload it from state
    return await play(playbackObj, uri)
  } catch (error) {
    console.error('error inside playNext helper method', error.message)
  }
}
