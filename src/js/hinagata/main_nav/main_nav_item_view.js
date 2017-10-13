var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {
	var MainNavItemView = Backbone.Marionette.ItemView.extend({
		// className: "message_content cf",
		template: require('./main_nav_item_view.html'),
		templateHelpers: {
			formatDateTime: function( date ){
				var dateTmp = moment(date, "YYYYMMDDHHmm");
				if ( App.appModel.getLanguage() === "en" ) {
					return moment(dateTmp).format("Do MMM YYYY");
					// return moment(dateTmp).format("Do MMM YYYY [at] HH:mm");
				} else {
					return moment(dateTmp).format("YYYY年MM月DD日");
					// return moment(dateTmp).format("YYYY年MM月DD日 HH時mm分");
				}
			},
			getSendDate: function() {
				return App.appModel.getLanguageType().mail.main.sendDate;
			},
			getSubscribes: function() {
				return App.appModel.getLanguageType().mail.main.subscribers;
			},
			getOpens: function() {
				return App.appModel.getLanguageType().mail.main.opens;
			},
			getClicks: function() {
				return App.appModel.getLanguageType().mail.main.clicks;
			},
			getDelivCount: function(status, dsStatus, delivCount) {
				if ( status === 9 && dsStatus === 3 ) {
					return delivCount;
				} else {
					if ( delivCount <= 0 ) {
						return "-";
					} else {
						return delivCount;
					}
				}
			},
			getOpenMail: function(status, dsStatus, countOpen) {
				if ( status === 9 && dsStatus === 3 ) {
					return countOpen;
				} else {
					if ( countOpen <= 0 ) {
						return "-";
					} else {
						return countOpen;
					}
				}
			},
			getClickMail: function(status, dsStatus, countClick) {
				if ( status === 9 && dsStatus === 3 ) {
					return countClick;
				} else {
					if ( countClick <= 0 ) {
						return "-";
					} else {
						return countClick;
					}
				}
			},
			getStatusMail: function(status, dsStatus, regisStatus, delivStop) {
				if ( status === 9 && dsStatus === 3 ) {
					return 1;
				} else if ( status === 9 && dsStatus !== 3 && delivStop === 0 ) {
					return 2;
				} else if ( status === 9 && dsStatus !== 3 && delivStop === 1 ) {
					return 3;
				} else if ( status === 0 ) {
					return 4;
				} else if ( status !== 0 && status !== 9 && status === regisStatus ) {
					return 5;
				} else {
					return 6;
				}
			},
			getStatusText: function(status, dsStatus) {
				var statusText = "";
				if ( status === 9 && dsStatus === 3 ) {
					statusText = App.appModel.getLanguageType().mail.menu.menuTopMail.sent;
				} else if ( status === 9 && dsStatus !== 3 ) {
					statusText = App.appModel.getLanguageType().mail.menu.menuTopMail.scheduled;
				} else if ( status === 0 ) {
					statusText = App.appModel.getLanguageType().mail.menu.menuTopMail.draft;
				} else if ( status === 1 && dsStatus === 0 ) {
					statusText = App.appModel.getLanguageType().mail.menu.menuTopMail.waitApprove;
				} else {
					statusText = App.appModel.getLanguageType().mail.menu.menuTopMail.other;
				}
				statusText += "：";
				return statusText;
			},
			getConditionName: function(conditionName) {
				if ( !conditionName ) {
					return App.appModel.getLanguageType().mail.main.conditionAll;
				} else {
					return conditionName;
				}
			},
			checkThisMonth: function(startTime) {
				var format = "YYYYMM";
				var dateTmp = App.util.date.convertDate(startTime, format);
				var thisMonth = App.util.date.convertDate1(new Date(), "", format);
				if ( dateTmp === thisMonth ) {
					return 1;
				} else {
					return 0;
				}
			},
			getHeaderDateList: function(startTime) {
				if ( this.checkThisMonth(startTime) === 1 ) {
					return App.appModel.getLanguageType().mail.main.currentMonthText;
				} else {
					if ( App.appModel.getLanguage() === "en" ) {
						return App.util.date.convertDate(startTime, "MMMM YYYY");
					} else {
						return App.util.date.convertDate(startTime, "YYYY年MM月");
					}
				}
			}
		}
	});

	return MainNavItemView;

})();
