var Backbone = require('backbone');
var BaseCollectionView = require('../../../views/base_collection_view.js');
var ChartItemView = require('./chart_item_view.js');
module.exports = (function () {
  var ChartCollectionView = BaseCollectionView.extend({
    childView: ChartItemView,
    className: "listchart",
    emptyViewOptions: {
    		message: "ダッシュボードのデータがありません"
    }
  });

  return ChartCollectionView;
})();