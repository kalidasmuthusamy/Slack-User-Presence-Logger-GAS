function initiateSlackUserCheck() {
  var currHour = new Date().getHours();
  if(currHour >= 17 && currHour <= 19 ) {
    runSlackUsersWatcher();
  }
}

function runSlackUsersWatcher(){
  var userConfigs = getUsersConfig(USER_GROUPS);
  var notificationChannelIds = getNotificationChannels(NOTIFICATION_CHANNEL_IDS);
  notifyChannelsWhenUserOnline(SLACK_ACCESS_TOKEN, userConfigs, notificationChannelIds, SPY_MODE, NOTIFY_IN_SLACK, NOTIFY_ONCE_PER_USER);
}

function userProcessedToday(userId){
  var todayDate = new Date();

  var currentDateUserLogs = getUserLogRows(userId, todayDate);
  return currentDateUserLogs.length > 0;
}


function notifyChannelsWhenUserOnline(token, userConfigs, notificationChannelIds, spyModeActivated, enableSlackNotification, notifyOnce){
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

            notificationChannelIds.forEach(function (notificationChannelId) {
              postMessageToSlackChannel(token, notificationChannelId, message);
            });
          }
        }

        loggerSheet.appendRow([new Date().toISOString(), userId, userName, userPresenceStatus]);
      }
    }
  });
}
