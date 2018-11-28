/*
 * Authorization Event
 *
 * The value for 'optin.ref' is defined in the entry point. For the "Send to
 * Messenger" plugin, it is the 'data-ref' field. Read more at
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/authentication
 *
 */

 var bodyParser = require('body-parser');
 var crypto = require('crypto');
 var express = require('express');
 var   https = require('https');
 config = require('config');
var request = require('request');
var ArrayList = require('arraylist');

var path = require('path');
var witAI_Api = require( path.resolve( __dirname, "./witAI_Api.js" ) );
var genericMessage = require( path.resolve( __dirname, "./sendGenericMessage.js" ) );
var FetchMovieData = require( path.resolve( __dirname, "./FetchMovieData.js" ) );
var subscription = require( path.resolve( __dirname, "./subscribeUser.js" ) );
//var userInfo = require(path.resolve(__dirname, "./UserIn"))
const delay = require('delay');

var APP_SECRET =config.get('appSecret');
var SERVER_URL =config.get('serverURL');
var FACEBOOK_ACCESS_TOKEN = config.get('pageAccessToken');
var schedule = require('node-schedule');

var User = require('../model/user');


function receivedAuthentication(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfAuth = event.timestamp;

  // The 'ref' field is set in the 'Send to Messenger' plugin, in the 'data-ref'
  // The developer can set this to an arbitrary value to associate the
  // authentication callback with the 'Send to Messenger' click event. This is
  // a way to do account linking when the user clicks the 'Send to Messenger'
  // plugin.
  var passThroughParam = event.optin.ref;

  console.log("Received authentication for user %d and page %d with pass " +
    "through param '%s' at %d", senderID, recipientID, passThroughParam,
    timeOfAuth);

  // When an authentication is received, we'll send a message back to the sender
  // to let them know it was successful.
  genericMessage.sendTextMessage(senderID, "Authentication successful");
}

/*
 * Message Event
 *
 * This event is called when a message is sent to your page. The 'message'
 * object format can vary depending on the kind of message that was received.
 * Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 *
 * For this example, we're going to echo any text that we get. If we get some
 * special keywords ('button', 'generic', 'receipt'), then we'll send back
 * examples of those bubbles to illustrate the special message bubbles we've
 * created. If we receive a message with an attachment (image, video, audio),
 * then we'll simply confirm that we've received the attachment.
 *
 */
