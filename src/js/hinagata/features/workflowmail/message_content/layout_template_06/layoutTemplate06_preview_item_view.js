var Backbone = require('backbone');
module.exports = (function () {
    var LayoutTemplate01PreviewItemView = Backbone.Marionette.ItemView.extend({
        template: require('./layoutTemplate06_preview_item_template.html'),
        templateHelpers: {
			convertBodyText: function( body ) {
				return App.util.text.nl2br(body);
			},
			getHeadline: function(number) {
    			var headline = App.appModel.getLanguageType().mail.layoutTemplate.headline;
    			var numberTmp = App.util.text.formatNumberLayoutMail(number);
    			if ( numberTmp ) {
    				headline += " " + numberTmp;
    			}
	        	return headline;
    		},
    		getBodyText: function(number) {
    			var bodyText = App.appModel.getLanguageType().mail.layoutTemplate.bodyText;
    			var numberTmp = App.util.text.formatNumberLayoutMail(number);
    			if ( numberTmp ) {
    				bodyText += " " + numberTmp;
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

    return LayoutTemplate01PreviewItemView;

})();