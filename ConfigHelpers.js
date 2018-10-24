function getUsersConfig(userGroups){
  var constructedUserConfigs = userGroups.split(";").map(function(userConfig){
    var userId = userConfig.split("#")[0];
    var userName = userConfig.split("#")[1];
    
    return ({
      userId: userId,
      userName: userName,
      processed: false
    });
  });
  
  var filteredUserConfigs = constructedUserConfigs.filter(function(userConfig){
    return ((userConfig.userId || "").trim().length !== 0) && ((userConfig.userName || "").trim().length !== 0)
  });
  
  return filteredUserConfigs;
}

function getNotificationChannels(notificationChannelIds){
  return notificationChannelIds.split(",");
}