exports.receivedMessage= function (event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  //var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;

  global.senderName = ''
  global.cinema_id = new ArrayList;
  global.film_id = new ArrayList;
   global.start_time = new ArrayList;

     global.logo_url = new ArrayList

     global.film_name = new ArrayList;
     global.film_image = new ArrayList;

     global.cinema_name = new ArrayList;







  getSenderInformation((senderInfo) => {
      senderName = senderInfo
      console.log("THIS IS THE GLOBAL VARIABLE",senderName);
  })




     function getSenderInformation(callback) {
         request({
             url: "https://graph.facebook.com/v2.6/" + event.sender.id,
             qs: {
                 access_token: FACEBOOK_ACCESS_TOKEN,
                 fields: 'first_name'
             },
             method: 'GET'
         }, function(error, response, body) {
             if (!error) {
                 var bodyObject = JSON.parse(body)
                 callback(bodyObject.first_name)
             }
         })
     }



     /*
      * If users came here through testdrive, they need to configure the server URL
      * in default.json before they can access local resources likes images/videos.
      */
     function requiresServerURL (next, [recipientId, ...args]) {
       if (SERVER_URL === "to_be_set_manually") {
         var messageData = {
           recipient: {
             id: recipientId
           },
           message: {
             text: `
     We have static resources like images and videos available to test, but you need to update the code you downloaded earlier to tell us your current server url.
     1. Stop your node server by typing ctrl-c
     2. Paste the result you got from running "lt —port 5000" into your config/default.json file as the "serverURL".
     3. Re-run "node app.js"
     Once you've finished these steps, try typing “video” or “image”.
             `
           }
         }

         genericMessage.callSendAPI(messageData);
       } else {
         next.apply(this, [recipientId, ...args]);
       }
     }

  if (messageText) {

    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText.replace(/[^\w\s]/gi, '').trim().toLowerCase()) {


      case 'image':
           requiresServerURL(genericMessage.sendImageMessage, [senderID]);
        break;

      case 'gif':
             requiresServerURL(genericMessage.sendGifMessage, [senderID]);
        break;

      case 'button':
        genericMessage.sendButtonMessage(senderID);
        break;

      case 'generic':
          requiresServerURL(genericMessage.sendGenericMessage, [senderID]);
        break;

      case 'receipt':
               requiresServerURL(genericMessage.sendReceiptMessage, [senderID]);
        break;

      case 'quick reply':
        genericMessage.sendQuickReply(senderID);
        break;

      case 'read receipt':
        genericMessage.sendReadReceipt(senderID);
        break;

      case 'typing on':
        genericMessage.sendTypingOn(senderID);
        break;


      default:
      witAI_Api.callWitAI(messageText, function(err,intent){
      handleIntent(intent,senderID)
      })


    }
  } else if (messageAttachments) {
    //genericMessage.sendTextMessage(senderID, "Message with attachment received");
    if(messageAttachments[0].payload.coordinates){
    // It is a location object
    global.lat = message.attachments[0].payload.coordinates.lat;
    global.long = message.attachments[0].payload.coordinates.long;
    //console.log(lat);
    //console.log(long);
    //genericMessage.sendTextMessage(senderID, lat);
    //genericMessage.sendTextMessage(senderID, long);

    module.exports.latLong = lat + ";" + long;


  //  console.log(latLong);
   FetchMovieData.getCinemasNearby(function(err,cinemasNearbyRes){

      if(err){
        console.log(err);
      }else
      {

        var address = new ArrayList;


        for (var i=0; i<cinemasNearbyRes['cinemas'].length; i++){
                  var bit = cinemasNearbyRes['cinemas'][i];
                  cinema_id.add([bit['cinema_id']]);
                  cinema_name.add([bit['cinema_name']]);
                  address.add([bit['address']]);
                  logo_url.add([bit['logo_url']]);

                  genericMessage.sendGenericMessage(senderID,cinema_name,address,logo_url)

};

      }

   });

}
  }


}




