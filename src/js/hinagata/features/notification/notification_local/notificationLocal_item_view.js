var Backbone = require('backbone');
var moment = require('moment');

module.exports = (function () {
	var notificationContentItemView = Backbone.Marionette.ItemView.extend({
		template: require('./notificationLocal_item_template.html'),
		templateHelpers: {
			getText: function(text) {
				return App.appModel.getLanguageType().notification.local[text];
			},
			getRequired: function() {
		        return App.appModel.getLanguageType().common.required;
	      	},
		}
	});

	return notificationContentItemView;

})();