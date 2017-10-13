var Backbone = require('backbone');
module.exports = (function () {
	var ImageListItemView = Backbone.Marionette.ItemView.extend({
		template: require('./image_list_item_template.html'),
		className: "row_img"
	});
	return ImageListItemView;
})();