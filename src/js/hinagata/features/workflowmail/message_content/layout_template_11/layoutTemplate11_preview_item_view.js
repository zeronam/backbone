var Backbone = require('backbone');
module.exports = (function() {
    var LayoutTemplate01PreviewItemView = Backbone.Marionette.ItemView.extend({
        template: require('./layoutTemplate11_preview_item_template.html'),
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
                $("#iframe-bodyTextOne").ready(function() {
                    var body = $("#iframe-bodyTextOne").contents().find("body");
                    body.css({margin: '0'});
                    if (_this.model.get('bodyTextOne')) {
                        body.html('<div id="root">' + _this.model.get('bodyTextOne') + '</div>');
                    } else {
                        var bodyText = App.appModel.getLanguageType().mail.layoutTemplate.bodyText;
                        body.html('<div id="root">' + bodyText + bodyText + bodyText + bodyText + bodyText + bodyText + bodyText + bodyText + '</div>');
                    }
                    var tout1 = setTimeout(function () {
                        $("#iframe-bodyTextOne").css({
                            height: body.find('#root').innerHeight()
                        });
                        clearTimeout(tout1);
                    }, 1000);
                });
                clearTimeout(tout);
            }, 1000);
        }
    });

    return LayoutTemplate01PreviewItemView;

})();