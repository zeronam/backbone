var Backbone = require('backbone');
var itemView = Backbone.Marionette.ItemView.extend({
		template: require('./notificationLocal_popup_collection_item_template.html'),
		tagName: "tr",
		className: '',
		templateHelpers: {
			getrssiTypeText: function(rssiType) {
				if(rssiType == 0)
		        	return App.appModel.getLanguageType().notification.local.strong.split('（')[0];
		        if(rssiType == 1)
		        	return App.appModel.getLanguageType().notification.local.normal.split('（')[0];
		        if(rssiType == 2)
		        	return App.appModel.getLanguageType().notification.local.weak.split('（')[0];
	      	}
		}
	});

module.exports = (function () {
	var SpotListCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: itemView,
		tagName: "div",
		className: "",
	});

	return SpotListCollectionView;
})();