var Backbone = require('backbone');
var BaseCollectionView = require('../../../../views/base_collection_view.js');
var ListNameMyTemplateItemView = require('./listNameMyTemplate_item_view.js');
module.exports = (function() {
	var ListNameMyTemplateCollectionView = BaseCollectionView.extend({
    	childView: ListNameMyTemplateItemView,
        tagName: 'ul',
        className: 'list-template list-myTemplate scrollable',
        emptyViewOptions: {
			message: 'マイテンプレートがありません'
		}
  	});

  	return ListNameMyTemplateCollectionView;

})();