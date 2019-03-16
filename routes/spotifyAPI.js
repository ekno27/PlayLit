const request = require('request')
module.exports = {
  getAccessToken(authorizationOptions){
    return request.post(authorizationOptions, (error, response, body) => {
      if(!error && response.statusCode == 200) {
        // console.log(body.access_token)
        return body.access_token
      }
      else {
        console.log(error)
        return error
      }
    })
  },

  getUserData(options) {
    return request.get(options, function(error, response, body) {
      if(!error && response.statusCode == 200) {
        // console.log(body)
        return body
      }
      else {
        console.log('found error')
        return 'error'
      }
  });

  }
}