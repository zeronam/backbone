var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function() {
    var MessageSettingItemView = Backbone.Marionette.ItemView.extend({
        template: require('./messageSetting_item_template.html'),
        templateHelpers: function() {
			var _this = this;
            return {
                getNowDate: function() {
                    return moment(new Date()).format("YYYY/MM/DD HH:mm");
                },
                getlblTitle: function() {
                    return App.appModel.getLanguageType().mail.selectTemplate.lblTitle;
                },
                getSms: function() {
                    return App.appModel.getLanguageType().mail.selectTemplate.sms;
                },
                getSettingTitle: function() {
                    return App.appModel.getLanguageType().mail.setting.settingTitle;
                },
                getConditionTitle: function() {
                    return App.appModel.getLanguageType().mail.setting.conditionTitle;
                },
                getConditionNone: function() {
                    return App.appModel.getLanguageType().mail.setting.conditionNone;
                },
                getIssueDate: function() {
                    return App.appModel.getLanguageType().mail.setting.issueDate;
                },
                convertDate: function(date, format) {
                    if (format) {
                        return moment(date).format(format);
                    } else {
                        return App.util.date.convertDate(date, "YYYY/MM/DD HH:mm");
                    }
                },
                segment: function() {
                    if (_this.model && _this.model.get('segmentId')) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    });
    return MessageSettingItemView;
})();
