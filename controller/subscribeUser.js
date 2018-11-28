
var User = require('../model/user');
var path = require('path');
var genericMessage = require( path.resolve( __dirname, "./sendGenericMessage.js" ) );


exports.subscribeUser= function (id){
  // create a new user called chris
  var newUser = new User({
    fb_id: id
  });



  // call the built-in save method to save to the database
   User.findOneAndUpdate({fb_id: newUser.fb_id}, {fb_id: newUser.fb_id}, {upsert:true}, function(err, user) {
     if (err) {
       genericMessage.sendTextMessage(id, "There wan error subscribing you for daily articles");
     } else {
       console.log('User saved successfully!');
       genericMessage.sendTextMessage(newUser.fb_id, "You've been subscribed!")
     }
   });
 }


 exports.unsubscribeUser= function(id) {
   // call the built-in save method to save to the database
   User.findOneAndRemove({fb_id: id}, function(err, user) {
     if (err) {
       genericMessage.sendTextMessage(id, "There wan error unsubscribing you for daily movie recommandations");
     } else {
       console.log('User deleted successfully!');
       genericMessage.sendTextMessage(id, "You've been unsubscribed from the daily movie recommandations!")
     }
   });
 }


 exports.subscribeStatus=function(id) {
   User.findOne({fb_id: id}, function(err, user) {
     subscribeStatus = false
     if (err) {
       console.log(err)
     } else {
       if (user != null) {
         subscribeStatus = true
       }
       subscribedText = "Your subscribed status is " + subscribeStatus
       genericMessage.sendTextMessage(id, subscribedText)
     }
   })
 }
