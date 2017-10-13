var Backbone = require('backbone');
module.exports = (function () {
	var MessageHistoryItemView = Backbone.Marionette.ItemView.extend({
		template: require('./message_history_item_template.html'),
		className: "message_content cf"
	});
	return MessageHistoryItemView;
})();