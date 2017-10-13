var Backbone = require('backbone');
var BaseCollectionView = require('../../views/base_collection_view.js');
var MessageContentItemView = require('./messageContent_item_view.js');
module.exports = (function () {
  var MessageContentCollectionView = BaseCollectionView.extend({
    childView: MessageContentItemView,
  });

  return MessageContentCollectionView;
  
})();