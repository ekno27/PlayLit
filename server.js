const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios")
const PORT = process.env.PORT || 3001;
const app = express();


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//SPOTIFY API INFORMATION
const client_id = '9c9129423b7f41f4adf902179b0bdece'
const client_id64 = 'OWM5MTI5NDIzYjdmNDFmNGFkZjkwMjE3OWIwYmRlY2U='
const client_secret = '8512f4cbf1e04573b0f980399e5dc541'
const client_secret64 = 'ODUxMmY0Y2JmMWUwNDU3M2IwZjk4MDM5OWU1ZGM1NDE='
const access_token = 'BQAtq7_FLUOkiGRPDop9TKOU5uo_L-URvRzAK2b67430uAIn5Cjup-rb0lU7o65TBHbN-3mxDPuF5pp9zXI'
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



// axios.get(`${spotifyURL}`)

// Define API routes here
const routes = require("./routes/spotifyRoutes");
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



app.listen(PORT, () => {
  console.log(`Server now on port ${PORT}!`);
});
