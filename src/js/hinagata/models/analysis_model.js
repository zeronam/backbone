var Backbone = require('backbone');
var BaseModel = require('./base_model');
var jquery = require('jquery');

module.exports = (function () {
	var MainNavModel = BaseModel.extend({
		urlRoot: AppConf.url.appRoot + "/admin/chart/get_data",
		parse: function(response) {
    		return response.chartData;
    	},
        fetchChartDetail: function(options) {
            // this.url = "stubapi/monetary/monetaryMonth.json";
            // var _options = _.extend( options || {}, { url: this.url } );
            // return this.fetchWithAuthInfo( _options );  
            // if(options.typeParam){console.log(options.typeParam);
            //     var _options = _.extend( options || {}, { url: this.urlRoot + "?page=DETAIL" + "&type=" + options.typeParam + "&id=" + options.chartIdParam } );
            // } else {
            //     var _options = _.extend( options || {}, { url: this.urlRoot + "?page=DETAIL" + "&type=DATE&id=" + options.chartIdParam + "&from_time=" + options.fromTime + "&to_time=" + options.toTime } );
            // }
            if(options.fromDate != null && options.endDate != null && ((options.typeParam == "month" && !App.util.date.isThisMonth(options.fromDate)) || (options.typeParam == "week" && !App.util.date.isThisWeek(options.fromDate)) || (options.typeParam == "year" && !App.util.date.isThisYear(options.fromDate)))){
                var _options = _.extend( options || {}, { url: this.urlRoot + "?page=DETAIL" + "&type=DATE&id=" + options.chartIdParam + "&from_time=" + options.fromDate + "&to_time=" + options.endDate } );
            }else {
                var _options = _.extend( options || {}, { url: this.urlRoot + "?page=DETAIL" + "&type=" + options.typeParam + "&id=" + options.chartIdParam } );
            }
            return this.fetchWithAuthInfo( _options );
        },
        getCategories: function(){
            var data = jquery.parseJSON(this.get(0).data);
            var categories = [];
            for (var i = 0; i < data.length/2; i++) {
                categories.push(data[i].RANK);
            }
            return categories;
        },
        getCategoriesRecency: function(){
            var data = jquery.parseJSON(this.get(0).data);
            var categories = [];
            for (var i = 0; i < data.length; i++) {
                categories.push(data[i].RANK);
            }
            return categories;
        },
        getMaxCount: function(){ 
            var data = jquery.parseJSON(this.get(0).data); 
            var maxCount = 0;
            for (var i = 0; i < data.length; i++) {
                maxCount += data[i].VALUE;
            }
            return maxCount;
        },
        getMaxValue: function() {
            var data = jquery.parseJSON(this.get(0).data); 
            var maxValue;
            for (var i = 0; i < data.length; i++) {
                if ( !maxValue || maxValue < data[i].VALUE ) {
                    maxValue = data[i].VALUE;
                }
            }
            return maxValue;
        },
        getData: function() {
            return jquery.parseJSON(this.get(0).data);
        },
    	getDataF: function() {
            var dataF = jquery.parseJSON(this.get(0).data).filter(function isBigEnough(element) {
                          return element.SEX == "女性";
                        });
    		return dataF;
    	},
    	getDataM: function() {
    		var dataM = jquery.parseJSON(this.get(0).data).filter(function isBigEnough(element) {
                          return element.SEX == "男性";
                        });
            return dataM;
    	},
        getGrowth: function() {
            return this.get("growth");
        },
        getStore: function() {
            return this.get("store");
        }
	});

	return MainNavModel;
})();
