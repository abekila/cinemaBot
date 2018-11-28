var request = require('request');
var path = require('path');
var controller = require(path.resolve( __dirname, "./controllerApi.js" ) );


//global.currentdate= '2018-11-14';

exports.getCinemasNearby= function(callback){




    var headers ={
        'api-version':'v102',
        'Authorization':'Basic Q0hBVF8wOnAyZUVuNVpqUVhGUg==',
        'client':'CHAT_0',
        'x-api-key':'O032My9Ywr83MSBbsrWX52TMWEvsclXp2iNzX9CH',
        'Geolocation' : controller.latLong

    }

    console.log("checkthis " + controller.latLong);

    // Configure the request
    var options ={

      url:'http://api-gate.movieglu.com/cinemasNearby/?n=2',
      method: 'GET',
      headers: headers

    }


    request(options, function(err, res, body,cinemasNearbyRes) {
      if (err)
        return callback(err);
      try {
    cinemasNearbyRes=JSON.parse(body)

    //console.log(MovieResponse);

        callback(null,cinemasNearbyRes);
      } catch (ex) {
        callback(ex);
      }
    });


}

exports.getCinemaShowTimes= function (callback){



  var currentdate = new Date();

  var date = currentdate.getDate();
  var month = currentdate.getMonth();
  var year = currentdate.getFullYear();

  var currentDate= year +  "-" + (month + 1) +  "-" + date



  var cinema_id = controller.c_id //get from controller
  console.log("CHECK THIS TOO FETCH!!!" + cinema_id)

  var headers ={

    'api-version':'v102',
    'Authorization':'Basic Q0hBVF8wOnAyZUVuNVpqUVhGUg==',
    'client':'CHAT_0',
    'x-api-key':'O032My9Ywr83MSBbsrWX52TMWEvsclXp2iNzX9CH'

  }
  var options ={

    url:'http://api-gate.movieglu.com/cinemaShowTimes/',
    method: 'GET',
    headers: headers,
    qs: {'cinema_id':cinema_id , 'date':currentDate }

  }

  request(options, function(err, res, body,MovieResponse) {
    if (err)
      return callback(err);
    try {
      MovieResponse=JSON.parse(body)

  //console.log(JSON.stringify(MovieResponse));


       //jsonObject=JSON.stringify(MovieResponse);
  //console.log(jsonObject);

        callback(null,MovieResponse);

    } catch (ex) {
      callback(ex);
    }

  });



}


exports.getTrailers=function(callback){

var film_id = controller.movie_id
console.log("CHECK THIS TOO FETCH DATA" + film_id)


var headers ={

  'api-version':'v102',
  'Authorization':'Basic Q0hBVF8wOnAyZUVuNVpqUVhGUg==',
  'client':'CHAT_0',
  'x-api-key':'O032My9Ywr83MSBbsrWX52TMWEvsclXp2iNzX9CH'

}


var options ={

  url:'http://api-gate.movieglu.com/trailers/',
  method: 'GET',
  headers: headers,
  qs: {'film_id':film_id}

}

request(options, function(err, res, body,TrailerResponse) {
  if (err)
    return callback(err);
  try {
    TrailerResponse=JSON.parse(body)
//console.log(TrailerResponse);
callback(null,TrailerResponse);

}catch (ex) {
    callback(ex);
  }



});

}


exports.getPurchaseConfirmation=function(callback)
{




 var currentdate = new Date();

 var date = currentdate.getDate();
 var month = currentdate.getMonth(); //Be careful! January is 0 not 1
 var year = currentdate.getFullYear();

 var currentDate= year +  "-" + (month + 1) +  "-" + date


var id_Cinema = controller.c_id
var id_Movie= controller.movie_id
var time = controller.showTime;

console.log("TESTTTT" + id_Cinema);
console.log("TESTTT" +id_Movie );
console.log("TESTTTTT" +time );

 var headers ={

   'api-version':'v102',
   'Authorization':'Basic Q0hBVF8wOnAyZUVuNVpqUVhGUg==',
   'client':'CHAT_0',
   'x-api-key':'O032My9Ywr83MSBbsrWX52TMWEvsclXp2iNzX9CH'

 }


 var options ={

   url:'http://api-gate.movieglu.com/purchaseConfirmation/',
   method: 'GET',
   headers: headers,
   qs: {'cinema_id':id_Cinema ,'film_id' :id_Movie ,'date':currentDate , 'time' :time}

 }

 request(options, function(err, res, body,purchaseConfirmation) {
   if (err)
     return callback(err);
   try {
     purchaseConfirmation=JSON.parse(body)
     console.log(purchaseConfirmation);
     callback(null,purchaseConfirmation);

   } catch (ex) {
    callback(ex);
   }



 });


}


exports.getFilmShowingTime=function(callback)
{

  var id_Movie= controller.movie_id;
  var num = 1;
  var location=controller.latLong;

  var headers ={
    'api-version':'v102',
    'Authorization':'Basic Q0hBVF8wOnAyZUVuNVpqUVhGUg==',
    'client':'CHAT_0',
    'x-api-key':'O032My9Ywr83MSBbsrWX52TMWEvsclXp2iNzX9CH',
    'Geolocation' :controller.latLong

      }


      var options ={

        url:'http://api-gate.movieglu.com/closestShowing/',
        method: 'GET',
        headers: headers,
        qs: {'film_id' :id_Movie, 'n' :num}

      }


      request(options, function(err, res, body,showTime) {
        if (err)
          return callback(err);
        try {
          showTime=JSON.parse(body)
        // console.log(showTime);
         callback(null,showTime);
        } catch (ex) {
         callback(ex);
        //console.log(ex);
        }


      });

}


exports.getFilmsComingSoon=function(callback)
{

  var num= 4;

  var headers ={

    'api-version':'v102',
    'Authorization':'Basic Q0hBVF8wOnAyZUVuNVpqUVhGUg==',
    'client':'CHAT_0',
    'x-api-key':'O032My9Ywr83MSBbsrWX52TMWEvsclXp2iNzX9CH'

  }


  var options ={

    url:'http://api-gate.movieglu.com/filmsComingSoon/',
    method: 'GET',
    headers: headers,
    qs: {'n' : num}

  }

  request(options, function(err, res, body, filmsComingSoon) {
    if (err)
      return callback(err);
    try {
      filmsComingSoon=JSON.parse(body)
       callback(null,filmsComingSoon);
      console.log(filmsComingSoon);



    } catch (ex) {
  callback(ex);
    }



  });


}
