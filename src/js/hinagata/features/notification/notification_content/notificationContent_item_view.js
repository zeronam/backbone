var Backbone = require('backbone');
module.exports = (function () {
	var notificationContentItemView = Backbone.Marionette.ItemView.extend({
		template: require('./notificationContent_item_template.html'),
		templateHelpers: {
			convertBrnl2: function(text) {
				return App.util.text.brnl2(text);
			},
			convertImageName: function(imageName, imageFileName) {
				if ( imageFileName === "./image/main/noImage.png" ) return "";
				var imageNameExtension = imageName.split('.').pop().toLowerCase();
				if ( imageNameExtension === "jpg" || imageNameExtension === "jpeg" || imageNameExtension === "gif" ) {
					return imageName;
				} else {
					var extension = imageFileName.split('.').pop().toLowerCase();
					var fullImageName = imageName + "." + extension;
					return fullImageName;
				}
			},
			getText: function(text) {
				return App.appModel.getLanguageType().notification.content[text];
			},
			getRequired: function() {
				return App.appModel.getLanguageType().common.required;
			},
		}
	});

	return notificationContentItemView;

})();