function initiateSlackUserCheck() {
  runSlackUsersWatcher();
}

function runSlackUsersWatcher(){
  var userConfigs = getTrackableUsersConfig(USERS_CONFIG);
  notifyChannelsWhenUserOnline(SLACK_ACCESS_TOKEN, userConfigs, SPY_MODE, NOTIFY_IN_SLACK, NOTIFY_ONCE_PER_USER);
}

function userProcessedToday(userId){
  var todayDate = new Date();

  var currentDateUserLogs = getUserLogRows(userId, todayDate);
  return currentDateUserLogs.length > 0;
}


function notifyChannelsWhenUserOnline(token, userConfigs, spyModeActivated, enableSlackNotification, notifyOnce){
  var loggerSheet = getLoggerSheet();

  userConfigs.forEach(function(userConfig){
    var userId = userConfig.userId;
    var userName = userConfig.userName;

    var userPresenceResponse = JSON.parse(getUserPresenceResponse(token, userId));
    var userPresenceStatus = userPresenceResponse["presence"];

    if (userPresenceStatus == ACTIVE_STATUS) {
      var isCurrentUserProcessed = userProcessedToday(userId);

      if (spyModeActivated || !isCurrentUserProcessed) {
        if(enableSlackNotification) {
          if(!notifyOnce || (notifyOnce && !isCurrentUserProcessed)){
            var message = userName + " is Online!";

            userConfig.notificationChannelIds.forEach(function (notificationChannelId) {
              postMessageToSlackChannel(token, notificationChannelId, message);
            });
          }
        }
      }

      if(!isCurrentUserProcessed){
        loggerSheet.appendRow([new Date().toISOString(), userId, userName, userPresenceStatus]);
      }
    }
  });
}
