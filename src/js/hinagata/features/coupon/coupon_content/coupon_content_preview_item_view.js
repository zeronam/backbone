var Backbone = require('backbone');
module.exports = (function () {
	var MessageContentItemView = Backbone.Marionette.ItemView.extend({
		template: require('./coupon_content_preview_item_template.html'),
		templateHelpers: {
	      	convertDate: function( date ) {
	      		return App.util.date.convertDate(date, "YYYY/MM/DD");
	      	},
	      	convertDateValidity: function(validity, memberOnly) {
	      		var date = App.util.date.setDate(new Date(),"day", validity - 1)._d;
	      		var text;
	      		if ( App.appModel.getLanguage() === "en" ) {
	      			text = validity + " dates";
	      			if ( memberOnly === "2" ) {
		      			text += " from register date";
		      		} else {
		      			text += " from issue date";
		      		}
		      		text += "(Until " + App.util.date.convertDate1(date, "", "YYYY/MM/DD") + ")";
	      		} else {
	      			if ( memberOnly === "2" ) {
		      			text = "会員登録日より";
		      		} else {
		      			text = "発行日より";
		      		}
		      		text += validity + "日";
		      		text += "(" + App.util.date.convertDate1(date, "", "YYYY/MM/DD") + "まで)"
	      		}
	      		return text;
	      	},
	      	getUrlImage: function(imageName) {
	      		if ( imageName === "./image/main/noImage.png" ) return imageName;
				var lengthUrl = AppConf.url.appRoot.indexOf('/btapi');
				var imgUrl = AppConf.url.appRoot.substr(0, lengthUrl) + imageName;
				return imgUrl;
			},
			getCouponsName: function(){
				return App.appModel.getLanguageType().coupon.content.couponName;
			},
			getCouponDetails: function(){
				return App.appModel.getLanguageType().coupon.content.couponDetails;
			},
			getConditionsOfUse: function(){
				return App.appModel.getLanguageType().coupon.information.conditionsOfUse;
			},
			getExpirationDate: function(){
				return App.appModel.getLanguageType().coupon.information.expirationDate;
			},
			getNotes: function(){
				return App.appModel.getLanguageType().coupon.content.notes;
			},
			getExpirationDate1: function(){
				return App.appModel.getLanguageType().coupon.content.expirationDate1;
			},
			getExpirationDate2: function(){
				return App.appModel.getLanguageType().coupon.content.expirationDate2;
			},
			getDay: function(){
				return App.appModel.getLanguageType().coupon.content.day;
			},
			getUseInterval: function() {
				return App.appModel.getLanguageType().coupon.content.preview.useInterval;	
			},
			getUseLimit: function(useLimit) {
				var useLimitText = "";
				if ( App.appModel.getLanguage() === "en" ) {
					useLimitText = "Total of limit use: " + useLimit;
				} else {
					useLimitText = "利用制限: 先着 " + useLimit + " 名まで利用可能";
				}
				return useLimitText;
			},
			getTimesLimit: function(timesLimit) {
				var timesLimitText = "";
				if ( App.appModel.getLanguage() === "en" ) {
					timesLimitText = "Total of limit times: " + timesLimit;
				} else {
					timesLimitText = "回数制限: 合計 " + timesLimit + " 回まで利用可能";
				}
				return timesLimitText;
			}
		}
	});

	return MessageContentItemView;

})();