var Backbone = require('backbone');
module.exports = (function () {
	var FooterItemView = Backbone.Marionette.ItemView.extend({
		template: require('./footer_item_template.html'),
		className: 'navi-controll',
		ui: {
	    	tab: "#navi-control-bar li"
	  	},
	  	initialize: function(options) {
	  		this.model.set("language", App.appModel.getLanguage());
	  	},
	  	templateHelpers: function(){
			  var _this = this;
			  return {
				getMailTemplate: function() {
					return App.appModel.getLanguageType().mail.footer.template;
				},
				getContent: function() {
					return App.appModel.getLanguageType().common.content;
				},
				getSetting: function() {
					return App.appModel.getLanguageType().common.setting;
				},
				getConfirm: function() {
					return App.appModel.getLanguageType().common.confirm;
				},
				getBtnBack: function() {
					return App.appModel.getLanguageType().common.btnBack;
				},
				getBtnNext: function() {
					return App.appModel.getLanguageType().common.btnNext;
				},
				getCouponType: function() {
					return App.appModel.getLanguageType().coupon.footer.type;
				},
				getCouponBasicInformation: function() {
					return App.appModel.getLanguageType().coupon.footer.basicInformation;
				},
				getNotificationFooterText: function(text) {
					return App.appModel.getLanguageType().notification.footer[text];
				},
				isHideBackBtn: function(){
					var flg = false;
					if(_this.model.get('hideBackBtn')){
						flg = true;
					}
					return flg;
				}
			  };
	  	},
		onRender: function() {			
			this.ui.tab.removeClass("active");			
			var tabIdx = this.model.get('tabIdx');
			if(tabIdx >=0 ){
				this.ui.tab.eq(tabIdx).addClass("active"); 
			}
	  	}
	});

	return FooterItemView;

})();