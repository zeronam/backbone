var Backbone = require('backbone');
var CouponTypeLayoutView = require('../coupon_type/coupon_type_layout_view.js');
module.exports = (function() {
	var CouponTypeController = Backbone.Marionette.Controller.extend({
    showCouponTypeLayout: function() {
      var couponTypeLayoutView = new CouponTypeLayoutView();
      couponTypeLayoutView.render();
      App.pageSlider.slidePage(couponTypeLayoutView);
      App.sidebarModel.applyViewSidebarConf( couponTypeLayoutView.SidebarConf );
      couponTypeLayoutView.trigger('load:sync');
    }
  });

  var couponTypeController = new CouponTypeController();

  var CouponTypeRouter = Backbone.Marionette.AppRouter.extend({
    controller: couponTypeController,
    appRoutes: {
      "couponType": "showCouponTypeLayout"
    }
  });

  return CouponTypeRouter;
  
})();