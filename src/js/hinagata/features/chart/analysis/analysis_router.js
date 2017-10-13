var Backbone = require('backbone');
var AnalysisLayoutView = require('./analysis_layout_view.js');
module.exports = (function() {
	var AnalysisController = Backbone.Marionette.Controller.extend({
    showAnalysis: function() {
      var analysisLayoutView = new AnalysisLayoutView();
      analysisLayoutView.render();
      App.pageSlider.slidePage(analysisLayoutView);
      App.sidebarModel.applyViewSidebarConf( analysisLayoutView.SidebarConf );
      analysisLayoutView.trigger('load:sync');
    }
  });

  var analysisController = new AnalysisController();

  var AnalysisRouter = Backbone.Marionette.AppRouter.extend({
    controller: analysisController,
    appRoutes: {
      "analysis": "showAnalysis"
    }
  });

  return AnalysisRouter;
  
})();