var Backbone = require('backbone');
module.exports = (function() {
    var LayoutTemplate01ContentItemView = Backbone.Marionette.ItemView.extend({
        template: require('./layoutTemplate12_content_item_template.html'),
        templateHelpers: {
            getSubject: function() {
                return App.appModel.getLanguageType().mail.layoutTemplate.subject;
            },
            getMessageContentTitle: function() {
                return App.appModel.getLanguageType().mail.messageContent.messageContentTitle;
            },
            getBodyText: function(number) {
                var bodyText = App.appModel.getLanguageType().mail.layoutTemplate.bodyText;
                var numberTmp = App.util.text.formatNumberLayoutMail(number);
                if (numberTmp) {
                    bodyText += numberTmp;
                }
                return bodyText;
            },
            getSaveAsTemplate: function() {
                return App.appModel.getLanguageType().mail.messageContent.saveAsTemplate;
            }
        }
    });

    return LayoutTemplate01ContentItemView;

})();
