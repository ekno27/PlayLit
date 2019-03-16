const router = require("express").Router();
const spotifyAPI = require("./spotifyAPI");
const request = require("request");
const client_id = '9c9129423b7f41f4adf902179b0bdece'
const client_secret = '8512f4cbf1e04573b0f980399e5dc541'
const client_id64 = 'OWM5MTI5NDIzYjdmNDFmNGFkZjkwMjE3OWIwYmRlY2U='
const client_secret64 = 'ODUxMmY0Y2JmMWUwNDU3M2IwZjk4MDM5OWU1ZGM1NDE='
const access_token = ''

//Make a call to spotify API so there is always a token available for use
var authorizationOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

request.post(authorizationOptions, (error, response, body) => {
    if(!error && response.statusCode == 200) {
    this.access_token = body.access_token
    }
    else {
    console.log(error)
    }
})



//TODO maybe use once its all good
router.post("/getAccessToken", (req, res)=> {    

}),

//route to test valid access token and successful retrieval of data from spotify's api
router.get('/getUserData', (req,res)=> {
    var options = {
        url: 'https://api.spotify.com/v1/users/kriskalam',
        headers: {
            'Authorization':'Bearer ' + this.access_token
        },
        json: true
    }
    
    request.get(options, function(error, response, body) {
        if(!error && response.statusCode == 200) {
        console.log(body)
        res.send(body)
        }
        else {
        console.log('found error')
        res.send(error)
        }
    });

}),

router.get("/getPlaylistsTracks", (req,res)=> {
    var options = {
        url: 'https://api.spotify.com/v1/playlists/0lQqwqZ1IK6NmcWhOeDJBN',
        headers: {
            'Authorization':'Bearer ' + this.access_token 
        },
        json: true
    }
    request.get(options, (error, response, body) => {
        if(!error && response.statusCode == 200) {
            console.log(body.tracks.items)
            res.send(body.tracks.items)
            }
            else {
            console.log('found error')
            res.send(error)
            }
    })
})


module.exports = router;