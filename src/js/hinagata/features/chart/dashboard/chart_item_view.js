var Backbone = require('backbone');
module.exports = (function () {
	var ChartItemView = Backbone.Marionette.ItemView.extend({
		template: require('./chart_item_view_template.html'),
		className: "box_style droppable",
		// className: function() {
		// 	var className = "box_style";
		// 	// var chartType = this.model.get("chartType").toLowerCase();
		// 	// var chartId = this.model.get("id");
		// 	// className += chartId;
		// 	// switch ( chartType ) {
		// 	// 	case "barchart":
		// 	// 		className += "column_chart_board";
		// 	// 		break;
		// 	// 	case "donuschart":
		// 	// 		className += "donut_chart_board";
		// 	// 		break;
		// 	// 	case "groupedbarchart":
		// 	// 		className += "monetary_chart_board";
		// 	// 		break;
		// 	// 	case "piechart":
		// 	// 		className += "pie_chart_board";
		// 	// 		break;
		// 	// 	case "areachart":
		// 	// 		className += "area_chart_board";
		// 	// 		break;
		// 	// 	case "linechart":
		// 	// 		className += "line_chart_board";
		// 	// 		break;
		// 	// 	default:
		// 	// 		className += chartId;
		// 	// 		break;
		// 	// };
		// 	return className;
		// },
		id: function() {
			return this.model.get("id");
		},
		perPage: function() {
			return this.model.get("maxPage");
		},
		curPage: function() {
			return this.model.get("page");
		},
		templateHelpers: {
			getType: function(chartType) {
				var type = "";
				switch ( chartType.toLowerCase() ) {
					case "barchart":
						type = 1;
						break;
					case "donuschart":
						type = 2;
						break;
					case "groupedbarchart":
						type = 3;
						break;
					case "piechart":
						type = 4;
						break;
					case "areachart":
						type = 5;
						break;
					case "linechart":
						type = 6;
						break;
					case "tablechart":
						type = 7;
						break;
					case "percentchart":
						type = 8;
						break;
					case "datachart":
						type = 9;
						break;		
				};
				return type;
			},
			getToday: function() {
		  	  	return App.appModel.getLanguageType().dashboard.menu.menuTopDashboard.today;
		    },
			getWeek: function() {
		  	  	return App.appModel.getLanguageType().dashboard.menu.menuTopDashboard.week;
		    },
		    getLastWeek1: function() {
		  	  	return App.appModel.getLanguageType().dashboard.main.lastweek1;
	      	},
	      	getLastWeek2: function() {
	        	return App.appModel.getLanguageType().dashboard.main.lastweek2;
	      	},
	      	getViewAll: function() {
        		return App.appModel.getLanguageType().dashboard.main.viewAll;
      		},
      		getSegmentName: function() {
        		return App.appModel.getLanguageType().dashboard.main.segmentName;
      		},
      		getTitleListShop: function() {
        		return App.appModel.getLanguageType().dashboard.popup.titleListShop;
      		},
      		getSelectAllListShop: function() {
        		return App.appModel.getLanguageType().dashboard.popup.selectAllListShop;
      		},
      		getPlaceHolderInputSearch: function() {
        		return App.appModel.getLanguageType().dashboard.popup.placeHolderInputSearch;
      		},
      		getApplyBtnListShop: function() {
        		return App.appModel.getLanguageType().dashboard.popup.applyBtnListShop;
      		},
      		getCsvDownloadBtn: function() {
        		return App.appModel.getLanguageType().dashboard.popup.csvDownloadBtn;
      		},
      		getChartConvert: function() {
        		return App.appModel.getLanguageType().dashboard.popup.chartConvert;
      		},
      		getApplyBtnListShop: function() {
        		return App.appModel.getLanguageType().dashboard.popup.applyBtnListShop;
      		},
      		getScreenShotBtnChart: function() {
        		return App.appModel.getLanguageType().dashboard.popup.screenShotBtnChart;
      		},
      		getBarChartType: function() {
        		return App.appModel.getLanguageType().dashboard.popup.barChartType;
      		},
      		getLineChartType: function() {
        		return App.appModel.getLanguageType().dashboard.popup.lineChartType;
      		},
      		getDonutChartType: function() {
        		return App.appModel.getLanguageType().dashboard.popup.donutChartType;
      		},
      		getPieChartType: function() {
        		return App.appModel.getLanguageType().dashboard.popup.pieChartType;
      		},
      		getDataChartType: function() {
        		return App.appModel.getLanguageType().dashboard.popup.dataChartType;
      		},
      		getSegmentData: function() {
        		return App.appModel.getLanguageType().dashboard.popup.segmentData;
      		}
		}
	});

	return ChartItemView;

})();