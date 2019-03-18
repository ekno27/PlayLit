//FUNCTIONS USED TO HIT THE SPOTIFY API

const axios = require('axios')
//API calls modeled after this post: https://medium.com/@alex.ginsberg/beginners-guide-to-the-spotify-web-api-bade6aa2d47c
module.exports = {
  //api call used to retrieve access_token
  getAccessToken(client_id, client_secret) {
    return axios({
      method:'post',
      url:'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      params: {
        grant_type: 'client_credentials'
      },
      json: true
    });
  },
  
  //test API call to see if spotify api is being used correctly, not used in actual app
  getUserData(access_token) {
    return axios({
      method:'get',
      url:'https://api.spotify.com/v1/users/edgkano-us',
      headers: {
        'Authorization':'Bearer ' + access_token
      },
      json:true
    });
  },

  //API calls to get the tracks from a user's playlist. 
  getPlaylistTracks(access_token, playlistId) {
    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${playlistId}`,
      headers: {
        'Authorization':'Bearer ' + access_token 
      },
      json: true
    });
  },

  //API call to get the track feautures of each song in the playlist.
  //each song is passed in one large string of ids through trackIdList
  getTrackInformation(access_token, trackIdList) {
    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/audio-features/?ids=${trackIdList}`,
      headers: {
        'Authorization':'Bearer ' + access_token 
      },
      json: true
    })
  }
}