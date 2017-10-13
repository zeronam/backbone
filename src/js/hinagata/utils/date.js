/**
 * 雛形アプリにおける日付操作を共通かしたメソッド群を提供
 */

var moment = require("moment");
module.exports = (function () {

	var DateUtil = {
		isToday: function( date ){
			return DateUtil.atSameDate( date, new Date() );
		},
		isThisWeek: function(date){
			return moment(date).isSame(new Date(), 'isoweek');
		},
		isThisMonth: function( date ){
			return moment(date).isSame(new Date(), 'month');
		},
		isThisYear: function(date){
			return moment(date).isSame(new Date(), 'year');
		},
		isThisQuarter: function(date){
			return moment(date).isSame(new Date(), 'quarter');
		},
		atSameDate: function(date1, date2){
			var format = "YYYYMMDD";
			return moment(date1).format(format) === moment(date2).format(format);
		},
		atSameDate1: function(date1, date2, format) {
			return moment(date1).format(format) === moment(date2).format(format);
		},
		checkInFeatureDay: function(date) {
			var format = "YYYYMMDD";
			return moment(date).format(format) > moment(new Date()).format(format);
		},
		checkDate: function(date1, date2, format) {
			var format1 = "YYYYMMDDHHmm";
			var dateTmp1 = moment(date1, format1);
			var dateTmp2 = moment(date2, format1);
			if ( DateUtil.checkInFeatureDay( dateTmp2 ) ) {
				var check = moment(dateTmp1).format(format) <= moment(dateTmp2).format(format);
				if ( check === true ) {
					return "2";
				} else {
					return "1";
				}
			} else {
				return	"0";
			}
		},
		checkDateSystem: function(date){
			var format = "YYYYMMDDHHmm"; console.log(moment(date).format(format));console.log(moment(new Date()).format(format));
			return moment(date).format(format) > moment(new Date()).format(format);
		},
		checkDate1: function(date1, date2, dateCompare1, dateCompare2, format) {
			var format1 = "YYYY/MM/DD HH:mm";
			var format2 = "YYYYMMDDHHmm";
			var dateTmp1 = moment(date1, format1);
			var dateTmp2 = moment(date2, format1);
			var dateCompareTmp1 = moment(dateCompare1, format2);
			var dateCompareTmp2 = moment(dateCompare2, format2);
			dateTmp1 = moment(dateTmp1).format(format);
			dateTmp2 = moment(dateTmp2).format(format);
			dateCompareTmp1 = moment(dateCompareTmp1).format(format);
			dateCompareTmp2 = moment(dateCompareTmp2).format(format);
			var today = moment(new Date()).format(format);
			if ( dateCompare1 && dateCompare2 ) {
				if ( dateTmp1 > dateCompare1 ) {
					return "0";
				} else if ( dateTmp2 > dateCompare2 ) {
					return "1";
				} else if ( dateTmp1 > dateTmp2 ) {
					return "2";
				} else if ( dateTmp2 < today ) {
					return "3";
				} else {
					return "4";
				}
			} else {
				if ( dateTmp1 > dateTmp2 ) {
					return "2";
				} else if ( dateTmp2 < today ) {
					return "3";
				} else {
					return "4";
				}
			}
		},
		convertDate: function( date, format ) {
			if ( !date ) return "";
			if ( date.length === 12 ) {
				var dateTmp = moment(date, "YYYYMMDDHHmm");
				return moment(dateTmp).format(format);
			} else if ( date.length === 14 ) {
				var dateTmp = moment(date, "YYYYMMDDHHmmss");
				return moment(dateTmp).format(format);
			} else {
				return date;
			}
		},
		convertDate1: function( date, format1, format2 ) {
			if ( !date ) return "";
			var dateTmp = date;
			if ( format1 ) {
				dateTmp = moment(date, format1);
			}
			return moment(dateTmp).format(format2);
		},
		setDate: function(date, type, number) {
	    	if ( !date ) return "";
	    	// type = year/month/week/day
	    	return moment( date ).add(type, number);
	    },
	    formatDate: function( dateTime, format ){
        	if( !dateTime ) return "";
        	return moment( dateTime ).format(format);
	    },
	    getToday: function(date,format){
	    	return moment(date).format(format);
	    },
	    getStartWeek: function(date, format) {
	    	return moment(date).startOf('isoweek').format(format);
	    },
	    getEndWeek: function(date, format) {
	    	return moment(date).endOf('isoweek').format(format);
	    },
	    getStartMonth: function(date, format){
	    	return moment(date).startOf('month').format(format);
	    },
	    getEndMonth: function(date, format){
	    	return moment(date).endOf('month').format(format); 
	    },
	    getStartYear: function(date, format){
	    	return moment(date).startOf('year').format(format);
	    },
	    getEndYear: function(date, format){
	    	return moment(date).endOf('year').format(format); 
	    },
	    getDaysInMonth: function(date, format) {
	    	return moment(date, format).daysInMonth();
	    },
	    getStartQuarter: function(date, format){
	    	return moment(date).startOf('quarter').format(format);
	    },
	    getEndQuarter: function(date, format){
	    	return moment(date).endOf('quarter').format(format); 
	    },
	    getWeekNumber: function(date){
	    	return moment(date).week();
	    },
	    getQuarterNumber: function(date){
	    	return moment(date).quarter();
	    }
	};
	return DateUtil;
})();
