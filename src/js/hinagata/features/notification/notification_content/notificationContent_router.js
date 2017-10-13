var Backbone = require('backbone');
var NotificationContentLayoutView = require('../notification_content/notificationContent_layout_view.js');
var querystring = require('querystring');

module.exports = (function() {
	var NotificationContentController = Backbone.Marionette.Controller.extend({
    showNotificationContentLayout: function(type, query) {
      var queryObj = querystring.parse(query);
      var notificationContentLayoutView = new NotificationContentLayoutView({
        type: type,
        notificationId: queryObj.notificationId
      });
      notificationContentLayoutView.render();
      App.pageSlider.slidePage(notificationContentLayoutView);
      App.sidebarModel.applyViewSidebarConf( notificationContentLayoutView.SidebarConf );
      notificationContentLayoutView.trigger('load:sync');
    }
  });

  var notificationContentController = new NotificationContentController();

  var NotificationContentRouter = Backbone.Marionette.AppRouter.extend({
    controller: notificationContentController,
    appRoutes: {
      "notificationContent/:type(?:query)": "showNotificationContentLayout",
      "notificationContent": "showNotificationContentLayout"
    }
  });

  return NotificationContentRouter;
  
})();