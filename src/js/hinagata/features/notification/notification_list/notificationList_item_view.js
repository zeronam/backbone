var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {
	var PushNotificationItemView = Backbone.Marionette.ItemView.extend({
		// className: "message_content cf",
		template: require('./notificationList_item_view.html'),
		templateHelpers: {
			formatDateTime: function( openDate, repeatCondition ){
				var strDate = "";
				if(openDate == ""){					
					var res = repeatCondition.split("<BR>～");
					var dateTmp1 = moment(res[0], "YYYYMMDDHHmm");
					var dateTmp2 = moment(res[1], "YYYYMMDDHHmm");
					if ( App.appModel.getLanguage() === "en" ) {						
						strDate += moment(dateTmp1).format("Do MMM YYYY ~ ");
						strDate += moment(dateTmp2).format("Do MMM YYYY");
					} else {
						strDate += moment(dateTmp1).format("YYYY年MM月DD日 ~ ");
						strDate += moment(dateTmp2).format("YYYY年MM月DD日");
					}
				} else {
					dateTmp = moment(openDate, "YYYYMMDDHHmm");
					if ( App.appModel.getLanguage() === "en" ) {	
						strDate = moment(dateTmp).format("Do MMM YYYY");
					} else{
						strDate = moment(dateTmp).format("YYYY年MM月DD日");
					}
				}
				return strDate;
			},
			getText: function(text) {
				return App.appModel.getLanguageType().notification.main[text];
			},
			// getStatusMail: function(status, dsStatus, regisStatus, delivStop) {
			// 	if ( status === 9 && dsStatus === 3 ) {
			// 		return 1;
			// 	} else if ( status === 9 && dsStatus !== 3 && delivStop === 0 ) {
			// 		return 2;
			// 	} else if ( status === 9 && dsStatus !== 3 && delivStop === 1 ) {
			// 		return 3;
			// 	} else if ( status === 0 ) {
			// 		return 4;
			// 	} else if ( status !== 0 && status !== 9 && status === regisStatus ) {
			// 		return 5;
			// 	} else {
			// 		return 6;
			// 	}
			// },
			getStatusText: function(status) {
				var statusText = "";
				var status = parseInt(status);
				if ( status === 9) {
					statusText = App.appModel.getLanguageType().notification.menu.error;
				} else if ( status === 3 ) {
					statusText = App.appModel.getLanguageType().notification.menu.complete;
				} else if ( status === 2 ) {
					statusText = App.appModel.getLanguageType().notification.menu.inProgress;
				} else if ( status === 1 ) {
					statusText = App.appModel.getLanguageType().notification.menu.lisUp;
				} else if ( status === 0 ) {
					statusText = App.appModel.getLanguageType().notification.menu.draft;
				}
				statusText += "：";
				return statusText;
			},
			checkThisMonth: function(startTime) {
				var format = "YYYYMM";
				var dateTmp = moment(startTime).format(format);
				var thisMonth = App.util.date.convertDate1(new Date(), "", format);
				if ( dateTmp === thisMonth ) {
					return 1;
				} else {
					return 0;
				}
			},
			getHeaderDateList: function(openDate, repeatCondition) {
				if(openDate == ""){
					var res = repeatCondition.split("<BR>～");
					var dateTmp1 = res[0];
					if ( this.checkThisMonth(dateTmp1) === 1 ) {
						return App.appModel.getLanguageType().notification.main.currentMonthText;
					} else {
						if ( App.appModel.getLanguage() === "en" ) {
							return moment(dateTmp1).format("MMMM YYYY");
						} else {
							return moment(dateTmp1).format("YYYY年MM月");
						}
					}
				} else{
					if ( this.checkThisMonth(openDate) === 1 ) {
						return App.appModel.getLanguageType().notification.main.currentMonthText;
					} else {
						if ( App.appModel.getLanguage() === "en" ) {
							return moment(openDate).format("MMMM YYYY");
						} else {
							return moment(openDate).format("YYYY年MM月");
						}
					}					
				}
			}
		}
	});

	return PushNotificationItemView;

})();
