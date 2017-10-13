var Backbone = require('backbone');
var CouponInformationLayoutView = require('./coupon_information_layout_view.js');
var querystring = require('querystring');

module.exports = (function() {
	var CouponInformationController = Backbone.Marionette.Controller.extend({
    showCouponInformationLayout: function(type, query) {
      var queryObj = querystring.parse(query);
      var couponInformationLayoutView = new CouponInformationLayoutView({
        type: type,
        coupId: queryObj.coupId
      });
      couponInformationLayoutView.render();
      App.pageSlider.slidePage(couponInformationLayoutView);
      App.sidebarModel.applyViewSidebarConf( couponInformationLayoutView.SidebarConf );
      couponInformationLayoutView.trigger('load:sync');
    }
  });

  var couponInformationController = new CouponInformationController();

  var CouponInformationRouter = Backbone.Marionette.AppRouter.extend({
    controller: couponInformationController,
    appRoutes: {
      "couponInformation/:type(?:query)": "showCouponInformationLayout"
    }
  });

  return CouponInformationRouter;
  
})();