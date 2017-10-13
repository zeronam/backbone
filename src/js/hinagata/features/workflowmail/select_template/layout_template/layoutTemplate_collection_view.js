var Backbone = require('backbone');
var BaseCollectionView = require('../../../../views/base_collection_view.js');
var LayoutTemplateItemView = require('./layoutTemplate_item_view.js');
module.exports = (function () {
  var LayoutTemplateCollectionView = BaseCollectionView.extend({
    childView: LayoutTemplateItemView
  });

  return LayoutTemplateCollectionView;
  
})();