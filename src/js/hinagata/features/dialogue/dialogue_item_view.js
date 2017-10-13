var Backbone = require('backbone');
module.exports = (function () {
	var DialogueItemView = Backbone.Marionette.ItemView.extend({
		template: require('./dialogue_item_view_template.html'),
        templateHelpers: {
            getBtnView: function() {
                return App.appModel.getLanguageType().common.dialogue.btnView;
            },
            getBtnEdit: function() {
                return App.appModel.getLanguageType().common.dialogue.btnEdit;
            },
            getBtnDuplicate: function() {
                return App.appModel.getLanguageType().common.dialogue.btnDuplicate;
            },
            getBtnCancel: function() {
                return App.appModel.getLanguageType().common.dialogue.backHomeBtnCancel;
            },
            getBtnStop: function() {
                return App.appModel.getLanguageType().common.dialogue.btnStop;
            },
            getBtnDelete: function() {
                return App.appModel.getLanguageType().common.dialogue.btnDelete;
            },
            getBtnHistory: function() {
                return App.appModel.getLanguageType().common.dialogue.btnHistory;
            },
            getBtnClose: function() {
                return App.appModel.getLanguageType().common.dialogue.btnClose;
            },
            getBtnConfirm: function() {
                return App.appModel.getLanguageType().common.confirm;
            },
            getBtnClose: function() {
                return App.appModel.getLanguageType().common.dialogue.btnClose;
            },
            getConfirmStopTitle: function() {
                return App.appModel.getLanguageType().common.dialogue.confirmStopTitle;
            },
            getTextOk: function() {
                return App.appModel.getLanguageType().common.dialogue.textOk;
            },
            getDeleteTemplateMsg: function() {
                return App.appModel.getLanguageType().common.dialogue.deleteTemplateMsg;
            },
            getBtnReport: function() {
                return App.appModel.getLanguageType().common.dialogue.btnReport;
            }
        },
        setId: function(id) {
        	this.id = id;
        },
        getId: function() {
        	return this.id;
        }
	});
	return DialogueItemView;
})();