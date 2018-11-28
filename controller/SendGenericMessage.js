
var request = require('request');
config = require('config');
var PAGE_ACCESS_TOKEN = config.get('pageAccessToken');
var SERVER_URL = config.get('serverURL');




exports.sendHiMessage = function(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: `

      `
        }
    }

    callSendAPI(messageData);
}

/*
 * Send an image using the Send API.
 *
 */
exports.sendImageMessage = function(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "image",
                payload: {
                    url: SERVER_URL + "/assets/rift.png"
                }
            }
        }
    };

    callSendAPI(messageData);
}

/*
 * Send a Gif using the Send API.
 *
 */
exports.sendGifMessage = function(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "image",
                payload: {
                    url: SERVER_URL + "/assets/instagram_logo.gif"
                }
            }
        }
    };

    callSendAPI(messageData);
}

/*
 * Send audio using the Send API.
 *
 */
exports.sendAudioMessage = function(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "audio",
                payload: {
                    url: SERVER_URL + "/assets/sample.mp3"
                }
            }
        }
    };

    callSendAPI(messageData);
}

/*
 * Send a video using the Send API.
 *
 */
exports.sendVideoMessage = function(recipientId, film_trailer) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "video",
                payload: {
                    url: film_trailer[0]
                }
            }
        }
    };

    callSendAPI(messageData);
}

/*
 * Send a file using the Send API.
 *
 */
exports.sendFileMessage = function(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "file",
                payload: {
                    url: SERVER_URL + "/assets/test.txt"
                }
            }
        }
    };

    callSendAPI(messageData);
}

/*
 * Send a text message using the Send API.
 *
 */
exports.sendTextMessage = function(recipientId, messageText) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText,
            metadata: "DEVELOPER_DEFINED_METADATA"
        }
    };

    callSendAPI(messageData);
}

/*
 * Send a button message using the Send API.
 *
 */
exports.sendButtonMessage = function(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "This is test text",
                    buttons: [{
                        type: "web_url",
                        url: "https://www.oculus.com/en-us/rift/",
                        title: "Open Web URL"
                    }, {
                        type: "postback",
                        title: "Trigger Postback",
                        payload: "DEVELOPER_DEFINED_PAYLOAD"
                    }, {
                        type: "phone_number",
                        title: "Call Phone Number",
                        payload: "+16505551234"
                    }]
                }
            }
        }
    };

    callSendAPI(messageData);
}

/*
 * Send a Structured Message (Generic Message type) using the Send API.
 *
 */
exports.sendGenericMessage = function(recipientId, title, subt, log_url) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: title[0],
                        subtitle: subt[0],

                        image_url: log_url[0],
                        buttons: [{
                            type: "postback",
                            title: "Choose Cinema",
                            payload: "Cinema_1",
                        }],
                    }, {
                        title: title[1],
                        subtitle: subt[1],

                        image_url: log_url[1],
                        buttons: [{
                            type: "postback",
                            title: "Choose Cinema",
                            payload: "Cinema_2",
                        }]
                    }]
                }
            }
        }
    };

    callSendAPI(messageData);
}



exports.sendGenericBookingMessage = function(recipientId, booking_details, image) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: "Booking the film" + " " + booking_details[0],
                        subtitle: "For" + " " + booking_details[1] + " " + booking_details[2] + " " + "at" + " " + booking_details[3],
                        item_url: booking_details[4],
                        image_url: image,
                        buttons: [{
                            type: "web_url",
                            url: booking_details[4],
                            title: "BOOK"
                        }, {
                            type: "postback",
                            title: "FINISHED BOOKING",
                            payload: "FINISHED_BOOKING",
                        }]
                    }]
                }
            }
        }
    };

    callSendAPI(messageData);
}




exports.sendGenericMovieMessage = function(recipientId, film_name, start_time, film_image) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: film_name[0],
                        subtitle: start_time[0],
                        image_url: film_image[0],
                        buttons: [{
                            type: "postback",
                            title: "SELECT FILM",
                            payload: "film_1",
                        }],
                    }, {
                        title: film_name[1],
                        subtitle: start_time[1],
                        image_url: film_image[1],
                        buttons: [{
                            type: "postback",
                            title: "SELECT FILM",
                            payload: "film_2",
                        }],
                    }, {
                        title: film_name[2],
                        subtitle: start_time[2],
                        image_url: film_image[2],
                        buttons: [{
                            type: "postback",
                            title: "SELECT FILM",
                            payload: "film_3",
                        }],
                    }, {
                        title: film_name[3],
                        subtitle: start_time[3],
                        image_url: film_image[3],
                        buttons: [{
                            type: "postback",
                            title: "SELECT FILM",
                            payload: "film_4",
                        }]
                    }]
                }
            }
        }
    };

    callSendAPI(messageData);
}




