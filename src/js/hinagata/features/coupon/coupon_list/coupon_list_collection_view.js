var Backbone = require('backbone');

var BaseCollectionView = require('../../../views/base_collection_view.js');
var CouponListItemView = require('./coupon_list_item_view.js');

module.exports = (function () {
  var CouponListCollectionView = BaseCollectionView.extend({
    childView: CouponListItemView,
    className: "coupon-wrapper",
    emptyViewOptions: {
    	message: "クーポン一覧がありません"
    },
    buildChildView: function(child, ChildViewClass, childViewOptions){
		var arr = [];
		for ( date in child.attributes ) {
			var models = child.attributes[date];
			arr.push(models);
		}
		arr.reverse();
		child.set("couponList", arr);

		// build the final list of options for the childView class
		var options = _.extend({model: child}, childViewOptions);
		// create the child view instance
		var view = new ChildViewClass(options);
		// return it
		return view;
	},
  });

  return CouponListCollectionView;
  
})();