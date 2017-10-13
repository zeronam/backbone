var Backbone = require('backbone');
var BaseModel = require('./base_model');
var Encoding = require("../../../../lib/components/encoding/encoding.js");

module.exports = (function() {
	var ChartDataModel = BaseModel.extend({
		url: AppConf.url.appRoot + "/admin/chart/get_data",
		parse: function(response) {
	    	return response;
	    },
	    fetchDetailChart: function(options){
	    	var _options;
	    	if(AppConf.chart.webFlag){
	    		this.url = AppConf.url.appRoot + "/admin/webchart/get_data";
	    	} else {
	    		this.url = AppConf.url.appRoot + "/admin/chart/get_data";
	    	}
    		if (options.curPageParam && options.perPage){
    			var csvUrl = this.url + "?page=DASHBOARD" + "&type=" + options.typeParam + "&id=" + options.chartIdParam + "&curPage=" + options.curPageParam + "&perPage="+ options.perPage + "&from_time=" + options.fromDate + "&to_time=" + options.endDate;
    		} else {
    			var csvUrl = this.url + "?page=DASHBOARD" + "&type=" + options.typeParam + "&id=" + options.chartIdParam + "&from_time=" + options.fromDate + "&to_time=" + options.endDate;
    		}
    		if (AppConf.chart.webFlag){
    			csvUrl += "&p=" + AppConf.chart.sessionId;
    			_options = _.extend( options || {}, { url: csvUrl});
    			return this.fetchWithAuthInfo( _options );
    		} else{
    			_options = _.extend( options || {}, { url: csvUrl});
				return this.fetchWithAuthInfo( _options );
    		}  		
	    },
	    fetchListShop:function(options){
	    	var _options;
	    	if(AppConf.chart.webFlag){
	    		var  csvUrl = AppConf.url.appRoot + "/admin/webchart/get_filter_info";
	    		csvUrl += "?p=" + AppConf.chart.sessionId;
    			_options = _.extend( options || {}, { url: csvUrl});
    			return this.fetchWithAuthInfo( _options );
	    	} else {
	    		var csvUrl = AppConf.url.appRoot + "/admin/chart/get_filter_info";
	    		_options = _.extend( options || {}, { url: csvUrl});
				return this.fetchWithAuthInfo( _options );    		
	    	}
	    },
	    fetchListUser: function(options){
	    	var _options;
	    	if(AppConf.chart.webFlag){
	    		var  csvUrl = AppConf.url.appRoot + "/admin/webchart/get_list_user?segmentId=" + options.segmentId + "&page=" + options.page + "&perPage=" + options.perPage + "&order=" + options.order;
	    		csvUrl += "&p=" + AppConf.chart.sessionId;
    			_options = _.extend( options || {}, { url: csvUrl});
    			return this.fetchWithAuthInfo( _options );
	    	} else {
	    		var csvUrl = AppConf.url.appRoot + "/admin/chart/get_list_user?segmentId=" + options.segmentId + "&page=" + options.page + "&perPage=" + options.perPage + "&order=" + options.order;
	    		_options = _.extend( options || {}, { url: csvUrl});
				return this.fetchWithAuthInfo( _options );
	    	}
	    },
	    exportDetailChart: function(options){
	    	var csvUrl = "";
	    	if(AppConf.chart.webFlag){
	    		this.url = AppConf.url.appRoot + "/admin/webchart/get_csv_data";
	    	} else {
	    		this.url = AppConf.url.appRoot + "/admin/chart/get_csv_data";
	    	}
    		if (options.curPageParam && options.perPage){
    			csvUrl = this.url + "?page=DASHBOARD" + "&type=" + options.typeParam + "&id=" + options.chartIdParam + "&curPage=" + options.curPageParam + "&perPage="+ options.perPage + "&from_time=" + options.fromDate + "&to_time=" + options.endDate;
    		} else {
    			csvUrl = this.url + "?page=DASHBOARD" + "&type=" + options.typeParam + "&id=" + options.chartIdParam + "&from_time=" + options.fromDate + "&to_time=" + options.endDate;
    		}
    		if (AppConf.chart.webFlag){
    			csvUrl += "&p=" + AppConf.chart.sessionId;
    		}			var xhr = new XMLHttpRequest();
			xhr.open('GET', csvUrl, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status <= 300) {
					// blob = new Blob([xhr.responseText], {
					// 	type: 'text/csv'
					// });
					var str_array = Encoding.stringToCode(xhr.responseText);
					var sjis_array = Encoding.convert(str_array, "SJIS", "UNICODE");
					var uint8_array = new Uint8Array(sjis_array);
					blob = new Blob([uint8_array], {
						type: 'text/csv'
					});
					var csvUrl = window.URL.createObjectURL(blob);
					var link = document.createElement("a");
					var suffix = "";
					link.setAttribute("href", csvUrl);
					switch(options.typeParam) {
						case "date":	
							suffix = options.fromDate;
							break;
						case "week":
							suffix = App.util.date.formatDate(options.fromDate, "YYYY") +"_"+ App.util.date.getWeekNumber(options.fromDate) + "w";
							break;
						case "month":
							suffix = App.util.date.formatDate(options.fromDate, "YYYY_MM");
							break;
						case "quarter":
							suffix = App.util.date.formatDate(options.fromDate, "YYYY") +"_"+ App.util.date.getQuarterNumber(options.fromDate) + "Q";
							break;
						case "year":
							suffix = App.util.date.formatDate(options.fromDate, "YYYY");
							break;
					}
					link.setAttribute("download", options.chartName+"_"+options.typeParam+"_"+suffix+".csv");
					link.click();
					delete link;
				}
			};
			App.addAuthenticationHeaderToXHR(xhr);
			xhr.send();
	    }
  	});

	return ChartDataModel;
  	
})();