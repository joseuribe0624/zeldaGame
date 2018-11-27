import React, { Component } from 'react';
import Sound from 'react-sound';
import zeldaSong from './song.mp3'

class Sounds extends Component {

  render() {
    return (
    <Sound
      url={zeldaSong}
      playStatus={Sound.status.PLAYING}
      playFromPosition={300 /* in milliseconds */}
      onLoading={this.handleSongLoading}
      onPlaying={this.handleSongPlaying}
      onFinishedPlaying={this.handleSongFinishedPlaying}
    />
    );
  }
}
export default Sounds;
