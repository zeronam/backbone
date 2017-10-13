var Backbone = require('backbone');
var CouponSettingLayoutView = require('../coupon_setting/coupon_setting_layout_view.js');
var querystring = require('querystring');

module.exports = (function() {
	var couponSettingController = Backbone.Marionette.Controller.extend({
    showcouponSettingLayout: function(type, query) {
      var queryObj = querystring.parse(query);
      var couponSettingLayoutView = new CouponSettingLayoutView({
        type: type,
        coupId: queryObj.coupId
      });
      couponSettingLayoutView.render();
      App.pageSlider.slidePage(couponSettingLayoutView);
      App.sidebarModel.applyViewSidebarConf( couponSettingLayoutView.SidebarConf );
      couponSettingLayoutView.trigger('load:sync');
    }
  });

  var couponSettingController = new couponSettingController();

  var couponSettingRouter = Backbone.Marionette.AppRouter.extend({
    controller: couponSettingController,
    appRoutes: {
      "couponSetting/:type(?:query)": "showcouponSettingLayout"
    }
  });

  return couponSettingRouter;
  
})();