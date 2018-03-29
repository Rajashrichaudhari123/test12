/**
 * juci-ccalendar.js
 *
 * @author CloudPact Technologies
 * @description : juci week calendar control
 */

(function () {
    var wcalendar = function (elem) {
        this._super = juci.controls.basecontrol;
        this._super(elem);
    }



    wcalendar.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // TODO Document weekly calendar panel
    /**#nocode+*/

    wcalendar.prototype = {

        weekDateObj: [],
        init: function () {


            this.j.removeClass("juci_basecontrol");
            // no ref binding
            // Initial date, Start of week,
            var initDate = null,
                startOfWeek = "Mon";
            if (this._ds) {
                initDate = this._ds.initialDate ? new Date(this._ds.initialDate) : null;
                startOfWeek = this._ds.startOfWeek ? this._ds.startOfWeek : "Mon";
            }
            var container = new juci.elem("<div class=''></div>").appendTo(this.j);
            var WeekBox = new juci.elem("<div class='juci_year_month'></div>").appendTo(container);

            this._leftColString = this.j.attr("data-left-col");
            this._leftColJSON = JSON.parse(this._leftColString);
            this._leftColKeyArray = [];
            this._leftColValueArray = [];
            for (var key in this._leftColJSON) {
                if (!this._leftColJSON.hasOwnProperty(key)) {
                    continue;
                }
                this._leftColKeyArray.push(key);
                this._leftColValueArray.push(this._leftColJSON[key]);
            };

            this._weekBar = new juci.elem("<div class='juci_year'></div>").appendTo(WeekBox);
            this._weekBar.leftNav = new juci.elem("<div class='juci_calendar_nav left'></div>").appendTo(this._weekBar);
            this._weekBar.middle = new juci.elem("<div class='juci_calendar_middle'></div>").appendTo(this._weekBar);
            this._weekBar.rightNav = new juci.elem("<div class='juci_calendar_nav right'></div>").appendTo(this._weekBar);
            this._weekBar.leftNav.onClick(this._onPrevWeek, this);
            this._weekBar.rightNav.onClick(this._onNextWeek, this);




            this._calBox = new juci.elem("<div class='juci_calendar_box'></div>").appendTo(container);
            this._daysBar = new juci.elem("<div class='juci_days'><div class='juci_week_head'></div><div class='juci_day'></div><div class='juci_day'></div><div class='juci_day'></div><div class='juci_day'></div><div class='juci_day'></div><div class='juci_day'></div><div class='juci_day'></div></div>").appendTo(this._calBox);

            this._dayLbls = this._daysBar.findByClass("juci_day");


            this._styles = {};
            this.setStartOfWeek(startOfWeek, true);
            this.initDates();
            this._defaultDate = new Date().toString();
            this._today = Date.nowDate();
            this._currentYear, this._currentMonth, this._val;


            this._eventsObj = {};
            if (initDate == null) {
                this.navigateTo(this._today.getFullYear(), this._today.getMonth(), this._today.getDate());
            } else {
                this.setDate(initDate, true);
            }


        },
        setStartOfWeek: function (startOfWeek, bDontRefresh) {
            if (startOfWeek != this._startOfWeek) {
                var day, days = [];
                var calDays = juci.controls.calendar.days; // TODO Check with unshifting instead of concat later https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/unshift
                do {
                    day = calDays.shift();
                    days.push(day);
                } while (day && calDays[0] != startOfWeek)
                calDays = calDays.concat(days);
                this._dayLbls.forEach(function (dayLabel, index) {
                    dayLabel.html(calDays[index]);
                });
                juci.controls.calendar.days = calDays; // Need reassigning since the array ref is cutoff when concat happens
                this._startOfWeek = startOfWeek;
                if (!bDontRefresh) {
                    this.refresh();
                }
            }
        },
        initDates: function () {
            this._weeks = [];
            this._dates = [];
            var a = this._leftColString.split(',');
            for (var i = 0; i < a.length; i++) {
                var week = new juci.elem('<div class="juci_week"></div>').appendTo(this._calBox);
                this._weeks.push(week);
                var lefthead = new juci.elem('<div class="juci_left_head"></div>').appendTo(week);
                for (var j = 0; j < 7; j++) {
                    var date = new juci.elem('<div class="juci_date"></div>').appendTo(week);
                    this._dates.push(date);
                }
            }
            this._timeLbls = this._calBox.findByClass("juci_left_head");
        },
        navigateTo: function (newYear, newMonth, newDate) {
            var evt = new EventObject({
                year: newYear,
                month: newMonth,
                date: newDate
            });
            this.fireEvent("calendarnavigate", evt);
            if (!evt.isCancelled()) {
                this._currentYear = parseInt(newYear, 10);
                this._currentMonth = parseInt(newMonth, 10);
                this._currentDate = parseInt(newDate, 10);
                this.refresh();
            }
        },
        setEventsObj: function (obj) {

            for (var a in obj) {

                this._eventsObj[a] = obj[a]
            }


        },
        getEventsObj: function () {

            return this._eventsObj;
        },

        refreshCal: function () {
            this.refresh();



        },
        clearCal: function () {
            this.clear();

        },

        clear: function () {

            for (var a in this._dates) {
                this._dates[a].html("");
                this._dates[a].removeListener("tap", this._onDateSelect);

            }
        },
        _onDateSelect: function () {


            var evt = new EventObject(this);
            this.wcalendar.fireEvent("dateselect", evt);

        },
        _onPrevWeek: function () {
            var presentDay = Date.getDateFrom(this._currentDate, this._currentMonth, this._currentYear);
            var newDay = presentDay.addDays(-7);
            this.clear();
            this.navigateTo(newDay.getFullYear(), newDay.getMonth(), newDay.getDate());
        },
        _onNextWeek: function () {
            var presentDay = Date.getDateFrom(this._currentDate, this._currentMonth, this._currentYear);
            var newDay = presentDay.addDays(7);
            this.clear();
            this.navigateTo(newDay.getFullYear(), newDay.getMonth(), newDay.getDate());
        },
        Events: juci.controls.basecontrol.prototype.Events.concat(["calendarnavigate", "dateselect"]),
        refresh: function () {

            var daysInMonth = Date.getDaysInMonth(this._currentYear, this._currentMonth);
            var firstOfMonth = Date.getDateFrom(1, this._currentMonth, this._currentYear);
            var lastOfMonth = Date.getDateFrom(daysInMonth, this._currentMonth, this._currentYear);
            var today = Date.getDateFrom(this._currentDate, this._currentMonth, this._currentYear);
            var MondayOfWeek, SundayOfWeek;

            if (today.is().monday()) {
                MondayOfWeek = today

            } else {

                MondayOfWeek = Date.getDateFrom(this._currentDate, this._currentMonth, this._currentYear).moveToDayOfWeek(1, -1);
            }
            if (today.is().sunday()) {

                SundayOfWeek = today
            } else {

                SundayOfWeek = Date.getDateFrom(this._currentDate, this._currentMonth, this._currentYear).moveToDayOfWeek(0, 1);

            }
            this._weekBar.middle.html(MondayOfWeek.getDate() + " " + MondayOfWeek.getMonthName() + " " + MondayOfWeek.getFullYear() + " - " + SundayOfWeek.getDate() + " " + SundayOfWeek.getMonthName() + " " + SundayOfWeek.getFullYear())

            forLoopDate = MondayOfWeek;
            this.weekDateObj = [];
            for (var i = 0; i < 7; i++) {

                var Obj = {
                    "fullDate": new Date(forLoopDate),
                    "y": forLoopDate.getFullYear(),
                    "m": forLoopDate.getMonth(),
                    "dt": forLoopDate.getDate(),
                    "dy": forLoopDate.getDayName(),
                    "ts": forLoopDate.getTime(),
                    Events: []
                }
                this.weekDateObj.push(Obj);
                forLoopDate = forLoopDate.add(1).day()
            }
            for (var a in this._dayLbls) {
                if (a == "all") {
                    break;
                }
                var str = this._dayLbls[a].html();
                str = str.substring(0, 3) + " " + this.weekDateObj[a].dt;
                this._dayLbls[a].html(str);

            }


            for (var a in this._timeLbls) {
                if (a == "all") {
                    break;
                }

                this._timeLbls[a].html(this._leftColKeyArray[a]);


            }


            for (var a in this.weekDateObj) {
                if (this._eventsObj[this.weekDateObj[a].fullDate]) {
                    this.weekDateObj[a].Events = this._eventsObj[this.weekDateObj[a].fullDate];

                }

            }



            var timearray = this._leftColValueArray;
            var timeindex;
            var index;
            for (i = 0; i < 7; i++) {
                index = i;
                for (j = 0; j < 4; j++) {

                    timeindex = j

                    this._dates[index].eventArr = [];
                    this._dates[index].onClick(this._onDateSelect, {
                        "fullDate": this.weekDateObj[i].fullDate.toString(),
                        "Time": j.toString(),
                        "wcalendar": this,
                        "selecteddate": this._dates[index]
                    });
                    this._dates[index].num = 0;
                    for (var a in this.weekDateObj[i].Events) {
                        var m = this.weekDateObj[i].Events[a].time
                        var n = parseInt(m, 10);

                        if ((n < timearray[timeindex]) && (n >= (timearray[timeindex - 1] ? timearray[timeindex - 1] : 0))) {


                            var str = this._dates[index].html();


                            if (this._dates[index].num <= 1) {
                                str = str + "<div class='events'>" + this.weekDateObj[i].Events[a].Description + "</div>";
                                this._dates[index].html(str);

                            } else {
                                if (this._dates[index].num == 2) {
                                    str = str + "<div class='events'>+ " + (this._dates[index].num - 1).toString() + "</div>";
                                    this._dates[index].html(str);
                                } else {

                                    this._dates[index].el.children[2].innerHTML = "+ " + (this._dates[index].num - 1).toString();

                                }
                            }

                            this._dates[index].eventArr.push(this.weekDateObj[i].Events[a]);
                            this._dates[index].num++;
                        }


                    }
                    if (this._dates[index].num == 0) {

                        var str = "<div class='events'>Create Lead</div>";
                        this._dates[index].html(str);
                    }
                    index = index + 7;

                }

            }
        }
    }

    juci.extend(wcalendar, juci.controls.basecontrol);
    juci.controls.wcalendar = wcalendar;

})();
