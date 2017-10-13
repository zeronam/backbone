var Backbone = require('backbone');
var BaseCollection = require('./base_collection.js');
var ChartModel = require('./chart_model.js');
module.exports = (function () {
  var ChartCollection = BaseCollection.extend({
  	url: AppConf.url.appRoot + "/admin/chart/get_list_chart",
  	model: ChartModel,
    parse: function(response) {
    	return response.listCharInfo;
    },
    fetchListChartDashboard: function(options){
      if(AppConf.chart.webFlag){
        this.url = AppConf.url.appRoot + "/admin/webchart/get_list_chart";
        AppConf.chart.sessionId = App.util.common.getUrlParameter('p');
      }
      var url = this.url + "?page=DASHBOARD";
  		if (AppConf.chart.webFlag){
        url += "&p=" + AppConf.chart.sessionId;
        _options = _.extend( options || {}, { url: url});        
        return this.fetchWithAuthInfo( _options );
      } else{
        _options = _.extend( options || {}, { url: url});
      return this.fetchWithAuthInfo( _options );
      }     
  	},
      searchListMessage:function(keywordSearch){
        if (keywordSearch === "") {
          return this;
        }else {
          return _(this.filter(function(data){
            var pattern = new RegExp(keywordSearch,"gi");
            return pattern.test(data.get("name"));
          }));
        }
      },
  });

  return ChartCollection;
  
})();