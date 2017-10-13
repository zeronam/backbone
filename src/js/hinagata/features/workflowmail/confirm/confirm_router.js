var Backbone = require('backbone');
var ConfirmLayoutView = require('./confirm_view.js');
var querystring = require('querystring');
module.exports = (function () {

	var ConfirmController = Backbone.Marionette.Controller.extend({
		showConfirm: function(type, query){
      		var queryObj = querystring.parse(query);
			var confirmLayoutView = new ConfirmLayoutView({
				type:type,
				id: queryObj.id
			});
			confirmLayoutView.render();
			App.pageSlider.slidePage( confirmLayoutView );
			App.sidebarModel.applyViewSidebarConf( confirmLayoutView.SidebarConf );
			confirmLayoutView.trigger('load:sync');
		}
	});

	var confirmController = new ConfirmController();

	var ConfirmRouter = Backbone.Marionette.AppRouter.extend({
		controller: confirmController,
		appRoutes: {
			"confirm/:type(?:query)" : "showConfirm",
		}
	});

	return ConfirmRouter;

})();