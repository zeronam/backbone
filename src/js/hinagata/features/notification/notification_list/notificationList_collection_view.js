var Backbone = require('backbone');
var PushNotificationItemView = require('./notificationList_item_view.js');
var BaseCollectionView = require('../../../views/base_collection_view.js');
module.exports = (function () {
	var PushNotificationCollectionView = BaseCollectionView.extend({
		childView: PushNotificationItemView,
		className: "main-wrapper",
		emptyViewOptions: {
			message: '配信メールがありません'
		},
		buildChildView: function(child, ChildViewClass, childViewOptions){
			var arr = [];
			for ( date in child.attributes ) {
				var models = child.attributes[date];
				arr.push(models);
			}
			arr.reverse();
			child.set("notificationList", arr);

			// build the final list of options for the childView class
			var options = _.extend({model: child}, childViewOptions);
			// create the child view instance
			var view = new ChildViewClass(options);
			// return it
			return view;
		},
	});

	return PushNotificationCollectionView;

})();
