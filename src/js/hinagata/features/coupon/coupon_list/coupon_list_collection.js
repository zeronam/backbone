var Backbone = require('backbone');
var BaseCollection = require('../../../models/base_collection.js');
var CouponListModel = require('./coupon_list_model.js');
module.exports = (function() {
  var CouponListCollection = BaseCollection.extend({
    model: CouponListModel,
    url: AppConf.url.appRoot + "/admin/workflow/coupon/list",
    parse: function(response) {
      console.log(response.coupons);
      return response.coupons;
    },
    fetchListCoupon: function(options) {      
      if (AppConf.webConf.webFlag) {
        this.url = AppConf.url.appRoot + "/admin/workflow/coupon/web/list";
      }
      var _options = _.extend(options || {}, {
        url: this.url + "?type=" + this.type
      });
      return this.fetchWithAuthInfo(_options);
    },
    setType: function(type) {
      this.type = type;
    },
    setCoupId: function(couponId) {
      this.couponId = couponId;
    },
    getCoupId: function() {
      return this.couponId;
    },
    searchListCoupon: function(keywordSearch) {
      if (keywordSearch === "") {
        return this;
      } else {
        return _(this.filter(function(data) {
          var pattern = new RegExp(keywordSearch, "gi");
          return pattern.test(data.get("name"));
        }));
      }
    }
  });

  return CouponListCollection;

})();