function handleIntent(intent, sender) {
///{ "text" : "Hello " + senderName + ", how are you?"}



  switch(intent) {
    case "greeting":
    genericMessage.sendTypingOn(sender)
    genericMessage.sendTextMessage(sender, "hello" + senderName)
      break;
    case "identification":
      genericMessage.sendTypingOn(sender)
      genericMessage.sendTextMessage(sender, "I'm CinemaBot.")
      break;

      case "cinemaShowTimes":
       //genericMessage.sendTypingOn(sender)



       (async () => {

         FetchMovieData.getCinemaShowTimes(function(err,MovieResponse){

           if(err)
           {

             console.log("ERRRRRRRRRORRRR");
             console.log(err);
         }else
           {
             var jsonObject= MovieResponse;
             var end_time = new ArrayList;

                    for( i = 0, l = jsonObject.films.length; i < l; i++) {
                      film_id. add(jsonObject.films[i].film_id);
                      film_name.add( jsonObject.films[i].film_name);
                      film_image.add( jsonObject.films[i].film_image);

                           for (j=0, m=jsonObject.films[i].showings.Standard.times.length; j<m; j++ ){
                             //start_time.add( jsonObject.films[i].showings.Standard.times[j].start_time);
                             end_time.add(jsonObject.films[i].showings.Standard.times[j].end_time);

                           }
                     }
             genericMessage.sendGenericMovieMessage(sender,film_name,start_time,film_image);

           }
         });


         await delay(10000);

         // Executed 100 milliseconds later
         FetchMovieData.getFilmShowingTime(function(err,showTime){
               if(err)
               {
                 console.log("errrr4");
                 console.log(err);
               }
               else
               {

                 for (var i=0; i<showTime['cinemas'].length; i++){

                      start_time.add(showTime.cinemas[i].time)
                 }

                 global.time =start_time[0];
                 module.exports.showTime=time;

                 console.log("pleas check this out" + time);

                  console.log("CEHCK THIS OUT" + start_time);


               }
       });



     })();


        break;



       case 'getTrailers':


       genericMessage.sendTextMessage(sender, "Nice! I  would not buy a ticket without watching the trailer too. Jus a sec, getting the trailer for you.");



       FetchMovieData.getTrailers(function(err,TrailerResponse){
         if(err)
         {

           console.log("ERRRRRRRRRORRRR22222");
           console.log(err);
       }else{
         var jsonObject= TrailerResponse;
         var film_trailer = new ArrayList;


         for( i = 0, l = jsonObject.trailers.med.length; i < l; i++) {
           film_trailer.add(jsonObject.trailers.med[i].film_trailer);

         }

         (async () => {
        genericMessage.sendVideoMessage(sender,film_trailer);

           await delay(100000);

           // Executed 100 milliseconds later
           genericMessage.sendTextMessage(sender,"I hope you enjoyed the trailer i sent you. Do you want to buy the ticket or explore more films");
       })();

       }

     });

     break;



     case 'purchseConfirmation':


     FetchMovieData.getPurchaseConfirmation(function(err,purchaseConfirmation){
  //genericMessage.sendTextMessage(sender,"purchase confirmation received");
       if(err)
       {
         console.log("ERRRRR33333");
         console.log(err);
       }else {

         var jsonObject=purchaseConfirmation;
         var booking_details  = new ArrayList;
         booking_details.add(purchaseConfirmation.film_name);
         booking_details.add(purchaseConfirmation.date);
         booking_details.add(purchaseConfirmation.time);
         booking_details.add(purchaseConfirmation.cinema_name);
         booking_details.add(purchaseConfirmation.url);

         global.image= logo_url[0];





         genericMessage.sendGenericBookingMessage(sender,booking_details,image);
         console.log(jsonObject);
         console.log("CHECK THIS OUT!!!!" + booking_details[4]);

       }

     });

     break;

     case 'subscribeUser':
     subscription.subscribeUser(sender);
     genericMessage.sendTypingOn(sender);
     genericMessage.sendTextMessage(sender,"Thanks for subscribing! You will receive daily recommandations of new coming movies.");
     genericMessage.sendQuickReplyRate(sender);

     break;

     case 'unsubscribeUser':
     subscription.unsubscribeUser(sender);
     genericMessage.sendTypingOn(sender);
     genericMessage.sendTextMessage(sender,"You  have been unsubscribed from daily recommandations of  new coming movies.");
     break;

     case 'ChecksubscribeStatus':
     subscription.subscribeStatus(sender);
     break;

     default:
     genericMessage.sendTypingOn(sender);
     genericMessage.sendTextMessage(sender,"Sorry i have not been trained for that yet!");
     break;




}

}


//////*****//////


/*
 * Delivery Confirmation Event
 *
 * This event is sent to confirm the delivery of a message. Read more about
 * these fields at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-delivered
 *
 */
exports.receivedDeliveryConfirmation= function (event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var delivery = event.delivery;
  var messageIDs = delivery.mids;
  var watermark = delivery.watermark;
  var sequenceNumber = delivery.seq;

  if (messageIDs) {
    messageIDs.forEach(function(messageID) {
      console.log("Received delivery confirmation for message ID: %s",
        messageID);
    });
  }

  console.log("All message before %d were delivered.", watermark);
}


/*
 * Postback Event
 *
 * This event is called when a postback is tapped on a Structured Message.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 *
 */
