//FUNCTIONS USED TO HIT THE SPOTIFY API

const axios = require('axios')
module.exports = {
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
  
  //test API call to see if spotify api is being used correctly
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