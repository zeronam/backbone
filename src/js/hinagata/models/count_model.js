var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var CountModel = BaseModel.extend({
		urlRoot: "stubapi/demoGraphicChartNumberMax.json",
		parse: function(response) {
    		return response;
    	},
        fetchGrowthCountMonth: function(options) {
            this.url = "stubapi/growth/growthMonthCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
    	fetchDemoGraphicCountAll: function(options) {
    		this.url = "stubapi/demoGraphic/demoGraphicChartNumberMax.json";
    		var _options = _.extend( options || {}, { url: this.url } );
			return this.fetchWithAuthInfo( _options );
    	},
        fetchDemoGraphicCountMale: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartMaleCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );  
        },
        fetchDemoGraphicCountFeMale: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartFeMaleCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );  
        },
        fetchDemoGraphicCountWeekAll: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartWeekCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCountWeekMale: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartWeekMaleCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCountWeekFeMale: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartWeekFeMaleCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCountYearAll: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartYearCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCountYearMale: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartYearMaleCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCountYearFeMale: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartYearFeMaleCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCountRangeDate: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicRangeDateCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCountRangeDate1: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicRangeDate1Count.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCompareCountAll: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartCompareCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCompareCountMale: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartCompareMaleCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCompareCountFeMale: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartCompareFeMaleCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCompareCountWeekAll: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartCompareWeekCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCompareCountWeekMale: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartCompareWeekMaleCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCompareCountWeekFeMale: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartCompareWeekFeMaleCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCompareCountYearAll: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartCompareYearCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCompareCountYearMale: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartCompareYearMaleCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchDemoGraphicCompareCountYearFeMale: function(options) {
            this.url = "stubapi/demoGraphic/demoGraphicChartCompareYearFeMaleCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchStoreCountMonth: function(options) {
            this.url = "stubapi/store/storeMonthCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchRecencyCountMax: function(options) {
            this.url = "stubapi/recency/recencyChartCountMax.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchRecencyCountWeekMax: function(options) {
            this.url = "stubapi/recency/recencyChartWeekCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchRecencyCountYearMax: function(options) {
            this.url = "stubapi/recency/recencyChartYearCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchRecencyCountRangeDate: function(options) {
            this.url = "stubapi/recency/recencyRangeDateCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchFrequencyCountMax: function(options) {
            this.url = "stubapi/frequency/frequencyChartCountMonth.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchFrequencyCountWeekMax: function(options) {
            this.url = "stubapi/frequency/frequencyChartCountWeek.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchFrequencyCountYearMax: function(options) {
            this.url = "stubapi/frequency/frequencyChartCountYear.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchFrequencyCountRangeDate: function(options) {
            this.url = "stubapi/frequency/frequencyRangeDateCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchMonetaryCountMax: function(options) {
            this.url = "stubapi/monetary/monetaryChartCountMonth.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchMonetaryCountWeekMax: function(options) {
            this.url = "stubapi/monetary/monetaryChartCountWeek.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchMonetaryCountYearMax: function(options) {
            this.url = "stubapi/monetary/monetaryChartCountYear.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchMonetaryCountRangeDate: function(options) {
            this.url = "stubapi/monetary/monetaryRangeDateCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );
        },
        fetchEmptyDataCount: function(options) {
            this.url = "stubapi/emptyDataCount.json";
            var _options = _.extend( options || {}, { url: this.url } );
            return this.fetchWithAuthInfo( _options );  
        },
    	getCustomerCount: function() {
    		return this.get("customerNumberMax");
    	}
	});

	return CountModel;
})();
