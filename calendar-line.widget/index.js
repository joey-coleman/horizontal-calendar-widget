command: "true",

dayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
dayOfYearOffsets: [ [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334] ,  // regular years
                    [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335] ], // leap years
offdayIndices: [6, 0], // Sa, Su
 
refreshFrequency: 5000,
displayedDate: null,

render: function () {
  return "<div class=\"cal-container\">\
  <div class=\"title\"></div>\
  <table>\
  <tr class=\"weeknum\"></tr>\
  <tr class=\"weekday\"></tr>\
  <tr class=\"midline\"></tr>\
  <tr class=\"date\"></tr>\
  </table>\
  </div>";
},
 
style: "                              \n\
  bottom: 10px                        \n\
  left: 10px                          \n\
  font-family: Helvetica Neue         \n\
  font-size: 10px                     \n\
  font-weight: 400                    \n\
  color: #fff                         \n\
                                      \n\
  .cal-container                      \n\
    border-radius: 8px                \n\
    background: rgba(#000, 0.3)       \n\
    padding: 8px                      \n\
                                      \n\
  .title                              \n\
    color: rgba(#fff, .3)             \n\
    font-size: 12px                   \n\
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
    background: rgba(#fc3, .8)        \n\
                                      \n\
  .offday, .off-today                 \n\
    color: rgba(#f77, 1)              \n\
                                      \n\
  .weeknum td                         \n\
    text-align: left                  \n\
",

update: function (output, domEl) {
  var date = new Date(), y = date.getFullYear(), m = date.getMonth(), today = date.getDate();
  
  // DON'T MANUPULATE DOM IF NOT NEEDED
  var newDate = [today, m, y].join("/");
  if(this.displayedDate != null && this.displayedDate == newDate) return;
  else this.displayedDate = newDate;

  var firstWeekDay = new Date(y, m, 1).getDay();
  var lastDate = new Date(y, m + 1, 0).getDate();
  
  var weekdays = "", midlines = "", dates = "", weeknums = "";

  for (var i = 1, w = firstWeekDay; i <= lastDate; i++, w++) {
    w %= 7;
    var isToday = (i == today), isOffday = (this.offdayIndices.indexOf(w) != -1);
    var className = "ordinary";
    if(isToday && isOffday) className = "off-today";
    else if(isToday) className = "today";
    else if(isOffday) className = "offday";

    var leap = y%4?0:1; // yes, this doesn't account for centuries
    var wnum = Math.floor( (this.dayOfYearOffsets[leap][m] + i - w + 10) / 7 ); // Yay wikipedia

    weekdays += "<td class=\""+className+"\">" + this.dayNames[w] + "</td>";
    midlines += "<td class=\""+className+"\"></td>";
    dates += "<td class=\""+className+"\">" + i + "</td>";
    if (w==1 && (lastDate-i)>=2) { // display week above Monday unless this is the last 2 columns
      weeknums += "<td class=\"ordinary\" colspan=\"7\">" + "Week " + wnum + "</td>";
    } else if (i==1 && w>1 && w<5) { // Week Number for partial weeks starting Tue-Thu
      // Only show first partial week if month starts on Thu or
      // earlier; this also avoids figuring out if previous year had
      // 52 or 53 weeks (convenient...).
      var span = 8-w;
      weeknums += "<td class=\"ordinary\" colspan=\"" + span + "\">" + "Week " + wnum + "</td>";
    } else if (i==1) { // empty spacer if first day is Fri-Sun
      var span = 8-w;
      weeknums += "<td class=\"ordinary\" colspan=\"" + span + "\"></td>"
    }
  };

  $(domEl).find(".title").html(this.monthNames[m]+" "+y);
  $(domEl).find(".weeknum").html(weeknums);
  $(domEl).find(".weekday").html(weekdays);
  $(domEl).find(".midline").html(midlines);
  $(domEl).find(".date").html(dates);
}

// Local Variables:
// js-indent-level: 2
// indent-tabs-mode: nil
// End
