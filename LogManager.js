function getLoggerSheet(){
  var loggerSheet = SpreadsheetApp.openById(LOG_SHEET_ID);
  return loggerSheet;
}


function getUserLogRows(userId, logDate){
  var loggerSheet = getLoggerSheet();
  var range = loggerSheet.getDataRange();
  var loggedValues = range.getValues();
  
  var userLogRows = loggedValues.filter(function(logRow){
    var loggedDate = new Date(logRow[0]);
    var loggedUserId = logRow[1];
    
    return (loggedDate.toDateString() == logDate.toDateString() && loggedUserId == userId);
  });
  
  return userLogRows;
}

