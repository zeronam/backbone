var Backbone = require('backbone');
module.exports = (function() {
    var LayoutTemplate01PreviewItemView = Backbone.Marionette.ItemView.extend({
        template: require('./layoutTemplate12_preview_item_template.html'),
        templateHelpers: {
            convertBodyText: function(body) {
                return App.util.text.nl2br(body);
            },
            getSubject: function() {
                return App.appModel.getLanguageType().mail.layoutTemplate.subject;
            },
            getBodyText: function(number) {
                var bodyText = App.appModel.getLanguageType().mail.layoutTemplate.bodyText;
                var numberTmp = App.util.text.formatNumberLayoutMail(number);
                if (numberTmp) {
                    bodyText += " " + numberTmp;
                }
                return bodyText;
            }
        },
        onRender: function() {
            var _this = this;
            var tout = setTimeout(function() {
                _this.setContentBodyIframe.bind(_this)("#iframe-bodyTextOne", _this.model.get('bodyTextOne'));
                _this.setContentBodyIframe.bind(_this)("#iframe-bodyTextTwo", _this.model.get('bodyTextTwo'));
                clearTimeout(tout);
            }, 1000);
        },
        setContentBodyIframe: function(bodySelector, bodyContent) {
            var _this = this;
            $(bodySelector).ready(function() {
                var body = $(bodySelector).contents().find("body");
                body.css({ margin: '0' });
                if (bodyContent) {
                    body.html('<div id="root">' + bodyContent + '</div>');
                } else {
                    var bodyText = App.appModel.getLanguageType().mail.layoutTemplate.bodyText;
                    body.html('<div id="root">' + bodyText + bodyText + bodyText + bodyText + bodyText + bodyText + bodyText + bodyText + '</div>');
                }
                var tout1 = setTimeout(function() {
                    $(bodySelector).css({
                        height: body.find('#root').innerHeight()
                    });
                    clearTimeout(tout1);
                }, 1000);
            });
        }
    });

    return LayoutTemplate01PreviewItemView;

})();
