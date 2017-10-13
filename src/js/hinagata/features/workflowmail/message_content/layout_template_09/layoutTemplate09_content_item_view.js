var Backbone = require('backbone');
module.exports = (function () {
	var LayoutTemplate01ContentItemView = Backbone.Marionette.ItemView.extend({
		template: require('./layoutTemplate09_content_item_template.html'),
		templateHelpers: {
			convertUrl: function( url ){
				return App.util.text.convertUrl(url);
			},
			getSubject: function() {
		        return App.appModel.getLanguageType().mail.layoutTemplate.subject;
    		},
    		getSubjectNote: function() {
    			return App.appModel.getLanguageType().mail.messageContent.subjectNote;
    		},
    		getMessageContentTitle: function() {
    			return App.appModel.getLanguageType().mail.messageContent.messageContentTitle;	
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
    		},
    		getUrlLink: function(number) {
    			var urlLink = App.appModel.getLanguageType().mail.layoutTemplate.urlLink;
    			var numberTmp = App.util.text.formatNumberLayoutMail(number);
    			if ( numberTmp ) {
    				urlLink += numberTmp;
    			}
	           return urlLink;
    		},
    		getSaveAsTemplate: function() {
    			return App.appModel.getLanguageType().mail.messageContent.saveAsTemplate;	
    		}
		}
	});

	return LayoutTemplate01ContentItemView;

})();