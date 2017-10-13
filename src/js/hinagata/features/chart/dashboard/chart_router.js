var Backbone = require('backbone');
var ChartBoardLayoutView = require('./chart_layout_view.js');
module.exports = (function() {
	var ChartBoardController = Backbone.Marionette.Controller.extend({
    showChartBoard: function() {
      var chartBoardLayoutView = new ChartBoardLayoutView();
      chartBoardLayoutView.render();
      App.pageSlider.slidePage(chartBoardLayoutView);
      App.sidebarModel.applyViewSidebarConf( chartBoardLayoutView.SidebarConf );
      chartBoardLayoutView.trigger('load:sync');
    }
  });

  var chartBoardController = new ChartBoardController();

  var ChartBoardRouter = Backbone.Marionette.AppRouter.extend({
    controller: chartBoardController,
    appRoutes: {
      "chartBoard": "showChartBoard"
      // "": "showChartBoard"
    }
  });

  return ChartBoardRouter;
  
})();