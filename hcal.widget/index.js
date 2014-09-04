command: "echo Hello World!",
 
refreshFrequency: 5000,

render: function () {
  return "<div class=\"cal-container\">\
  <div class=\"title\"></div>\
  <table>\
  <tr class=\"weekday\"></tr>\
  <tr class=\"midline\"></tr>\
  <tr class=\"date\"></tr>\
  </table>\
  </div>";
},
 
style: "                              \n\
  bottom: 20px                        \n\
  left: 20px                          \n\
  font-family: Helvetica Neue         \n\
  font-size: 11px                     \n\
  font-weight: 500                    \n\
  color: #fff                         \n\
                                      \n\
  .cal-container                      \n\
    border-radius: 10px               \n\
    background: rgba(#000, 0.3)       \n\
    padding: 10px                     \n\
                                      \n\
  .title                              \n\
    color: rgba(#fff, .3)             \n\
    font-size: 14px                   \n\
    font-weight: 500                  \n\
    padding-bottom: 5px               \n\
    text-transform uppercase          \n\
                                      \n\
  table                               \n\
    border-collapse: collapse         \n\
                                      \n\
  td                                  \n\
    padding-left: 4px                 \n\
    padding-right: 4px                \n\
    text-align: center                \n\
                                      \n\
  .weekday td                         \n\
    padding-top: 3px                  \n\
                                      \n\
  .date td                            \n\
    padding-bottom: 3px               \n\
                                      \n\
  .today, .off-today                  \n\
    background: rgba(#fff, 0.2)       \n\
                                      \n\
  .weekday .today,                    \n\
  .weekday .off-today                 \n\
    border-radius: 3px 3px 0 0        \n\
                                      \n\
  .date .today,                       \n\
  .date .off-today                    \n\
    border-radius: 0 0 3px 3px        \n\
                                      \n\
  .midline                            \n\
    height: 3px                       \n\
    background: rgba(#fff, .5)        \n\
                                      \n\
  .midline .today                     \n\
    background: rgba(#0bf, .8)        \n\
                                      \n\
  .midline .offday                    \n\
    background: rgba(#f77, .5)        \n\
                                      \n\
  .midline .off-today                 \n\
    background: rgba(#f00, .5)        \n\
                                      \n\
  .offday, .off-today                 \n\
    color: rgba(#f77, 1)              \n\
",

update: function (output, domEl) {
  var days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var offdayIndices = [5, 6];
  
  var date = new Date(), y = date.getFullYear(), m = date.getMonth();
  var today = date.getDate();
  var firstWeekDay = new Date(y, m, 1).getDay();
  var lastDate = new Date(y, m + 1, 0).getDate();
  var weekdays = "", midlines = "", dates = "";

  for (var i = 1, w = firstWeekDay; i <= lastDate; i++, w++) {
    w %= 7;
    var isToday = i == today, isOffday = offdayIndices.indexOf(w) != -1;
    var className = "ordinary";
    if(isToday && isOffday) className = "off-today";
    else if(isToday) className = "today";
    else if(isOffday) className = "offday";

    weekdays += "<td class=\""+className+"\">" + days[w] + "</td>";
    midlines += "<td class=\""+className+"\"></td>";
    dates += "<td class=\""+className+"\">" + i + "</td>";
  };

  $(domEl).find(".title").html(months[date.getMonth()]+" "+date.getFullYear());
  $(domEl).find(".weekday").html(weekdays);
  $(domEl).find(".midline").html(midlines);
  $(domEl).find(".date").html(dates);
}