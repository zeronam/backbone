var Backbone = require('backbone');
var BaseModel = require('../../../models/base_model.js');
module.exports = (function () {
	var MessageHistoryModel = BaseModel.extend({
		// defaults: {
		// 	typeList: "historyList"
		// },
		mutators: { // https://github.com/asciidisco/Backbone.Mutators
			getStatusNameHistory: {
				get: function() {
					return this.getStatusName();
				}
			}
		},
		getStatusName: function() {
			var type = this.get("type");
			var afterStatus = this.get("afterStatus");
			var statusName;
			switch ( type ) {
				case 1:
					if ( afterStatus === 9 ) {
						statusName = App.appModel.getLanguageType().mail.main.history.create;
					} else {
						statusName = App.appModel.getLanguageType().mail.main.history.request;
					}
					break;
				case 2:
					statusName = App.appModel.getLanguageType().mail.main.history.approval;
					break;
				case 3:
					statusName = App.appModel.getLanguageType().mail.main.history.reject;
					break;
				case 4:
					statusName = App.appModel.getLanguageType().mail.main.history.cancelRequest;
					break;
				case 5:
					statusName = App.appModel.getLanguageType().mail.main.history.cancelApprove;
					break;
				case 6:
					statusName = App.appModel.getLanguageType().mail.main.history.cancelSend;
					break;
				case 7:
					statusName = App.appModel.getLanguageType().mail.main.history.cancelSend;
					break;
				default:
					statusName = App.appModel.getLanguageType().mail.main.history.other;
					break;
			};
			return statusName;
		}
	});

	return MessageHistoryModel;
})();