exports.sendScheduleJob = function(recipientId, film_name, release_date, image) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: film_name[0],
                        subtitle: release_date[0],
                        image_url: image[0],
                        buttons: [{
                            type: "postback",
                            title: "TRAILER",
                            payload: "schedule_1",
                        }, {
                            type: "postback",
                            title: "SYNOPSIS",
                            payload: "schedule_1_S",
                        }],
                    }, {
                        title: film_name[1],
                        subtitle: release_date[1],
                        image_url: image[1],
                        buttons: [{
                            type: "postback",
                            title: "TRAILER",
                            payload: "schedule_2",
                        }, {
                            type: "postback",
                            title: "SYNOPSIS",
                            payload: "schedule_2_S",
                        }],
                    }, {
                        title: film_name[2],
                        subtitle: release_date[2],
                        image_url: image[2],
                        buttons: [{
                            type: "postback",
                            title: "TRAILER",
                            payload: "schedule_3",
                        }, {
                            type: "postback",
                            title: "SYNOPSIS",
                            payload: "schedule_3_S",
                        }],
                    }, {
                        title: film_name[3],
                        subtitle: release_date[3],
                        image_url: image[3],
                        buttons: [{
                            type: "postback",
                            title: "TRAILER",
                            payload: "schedule_4",
                        }, {
                            type: "postback",
                            title: "SYNOPSIS",
                            payload: "schedule_4_S",
                        }]
                    }]
                }
            }
        }
    };

    callSendAPI(messageData);
}




/*
 * Send a receipt message using the Send API.
 *
 */
exports.sendReceiptMessage = function(recipientId) {
    // Generate a random receipt ID as the API requires a unique ID
    var receiptId = "order" + Math.floor(Math.random() * 1000);

    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "receipt",
                    recipient_name: "Adam Bekila",
                    order_number: receiptId,
                    currency: "GBP",
                    payment_method: "Visa 1234",
                    timestamp: "1428444852",
                    elements: [{
                        title: "Bohemian Rhapsody",
                        subtitle: "Vue Cinemas - Westfield Stratford City",
                        quantity: 1,
                        price: 50.00,
                        currency: "GBP",
                        image_url: SERVER_URL + "/assets/gearvrsq.png"
                    }],
                    address: {
                        street_1: "17D danvers street",
                        street_2: "",
                        city: "London",
                        postal_code: "SW35AY",
                        state: "-",
                        country: "UK"
                    },
                    summary: {
                        subtotal: 40,
                        total_tax: 10,
                        total_cost: 50
                    },
                    adjustments: [{
                        name: "New Customer Discount",
                        amount: -5
                    }, {
                        name: "2 Off Coupon",
                        amount: -2
                    }]
                }
            }
        }
    };

    callSendAPI(messageData);
}




exports.sendQuickReply = function(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: "Hello there! In order to help you find cinemas around you, i need your location. Click the Location button to get started.",
            metadata: "DEVELOPER_DEFINED_METADATA",
            quick_replies: [{
                    "content_type": "location",
                    "title": "Send Location",
                    "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
                },

            ]
        }
    };

    callSendAPI(messageData);
}


exports.sendQuickReplyRate = function(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: "Hello there. I hope you enjoyed your movie. How would you rate your movie",
            metadata: "DEVELOPER_DEFINED_METADATA",
            quick_replies: [{
                    "content_type": "text",
                    "title": "rate",
                    "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION",
                    "image_url":SERVER_URL + "./public/assets/star.png"

                },

            ]
        }
    };

    callSendAPI(messageData);
}


/*
 * Send a message with Quick Reply buttons.
 *

function sendQuickReply(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What's your favorite movie genre?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Action",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"Comedy",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        },
        {
          "content_type":"text",
          "title":"Drama",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA"
        }
      ]
    }
  };

  callSendAPI(messageData);
}



{
  "content_type":"text",
  "title":"<BUTTON_TEXT>",
  "image_url":"http://example.com/img/red.png",
  "payload":"<DEVELOPER_DEFINED_PAYLOAD>"
}






*/



/*
 * Send a read receipt to indicate the message has been read
 *
 */
exports.sendReadReceipt = function(recipientId) {
    console.log("Sending a read receipt to mark message as seen");

    var messageData = {
        recipient: {
            id: recipientId
        },
        sender_action: "mark_seen"
    };

    callSendAPI(messageData);
}

/*
 * Turn typing indicator on
 *
 */
exports.sendTypingOn = function(recipientId) {
    console.log("Turning typing indicator on");

    var messageData = {
        recipient: {
            id: recipientId
        },
        sender_action: "typing_on"
    };

    callSendAPI(messageData);
}

/*
 * Turn typing indicator off
 *
 */
exports.sendTypingOff = function(recipientId) {
    console.log("Turning typing indicator off");

    var messageData = {
        recipient: {
            id: recipientId
        },
        sender_action: "typing_off"
    };

    callSendAPI(messageData);
}


function callSendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: PAGE_ACCESS_TOKEN
        },
        method: 'POST',
        json: messageData

    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            if (messageId) {
                console.log("Successfully sent message with id %s to recipient %s",
                    messageId, recipientId);
            } else {
                console.log("Successfully called Send API for recipient %s",
                    recipientId);
            }
        } else {
            console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
        }
    });
}
