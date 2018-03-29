/**
 * juci-ccalendar.js
 *
 * @author CloudPact Technologies
 * @description : juci calender control
 */

(function () {
    var ccalendar = function (elem) {
        this._super = juci.controls.calendar;
        this._super(elem);
    }

    ccalendar.prototype = {
        type: "ccalendar",
        _cDates: [],
        _cDatesMap: {},
        _cAnnos: [],
        _cAnnosMap: {},
        _cMinDate: null,
        _cMaxDate: null,
        init: function () {
            this._super();
            this._monthBar.leftNav.onClick(this._ccOnPrevMonth, this);
            this._monthBar.rightNav.onClick(this._ccOnNextMonth, this);
            this._monthBar.middle.removeListener("longtap", this._openMonthChooser);
            this._daysBar.removeListener("longtap", this._openStartOfWeekChooser);
            this._calBox.onClick(this._ccOnDateSelect, this, ".juci_date");
            this._ccEnableYear();
            this._ccEnableMonth();
            this._ccSetMinMaxDates();
            this._ccProcessCDates();
        },
        _onNextYear: function () {
            this.navigateTo(this._currentYear + 1, this._currentMonth);
            this._ccOnPrevMonth();
            this._ccOnNextMonth();
        },
        _onPrevYear: function () {
            this.navigateTo(this._currentYear - 1, this._currentMonth);
            // call previous month
            this._ccOnPrevMonth();
            this._ccOnNextMonth();
        },
        value: function (val) {
            if (val) { // TODO: Quick fix. Can write it better
                this._val = val;
                this._currentMonth = this._currentMonth;
                this._currentYear = this._currentYear;
                if (this._selectedLabel) {
                    this._selectedLabel.removeClass("selected");
                }
                delete this._selectedLabel;
                this.refresh();
                this._ccProcessCDates();
            } else if (val == "") {
                var defaultDate = new Date(this._defaultDate);
                this._val = null;
                this.navigateTo(defaultDate.getFullYear(), defaultDate.getMonth());
                this.refresh();
                this._ccProcessCDates();
            }
            return this.getDate() ? this.getDate() : null;
        },
        Events: juci.controls.basecontrol.prototype.Events.concat(["customdateselect", "calendarnavigate", "dateselect"]),
        setCustomDates: function (dates) {
            this._cDatesMap = {};
            this._cDates = dates;
            for (var d = 0; d < dates.length; d++) {
                var date = new Date(dates[d].date);
                if (dates[d].type.toLowerCase() == "holiday") {
                    var date = new Date(dates[d].date);
                    var yr = date.getFullYear();
                    if (!this._cDatesMap[yr])
                        this._cDatesMap[yr] = {};
                    var yrObj = this._cDatesMap[yr];

                    var mth = date.getMonth();
                    if (!yrObj[mth])
                        yrObj[mth] = {};
                    var mthObj = yrObj[mth];

                    var dt = date.getDate();
                    mthObj[dt] = dates[d];
                } else if (dates[d].type.toLowerCase() == "offday") {
                    if (!this._cDatesMap["off"])
                        this._cDatesMap["off"] = {};

                    var offObj = this._cDatesMap["off"];
                    offObj[dates[d].date] = dates[d];
                }
            }
            this._ccProcessCDates();
        },

        setMinMaxDates: function (minDate, maxDate) {
            this._ccSetMinMaxDates(minDate, maxDate);
        },

        setAnnotations: function (annotations) {
            this._cAnnos = annotations;
            this._cAnnosMap = {};
            for (var d = 0; d < annotations.length; d++) {
                var date = new Date(annotations[d].date);

                var yr = date.getFullYear();
                if (!this._cAnnosMap[yr])
                    this._cAnnosMap[yr] = {};
                var yrObj = this._cAnnosMap[yr];

                var mth = date.getMonth();
                if (!yrObj[mth])
                    yrObj[mth] = {};
                var mthObj = yrObj[mth];

                var dt = date.getDate();
                if (!mthObj[dt])
                    mthObj[dt] = [];
                mthObj[dt].push(annotations[d]);
            }
            this._ccProcessCDates();
        },

        /* Internal */
        _ccProcessCDates: function () {
            if (this._cDates && this._cDates.length > 0) {
                var dts = this._dates;
                var y = this._currentYear;
                var m = this._currentMonth;
                for (var d = 0; d < dts.length; d++) {
                    var dtElem = dts[d];
                    var cDt = null;
                    if (dtElem.el.className.indexOf("selected") == -1) {
                        var dt = (dtElem.html()).trim();
                        dt = "" + parseInt(dt.substring(0, 2), 10); //to remove the padded annotation HTML
                        var calDate = new Date((m + 1) + "/" + dt + "/" + y);
                        dtElem.attr("data-date", (m + 1) + "/" + dt + "/" + y);
                        var ts = calDate.getTime();
                        var dy = calDate.getDayName();
                        var min, max;
                        if (!this._cMinDate)
                            min = new Date().getTime(); //set min date to current time
                        else
                            min = this._cMinDate;

                        if (!this._cMaxDate)
                            max = 10000000000000000000000000; //if no max set max to infinite;
                        else
                            max = this._cMaxDate;

                        if (this._cDatesMap[y] && this._cDatesMap[y][m])
                            cDt = this._cDatesMap[y][m][dt];

                        if (!cDt && this._cDatesMap["off"][dy])
                            cDt = this._cDatesMap["off"][dy];

                        if (cDt) {
                            if (cDt.class)
                                dtElem.addClass(cDt.class);
                            if (cDt.select == "false") {
                                dtElem.el.setAttribute("select", "false");
                                dtElem.addClass("juci_date_disabled");
                            }
                        } else {
                            dtElem.el.className = "juci_date";
                            dtElem.el.removeAttribute("select");
                        }

                        //							if(ts < min || ts > max){
                        //								dtElem.addClass("juci_date_disabled");
                        //								dtElem.el.setAttribute("select","false");
                        //							}else{
                        //								if(!cDt)
                        //									dtElem.el.removeAttribute("select");
                        //							}

                        var aDt;
                        var rowElem;
                        if (this._cAnnosMap[y] && this._cAnnosMap[y][m])
                            aDt = this._cAnnosMap[y][m][dt];
                        if (aDt) {
                        	var appendedClasses = dtElem.el.getElementsByClassName("juci_date_annotation");
                            var l = appendedClasses.length;
                            for (var i=l-1; i>=0;i--){
                                appendedClasses[i].remove();
                            }
                            var appendedClassestwo = dtElem.el.getElementsByClassName("juci_date_annotation_row");
                        	var l = appendedClassestwo.length;
                            for (var i=l-1; i>=0;i--){
                            	appendedClassestwo[i].remove();
                            }
                            var appendedClassesthree = dtElem.el.getElementsByClassName("juci_date_annotation_row_num");
                            var l = appendedClassesthree.length;
                            for (var i=l-1; i>=0;i--){
                            	appendedClassesthree[i].remove();
                            }
                            for (var j = 0; j < aDt.length; j++) {
                                 
                            if(j<=5){
                                if(j==0){
                                     rowElem = new juci.elem("<div class ='juci_date_annotation_row'></div>").appendTo(dtElem);
                                    var annoElem = new juci.elem("<div class='juci_date_annotation " + aDt[j].class + "'>" + aDt[j].text + "</div>").appendTo(rowElem);
                                }else if (j==5){
                                    rowElem = new juci.elem("<div class ='juci_date_annotation_row_num'></div>").appendTo(dtElem);
                                    var r = j+1-5;
                                    rowElem.html("+"+r);
                                }else{
                                 var annoElem = new juci.elem("<div class='juci_date_annotation " + aDt[j].class + "'>" + aDt[j].text + "</div>").appendTo(rowElem);
                                }
                            }else{
                             var r = j+1-5;
                            rowElem.html("+"+r);
                            }

                            }
                        }
                    }
                }
            }

        },

        _onDateClick: function (e) {
            var day = e.delegatee.html();
            if (e.target.el.className.search("disabled") > -1) {
                this._val = "";
                return;
            }
            if (day > 0) {
                var date = Date.getDateFrom(day, this._currentMonth, this._currentYear);
                var obj = new EventObject({
                    date: date.clone()
                });
                if (this._selectedLabel) {
                    this._selectedLabel.removeClass("selected");
                }
                this.fireEvent("dateselect", obj);
                if (!obj.isCancelled()) {
                    e.delegatee.addClass("selected");
                    this._selectedLabel = e.delegatee;
                    this._val = date;
                } else {
                    if (this._selectedLabel) {
                        this._selectedLabel.addClass("selected");
                    }
                }
            }
        },

        _ccEnableYear: function () {
            if (this.j.attr("data-year") && this.j.attr("data-year") === "false") {
                this.j.findByClass("juci_year")[0].hide()
            }
        },

        _ccEnableMonth: function () {
            if (this.j.attr("data-month") && this.j.attr("data-month") === "false") {
                this.j.findByClass("juci_month")[0].hide()
            }
        },

        _ccSetMinMaxDates: function (minDate, maxDate) {
            if (!minDate && this.j.attr("data-mindate") && this.j.attr("data-mindate") != "") {
                minDate = this.j.attr("data-mindate");
            }

            if (!maxDate && this.j.attr("data-maxdate") && this.j.attr("data-maxdate") != "") {
                maxDate = this.j.attr("data-maxdate");
            }

            if (minDate)
                this._cMinDate = new Date(minDate.trim()).getTime();
            if (maxDate)
                this._cMaxDate = new Date(maxDate.trim()).getTime();
        },

        _ccOnPrevMonth: function (e) {
            this._ccProcessCDates();
        },

        _ccOnNextMonth: function (e) {
            this._ccProcessCDates();
        },
        _ccOnDateSelect: function (e) {
            var dtStr
            var calDate = new Date(e.delegatee.attr("data-date"));
            if (calDate.getDate() == 26 && calDate.getMonth() == 4) {
                debugger;
            }
            var y = this._currentYear;
            var m = this._currentMonth;
            var dt = calDate.getDate();
            var dy = calDate.getDayName();
            var ts = calDate.getTime();

            var cDt;
            if (this._cDatesMap[y] && this._cDatesMap[y][m])
                cDt = this._cDatesMap[y][m][dt];
            if (!cDt && this._cDatesMap["off"][dy])
                cDt = this._cDatesMap["off"][dy];

            var aDt;
            if (this._cAnnosMap[y] && this._cAnnosMap[y][m])
                aDt = this._cAnnosMap[y][m][dt];

            var selectedDtObj = {
                year: y,
                month: m + 1,
                date: dt,
                custom: cDt,
                annotation: aDt
            };

            if (e.delegatee.attr("select") && e.delegatee.attr("select") == "false") {
                e.delegatee.removeClass("selected");
                this.selectedDate = null;
            } else
                this.selectedDate = selectedDtObj;

            var evt = new EventObject(selectedDtObj);
            this.fireEvent("customdateselect", evt);
        }
    }

    juci.extend(ccalendar, juci.controls.calendar);
    juci.controls.ccalendar = ccalendar;
})();