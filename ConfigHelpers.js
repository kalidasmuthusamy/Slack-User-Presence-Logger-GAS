function getTrackableUsersConfig(userGroups) {
  var currHour = new Date().getHours();

  function propValueExists(propValue){
    return (propValue || "").trim().length !== 0
  }

  var trackableUserConfigs = userGroups.filter(function (userConfig) {
    return (propValueExists(userConfig['userId']) && propValueExists(userConfig['userName']));
  }).filter( function (userConfig) {
    var timeWindowConfig = userConfig['timeWindow'];
    if(timeWindowConfig == null){
      return true;
    }

    return (currHour >= timeWindowConfig['from'] && currHour < timeWindowConfig['upto']);
  });

  return trackableUserConfigs;
}
