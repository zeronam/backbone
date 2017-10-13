var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {
	var CouponListItemView = Backbone.Marionette.ItemView.extend({
		template: require('./coupon_list_item_template.html'),
		templateHelpers: {
			getUrlImage: function(imageName, thumbImage) {
				var lengthUrl = AppConf.url.appRoot.indexOf('/btapi');
				var imgUrl;
				var image;
				if ( thumbImage ) {
					image = thumbImage;
				} else {
					image = imageName;
				}
				if ( image.indexOf("data:image") < 0 ) {
					imgUrl = AppConf.url.appRoot.substr(0, lengthUrl) + image;	
				}
				// var imgUrl = AppConf.url.appRoot.substr(0, lengthUrl) + imageName;
				return imgUrl;
			},
			getSendTotal: function(status, sendTotal, memberOnly) {
				var sendTotalVal = "";
				switch ( parseInt(memberOnly) ) {
					case 0:
					case 2:
						if( parseInt(status) === 1 ){
							if( parseInt(sendTotal) > 0) {
								sendTotalVal = sendTotal;
							} else{
								sendTotalVal = "0";
							}
						} else {
							sendTotalVal = "-";
						}
						break;
					case 1:
						sendTotalVal = App.appModel.getLanguageType().coupon.list.lbPublic;
						break;
				};
				return sendTotalVal;
			},
			getSendLabel: function(status, memberOnly, conditionName) {
				var sendLabel = "";
				if ( parseInt(status) === 1 ) {
					sendLabel = App.appModel.getLanguageType().coupon.list.sendTo;
				} else {
					sendLabel = App.appModel.getLanguageType().coupon.list.targets;
					// if ( !conditionName ) {
					// 	sendLabel = App.appModel.getLanguageType().coupon.list.conditionAll;
					// } else {
					// 	sendLabel = conditionName;
					// }
				}
				// switch ( parseInt(memberOnly) ) {
				// 	case 0:
				// 		if ( parseInt(status) === 1 ) {
				// 			sendLabel = App.appModel.getLanguageType().coupon.list.sendTo;
				// 		} else {
				// 			sendLabel = App.appModel.getLanguageType().coupon.list.targets;
				// 		}
				// 		break;
				// 	default:
				// 		sendLabel = App.appModel.getLanguageType().coupon.list.targets;
				// 		break;
				// };
				return sendLabel;
			},
			getUseTotal: function(status, useTotal) {
				var useTotalVal = "";
				if ( parseInt(status) === 1 ) {
					if ( parseInt(useTotal) > 0 ) {
						useTotalVal = useTotal;
					} else{
						useTotalVal = "0";
					}
				} else {
					useTotalVal = "-";
				}
				return useTotalVal;
			},
			getUseTotalLabel: function() {
				return App.appModel.getLanguageType().coupon.list.couponUse;
			},
			getStatusText: function(status, delivType, availableTerm, memberOnly) {				
				var statusText = "";
				switch ( parseInt(status) ) {
					case 0:
						statusText = App.appModel.getLanguageType().coupon.list.creating;
						break;
					case 1:
						if ( parseInt(delivType) === 1 && parseInt(memberOnly) === 0 ) {
							switch ( parseInt(availableTerm) ) {
								case -1:
									statusText = App.appModel.getLanguageType().coupon.list.beforeDistribution;
									break;
								case 0:
									statusText = App.appModel.getLanguageType().coupon.list.distributing;
									break;
								default:
									statusText = App.appModel.getLanguageType().coupon.list.endOfDistribution;
									break;
							};
						} else {
							statusText = App.appModel.getLanguageType().coupon.list.endOfDistribution;
						}
						break;
					case 2:
						statusText = App.appModel.getLanguageType().coupon.list.stopUsing;
						break;
					case 3:
					case 4:
						statusText = App.appModel.getLanguageType().coupon.list.distributing;
						break;
					case 5:
						statusText = App.appModel.getLanguageType().coupon.list.waitApprove;
						break;
					default:
						statusText = App.appModel.getLanguageType().coupon.list.other;
						break;
				};
				return statusText;
			},
			getStart: function(validity, useStartDateTime, useEndDateTime) {
				var startDate;
				if ( useStartDateTime === null && useEndDateTime === null ) {
					startDate = App.appModel.getLanguageType().coupon.list.afterDistribution + validity + App.appModel.getLanguageType().coupon.list.day;
				} else {
					startDate = this.formatDateTime(useStartDateTime);
					if ( !startDate ) {
						startDate = "";
					}
				}
				return startDate;
			},
			getEnd: function(useStartDateTime, useEndDateTime) {
				var endDate;
				if ( useStartDateTime === null && useEndDateTime === null ) {
					endDate = "";
				} else {
					endDate = this.formatDateTime(useEndDateTime);
					if ( !endDate ) {
						endDate = "-";
					} else {
						endDate = " ~ " + endDate;
					}
				}
				return endDate;
			},
			formatDateTime: function( date ){
				var dateTmp = moment(date, "YYYYMMDDHHmm");
				if ( App.appModel.getLanguage() === "en" ) {
					return moment(dateTmp).format("Do MMM YYYY");	
				} else {
					return moment(dateTmp).format("YYYY年MM月DD日");
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

	return CouponListItemView;

})();