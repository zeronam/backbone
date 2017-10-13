var Backbone = require('backbone');
var CouponListLayoutView = require('./coupon_list_layout_view.js');
module.exports = (function() {
  var CouponListController = Backbone.Marionette.Controller.extend({
    showCouponListLayout: function() {
      var couponListLayoutView = new CouponListLayoutView();
      couponListLayoutView.render();
      App.pageSlider.slidePage(couponListLayoutView);
      couponListLayoutView.trigger('load:sync');
      App.sidebarModel.applyViewSidebarConf( couponListLayoutView.SidebarConf );
    }
  });

  var couponListController = new CouponListController();

  var CouponListRouter = Backbone.Marionette.AppRouter.extend({
    controller: couponListController,
    appRoutes: {
      "workflow-coupon": "showCouponListLayout"
    }
  });

  return CouponListRouter;
  
})();