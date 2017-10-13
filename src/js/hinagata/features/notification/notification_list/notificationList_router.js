var Backbone = require('backbone');
var PushListLayoutView = require('./notificationList_layout_view.js');
module.exports = (function() {
  var PushListController = Backbone.Marionette.Controller.extend({
    showPushListLayout: function() {
      var pushListLayoutView = new PushListLayoutView();
      pushListLayoutView.render();
      App.pageSlider.slidePage(pushListLayoutView);
      pushListLayoutView.trigger('load:sync');
      App.sidebarModel.applyViewSidebarConf( pushListLayoutView.SidebarConf );
    }
  });

  var pushListController = new PushListController();

  var PushListRouter = Backbone.Marionette.AppRouter.extend({
    controller: pushListController,
    appRoutes: {
      "notification": "showPushListLayout"
    }
  });

  return PushListRouter;
  
})();