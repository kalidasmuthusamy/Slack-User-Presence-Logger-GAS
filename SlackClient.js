function getUserPresenceReqOptions(token, userId){
  return ({
   'method' : 'get',
   'headers': {
     'contentType': 'application/x-www-form-urlencoded'
   },
   'payload': {
     token: token,
     user: userId,
   }
  });
}

function getUserPresenceResponse(token, userId){
  var response = UrlFetchApp.fetch(SLACK_USER_PRESENCE_API_URL, getUserPresenceReqOptions(token, userId));
  return response;
}

function getPostMessageReqOptions(token, channelId, message){
  var postMessageData = {
    token: token,
    channel: channelId,
    text: message
  };
  
  return ({
    headers: {
      'contentType': 'application/x-www-form-urlencoded'
    },
    payload: postMessageData
  });
}

function postMessageToSlackChannel(token, channelId, message){
  var response = UrlFetchApp.fetch(SLACK_POST_MESSAGE_API_URL, getPostMessageReqOptions(token, channelId, message));
  return response;
}