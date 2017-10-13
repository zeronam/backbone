var Backbone = require('backbone');
module.exports = (function () {
	var MessageContentItemView = Backbone.Marionette.ItemView.extend({
		template: require('./messageContent_item_template.html')
	});

	return MessageContentItemView;

})();