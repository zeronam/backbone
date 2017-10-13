var Backbone = require('backbone');
var NotificationConditionLayoutView = require('../notification_condition/notificationCondition_layout_view.js');
var querystring = require('querystring');

module.exports = (function() {
	var NotificationConditionController = Backbone.Marionette.Controller.extend({
    showNotificationConditionLayout: function(type, query) {
      var queryObj = querystring.parse(query);
      var notificationConditionLayoutView = new NotificationConditionLayoutView({
        type: type,
        notificationId: queryObj.notificationId
      });
      notificationConditionLayoutView.render();
      App.pageSlider.slidePage(notificationConditionLayoutView);
      App.sidebarModel.applyViewSidebarConf( notificationConditionLayoutView.SidebarConf );
      notificationConditionLayoutView.trigger('load:sync');
    }
  });

  var notificationConditionController = new NotificationConditionController();

  var NotificationConditionRouter = Backbone.Marionette.AppRouter.extend({
    controller: notificationConditionController,
    appRoutes: {
      "notificationCondition/:type(?:query)": "showNotificationConditionLayout",
      "notificationCondition": "showNotificationConditionLayout"
    }
  });

  return NotificationConditionRouter;
  
})();