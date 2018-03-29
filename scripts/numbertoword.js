 
		  var webUtility =
    {
        a: ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '],
        b: ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'],

        AmountDigitToWord: function (amoutObject) {
            var num = amoutObject.AmountInDigit;
            //AmountClass.AmountInDigit = num;
            //AmountClass.AmountInWords = '';
            amoutObject.AmountInDigit = 0;
            var str = '';
            num = num.toString().replace(/\,/g, '');
            if ((num = num.toString()).length > 9)
                str = 'limited to 9 chars.';
            else {
                var numString = ('000000000' + num);
                n = numString.substr(numString.length - 9, 9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
                if (!n) {
                    str = "invalid number supplied.";
                }
                else {
                    str += (n[1] != 0) ? (this.a[Number(n[1])] || this.b[n[1].charAt(0)] + ' ' + this.a[n[1].charAt(1)]) + 'Crore ' : '';
                    str += (n[2] != 0) ? (this.a[Number(n[2])] || this.b[n[2].charAt(0)] + ' ' + this.a[n[2].charAt(1)]) + 'Lakh ' : '';
                    str += (n[3] != 0) ? (this.a[Number(n[3])] || this.b[n[3].charAt(0)] + ' ' + this.a[n[3].charAt(1)]) + 'Thousand ' : '';
                    str += (n[4] != 0) ? (this.a[Number(n[4])] || this.b[n[4].charAt(0)] + ' ' + this.a[n[4].charAt(1)]) + 'Hundred ' : '';
                    str += (n[5] != 0) ? ((str != '') ? 'And ' : '') + (this.a[Number(n[5])] || this.b[n[5].charAt(0)] + ' ' + this.a[n[5].charAt(1)]) + 'Only ' : '';
                    amoutObject.AmountInDigit = parseInt(num);
                    if (str.indexOf('Only') == -1) {
                        str += ' Only';
                    }
                }
            }
            amoutObject.AmountInWords = str;
            return amoutObject;
        },

        NumberToWord: function (num) {

//            if (num === 0 || num === '') {
//                $("#" + ctrlToDisplay).parents('span').children('span').hide();
//                $("#" + ctrlToDisplay).hide();
//            }
//            else {
//                $("#" + ctrlToDisplay).parents('span').children('span').show();
//                $("#" + ctrlToDisplay).show();
//            }


            //var spnId = '#spn' + ctrlToDisplay;
           // $(spnId).css('display', 'none');
            var str = '';

            num = num.toString().replace(/\,/g, '');
            if ((num = num.toString()).length > 9)
                str = 'limited to 9 chars.';
            else {
                var numString = ('000000000' + num);
                n = numString.substr(numString.length - 9, 9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
                if (!n) {
                    str = "invalid number supplied.";
                }
                else {
                    str += (n[1] != 0) ? (this.a[Number(n[1])] || this.b[n[1].charAt(0)] + ' ' + this.a[n[1].charAt(1)]) + 'Crore ' : '';
                    str += (n[2] != 0) ? (this.a[Number(n[2])] || this.b[n[2].charAt(0)] + ' ' + this.a[n[2].charAt(1)]) + 'Lakh ' : '';
                    str += (n[3] != 0) ? (this.a[Number(n[3])] || this.b[n[3].charAt(0)] + ' ' + this.a[n[3].charAt(1)]) + 'Thousand ' : '';
                    str += (n[4] != 0) ? (this.a[Number(n[4])] || this.b[n[4].charAt(0)] + ' ' + this.a[n[4].charAt(1)]) + 'Hundred ' : '';
                    str += (n[5] != 0) ? ((str != '') ? 'And ' : '') + (this.a[Number(n[5])] || this.b[n[5].charAt(0)] + ' ' + this.a[n[5].charAt(1)]) + 'Only ' : '';
                    if (str.indexOf('Only') == -1) {
                        str += ' Only';
                    }
                  //  $(spnId).css('display', '');
                }
            }
            if (num.toString().trim() == "") {
             //   $(spnId).css('display', 'none');
                str = '';
            }
            //document.getElementById(ctrlToDisplay).innerHTML = str;
            return str;
        },

        AmountGetNearestDigit: function (num, minLimit, maxLimit) {

            var NearestAmountClass = new Object();
            NearestAmountClass.Digit = 0;
            NearestAmountClass.Suffix = '';
            NearestAmountClass.Status = 'F';
            if (num >= minLimit && num <= maxLimit) {
                var convertedValue = num / 1000;
                if (convertedValue < 10000) {
                    convertedValue = Math.floor(convertedValue);
                    convertedValue = convertedValue.toFixed(1);
                    NearestAmountClass.Digit = convertedValue / 100; // / 100;
                    NearestAmountClass.ActualAmount = convertedValue * 1000;
                    NearestAmountClass.Suffix = 'Lakh';
                    NearestAmountClass.Status = 'S';
                }
                else {
                    convertedValue = num / 1000;
                    convertedValue = Math.floor(convertedValue);
                    convertedValue = convertedValue.toFixed(1);
                    NearestAmountClass.Digit = convertedValue / 10000;
                    NearestAmountClass.ActualAmount = convertedValue * 1000;
                    NearestAmountClass.Suffix = 'Crore';
                    NearestAmountClass.Status = 'S';
                }
            }
            else {
                //NearestAmountClass.Suffix = 'Amount is limited to ' + minLimit + ' (Four Lakh) to ' + maxLimit + ' (Ninty Nine Crore)';
                NearestAmountClass.Suffix = 'Annual Income criteria not met';
            }
            return NearestAmountClass;
        },

        CalculateAge: function () {
            var ryear = 0;
            var rmonth = 0;
            var rday = 0;
            var age = 0;
            // var splitedDOB = $('input[id$=hdnDOB]', $('#dvHiddenContainer')).val().split('-');
            var splitedDOB = $('input[id$=hdnDOB]', $('#dvHiddenContainer')).val().split('/');
            var iDay = parseInt(splitedDOB[0], 10);
            var iMonth = parseInt(splitedDOB[1], 10);
            var iYear = parseInt(splitedDOB[2], 10);

            if (iDay > 0 && iMonth > 0 && iYear > 0) {
                var mydateArr = currentDate.split("-");
                var myDayStr = mydateArr[0];
                var myMonthStr = mydateArr[1];
                var myYearStr = mydateArr[2];
                var iCYear = myYearStr;
                var iCMonth = myMonthStr;
                var iCDay = myDayStr;
                ryear = (iCYear - iYear);
                rmonth = (iCMonth - iMonth);
                rday = (iCDay - iDay);
                var iTempMonth = 0;
                var iTempAge = 0;
                if (rmonth < 0) {
                    iTempAge = ryear - 1;
                } else if (rmonth > 0) {
                    iTempAge = ryear;
                } else if (rmonth == 0)
                    if (rday < 0) {
                        iTempAge = ryear - 1;
                    } else if (rday > 0) {
                        iTempAge = ryear;
                    } else if (rday == 0) {
                        iTempAge = ryear;
                    }
                age = iTempAge;
            }
            return age;
        }
    };
	
	   function fntemp(number) {
            var formattedNumber = "";
            if (number > 999) {
                var no = parseInt(number / 1000);
                formattedNumber = (number - no * 1000)
                if (formattedNumber == 0) {
                    formattedNumber = "000";
                }
                else if (formattedNumber < 10) {
                    formattedNumber = "00" + formattedNumber;
                }
                else if (formattedNumber < 100) {
                    formattedNumber = "0" + formattedNumber;
                }
                number = no;
                while (no > 99) {
                    //alert(no)
                    no = parseInt(no / 100);
                    var temp = (number - no * 100);
                    if (temp == 0) {
                        formattedNumber = "00" + "," + formattedNumber;
                    }
                    else if (temp < 10) {
                        formattedNumber = "0" + (number - no * 100) + "," + formattedNumber;
                    }
                    else {
                        formattedNumber = (number - no * 100) + "," + formattedNumber;
                    }
                    number = no;
                }
                formattedNumber = no + "," + formattedNumber;
                //alert(formattedNumber);
            }
            else {
                formattedNumber = number;
            }
            return formattedNumber;
        }
	function fnFormatCurrencyIndianStyle(objTextBox, maxlenght) {
            var number = "";
            if (objTextBox.value != '' && objTextBox.value != '0') {
                var temp = objTextBox.value.split(',');
                //alert(temp.length);
                for (var i = 0; i < temp.length; i++) {
                    number = number + "" + temp[i];
                    //alert(number);
                }
                if (number != "") {
                    // alert(parseInt(number));
                    if (number.charAt(0) == "0" && number > 0) {
                        //                 alert("hi");
                        //number = RemoveZeroAtFirst(number);
                        number = number.replace(/^0+/, '');
                    }
                    number = Math.round(number);
                    var tmpstr = fntemp(parseInt(number));

                    objTextBox.value = fntemp(parseInt(number));
                    if (objTextBox.innerHTML != undefined) {
                        objTextBox.value = objTextBox.value;
                    }
                    if (tmpstr.length > maxlenght) {
                        tmpstr = tmpstr.substring(0, tmpstr.length - 1);
                        objTextBox.value = tmpstr;
                        if (objTextBox.innerHTML != undefined) {
                            objTextBox.innerHTML = objTextBox.value;
                        }
                        fnFormatCurrencyIndianStyle(objTextBox, maxlenght)
                    }
                }
            }
        }
 