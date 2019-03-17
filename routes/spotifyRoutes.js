const router = require("express").Router();
const spotifyAPI = require("./spotifyAPI");
const client_id = '9c9129423b7f41f4adf902179b0bdece'
const client_secret = '8512f4cbf1e04573b0f980399e5dc541'


//variables globally declared in order to use them in multiple api calls
var playlistName = ''
var tracksWithRelevantInfo = []
var trackIdList = '' 
var access_token = '' 

//due to the lack of refresh_codes when using the client credentials flow,
//I worked around it by instead getting an access token whenever the application's server-side loads, 
//meaning there will always be a valid access_token without the need to check if it expired
spotifyAPI.getAccessToken(client_id, client_secret)
.then(response => {
    console.log('ACCESS TOKEN RETRIEVED');
    access_token = response.data.access_token
}).catch(error => {
    console.log('error on spotifyAPI.getAccessToken');
    console.log(error.data)
    res.send(error.data)
})

//route to test valid access token and successful retrieval of data from spotify's api
//not used in the application flow
router.get('/getUserData', (req,res)=> {
    spotifyAPI.getUserData(access_token)
    .then(response => {        
        res.send(response.data);
    })
    .catch(error=>{
        console.log('error on spotifyAPI.getUserData')
        res.send(error)
    })
}),

//Spotify-web API no longer needs the combo of user_id and playlistID to retrieve playlist tracks data
router.get("/getPlaylistsTracks/:playlistId", (req,res)=> {
    //clean any data from previous calls
    trackIdList = ''
    playlistName = ''
    tracksWithRelevantInfo = []

    var playlistId = req.params.playlistId;
    spotifyAPI.getPlaylistTracks(access_token, playlistId)
    .then(response => {
        var tracks = response.data.tracks.items;
        playlistName = response.data.name
        
        // sanitize the api call to make the relevant information easily accessible
        tracks.forEach(trackInfo => {
            tracksWithRelevantInfo.push({
                trackName: trackInfo.track.name,
                albumName: trackInfo.track.album.name,
                albumArt: trackInfo.track.album.images[0],
                trackId: trackInfo.track.id
            });

            //append track ids to trackIdList so 
            // the info of all tracks can be retrieved in one call 
            trackIdList += `${trackInfo.track.id},`
            });
            spotifyAPI.getTrackInformation(access_token, trackIdList)
            .then(response => {
                var audioFeaturesList = response.data.audio_features
                //add audio features to the on tracksWithRelevantInfo
                audioFeaturesList.forEach((trackInfo, index) =>{
                    tracksWithRelevantInfo[index].energy = trackInfo.energy;
                    tracksWithRelevantInfo[index].valence =trackInfo.valence;
                    tracksWithRelevantInfo[index].danceability = trackInfo.danceability
                })
                var playlistInfo ={
                    tracks: tracksWithRelevantInfo,
                    playlist_name: playlistName
                }
                res.send(playlistInfo);
            })
            .catch(error => {
                console.log('error on spotifyAPI.getTrackInformation:')
                console.log(error)
                res.send(error)
            })
    })
    .catch(error=>{
        console.log('spotifyAPI.getplaylistTracks error:')
        console.log(error.data)
        res.status(400)
        res.send('Invalid PlaylistId')
    })     
})


module.exports = router;