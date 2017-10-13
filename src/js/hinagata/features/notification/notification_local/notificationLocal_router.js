var Backbone = require('backbone');
var NotificationLocalLayoutView = require('../notification_local/notificationLocal_layout_view.js');
var querystring = require('querystring');

module.exports = (function() {
	var NotificationLocalController = Backbone.Marionette.Controller.extend({
    showNotificationLocalLayout: function(type, query) {
      var queryObj = querystring.parse(query);
      var notificationLocalLayoutView = new NotificationLocalLayoutView({
        type: type,
        notificationId: queryObj.notificationId
      });
      notificationLocalLayoutView.render();
      App.pageSlider.slidePage(notificationLocalLayoutView);
      App.sidebarModel.applyViewSidebarConf( notificationLocalLayoutView.SidebarConf );
      notificationLocalLayoutView.trigger('load:sync');
    }
  });

  var notificationLocalController = new NotificationLocalController();

  var NotificationLocalRouter = Backbone.Marionette.AppRouter.extend({
    controller: notificationLocalController,
    appRoutes: {
      "notificationLocal/:type(?:query)": "showNotificationLocalLayout",
      "notificationLocal": "showNotificationLocalLayout"
    }
  });

  return NotificationLocalRouter;
  
})();