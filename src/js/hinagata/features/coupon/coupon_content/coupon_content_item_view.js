var Backbone = require('backbone');
module.exports = (function () {
	var MessageContentItemView = Backbone.Marionette.ItemView.extend({
		template: require('./coupon_content_item_template.html'),
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
			convertImageName: function(imageName, imageFileName) {
				if ( imageFileName === "./image/main/noImage.png" ) return "";
				var imageNameExtension = imageName.split('.').pop().toLowerCase();
				if ( imageNameExtension === "jpg" || imageNameExtension === "jpeg" || imageNameExtension === "gif" ) {
					return imageName;
				} else {
					var extension = imageFileName.split('.').pop().toLowerCase();
					var fullImageName = imageName + "." + extension;
					return fullImageName;
				}
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
			getPageTitle: function(){
				return App.appModel.getLanguageType().coupon.content.pageTitle;
			},
			getCouponsName: function(){
				return App.appModel.getLanguageType().coupon.content.couponName;
			},
			getCouponDetails: function(){
				return App.appModel.getLanguageType().coupon.content.couponDetails;
			},
			getCouponDetailsPlaceHolder: function(){
				return App.appModel.getLanguageType().coupon.content.couponDetailsPlaceHolder;
			},
			getCouponImage: function(){
				return App.appModel.getLanguageType().coupon.content.couponImage;
			},
			getChoose: function(){
				return App.appModel.getLanguageType().coupon.content.choose;
			},
			getNotes: function(){
				return App.appModel.getLanguageType().coupon.content.notes;
			},
			getNotesPlaceHolder: function(){
				return App.appModel.getLanguageType().coupon.content.notesPlaceHolder;
			},
			getLink: function(){
				return App.appModel.getLanguageType().coupon.content.link;
			},
			getToViewTheSocialCooperationList: function(){
				return App.appModel.getLanguageType().coupon.content.toViewTheSocialCooperationList;
			},
			getALinkToTheTopPage: function(){
				return App.appModel.getLanguageType().coupon.content.aLinkToTheTopPage;
			},
			getALinkToTheCouponList: function(){
				return App.appModel.getLanguageType().coupon.content.aLinkToTheCouponList;
			},
			getALinkToTheMemberRegistration: function(){
				return App.appModel.getLanguageType().coupon.content.aLinkToTheMemberRegistration;
			}
		}
	});

	return MessageContentItemView;

})();