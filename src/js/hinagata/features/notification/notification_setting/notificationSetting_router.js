var Backbone = require('backbone');
var PushNotificationSettingLayoutView = require('./notificationSetting_layout_view.js');
var querystring = require('querystring');
module.exports = (function() {
	var PushNotificationSettingController = Backbone.Marionette.Controller.extend({
    showPushNotificationSetting: function(type, query) {
      var queryObj = querystring.parse(query);
      var pushNotificationSettingLayoutView = new PushNotificationSettingLayoutView({
        type: type,
        notificationId: queryObj.notificationId
      });
      pushNotificationSettingLayoutView.render();
      App.pageSlider.slidePage(pushNotificationSettingLayoutView);
      App.sidebarModel.applyViewSidebarConf( pushNotificationSettingLayoutView.SidebarConf );
      pushNotificationSettingLayoutView.trigger('load:sync');
    },
    showPushNotificationSettingWithSegment: function(query) {
      var queryObj = querystring.parse(query);
      var pushNotificationSettingLayoutView = new PushNotificationSettingLayoutView({
        segmentName: queryObj.segmentName,
        segmentId: queryObj.segmentId
      });
      pushNotificationSettingLayoutView.render();
      App.pageSlider.slidePage(pushNotificationSettingLayoutView);
      App.sidebarModel.applyViewSidebarConf( pushNotificationSettingLayoutView.SidebarConf );
      pushNotificationSettingLayoutView.trigger('load:sync');
    }
  });

  var pushNotificationSettingController = new PushNotificationSettingController();

  var PushNotificationSettingRouter = Backbone.Marionette.AppRouter.extend({
    controller: pushNotificationSettingController,
    appRoutes: {
      "notificationSetting?*query": "showPushNotificationSettingWithSegment",
      "notificationSetting/:type(?:query)": "showPushNotificationSetting",
      "notificationSetting": "showPushNotificationSetting"
    }
  });
  return PushNotificationSettingRouter;
})();