exports.receivedPostback=  function (event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " +
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to
  // let them know it was successful

  switch (payload) {
    case 'getStarted':
    genericMessage.sendTypingOn(senderID);
    genericMessage.sendQuickReply(senderID);
        break;
    case 'Cinema_1':
      genericMessage.sendTypingOn(senderID);
      genericMessage.sendTextMessage(senderID, "That's a great choice! What film do you want to watch?");
      // cinema_id export position 0
      global.cine_id = cinema_id[0];
      module.exports.c_id=cine_id;


    break;
    case 'film_1':
    genericMessage.sendTypingOn(senderID);
    genericMessage.sendTextMessage(senderID, "That's a wonderfull film! Do you want to purchase a ticket or watch the trailer first?");
    global.fil_id=film_id[2];
    module.exports.movie_id=fil_id;

   break;
   case 'FINISHED_BOOKING':
   genericMessage.sendTypingOn(senderID);
   genericMessage.sendTextMessage(senderID, "I am glad you booked! I'm going to send you a receipt now.");
   genericMessage.sendTypingOn(senderID);

   (async () => {
     genericMessage.sendReceiptMessage(senderID);


     await delay(3000);

     // Executed 100 milliseconds later
     genericMessage.sendTextMessage(senderID, "There you go! Do you want to subscribe for receiving recommandations of new coming movies?");
   })();

   break;

  case 'schedule_1':
  genericMessage.sendVideoMessage(senderID,trailer[0]);
  break;

  case 'schedule_2':
    genericMessage.sendVideoMessage(senderID,trailer[1]);
  break;

  case 'schedule_3':
    genericMessage.sendVideoMessage(senderID,trailer[2]);
  break;

  case 'schedule_4':
    genericMessage.sendVideoMessage(senderID,trailer[3]);
  break;

  case 'schedule_1_S':
  genericMessage.sendTypingOn(senderID);
  genericMessage.sendTextMessage(senderID, synopsis_long[0]);
  break;

  case 'schedule_2_S':
  genericMessage.sendTypingOn(senderID);
  genericMessage.sendTextMessage(senderID, synopsis_long[1]);
    break;

  case 'schedule_3_S':
  genericMessage.sendTypingOn(senderID);
  genericMessage.sendTextMessage(senderID, synopsis_long[2]);
    break;

  case 'schedule_4_S':
  genericMessage.sendTypingOn(senderID);
  genericMessage.sendTextMessage(senderID, synopsis_long[3]);
    break;




}

}

/*
 * Message Read Event
 *
 * This event is called when a previously-sent message has been read.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
 *
 */
exports.receivedMessageRead=  function (event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  // All messages before watermark (a timestamp) or sequence have been seen.
  var watermark = event.read.watermark;
  var sequenceNumber = event.read.seq;

  console.log("Received message read event for watermark %d and sequence " +
    "number %d", watermark, sequenceNumber);
}



global.trailer = new ArrayList;
global.synopsis_long = new ArrayList;

var j = schedule.scheduleJob('* * 9 * *', function(){
User.find({}, function(err, users) {
    if (users != null) {


      FetchMovieData.getFilmsComingSoon(function(err,filmsComingSoon){

        if(err)
        {
          console.log("ERRRRR33333");
          console.log(err);
        }else {


          var film_id = new ArrayList;
          var film_name = new ArrayList;
          var release_date = new ArrayList;
          var image = new ArrayList;


          for (var i=0; i<filmsComingSoon['films'].length; i++){

               film_id.add(filmsComingSoon.films[i].film_id);
               film_name.add(filmsComingSoon.films[i].film_name);
               release_date.add(filmsComingSoon.films[i].release_date);
               trailer.add(filmsComingSoon.films[i].film_trailer);
               synopsis_long.add(filmsComingSoon.films[i].synopsis_long);
               image.add(filmsComingSoon.films[i].images.still["2"].medium.film_image);

          }

        users.forEach(function(user){

          genericMessage.sendScheduleJob(user.fb_id,film_name,release_date,image)

        //genericMessage.sendTextMessage(user.fb_id,"Received A scheduleJob");

      });

        }

      });

    }
});
});


function createGreetingApi (data) {
request({
uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
qs: { access_token: FACEBOOK_ACCESS_TOKEN },
method: 'POST',
json: data

}, function (error, response, body) {
if (!error && response.statusCode == 200) {
  console.log("Greeting set successfully!");
} else {
  console.error("Failed calling Thread Reference API", response.statusCode, response.statusMessage, body.error);
}
});
}

exports.createGetStarted=function() {
var data = {
setting_type: "call_to_actions",
thread_state: "new_thread",
call_to_actions:[
 {
  payload:"getStarted"
}
]
};
createGreetingApi(data);
}
