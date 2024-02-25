// grab the things we need
//importing from npm package manager
var request = require('request');
var path = require('path');
var controller = require(path.resolve( __dirname, "./controllerApi.js" ) ); // require from another file



/*
 *Send HTTP Get to movieGlu API to get nearby cinemas
 *
 */

exports.getCinemasNearby= function(callback){

//required tokens to make a request
    var headers ={
        'client':'AEDF',
        'x-api-key':'xxxx',
        'territory' : 'UK',
        'Authorization':'Basic xxx=',
        'api-version':'v102',
        'Geolocation' : controller.latLong
    }
    console.log("checkthis " + controller.latLong); //local testing

    // Configure the request
    var options ={

      url:'https://api-gate.movieglu.com/cinemasNearby/?n=2',
      method: 'GET',
      headers: headers

    }


    request(options, function(err, res, body,cinemasNearbyRes) {
      if (err)
        return callback(err);
      try {
    cinemasNearbyRes=JSON.parse(body) // parse the response body

    //console.log(MovieResponse);

        callback(null,cinemasNearbyRes); //fire a callback function
      } catch (ex) {
        callback(ex);
      }
    });
}








/*
 *Send HTTP Get to movieGlu API to movies
 *that are showing at the chosen cinema
 */

exports.getCinemaShowTimes= function (callback){


//required parameters
  var currentdate = new Date();

  var date = currentdate.getDate();
  var month = currentdate.getMonth();
  var year = currentdate.getFullYear();

  var currentDate= year +  "-" + (month + 1) +  "-" + date


//required parameters
  var cinema_id = controller.c_id //get from controller file
  var film_id = controller.movie_id //get from controller file

  console.log("Check the film IDDDD"  + film_id) //test
  console.log("CHECK THIS TOO FETCH!!!" + cinema_id) //test

//required tokens to make a request

            var headers ={
   'client':'AEDF',
          'x-api-key':'xxxx',
          'territory' : 'UK',
          'Authorization':'Basic xxx=',
          'api-version':'v102'



             }
    // Configure the request
  var options ={

    url:'https://api-gate.movieglu.com/cinemaShowTimes/',
    method: 'GET',
    headers: headers,
    qs: {'cinema_id':cinema_id , 'date':currentDate }

  }
  request(options, function(err, res, body,MovieResponse) {
    if (err)
      return callback(err);
    try {
      MovieResponse=JSON.parse(body) // parse the response body

        callback(null,MovieResponse); // fire a callback function

    } catch (ex) {
      callback(ex);
    }

  });
}






/*
 *Send HTTP Get to movieGlu API to get movie trailer video
 *
 */

exports.getTrailers=function(callback){
//required parameters
var film_id = controller.movie_id//get from controller file
console.log("CHECK THIS TOO FETCH DATA" + film_id) // testing

//required tokens to make a request
var headers ={
             'client':'AEDF',
                    'x-api-key':'xxx',
                    'territory' : 'UK',
                    'Authorization':'Basic xxx=',
                    'api-version':'v102'



}


 // Configure the request
var options ={

  url:'https://api-gate.movieglu.com/trailers/',
  method: 'GET',
  headers: headers,
  qs: {'film_id':film_id}

}

request(options, function(err, res, body,TrailerResponse) {
  if (err)
    return callback(err);
  try {
    TrailerResponse=JSON.parse(body)  // parse the response body
callback(null,TrailerResponse);     // fire a callback function

}catch (ex) {
    callback(ex);
  }



});

}


/*
 *Send HTTP Get to movieGlu API to get purchase confirmation
 *
 */

exports.getPurchaseConfirmation=function(callback)
{



//required parameters
 var currentdate = new Date();

 var date = currentdate.getDate();
 var month = currentdate.getMonth();
 var year = currentdate.getFullYear();

 var currentDate= year +  "-" + (month + 1) +  "-" + date

//required parameters
var id_Cinema = controller.c_id   //get from controller file
var id_Movie= controller.movie_id   //get from controller file
var time = controller.showTime;    //get from controller file

console.log("TESTTTT" + id_Cinema); // testing
console.log("TESTTT" +id_Movie );  //testing
console.log("TESTTTTT" +time ); //testing



//required tokens to make a request
 var headers ={

            'client':'AEDF',
                   'x-api-key':'xxx',
                   'territory' : 'UK',
                   'Authorization':'Basic xxxx=',
                   'api-version':'v102'





 }

 // Configure the request
 var options ={

   url:'https://api-gate.movieglu.com/purchaseConfirmation/',
   method: 'GET',
   headers: headers,
   qs: {'cinema_id':id_Cinema ,'film_id' :id_Movie ,'date':currentDate , 'time' :time}

 }

 request(options, function(err, res, body,purchaseConfirmation) {
   if (err)
     return callback(err);
   try {
     purchaseConfirmation=JSON.parse(body) // parse the response body
     callback(null,purchaseConfirmation); //fire a callback function

   } catch (ex) {
    callback(ex);
   }



 });


}


/*
 *Send HTTP Get to movieGlu API to get film showtimes
 *for the chosen film
 */
exports.getFilmShowingTime=function(callback)
{
//required parameters
  var id_Movie= controller.movie_id;  //get from controller file
  var num = 1;
  var location=controller.latLong; //get from controller file

//required tokens to make a request
  var headers ={
       'client':'AEDF',
              'x-api-key':'xxx',
              'territory' : 'UK',
              'Authorization':'Basic xxx=',
              'api-version':'v102',
              'Geolocation' : controller.latLong
      }

 // Configure the request
      var options ={

        url:'https://api-gate.movieglu.com/closestShowing/',
        method: 'GET',
        headers: headers,
        qs: {'film_id' :id_Movie, 'n' :num}

      }


      request(options, function(err, res, body,showTime) {
        if (err)
          return callback(err);
        try {
          showTime=JSON.parse(body)   // parse the response body
         callback(null,showTime);    //fire a callback function
        } catch (ex) {
         callback(ex);
        console.log(ex);
        }


      });

}


/*
 *Send HTTP Get to movieGlu API to get films that are coming soon
 */
exports.getFilmsComingSoon=function(callback)
{
//required parameter
  var num= 4;


//required tokens to make a request
  var headers ={
    'client':'AEDF',
           'x-api-key':'xxxxx',
           'territory' : 'UK',
           'Authorization':'Basic xx=',
           'api-version':'v102'

  }


 // Configure the request
  var options ={

    url:'https://api-gate.movieglu.com/filmsComingSoon/',
    method: 'GET',
    headers: headers,
    qs: {'n' : num}

  }

  request(options, function(err, res, body, filmsComingSoon) {
    if (err)
      return callback(err);
    try {
      filmsComingSoon=JSON.parse(body)  // parse the response body
       callback(null,filmsComingSoon);   //fire a callback function
      console.log(filmsComingSoon);



    } catch (ex) {
  callback(ex);
    }



  });


}