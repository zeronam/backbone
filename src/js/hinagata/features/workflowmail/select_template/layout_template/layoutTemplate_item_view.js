var Backbone = require('backbone');
module.exports = (function () {
	var LayoutTemplateItemView = Backbone.Marionette.ItemView.extend({
		template: require('./layoutTemplate_item_template.html'),
    	tagName: "div",
    	className: "tab-content",
    	templateHelpers: {
    		getSubject: function() {
		        return App.appModel.getLanguageType().mail.layoutTemplate.subject;
    		},
    		getHeadline: function(number) {
    			var headline = App.appModel.getLanguageType().mail.layoutTemplate.headline;
    			var numberTmp = App.util.text.formatNumberLayoutMail(number);
    			if ( numberTmp ) {
    				headline += numberTmp;
    			}
	           return headline;
    		},
    		getBodyText: function(number) {
    			var bodyText = App.appModel.getLanguageType().mail.layoutTemplate.bodyText;
    			var numberTmp = App.util.text.formatNumberLayoutMail(number);
    			if ( numberTmp ) {
    				bodyText += numberTmp;
    			}
    			return bodyText;
    		},
    		getNameBtn: function(number) {
    			var nameBtn = App.appModel.getLanguageType().mail.layoutTemplate.nameBtn;
    			var numberTmp = App.util.text.formatNumberLayoutMail(number);
    			if ( numberTmp ) {
    				nameBtn += numberTmp;
    			}
	           return nameBtn;
    		}
    	}
	});

	return LayoutTemplateItemView;
	
})();