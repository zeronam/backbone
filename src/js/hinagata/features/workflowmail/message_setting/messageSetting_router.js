var Backbone = require('backbone');
var MessageSettingLayoutView = require('./messageSetting_layout_view.js');
var querystring = require('querystring');
module.exports = (function() {
	var MessageSettingController = Backbone.Marionette.Controller.extend({
    showMessageSetting: function(type, query) {
      var queryObj = querystring.parse(query);
      var messageSettingLayoutView = new MessageSettingLayoutView({
        type:type,
        id: queryObj.id
      });
      messageSettingLayoutView.render();
      App.pageSlider.slidePage(messageSettingLayoutView);
      App.sidebarModel.applyViewSidebarConf( messageSettingLayoutView.SidebarConf );
      messageSettingLayoutView.trigger('load:sync');
    }
  });

  var messageSettingController = new MessageSettingController();

  var MessageSettingRouter = Backbone.Marionette.AppRouter.extend({
    controller: messageSettingController,
    appRoutes: {
      "messageSetting/:type(?:query)": "showMessageSetting"
    }
  });
  return MessageSettingRouter;
})();