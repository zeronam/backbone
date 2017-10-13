var Backbone = require('backbone');
var BaseCollectionView = require('../../views/base_collection_view.js');
var ImageListItemView = require('./image_list_item_view.js');
module.exports = (function () {
	var ImageListCollectionView = BaseCollectionView.extend({
		childView: ImageListItemView,
		className: "show_img_upload",
		emptyViewOptions: {
			message: '指定した条件に合致する画像はありません'
		}
	});

	return ImageListCollectionView;
})();