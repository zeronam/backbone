var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function() {
  var DetailCouponModel = BaseModel.extend({
    idAttribute: "authCouponId",
    url: AppConf.url.appRoot + "/admin/workflow/coupon/detail",
    initialize: function() {
      if (AppConf.webConf.webFlag) {
        this.url = AppConf.url.appRoot + "/admin/workflow/coupon/web/detail";
      }
    },
    parse: function(response) {
      return response.coupon;
    },
    fetchDetailCoupon: function(options) {
      var _options = _.extend(options || {}, { url: this.url + "?coupId=" + this.get("authCouponId") });
      return this.fetchWithAuthInfo(_options);
    }
  });

  return DetailCouponModel;

})();
