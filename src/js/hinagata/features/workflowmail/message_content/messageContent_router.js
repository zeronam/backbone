var Backbone = require('backbone');
var MessageContentLayoutView = require('../message_content/messageContent_layout_view.js');
var querystring = require('querystring');
module.exports = (function() {
	var MessageContentController = Backbone.Marionette.Controller.extend({
    showMessageContent: function(type, query) {
      var queryObj = querystring.parse(query);
      var messageContentLayoutView = new MessageContentLayoutView({
        type:type,
        id: queryObj.id
      });
      messageContentLayoutView.render();
      App.pageSlider.slidePage(messageContentLayoutView);
      App.sidebarModel.applyViewSidebarConf( messageContentLayoutView.SidebarConf );
      messageContentLayoutView.trigger('load:sync');
    }
  });

  var messageContentController = new MessageContentController();

  var MessageContentRouter = Backbone.Marionette.AppRouter.extend({
    controller: messageContentController,
    appRoutes: {
      "messageContent/:type(?:query)": "showMessageContent"
    }
  });

  return MessageContentRouter;

})();