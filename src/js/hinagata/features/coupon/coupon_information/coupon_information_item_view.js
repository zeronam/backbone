var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {
	var CouponInformationItemView = Backbone.Marionette.ItemView.extend({
		template: require('./coupon_information_item_template.html'),
		templateHelpers: {
			setMemberOnly: function( memberOnly ) {
				var typeText;
				switch ( memberOnly ) {
					case "0":
						typeText = this.getMembersOnlyCoupons();
						break;
					case "1":
						typeText = this.getPublicCoupon();
						break;
					case "2":
						typeText = this.getMembersCommonCoupon();
						break;
				};
				return typeText;
			},
			getNowDate: function(flg){
				var today = moment(new Date());
				var startDate = today.format("YYYY/MM/DD 00:00");
				var endDate = today.add(1, 'd').format("YYYY/MM/DD 00:00");
				if ( flg === "start" ) {
					return startDate;
				} else if ( "end" ) {
					return endDate;
				} else {
					return moment(new Date()).format("YYYY/MM/DD HH:mm");
				}
	      	},
	      	getStddatedivCdText: function( memberOnly ) {
	      		var text = this.getExpirationDate1();
	      		if ( memberOnly === "2" ) {
	      			text = this.getExpirationDate2();
	      		}
	      		return text;
	      	},
	      	convertDate: function( date ) {
	      		return App.util.date.convertDate(date, "YYYY/MM/DD HH:mm");
	      	},
			getMembersOnlyCoupons: function() {
				return App.appModel.getLanguageType().coupon.common.membersOnlyCoupons;
			},
			getMembersCommonCoupon: function() {
				return App.appModel.getLanguageType().coupon.common.membersCommonCoupon;
			},
			getPublicCoupon: function() {
				return App.appModel.getLanguageType().coupon.common.publicCoupon;
			},
			getRequired: function() {
				return App.appModel.getLanguageType().common.required;
			},
			getCouponsName: function() {
				return App.appModel.getLanguageType().coupon.information.couponsName;
			},
			getPlaceholderCouponsName: function() {
				return App.appModel.getLanguageType().coupon.information.dialogue.maxLengthCouponName;
			},
			getClearingWay: function() {
				return App.appModel.getLanguageType().coupon.information.clearingWay;
			},
			getButtonOperationOnly: function() {
				return App.appModel.getLanguageType().coupon.information.buttonOperationOnly;
			},
			getStoreDecisionOnly: function() {
				return App.appModel.getLanguageType().coupon.information.storeDecisionOnly;
			},
			getShopAroundOnly: function() {
				return App.appModel.getLanguageType().coupon.information.shopAroundOnly;
			},
			getQRCode: function() {
				return App.appModel.getLanguageType().coupon.information.QRCode;
			},
			getConditionsOfUse: function() {
				return App.appModel.getLanguageType().coupon.information.conditionsOfUse;
			},
			getUseRestrictionsOfArrival: function() {
				return App.appModel.getLanguageType().coupon.information.useRestrictionsOfArrival;
			},
			getLimitOnTheNumberOfTimesTheTotal: function() {
				return App.appModel.getLanguageType().coupon.information.limitOnTheNumberOfTimesTheTotal;
			},
			getLimitTheMultipleUseOfTheSameDayLimitOnTheSameDay: function() {
				return App.appModel.getLanguageType().coupon.information.limitTheMultipleUseOfTheSameDayLimitOnTheSameDay;
			},
			getPlaceholderCondition: function() {
				return App.appModel.getLanguageType().coupon.information.placeholderCondition;
			},
			getAvailabilityPeriod: function() {
				return App.appModel.getLanguageType().coupon.information.availabilityPeriod;
			},
			getStartCompletionDate: function() {
				return App.appModel.getLanguageType().coupon.information.startCompletionDate;
			},
			getExpirationDate: function() {
				return App.appModel.getLanguageType().coupon.information.expirationDate;
			},
			getExpirationDate1: function() {
				return App.appModel.getLanguageType().coupon.information.noteExpirationDate1;
			},
			getExpirationDate2: function() {
				return App.appModel.getLanguageType().coupon.information.noteExpirationDate2;
			},
			getConfirmationScreen: function() {
				return App.appModel.getLanguageType().coupon.information.confirmationScreen;
			},
			getDisplayAConfirmationScreenWhenUseCoupon: function() {
				return App.appModel.getLanguageType().coupon.information.displayAConfirmationScreenWhenUseCoupon;
			},
			getCouponUrl: function() {
				return App.appModel.getLanguageType().coupon.information.couponUrl;
			} 
		}
	});

	return CouponInformationItemView;

})();