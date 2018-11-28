var request = require('request');
config = require('config')
var wit_endpoint =config.get('wit_Endpoint');
var wit_token =config.get('wit_Token');



exports.callWitAI = function(query, callback) {
  query = encodeURIComponent(query);
   request({
    uri: wit_endpoint+query,
    qs: { access_token:wit_token },
    method: 'GET'
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Successfully got %s", response.body);
      try {
        body = JSON.parse(response.body)
        intent = body["entities"]["intent"][0]["value"]
        callback(null, intent)
      } catch (e) {
        callback(e)
      }
    } else {
      //console.log(response.statusCode)
      console.error("Unable to send message. %s", error);
      callback(error)
    }
  });
}
