var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {
	var CouponSettingItemView = Backbone.Marionette.ItemView.extend({
		template: require('./coupon_setting_content_item_template.html'),
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
			convertBrnl2: function(text) {
				return App.util.text.brnl2(text);
			},
			convertDate: function( date ) {
	      		return App.util.date.convertDate(date, "YYYY/MM/DD");
	      	},
	      	getNowDate: function(){
	        	return moment(new Date()).format("YYYY/MM/DD");
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
			getTargetSegment: function(){
				return App.appModel.getLanguageType().coupon.setting.targetSegment;
			},
	      	getDistributionMethods: function(){
				return App.appModel.getLanguageType().coupon.setting.distributionMethods;
			},
	      	getDistributionMethods1: function(){
				return App.appModel.getLanguageType().coupon.setting.distributionMethods1;
			},
	      	getDistributionMethods2: function(){
				return App.appModel.getLanguageType().coupon.setting.distributionMethods2;
			},
	      	getDistributionConditions: function(){
				return App.appModel.getLanguageType().coupon.setting.distributionConditions;
			},
	      	getDistributionConditions1: function(){
				return App.appModel.getLanguageType().coupon.setting.distributionConditions1;
			},
	      	getDistributionConditions2: function(){
				return App.appModel.getLanguageType().coupon.setting.distributionConditions2;
			},
	      	getDistributionConditions3: function(){
				return App.appModel.getLanguageType().coupon.setting.distributionConditions3;
			},
			getConditionNone: function() {
				return App.appModel.getLanguageType().coupon.setting.conditionNone;
			},
			convertDate: function(date, format) {
                if (format) {
                    return moment(date).format(format);
                } else {
                    return App.util.date.convertDate(date, "YYYY/MM/DD HH:mm");
                }
            }
		}
	});

	return CouponSettingItemView;

})();