var Backbone = require('backbone');
var ConfirmCouponLayoutView = require('./confirm_layout_view.js');
var querystring = require('querystring');
module.exports = (function () {

	var ConfirmCouponController = Backbone.Marionette.Controller.extend({
		showConfirm: function(type, query) {
			var queryObj = querystring.parse(query);
			var confirmCouponLayoutView = new ConfirmCouponLayoutView({
				type:type,
				coupId: queryObj.coupId
			});
			confirmCouponLayoutView.render();
			App.pageSlider.slidePage( confirmCouponLayoutView );
			App.sidebarModel.applyViewSidebarConf( confirmCouponLayoutView.SidebarConf );
			confirmCouponLayoutView.trigger('load:sync');
		}
	});

	var confirmCouponController = new ConfirmCouponController();

	var ConfirmCouponRouter = Backbone.Marionette.AppRouter.extend({
		controller: confirmCouponController,
		appRoutes: {
			"counponConfirm/:type(?:query)" : "showConfirm"
		}
	});

	return ConfirmCouponRouter;

})();