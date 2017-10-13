var Backbone = require('backbone');
var CouponContentLayoutView = require('../coupon_content/coupon_content_layout_view.js');
var querystring = require('querystring');

module.exports = (function() {
	var CouponContentController = Backbone.Marionette.Controller.extend({
    showCouponContentLayout: function(type, query) {
      var queryObj = querystring.parse(query);
      var couponContentLayoutView = new CouponContentLayoutView({
        type: type,
        coupId: queryObj.coupId
      });
      couponContentLayoutView.render();
      App.pageSlider.slidePage(couponContentLayoutView);
      App.sidebarModel.applyViewSidebarConf( couponContentLayoutView.SidebarConf );
      couponContentLayoutView.trigger('load:sync');
    }
  });

  var couponContentController = new CouponContentController();

  var CouponContentRouter = Backbone.Marionette.AppRouter.extend({
    controller: couponContentController,
    appRoutes: {
      "couponContent/:type(?:query)": "showCouponContentLayout"
    }
  });

  return CouponContentRouter;
  
})();