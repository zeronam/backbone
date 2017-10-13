var Backbone = require('backbone');
var SelectTemplateLayoutView = require('./selectTemplate_layout_view.js');

module.exports = (function() {
	var SelectTemplateController = Backbone.Marionette.Controller.extend({
    showSelectTemplate: function() {
      var selectTemplateLayoutView = new SelectTemplateLayoutView();
      selectTemplateLayoutView.render();
      App.pageSlider.slidePage(selectTemplateLayoutView);
      App.sidebarModel.applyViewSidebarConf( selectTemplateLayoutView.SidebarConf );
    }
  });

  var selectTemplateController = new SelectTemplateController();

  var SelectTemplateRouter = Backbone.Marionette.AppRouter.extend({
    controller: selectTemplateController,
    appRoutes: {
      "selectTemplate": "showSelectTemplate"
    }
  });
  return SelectTemplateRouter;
})();