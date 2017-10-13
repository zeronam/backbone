var Backbone = require('backbone');
var BaseCollection = require('../../../models/base_collection.js');
var CouponListModel = require('./coupon_list_model.js');
module.exports = (function () {
	var CouponListCollection1 = BaseCollection.extend({
		model: CouponListModel,
		searchListCoupon:function(keywordSearch){
	    	if (keywordSearch === "") {
	    		return this;
	    	}else {
	    		return _(this.filter(function(data){
	          var pattern = new RegExp(keywordSearch,"gi");
	    			return pattern.test(data.get("name"));
	    		}));
	    	}
    	}
	});

	return CouponListCollection1;

})();
