var Backbone = require('backbone');
var BaseCollectionView = require('../../../views/base_collection_view.js');
var MessageHistoryItemView = require('./message_history_item_view.js');
module.exports = (function () {
	var MessageHistoryCollectionView = BaseCollectionView.extend({
		childView: MessageHistoryItemView,
		className: "history-wrapper",
		emptyViewOptions: {
			message: '承認履歴がありません'
		}
	});

	return MessageHistoryCollectionView;
})();