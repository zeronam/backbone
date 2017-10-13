var Backbone = require('backbone');
var ChartCollection = require('../../../models/chart_collection.js');
var ChartCollectionView = require('./chart_collection_view.js');
var ChartModel = require('../../../models/chart_model.js');
var jquery = require('jquery');

require("../../../../../../lib/components/jquery/html2canvas.js");
require("../../../../../../lib/components/jquery/jquery-ui.js");
require('../../../../../../lib/components/bootstrap/datetimepicker/datetimepicker.min.js');

module.exports = (function () {
  var ChartBoardLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./chart_layout_template.html'),
    regions: {
      "chartTemplateRegion": "#chart_board"
    },
    events: function() {
      return ( applican.config.device_os === "IOS" ) ?
      {
        "touchend .downloadcsvbtn" : "downloadCSVDetail",
        "touchend .show_options" : "showOptions",
        "touchend .close_options" : "closeOptions",
        "touchend .show_popup_detail" : "showPopupChartDetail",
        "touchend .zoom-chart-prev" : "handleChartPre",
        "touchend .zoom-chart-next" : "handleChartNext",
        "touchend .btnCloseZoom" : "closePopupChartDetail",
        "touchend .closebg": "closePopupChartDetail",
        "touchend .popup_chart_options .listicon .downloadcsv" : "selectOptionChart",
        "touchend .line_chart_board .listbtnact button" : "showLineSelect",
        "touchend .line_chart_board .viewall" : "viewAllLineChart",
        "touchend .main_screen .topbar .leftbar li": "menuActive",
        "touchend #select_chart": "showPopupSelectChart",
        "touchend #select_chart_board li": "selectChartType",
        "touchend .changetypechartbtn" : "changeTypeChartDetail",
        "touchend #select_chart_board_detail li" : "selectChartTypeDetail",
        "touchend .list_shop_detail li": "openSubMenu",
        "touchend .getscreenshot" : "exportToImage",
        "touchend .download_image": "downloadImage",
        "touchend .box_style .column_chart_board svg .category": "showMenuList",
        "touchend .box_style .donut_chart_board svg .arc": "showMenuList",
        "touchend #modal-zoom-chart svg .category": "showMenuListDetail",
        "touchend #modal-zoom-chart .donut_chart_board svg .arc": "showMenuListDetail",
        "touchend .box_style .detail_menu li": "selectActionData",
        "touchend #modal-zoom-chart .detail_menu li": "selectActionDataDetail",
        "touchend .btnCloseModalDetail": "closeModalDetail",
        "touchend #open_submenu": "showPopupSelectShop",
        "touchend .bggrey .closebg": "closePopupSelectShop",
        "touchend .btnCloseSelectShop": "closePopupSelectShop",
        "touchend .confirm_select": "sendShopSelect",
        "touchend .btnCloseIframe" : "closeIframe",
        "touchend .box_style .donut_chart_board svg path" : "selectSegmentDonut",
        "touchend #modal-zoom-chart .donut_chart_board svg path": "selectSegmentDonutDetail",
        "keyup .search_shop" : "searchShopList",
        "touchend .list_shop_detail .select_filter p": "selectFilterShop",
        "touchend .refresh_chart" : "refreshChart",
        "touchend .refresh_chart_detail" : "refreshChartDetail",
        "touchend #list_shop_select li" : "checkSelectAll",
        "touchend .popup_chart_options .listicon .compareChart": "compareChartDisplay",
        "touchend #select_date .closebg": "closePopupCompare",
        "touchend .btnCloseSelectCompare": "closePopupCompare",
        "touchend .confirm_compare": "compareChart",
        "touchend .week #compare_to_date": "modifyPicker",
        "touchend .quarter #compare_to_date": "modifyPicker",
        "touchend .month #compare_to_date": "modifyPicker",
        "touchend .year #compare_to_date": "modifyPicker",
        "touchend .picker_date ul li": "selectDate",
        "touchend .selectYear #next_year" : "nextYear",
        "touchend .selectYear #prev_year" : "prevYear",
        "mouseover .week ul li": "showDateRange",
        "touchend .popup_chart_options ul .fullWidthChart": "setChartWidth",
        "mouseover #modal-zoom-chart .zoom-chart svg .category": "showTooltipBarchart",
        "mouseout #modal-zoom-chart .zoom-chart svg .category": "hideTooltipBarChart",
        "touchend #reset_chartList": "showPopupConfirmReset",
        "touchend .confirm_select_reset_btn" : "resetChartList",
        "touchend .cancel_select" : "closePopupSelectShop",
        "dblclick .box_style": "showPopupChartDetail",
        "dblclick .modal-zoom": "closePopupChartDetail",
        "touchend .select_date_view": "showPopupChartSelect",
        "touchend .select_date_confirm": "fetchChartDetailSelect"
      }:{
        "click .downloadcsvbtn" : "downloadCSVDetail",
        "click .show_options" : "showOptions",
        "click .close_options" : "closeOptions",
        "click .show_popup_detail" : "showPopupChartDetail",
        "click .zoom-chart-prev" : "handleChartPre",
        "click .zoom-chart-next" : "handleChartNext",
        "click .btnCloseZoom" : "closePopupChartDetail",
        "click .closebg": "closePopupChartDetail",
        "click .popup_chart_options .listicon .downloadcsv" : "selectOptionChart",
        "click .line_chart_board .listbtnact button" : "showLineSelect",
        "click .line_chart_board .viewall" : "viewAllLineChart",
        "click .main_screen .topbar .leftbar li": "menuActive",
        "click #select_chart": "showPopupSelectChart",
        "click #select_chart_board li": "selectChartType",
        "click .changetypechartbtn" : "changeTypeChartDetail",
        "click #select_chart_board_detail li" : "selectChartTypeDetail",
        "click .list_shop_detail li": "openSubMenu",
        "click .getscreenshot" : "exportToImage",
        "click .download_image": "downloadImage",
        "contextmenu .box_style .column_chart_board svg .category": "showMenuList",
        "contextmenu .box_style .donut_chart_board svg .arc": "showMenuList",
        "contextmenu .box_style .pie_chart_board svg .arc": "showMenuList",
        "contextmenu #modal-zoom-chart svg .category": "showMenuListDetail",
        "contextmenu #modal-zoom-chart .donut_chart_board svg .arc": "showMenuListDetail",
        "contextmenu #modal-zoom-chart .pie_chart_board svg .arc": "showMenuListDetail",
        "click .box_style .detail_menu li": "selectActionData",
        "click #modal-zoom-chart .detail_menu li": "selectActionDataDetail",
        "click .btnCloseModalDetail": "closeModalDetail",
        "click #open_submenu": "showPopupSelectShop",
        "click .bggrey .closebg": "closePopupSelectShop",
        "click .btnCloseSelectShop": "closePopupSelectShop",
        "click .confirm_select": "sendShopSelect",
        "click .btnCloseIframe" : "closeIframe",
        "click .box_style .donut_chart svg path" : "selectSegmentDonut",
        "click #modal-zoom-chart .donut_chart svg path": "selectSegmentDonutDetail",
        "keyup .search_shop" : "searchShopList",
        "click .list_shop_detail .select_filter p": "selectFilterShop",
        "click .refresh_chart" : "refreshChart",
        "click .refresh_chart_detail" : "refreshChartDetail",
        "click #list_shop_select li" : "checkSelectAll",
        "click .popup_chart_options .listicon .compareChart": "compareChartDisplay",
        "click #select_date .closebg": "closePopupCompare",
        "click .btnCloseSelectCompare": "closePopupCompare",
        "click .confirm_compare": "compareChart",
        "click .week #compare_to_date": "modifyPicker",
        "click .quarter #compare_to_date": "modifyPicker",
        "click .month #compare_to_date": "modifyPicker",
        "click .year #compare_to_date": "modifyPicker",
        "click #select_to_date": "selectDatePicker",
        "click .picker_date ul li": "selectDate",
        "click .selectYear #next_year" : "nextYear",
        "click .selectYear #prev_year" : "prevYear",
        "mouseover .week ul li": "showDateRange",
        "click .popup_chart_options ul .fullWidthChart": "setChartWidth",
        "mouseover #modal-zoom-chart .zoom-chart svg .category": "showTooltipBarchart",
        "mouseout #modal-zoom-chart .zoom-chart svg .category": "hideTooltipBarChart",
        "click #reset_chartList": "showPopupConfirmReset",
        "click .confirm_select_reset_btn" : "resetChartList",
        "click .cancel_select" : "closePopupSelectShop",
        "dblclick .box_style": "showPopupChartDetail",
        "dblclick .modal-zoom": "closePopupChartDetail",
        "click .select_date_view": "showPopupChartSelect",
        "click .select_date_confirm": "fetchChartDetailSelect",
        "click .column_chart_board .column-inner .viewall": "viewAllBarChart",
        "click .barchart .viewall": "viewAllBarChart",
        "click .greybgact": "closePopupSelectDate"
      }
    },
    templateHelpers: {
      getTitle: function() {
        return App.appModel.getLanguageType().dashboard.menu.titleDashboard;
      },
      getToday: function() {
        return App.appModel.getLanguageType().dashboard.menu.menuTopDashboard.today;
      },
      getWeek: function() {
        return App.appModel.getLanguageType().dashboard.menu.menuTopDashboard.week;
      },
      getMonth: function() {
        return App.appModel.getLanguageType().dashboard.menu.menuTopDashboard.month;
      },
      getLastQ: function() {
        return App.appModel.getLanguageType().dashboard.menu.menuTopDashboard.lastQ;
      },
      getLastYear: function() {
        return App.appModel.getLanguageType().dashboard.menu.menuTopDashboard.lastYear;
      },
      getNoRecord: function() {
        return App.appModel.getLanguageType().dashboard.main.noRecord;
      },
      getTopGrowthTitle: function() {
        return App.appModel.getLanguageType().dashboard.main.topGrowthTitle;
      },
      getNewReturnTitle: function() {
        return App.appModel.getLanguageType().dashboard.main.newReturnTitle;
      },
      getGrowthNewReturnTitle: function() {
        return App.appModel.getLanguageType().dashboard.main.growthNewReturnTitle;
      },
      getLastWeek1: function() {
        return App.appModel.getLanguageType().dashboard.main.lastweek1;
      },
      getLastWeek2: function() {
        return App.appModel.getLanguageType().dashboard.main.lastweek2;
      },
      getSegment: function() {
        return App.appModel.getLanguageType().dashboard.main.segment;
      },
      getViewAll: function() {
        return App.appModel.getLanguageType().dashboard.main.viewAll;
      },
      getGrowthSegmentTitle: function() {
        return App.appModel.getLanguageType().dashboard.main.growthSegmentTitle;
      },
      getSegmentCompareTitle: function() {
        return App.appModel.getLanguageType().dashboard.main.segmentCompareTitle;
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
    },
    SidebarConf: {
      showSidebar: true
    },
    initialize: function(options) {
      var _this = this;
      this.chartCollection = new ChartCollection();
      this.chartModel = new ChartModel();
      this.id = options.id;
      this.type = 'year';
      this.chartMergeTmp = [];
      this.setDateArr = [];
      this.isRefresh = false;
      App.util.bindProgressScreen(this, this.chartCollection);

       this.chartModel.fetchListShop( options )
        .done(function(data) {
          var mailFlg = data.workflowMailFlg;
          var couponFlg = data.workflowCouponFlg;
          var notificationFlg = data.notificationFlg;
          var userListFlg = data.userListFlg;
          var chartData = data.filterInfo;
          _this.generateListShop({ data: chartData, mail: mailFlg, coupon: couponFlg, notification: notificationFlg, userlist: userListFlg});
        
           _this.listenTo(_this.chartCollection, 'sync', _this.renderChartList);
           _this.listenTo(_this.chartCollection, 'sync', _this.onLoad);
        }).fail(function(err) {
          _this.generateListShop({ data: chartData, mail: 0, coupon: 0, notification: 0, userlist: 0});
            _this.listenTo(_this.chartCollection, 'sync', _this.renderChartList);
           _this.listenTo(_this.chartCollection, 'sync', _this.onLoad);
        });
      $(window).on('resize', _.bind(this.onRender, this));
     
    },   
    onRender: function() {
      var _this = this;
      var w_window = $(window).width();
      var h_window = $(window).height();
      setTimeout(function(){
        var width_later = $(window).width();
        var height_later = $(window).height();
        if (width_later === w_window && height_later === h_window){
          _this.fetchChartList(); 
        }        
      }, 500);
      this.checkScreen();
    },
    checkScreen: function(){
     if( !AppConf.webConf.webFlag ){
        if( $(window).width() > 1024 ){
          $('.main_screen').css({'padding-left': 60});
        } else {
          $('.main_screen').css({'padding-left': 0});
        }
      }
    },
    fetchChartList: function() {  
      this.setDateArr = [];
      this.chartMergeTmp = [];
      var _this = this;
      this.chartCollection.fetchListChartDashboard({
        on403: function() {
          _this.err = "chartErr";
          App.util.text.setTitleError(App.appModel.getLanguageType().dashboard.main.errorMsg.getMainTitleErr, App.appModel.getLanguageType().dashboard.main.errorMsg.getMainMsgErr, "#chart_board", "chart-wrapper");
        }
      });        
    },
    renderChartList: function() {
      var _this = this;
      
      var options;
      this.setDate(0);

      this.chartCollection.each(function(model){
         if (AppConf.overridedChartType[model.get('id')]) {
           model.set('chartType',AppConf.overridedChartType[model.get('id')]);
          }    
       
      });
      this.chartTemplateRegion.show( new ChartCollectionView( {collection: this.chartCollection} ) );
      this.showProgress();
      this.chartCollection.each(function(model){
        if(model.get('chartType') == "TableChart" || model.get('chartType') == "DataChart"){
          _this.renderChartDetail(_this.type,model.get('id'),_this.fromDate,_this.endDate,50,1);
        }else {
          _this.renderChartDetail(_this.type,model.get('id'),_this.fromDate,_this.endDate);
        }
      });

      var listChartWidth = $('.listchart').width();
      var marginNum 
      if( AppConf.webConf.webFlag ){
        marginNum = listChartWidth - ($('.box_style').width() * 2) -1;
      } else {
        marginNum = listChartWidth - ($('.box_style').width() * 2) -5;
      }
      $('.half').parent().addClass('half_chart'); 
      $('.full').parent().addClass('full_chart').css({'width': 100 + '%'}); 
      var numFull = $('.full_chart').length;
      $('.half_chart:even').css({'margin-right': marginNum});
      for (var i=0; i< numFull; i++ ){
        var index = i+1;
        var indexFull =   $('.box_style.full_chart:eq('+ i + ')').index() + 1;
        if ( (indexFull%2) == 0 ){          
              $('.full_chart:eq('+i+') ~ .half_chart:even').css({'margin-right': marginNum});          
          $('.full_chart:eq('+i+') ~ .half_chart:odd').css({'margin-right': 0});
        } else if (Math.abs(indexFull % 2) == 1){
            $('.full_chart:eq('+i+') ~ .half_chart:even').css({'margin-right': marginNum});
            $('.full_chart:eq('+i+') ~ .half_chart:odd').css({'margin-right': 0});
           
          }
          
        } 
      if ( $('.full_chart').length === 0 ) {
        $('.box_style:nth-child(odd)').css({'margin-right': marginNum});
      }

    },
    generatePopupListUser: function(options){
      var arr = jquery.parseJSON(options.data);
      var maxPage = options.maxPage;
      var page = options.page;
      var arrLabel = [];
      for ( property in arr[0] ) {
        arrLabel.push(property);
      }
      var arrValue = [];
      var arrValue2 = [];
      var arrKey = [];

      $('#modal-detail-action .title_table').empty();

      for(var i=0; i< arr.length; i++){
        for(var j=0; j< arrLabel.length; j++){
            arrValue.push(arr[i][arrLabel[j]]);   
          
        }
        var k = ((page-1) * 50) + i + 1;
        $('#modal-detail-action ul').append("<li><div class='num'>"+k+"</div><div class='nameValue'>" + arrValue[0] + "</div></li>");
        for(var n = 1; n< arrValue.length; n++){
          $('#modal-detail-action ul li:last-child').append("<div class='numValue'>" + arrValue[n] + "</div>");
        }
        arrValue = [];
      }
      $('#modal-detail-action .title_table').append("<p class='userid'>"+ arrLabel[0]+"</p>");
      for(var j=1; j< arrLabel.length; j++){
        $('#modal-detail-action .title_table').append("<p class='desc'>"+arrLabel[j]+"</p>");
      }      

      $("#modal-detail-action .content_detail .container-ispinner").remove();
      if(arr.length === 0){
        $('#modal-detail-action .title_table').hide();
      }
      var currentPage = $('#modal-detail-action .content_detail').attr('data-page');
        if( currentPage == null && maxPage > 1){
          $('#modal-detail-action .content_detail').attr('data-page',2);
        } else if( currentPage == '' && page < maxPage){

          $('#modal-detail-action .content_detail').attr('data-page', parseInt(page) + 1);
        } else {
          $('#modal-detail-action .content_detail').attr('data-page', '');
        }
      var descLength = $('.content_detail .title_table .desc').length;
      switch(descLength){
        case 1:
        $('.content_detail .title_table .desc').css({'width': 50 + '%'});
        $('.content_detail li .numValue').css({'width': 50 + '%'});
        break;
        case 2:
        $('.content_detail .title_table .desc').css({'width': 25 + '%'});
        $('.content_detail li .numValue').css({'width': 25 + '%'});
        break;
        case 3:
        $('.content_detail .title_table .desc').css({'width': 16 + '%'});
        $('.content_detail li .numValue').css({'width': 16 + '%'});
        break;
        case 4:
        $('.content_detail .title_table .desc').css({'width': 12 + '%'});
        $('.content_detail li .numValue').css({'width': 12 + '%'});
        break;
        case 5:
        $('.content_detail .title_table .desc').css({'width': 10 + '%'});
        $('.content_detail li .numValue').css({'width': 10 + '%'});
        break;
      }
      var windowH = $(window).height();
      if (windowH < 520){
        $('#modal-detail-action ul').css({'max-height': 300});
      }
      if (windowH >= 520 && windowH < 650){
        $('#modal-detail-action ul').css({'max-height': 400});
      }
      if (windowH >= 650){
        $('#modal-detail-action ul').css({'max-height': 500});
      }

    },
    renderChartDetail: function(typeParam,chartIdParam,fromDate,endDate,perPage,curPageParam,isZoomChart){
        var _this = this;
        var index = 0;
        var options;
        var errorData = [];
        if (curPageParam > 0 && perPage > 0){
          options = {typeParam: typeParam, chartIdParam: chartIdParam, fromDate: fromDate, endDate: endDate, perPage: perPage, curPageParam: curPageParam };
        } else {
          options = {typeParam: typeParam, chartIdParam: chartIdParam, fromDate: fromDate, endDate: endDate};
        }
        _this.chartModel.fetchDetailChart( options )
        .done(function(data) {
          index++;
          var chartType = data.chartType.toLowerCase();
          var chartData = data.chartData;
          var chartId = data.chartId;
          var segmentChart = data.isSegmentChart;
          var segmentChartInfo = data.segmentInfo;

          if (AppConf.overridedChartType[chartId]) {
            chartType = AppConf.overridedChartType[chartId].toLowerCase();          
          }else{
            AppConf.overridedChartType[chartId] = chartType;

          }

          AppConf.cacheChartData[chartId]=chartData;
          AppConf.cacheSegment[chartId]=segmentChart;
          AppConf.cacheSegmentInfo[chartId]=segmentChartInfo;
          _this.chartMergeTmp[chartId] = {};
          _this.chartMergeTmp[chartId].count = 0;
          var tmp = JSON.parse(chartData[0].data);
          if(tmp != null && tmp != undefined && tmp.length > 0){
            _this.chartMergeTmp[chartId].columnCount = Object.keys(tmp[0]).length-1;

          }else{
            _this.chartMergeTmp[chartId].columnCount = 0;
          }

          if(isZoomChart) {
            if($('#modal-zoom-chart').hasClass('datachart') ){
              chartType = "datachart";
            }
          }
          $("#" + chartId).attr('data-id', chartId);
          switch ( chartType ) {
            case "barchart":
              $("#" + chartId + " #chartColumn").html("");
              $("#" + chartId + " .list_legend").html("");        
              _this.generateGroupedBarChart({data: chartData, chartId: chartId, segmentInfo: segmentChartInfo, segment: segmentChart});
              $("#" + chartId + " .container-ispinner").remove();
              $("#" + chartId + ' svg').attr('data-id', chartId);
              break;
            case "donuschart":
              $("#" + chartId + " .box_area").html("");
              $("#" + chartId + " .listbtnact").html("");              
              _this.generateDonutPieChart({data: chartData, chartId: chartId, typeGenerate: "donut", segmentInfo: segmentChartInfo, segment: segmentChart});
              $("#" + chartId + " .container-ispinner").remove();
              $("#" + chartId + ' svg').attr('data-id', chartId);
              break;
            case "groupedbarchart":
              $("#" + chartId + " #chartMonetary").html("");
              _this.generateMonetaryChart({data: chartData, chartId: chartId});
              $("#" + chartId + " .container-ispinner").remove();
              $("#" + chartId + ' svg').attr('data-id', chartId);
              break;
            case "piechart":
              $("#" + chartId + " .box_area").html("");
              $("#" + chartId + " .listbtnact").html("");
              _this.generateDonutPieChart({data: chartData, chartId: chartId, typeGenerate: "pie", segmentInfo: segmentChartInfo, segment: segmentChart});
              $("#" + chartId + " .container-ispinner").remove();
              $("#" + chartId + ' svg').attr('data-id', chartId);
              break;
            case "areachart":
              $("#" + chartId + " #chartArea").html("");
              _this.generateAreaChart({data: jquery.parseJSON(chartData[0].data), chartId: chartId});
              if ( chartData[0].name ) {
                $("#" + chartId + ' .area_chart_board h1 span').text(" (" + chartData[0].name + ") ");
              }
              $("#" + chartId + " .container-ispinner").remove();
              $("#" + chartId + ' svg').attr('data-id', chartId);
              break;
            case "linechart":
              $("#" + chartId + " #chartLine").html("");
              $("#" + chartId + " .listbtnact").html("");
              _this.generateLineChart({data: chartData, chartId: chartId});
              $("#" + chartId + " .container-ispinner").remove();
              $("#" + chartId + ' svg').attr('data-id', chartId);
              break;
            case "tablechart":
              if (isZoomChart) {
                _this.generateTableChart({data: chartData, chartId: "modal-zoom-chart"});
                $("#modal-zoom-chart .container-ispinner").remove();
              } else {
                _this.generateTableChart({data: chartData, chartId: chartId});
                $("#" + chartId + " .container-ispinner").remove();
              }
              $("#" + chartId + ' svg').attr('data-id', chartId);
              break;
            case "percentchart":
              _this.generatePercentChart({data: chartData, chartId: chartId});
              $("#" + chartId + " .container-ispinner").remove();
              $("#" + chartId + ' svg').attr('data-id', chartId);
              break;
            case "datachart":
            if (isZoomChart) {
              _this.generateDataChart({data: chartData, chartId: "modal-zoom-chart"});
              $("#modal-zoom-chart .container-ispinner").remove();
              } else {
              _this.generateDataChart({data: chartData, chartId: chartId});
                $("#" + chartId + " .container-ispinner").remove();
              }
              $("#" + chartId + ' .data_board').attr('data-id', chartId);
              break;
            default:
              errorData.push({ chartId: model.get("id"), chartType: model.get("chartType") });
              break;
          };   

          if ( index >= _this.chartCollection.length ) {
            _this.showChartErr({ errorData: errorData });
          }
        })
        .fail(function(err) {
          index++;
          errorData.push({ chartId: model.get("id"), chartType: model.get("chartType") });
          if ( index >= _this.chartCollection.length ) {
            _this.showChartErr({ errorData: errorData });
          }
        });

    },
    generateListShop:function(options){   
      if(options.data.length === 0){
        $('#chart_board').html("<p style='text-align:center;width:100%'>ダッシュボードが設定されていません</p>");
      } else {
      var arr = jquery.parseJSON(options.data[0].data);        
      var shopId = options.data[0].key;
      var shopSelect = options.data[0].value_filter;
      var listShopSelect = shopSelect.split(",");
      var shopName = options.data[0].name; 
      $('.list_shop #open_submenu span').text(shopName);
      $('.list_shop_detail ul').html('');
      $('.list_shop_detail .shopid').text(shopId);
      $('.list_shop_detail .loadShopValue').text(shopSelect);
      $('.list_action_btn').empty();
      for(var i=0; i< arr.length;i++){
        $('.list_shop_detail ul').append("<li><button><em></em><b class='nameshopvalue'>" + arr[i].NAME + "</b><span>" + arr[i].VALUE + "</span></button></li>");
      }
      for(var j=0; j< listShopSelect.length; j++){
        $(".list_shop_detail ul li:contains(" + listShopSelect[j] + ") span").parents().eq(1).addClass('active');
      }
      $('#contextmenu_chart').empty();
            var mail = options.mail;
            var coupon = options.coupon;
            var notification = options.notification;
            var userList = options.userlist;

            if( mail === 1 ){
              $('#contextmenu_chart').append("<li>メール配信</li>");
            }
            if( coupon === 1 ){
              $('#contextmenu_chart').append("<li>クーポン配布</li>");
            }
            if( notification === 1 ){
              $('#contextmenu_chart').append("<li>プッシュ通知</li>");
            }      
            if( userList === 1 ){
              $('#contextmenu_chart').append("<li>ユーザーリスト</li>");
            }
      }
    },
    sendShopSelect: function(){  
      var _this = this;
      var arrValue = [];
      var shopLoad = $('.list_shop_detail .loadShopValue').text();
      var valueShop;
      var shopId = $('.list_shop_detail .shopid').text();
      var activeLength = $('.list_shop_detail ul .active').length;
      for(var i=0; i < activeLength; i++ ){
        valueShop = $('.list_shop_detail ul .active:eq(' + i + ') span').text();
        arrValue.push(valueShop);
      }
      if( activeLength === 0 ){
        $('.list_shop_detail .error_select').text('店舗を選択してください');
      } else {
        $('.list_shop_detail .error_select').text('');
      }
      var strArr = arrValue.toString();
      var n = strArr.localeCompare(shopLoad);
      if (n === -1 || n === 1){
          App.btApi.saveFilterShop({
          key: shopId,
          value: strArr
            }).done(function(res) {
              _this.renderChartList();
              _this.closePopupSelectShop();
        _this.chartModel.fetchListShop(  )
        .done(function(data) {
          var mailFlg = data.workflowMailFlg;
          var couponFlg = data.workflowCouponFlg;
          var notificationFlg = data.notificationFlg;
          var userListFlg = data.userListFlg;
          var chartData = data.filterInfo;
          _this.generateListShop({ data: chartData, mail: mailFlg, coupon: couponFlg, notification: notificationFlg, userlist: userListFlg});
        }).fail(function(err) {
          _this.generateListShop({ data: chartData, mail: 0, coupon: 0, notification: 0, userlist: 0});
        });
            }).fail(function(err) {
              // alert('faild');
            });
      }
      if (n === 0) {
        that.closePopupSelectShop();
      }
    },
    searchShopList:function(){
      var input = document.getElementById('search_shop_list');
      var filter = input.value.toUpperCase();
      var ul = document.getElementById("list_shop_select");
      var li = ul.getElementsByTagName('li');

      for (var i = 0; i < li.length; i++) {
          var a = li[i].getElementsByTagName("b")[0];
          if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
              li[i].style.display = "";
          } else {
              li[i].style.display = "none";
          }
      }
    },
    showChartErr: function(options) {
      var errorData = options.errorData;
      if ( errorData.length === this.chartCollection.length ) {
        this.generateEmptyLayout(chartId);
      } else {
        for ( var i = 0; i < errorData.length; i++ ) {
          var chartId = errorData[i].chartId;
          var chartType = errorData[i].chartType.toLowerCase();
          switch ( chartType ) {
            case "barchart":
              this.setEmptyChart("#" + chartId + " .column-inner", "error");
              break;
            case "donuschart":
              this.setEmptyChart("#" + chartId + " .donut-inner", "error");
              break;
            case "groupedbarchart":
              this.setEmptyChart("#" + chartId + " .monetary-inner", "error");
              break;
            case "piechart":
              this.setEmptyChart("#" + chartId + " .pie-inner", "error");
              break;
            case "areachart":
              this.setEmptyChart("#" + chartId + " .area-inner", "error");
              break;
            case "linechart":
              this.setEmptyChart("#" + chartId + " .line-inner", "error");
              break;
            case "tablechart":
              this.setEmptyChart("#" + chartId + " .table-inner", "error");
              break;
            case "datachart":
              this.setEmptyChart("#" + chartId + " .data-inner", "error");
              break;  
            default:
              $("#" + chartId).remove();
              $("#" + chartId).off('contextmenu');
              var modelRemove = this.chartCollection.where({ id: chartId });
              this.chartCollection.remove(modelRemove);
              break;
          };
        }
      }
    },
    onLoad: function() {
      this.boardSize();
      $(".nav-sidebar .navi_main li").removeClass("active");
      $(".nav-sidebar .navi_main li:eq(0)").addClass("active");
      var _this = this;
      this.chartCollection.each(function(model){     
        var chartId = model.get('id');
        var chartType = model.get('chartType').toLowerCase();
        if(chartType == "tablechart"){   
          $('#'+ chartId + ' .table_board').bind('scroll', function(){
              var triggerPoint = 50;
              if(this.scrollTop + this.clientHeight + triggerPoint > this.scrollHeight){
                var currentPage = $('#'+ chartId).attr('data-page');
                if( currentPage != ''){
                  $("#" + chartId).attr('data-page','').append('<div class="container-ispinner"><div class="ispinner ispinner--gray ispinner--animating"><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div></div></div>');
                  _this.renderChartDetail(_this.type,chartId,_this.fromDate,_this.endDate,50,currentPage);
                }
              }
          });
        }

        if(chartType == "datachart"){
          $('#'+ chartId + ' .data_board').bind('scroll', function(){
              var triggerPoint = 50;
              if(this.scrollTop + this.clientHeight + triggerPoint > this.scrollHeight){
                var currentPage = $('#'+ chartId).attr('data-page');
                if( currentPage != ''){
                  $("#" + chartId + ' .data_board').attr('data-page','').append('<div class="container-ispinner"><div class="ispinner ispinner--gray ispinner--animating"><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div></div></div>');
                  _this.renderChartDetail(_this.type,chartId,_this.fromDate,_this.endDate,50,currentPage);
                }
              }
          });
        }
      });

      $(document).bind("mousedown", function (e) {
          if (!$(e.target).parents(".detail_menu").length > 0) {
              $(".detail_menu").hide(100);
          }
      });
      this.checkScreen();
      this.dragDropChart();
      if ( applican.config.device_os === "IOS" ) {
      var touchtime = 0;
      $('.box_style').on('touchend', function(e) {
          var seft = $(e.currentTarget);
          var chartIdParam = $(seft).attr('id');
          if(touchtime == 0) {
              touchtime = new Date().getTime();
          } else {
              if(((new Date().getTime())-touchtime) < 300) {
                  _this.showChartZoom(chartIdParam,AppConf.cacheChartData[chartIdParam],AppConf.cacheSegment[chartIdParam],AppConf.cacheSegmentInfo[chartIdParam]);
                  touchtime = 0;
              } else {
                  touchtime = new Date().getTime();
              }
          } 
      });
    }
    },
    dragDropChart: function(){
      var _this = this;
      window.startPos = window.endPos = {};
      makeDraggable();
      $('.droppable').droppable({
        hoverClass: 'hoverClass',
        drop: function(event, ui) {
          var $from = $(ui.draggable),
              $fromParent = $from.parent(),
              $to = $(this).children(),
              $toParent = $(this);
          var fromId = $($from).parent().attr('id'),
              toId = $($to).parent().attr('id');
          window.endPos = $to.offset();

          var realTop = window.endPos.top - window.startPos.top;
          var realLeft = window.endPos.left - window.startPos.left;
          var arr =[];
          if ( Math.abs(realTop) > 150 || Math.abs(realLeft) > 150 ){
          swap($from, $from.offset(), window.endPos, 100);
          swap($to, window.endPos, window.startPos, 200, function() {
            $toParent.html($from.css({position: 'relative', left: '', top: '', 'z-index': ''}));
            $fromParent.html($to.css({position: 'relative', left: '', top: '', 'z-index': ''}));
            makeDraggable();
            $($from).parent().attr('id', fromId);
            $($to).parent().attr('id', toId);

            for(var i=0; i< $('.box_style').length; i++){
              var index = i + 1;
              var listId = $('.box_style:nth-child('+index+')').attr('id');
              arr.push(listId);
              
            }
            var orderValue = arr.toString();
            App.btApi.saveUserOther({
            orderValue: orderValue
              }).done(function(res) {
                _this.fetchChartList();
              }).fail(function(err) {
                alert('faild');
              });

          });
          } else {
            $toParent.html($from.css({position: 'relative', left: '', top: '', 'z-index': ''}));
            var chartId = $($from).parent().attr('id');
            $('#' + chartId + ' .refresh_chart').click();
          }
        }
      });
      function makeDraggable() {
        $('.draggable').draggable({
          zIndex: 99999,
          revert: 'invalid',
          start: function(event, ui) {
            window.startPos = $(this).offset();
          }
        });
      }
      function swap($el, fromPos, toPos, duration, callback) {
        $el.css('position', 'absolute')
          .css(fromPos)
          .animate(toPos, duration, function() {
            if (callback) callback();
          });
      }
    },
    boardSize: function(){
      var h_window = $(window).height();
      $('#chart_board').css({'height': h_window - 52});
    },
    generateDataChart: function(options){
      var chartData = options.data;
      var arr = jquery.parseJSON(chartData[0].data);
      var chartId = options.chartId;
      var container = chartId;
      var arrLabel = [];
      var dataset = [];
      $('#'+ chartId + ' .data_board').empty();
      if ( chartId == "modal-zoom-chart" && $('#'+container + " .zoom-chart .data_board").length == 0) {
        $('#'+container + " .zoom-chart").append('<div class="title_board"><div id="title_list"></div></div><ul class="data_board box_message"></ul>');
      }  
      $('#' + chartId).addClass('datachart');
      if ( chartId == "modal-zoom-chart"){
        var currentPage = $('#modal-zoom-chart .data_board').attr('data-page');
        if( currentPage == null && chartData[0].maxPage > 1){
          $('#modal-zoom-chart .data_board').attr('data-page','2');
        } else if( currentPage == "" && chartData[0].page < chartData[0].maxPage){

          $('#modal-zoom-chart .data_board').attr('data-page', parseInt(chartData[0].page)+1);
        } else {
          $('#modal-zoom-chart .data_board').attr('data-page', '');
        }
      } else {
        var currentPage = $('#'+ chartId + ' .data_board').attr('data-page');
        if( currentPage == null && chartData[0].maxPage > 1){
          $('#'+ chartId).attr('data-page','2');
        } else if( currentPage == "" && chartData[0].page < chartData[0].maxPage){
          $('#'+ chartId).attr('data-page', parseInt(chartData[0].page)+1);
        } else {
          $('#'+ chartId).attr('data-page', '');
        }
      }

      $('#'+ chartId + ' .title_board #title_list').empty();
      var count = 0;
      for ( property in arr[0] ) {
        count++;
        arrLabel.push(property);

        if (count <= arrLabel.length){          
          $('#'+ chartId + ' .title_board #title_list').append("<div class='col_value'>" + property + "</div>");  
        }
      }
      if (arrLabel.length === 0) {
        this.setNoDataChart({chartId: chartId, chartType: 'DataChart'})
      }
      var firstKey = arrLabel[0];
      var arrValue = [];
      for(var i=0; i< arr.length; i++){
        arrValue.push(arr[i][firstKey]);        
      }
      arrLabel.shift();
      for(var j = 0; j < arr.length; j++){
        for(var i=0; i< arrLabel.length; i++){
          var keyArr = arrLabel[i];
          dataset.push(arr[j][keyArr]);            
            }
            $('#'+ chartId + ' .data_board').append("<li><div class='col_value'>" + arrValue[j] + "</div></li>");
            for(var n=0; n<dataset.length; n++){
              // var index = n+1;
              if (dataset[n] === null ){
                $('#'+ chartId + ' .data_board li:last-child').append("<div class='col_value'>-</div>");
              } else {
                $('#'+ chartId + ' .data_board li:last-child').append("<div class='col_value'>"+ dataset[n] +"</div>");
              }  
              
            }
          dataset = [];
      }
      if (arrLabel === ''){
        this.setEmptyChart("#" + chartId + " .data-inner");
      }
      var titleLength = $('#'+ chartId + ' .title_board .col_value').length;
       $('#'+ chartId).removeClass('col1 col2 col3 col4 col5 col6 col7');
        switch (titleLength) {
        case 7:
          $('#'+ chartId).addClass('col7');
        break;
        case 6:
          $('#'+ chartId).addClass('col6');
        break;
        case 5:
          $('#'+ chartId).addClass('col5');
        break;
        case 4:
        $('#'+ chartId).addClass('col4');
        break;
        case 3:
        $('#'+ chartId).addClass('col3');
        break;
        case 2:
        $('#'+ chartId).addClass('col2');
        break;
        case 1:
        $('#'+ chartId).addClass('col1');
        break;
      }

      
      if (chartId != "modal-zoom-chart" && this.chartMergeTmp[chartId].columnCount+arrLabel.length > 6){
        $('#' + chartId + ' .datachart_board').addClass('disable_compare');
      }
      $('#' + chartId + ' .datachart_board').addClass('draggable');
      this.dragDropChart();
      if ( $(window).height() < 550 ) {
        $('#modal-zoom-chart .modal-zoom .box_message').css({'max-height': 400});
      }
    },
    generateTableChart:function(options){
      var _this = this;
      var chartData = options.data;
      var arr = jquery.parseJSON(chartData[0].data);
      var chartId = options.chartId;
      var container = chartId;
      if ( chartId == "modal-zoom-chart" && $('#'+container + " .zoom-chart .table_board").length == 0) {
        $('#'+container + " .zoom-chart").append('<ul class="table_board box_message"></ul>');    
      }      
      $('#' + chartId).addClass('tablechart');
      if ( chartId == "modal-zoom-chart"){
        var currentPage = $('#modal-zoom-chart .table_board').attr('data-page');
        if( currentPage == null && chartData[0].maxPage > 1){
          $('#modal-zoom-chart .table_board').attr('data-page','2');
        } else if( currentPage == "" && chartData[0].page < chartData[0].maxPage){
          $('#modal-zoom-chart .table_board').attr('data-page', parseInt(chartData[0].page)+1);
        } else {
          $('#modal-zoom-chart .table_board').attr('data-page', '');
        }
      } else {
        var currentPage = $('#'+ chartId).attr('data-page');
        if( currentPage == null && chartData[0].maxPage > 1){
          $('#'+ chartId).attr('data-page','2');
        } else if( currentPage == "" && chartData[0].page < chartData[0].maxPage){
          $('#'+ chartId).attr('data-page', parseInt(chartData[0].page)+1);
        } else {
          $('#'+ chartId).attr('data-page', '');
        }
      }
      $('#' + chartId + ' .tablechart_board').addClass('draggable');
      this.dragDropChart();
      var key1 = [];
      var value1 = [];
      var key2 = [];
      var value2 = [];
      var key3 = [];
      var value3 = [];
      var key4 = [];
      var value4 = [];
      var key5 = [];
      var value5 = [];
      for(var i=0;i < arr.length; i++){
        key1.push(arr[i].KEY1);
        value1.push(arr[i].VALUE1);
        key2.push(arr[i].KEY2);
        value2.push(arr[i].VALUE2);
        key3.push(arr[i].KEY3);
        value3.push(arr[i].VALUE3);
        key4.push(arr[i].KEY4);
        value4.push(arr[i].VALUE4);
        key5.push(arr[i].KEY5);
        value5.push(arr[i].VALUE5);
      }

      for(var j=0; j < arr.length; j++){
        $('#' + container + ' .table_board').append("<li><div class='coupon_title'><p class='title_name'>" + value1[j] + "</p><p class='detail_coupon_active'>" + key1[j] + "</p></div><div class='value'><p class='top_value'>" + value2[j] + "</p><p class='bottom_value'>" + key2[j]+ "</p></div><div class='value'><p class='top_value'>" + value3[j] + "</p><p class='bottom_value'>" + key3[j] + "</p></div><div class='value'><p class='top_value'>" + value4[j] + "</p><p class='bottom_value'>" + key4[j] + "</p></div><div class='value'><p class='top_value'>" + value5[j] + "</p><p class='bottom_value'>" + key5[j] + "</p></div></li>");
      }
      if (typeof key5[0] == 'undefined' && typeof value5[0] == 'undefined') {    
        $('#' + container + ' .table_board .value:nth-child(5)').remove();
      }
      if (typeof key4[0] == 'undefined' && typeof value4[0] == 'undefined') {    
        $('#' + container + ' .table_board .value:nth-child(4)').remove();
      }
      if (typeof key3[0] == 'undefined' && typeof value3[0] == 'undefined') {    
        $('#' + container + ' .table_board .value:nth-child(3)').remove();
      }
      if (typeof key2[0] == 'undefined' && typeof value2[0] == 'undefined') {    
        $('#' + container + ' .table_board .value:nth-child(2)').remove();
      }
      if (typeof key1[0] == 'undefined' && typeof value1[0] == 'undefined') {    
        $('#' + container + ' .table_board .value:nth-child(1)').remove();
      }
      var valueLength = $('#' + container + ' .table_board li:first-child .value').length;
      if ( valueLength === 4){
        $('#' + container + ' .table_board li .coupon_title').css({'width': '40%'});
      }
    },
    generateGroupedBarChart: function(options) {
      var _this = this;
      var chartData = options.data;
      var arr = jquery.parseJSON(chartData[0].data);
      var arrLabel = [];
      var arrValue = [];
      var valueUnit = ( chartData[0].valueUnit ) ? chartData[0].valueUnit.toLowerCase() : "";
      if ( !valueUnit || ( valueUnit !== "percent" && valueUnit !== "value" ) ) {
        valueUnit = "percent";
      }
      var valueUnitArr = [];
      valueUnitArr.push(valueUnit);
      var dataset = [];
      var data = {};
      var dataArr = [];
      var obj = {};
      var chartId = options.chartId;
      this.emptyData = "";
      var maxCount = 0;
      var maxValue;
      var segment = options.segment;
      var segmentInfo = options.segmentInfo;
      var detailMenu = $('#contextmenu_chart').html();
      $('#' + chartId + ' .column-inner .detail_menu').remove();
      $('#' + chartId + ' .column_chart_board').addClass('draggable');
      this.dragDropChart();
      if (segment === 1){
        if( !$('#' + chartId + ' .column-inner div').hasClass('segmentinfo') ){
         $('#' + chartId + ' .column-inner').append("<div class='segmentinfo' style='display:none'><div class='statusbox'></div><div class='xbox'></div><div class='ybox'></div><div class='updateTimeBox'></div><div class='startDate'></div><div class='endDate'></div><div class='typeChart'></div><div class='segmentId'></div><div class='segmentSelected'></div><div class='saveD'></div></div>");
        }
        if( !$('#' + chartId + ' .column-inner div').hasClass('detail_menu') ){
          $('#' + chartId + ' .column-inner').append("<div class='detail_menu'><div class='info_value_chart'></div><ul></ul></div>");
          $('#' + chartId + ' .column-inner .detail_menu ul').html(detailMenu);
        }
        $('#' + chartId + ' .column-inner .segmentinfo .startDate').text( this.fromDate );
        $('#' + chartId + ' .column-inner .segmentinfo .endDate').text( this.endDate );
        $('#' + chartId + ' .column-inner .segmentinfo .typeChart').text( this.type );
        if(segmentInfo !== null){   
          for(var i=0; i< segmentInfo.length; i++){
            var index = i+1;      
            $('#' + chartId + ' .column-inner .segmentinfo .statusbox').append("<p class='status"+index+"'>" + segmentInfo[i].status +"</p>");
            $('#' + chartId + ' .column-inner .segmentinfo .xbox').append("<p class='x_value" + index +"'>"+ segmentInfo[i].x +"</p>");
            $('#' + chartId + ' .column-inner .segmentinfo .ybox').append("<p class='y_value"+index+"'>"+segmentInfo[i].y+"</p>");
            $('#' + chartId + ' .column-inner .segmentinfo .updateTimeBox').append("<p class='updateTime"+index+"'>"+segmentInfo[i].updateTime+"</p>"); 
            $('#' + chartId + ' .column-inner .segmentinfo .segmentId').append( "<p class='segmentList"+index+"'>"+segmentInfo[i].segmentId+"</p>");
          }
        }
      }
         
     var maxCount = 0;
      var maxValue = 0;

      for ( property in arr[0] ) {
        arrLabel.push(property);
      }
      if (arrLabel.length === 0) {
        this.setNoDataChart({chartId: chartId, chartType: 'BarChart'});
      }
      var firstKey = arrLabel[0];
      var arrValue = [];
      for(var i=0; i< arr.length; i++){
        arrValue.push(arr[i][firstKey]);
      }

      arrLabel.shift();

      for(var i=0; i< arrLabel.length; i++){
        var keyArr = arrLabel[i];
          for(var j = 0; j < arr.length; j++){
            dataArr.push(arr[j][keyArr]);
            if(arr[j][keyArr] > maxValue){
              maxValue = arr[j][keyArr];
            }
          }
          dataset.push(dataArr);         
          dataArr = [];
      }
      var newMaxValue = tmp3 * 5;
      var newPercent = 1/(newMaxValue/maxValue/100);
      var arrDataName = [];
      var toolTipData = [];
      var percentData = [];

      if(maxValue<7){
        maxValue = 7;
      }

      var realMaxValue = maxValue *100/70;      
      var tmp = Math.round(realMaxValue/5);
      var tmp2 = "1";
      for(var i = 0; i< tmp.toString().length-1;i++){
        tmp2 += "0";

      }

      var tmp3 = Math.ceil(tmp/tmp2)*tmp2;
      var newMaxValue = tmp3 * 5;


      var newPercent = 1/(newMaxValue/maxValue/100);
      for(var i=0; i < dataset.length; i++) {
        var index = i + 1;
        var arrName = arrLabel[i];
        var tmp = [];
         for(var j = 0; j < dataset[i].length; j++){
            var percentValue = 0;
            if(maxValue!=0){
              percentValue = dataset[i][j]*newPercent/maxValue;

            }
            tmp.push(percentValue);
            var tmp2 = {};
            tmp2['name'] =arrName;
            tmp2['percent'] =dataset[i][j];

            var tmp3 = {};
            tmp3[0]=tmp2;
            tmp3.length = 1;
            if(dataset[i][j] != undefined && dataset[i][j]!=null ){
                toolTipData[arrName+percentValue]=tmp3;

                percentData[dataset[i][j]]=percentValue;

            }else{
               tmp2['percent'] = null;
               tmp3[0]=tmp2;
                tmp3.length = 1;
                percentData[dataset[i][j]]=null;
                percentValue = null;
                toolTipData[arrName+percentValue]=tmp3;

            }

            dataset[i][j]=percentValue;

          }
          data[arrName] = dataset[i];    
          arrDataName.push(arrName);
      }
      var maxCountArr = [];
      var container = chartId + " #chartColumn";
      var h_chart = 225, windowHeight;
      var chartFlg = "dashboard";
      if ( chartId == "modal-zoom-chart" ) {
        container = chartId + " .zoom-chart";
        windowHeight = $(window).height();
        h_chart = $("#" + chartId + " .modal-zoom").height() - 82;

        chartFlg = "zoom";
        var h_chart;
        if ( windowHeight < 768 ){
          h_chart = 440;
        } else {
          h_chart = 486;
        }
        $('#modal-zoom-chart .modal-zoom').append("<p class='unit'></p>");   
      if (segment === 1){
        if( !$('#modal-zoom-chart .modal-zoom div').hasClass('segmentinfo') ){
         $('#modal-zoom-chart .modal-zoom').append("<div class='segmentinfo' style='display:none'><div class='statusbox'></div><div class='xbox'></div><div class='ybox'></div><div class='updateTimeBox'></div><div class='startDate'></div><div class='endDate'></div><div class='typeChart'></div><div class='segmentId'></div><div class='segmentSelected'></div><div class='saveD'></div></div>");
        }
        if( !$('#modal-zoom-chart .modal-zoom div').hasClass('detail_menu') ){
          $('#modal-zoom-chart .modal-zoom').append("<div class='detail_menu'><div class='info_value_chart'></div><ul></ul></div>");
          $('#modal-zoom-chart .modal-zoom .detail_menu ul').html(detailMenu);
        }
        $('#modal-zoom-chart .modal-zoom .segmentinfo .startDate').text( this.fromDate );
        $('#modal-zoom-chart .modal-zoom .segmentinfo .endDate').text( this.endDate );
        $('#modal-zoom-chart .modal-zoom .segmentinfo .typeChart').text( this.type );     
        if(segmentInfo !== null){ 
        for(var i=0; i< segmentInfo.length; i++){
          var index = i+1;      
          $('#modal-zoom-chart .modal-zoom .segmentinfo .statusbox').append("<p class='status"+index+"'>" + segmentInfo[i].status +"</p>");
          $('#modal-zoom-chart .modal-zoom .segmentinfo .xbox').append("<p class='x_value" + index +"'>"+ segmentInfo[i].x +"</p>");
          $('#modal-zoom-chart .modal-zoom .segmentinfo .ybox').append("<p class='y_value"+index+"'>"+segmentInfo[i].y+"</p>");
          $('#modal-zoom-chart .modal-zoom .segmentinfo .updateTimeBox').append("<p class='updateTime"+index+"'>"+segmentInfo[i].updateTime+"</p>"); 
          $('#modal-zoom-chart .modal-zoom .segmentinfo .segmentId').append( "<p class='segmentList"+index+"'>"+segmentInfo[i].segmentId+"</p>");
          }
        }
      }
      $('#modal-zoom-chart .modal-zoom').append('<button data-chart-id="'+ chartId +'" class="viewall ">'+ App.appModel.getLanguageType().dashboard.main.viewAll +'</button>');
      }
      var w_chart = this.getWidthChart("#" + container);
      var type = 'all';

      if (dataset.length === 1){
        type = 'C';
      }
      var colors =["#000078", "#00a7bc", "#6C04A3", "#8C0098","#26A65B","#E87ED4", '#8870FF','#3E4651','#025159','#5659C9','#E7F76D','#92F22A',"#FD5B03", "#FEC606", "#3D8EB9", '#4572A7', '#63393E','#D33257', '#AA4643', '#89A54E', '#EBBD63','#80699B', '#3D96AE', '#DB843D','#CF000F', '#92A8CD', '#A47D7C', '#B5CA92', '#722809', '#B17E22', '#EEFF6B', '##BFE6EC'];
      this.topMenuType = 'groupedChartDashBoard';
      var widthType = $('#' + chartId).hasClass('full_chart');
      var displayValueFlg = 0;
      if (widthType) {
        displayValueFlg = 1;
      }
      var minValue = maxValue;
      var typeValue;
      
      if (minValue < 1000){
          typeValue = 'number';
        } 
        if (minValue >= 1000 && minValue < 10000 ){
          typeValue = 'thousand';
        } 
        if (minValue >=10000 && minValue < 1000000000){
          typeValue = 'tenThousand';
        } 
        if (minValue >= 1000000000){
          typeValue = 'billion';
        }
      var columnChart = App.util.d3Chart.generateGroupedBarChart({container: container, data: data, dataName : arrDataName, colors: colors, type: type, topMenuType: this.topMenuType, categories: arrValue, chartWidth: w_chart, chartHeight: h_chart, chartFlg: chartFlg, displayValueFlg: displayValueFlg, valueUnitArr: valueUnitArr, maxCountArr: maxCountArr, typeMenu: this.type, percentData:percentData, toolTipData: toolTipData, maxValue: maxValue,newPercent:newPercent, typeValue:typeValue});  
      $('#' + chartId + ' .list_legend').empty();
      if(arrLabel.length>1){
        for(var i=0; i < arrLabel.length; i++){
        var index = i+1;        
        $('#' + chartId + ' .list_legend').append('<button data-chart-id="'+ chartId +'""><em></em></button>');
        $('#' + chartId + ' .list_legend button:nth-child(' + index + ') em').css({'background': colors[i]});
        $('#' + chartId + ' .list_legend button:nth-child(' + index + ')').append('<span>' + arrLabel[i] + '</span>');
        }
      } else {
        $('#' + chartId + ' .list_legend').hide();
        $('#' + chartId + ' #chartColumn').css({'margin-top': 55});
        }
      
      
      var getTick, subTick, numX;
      var tickLength = $('#' + chartId + ' svg .x .tick').length;
   
      if( chartId == "modal-zoom-chart" ){
        $('#modal-zoom-chart .zoom-chart .xaxis_listname').remove();
        $('#modal-zoom-chart .zoom-chart').append("<ul class='xaxis_listname'></ul>");
        $('#modal-zoom-chart .zoom-chart .list_legend.column').insertAfter( $('#modal-zoom-chart .zoom-chart .xaxis_listname') );  
      } else {
        $('#' + chartId + ' .xaxis_listname').remove();
        $('#' + chartId + ' #chartColumn').append("<ul class='xaxis_listname'></ul>");
        // $('#' + chartId + ' .list_legend.column').insertAfter( $('#' + chartId + ' .xaxis_listname') );        
      }     
      
  
      // var widthLegend = $('#' + chartId + ' .list_legend').width();
      // $('#' + chartId + ' .list_legend').addClass('column').css({'margin-left': -widthLegend/2});
      if (chartId != "modal-zoom-chart" && this.chartMergeTmp[chartId].columnCount+arrDataName.length > 6){
        $('#' + chartId + ' .column_chart_board').addClass('disable_compare');
      }
      var legendLength = $('#' + chartId + ' svg .category').length;
      $('#' + chartId + ' .list_legend.column button').on('click', function(e){
        var seft = $(e.currentTarget);
        var indexBtn = $(seft).index() + 1;
        if ( $(seft).hasClass('hider') ){
          $(seft).removeClass('hider');
          for(var i=0; i<legendLength; i++){
            var indexHide = (i*arrLabel.length) + indexBtn + 2;                 
            $('#' + chartId + ' svg .category:nth-child('+indexHide+')').show();          
          }
        } else {
          $(seft).addClass('hider');
          for(var i=0; i<legendLength; i++){
            var indexHide = (i*arrLabel.length) + indexBtn + 2;                 
            $('#' + chartId + ' svg .category:nth-child('+indexHide+')').hide();          
          }
        }
        if( $('#' + chartId + ' .list_legend.column .hider').length > 0 ){
          $('#' + chartId + ' .viewall').show();
        } else {
          $('#' + chartId + ' .viewall').hide();
        }
      });

      var location_xAxis = $('#' + chartId + ' svg rect').attr('width');
      var width_label = arrDataName.length * location_xAxis;
      var arrHeight = [];
      var liHeight;
      var widthSvg = $('#' + chartId + ' svg').attr('width');
      for(var i=0; i< tickLength; i++){
        var k = i+1;
        getTick = $('#' + chartId + ' svg .x .tick:nth-child(' + k + ')').attr('transform');
        subTick = getTick.split('(')[1];
        numX = subTick.split(',')[0];       

        if( chartId == "modal-zoom-chart" ){        
          
          $('#modal-zoom-chart .zoom-chart .xaxis_listname').append("<li><span>"+arrValue[i]+"</span></li>");
          $('#modal-zoom-chart .zoom-chart .xaxis_listname li:nth-child('+ k +')').css({'left': parseInt(numX) - (width_label/2) -6 + 'px', 'width': width_label});
          var widthPopup = $('.modal-zoom').width();
          if (widthSvg>widthPopup){
            $('#modal-zoom-chart .zoom-chart .list_legend.column').css({'width': widthSvg});
          }
        }
        else {
          $('#' + chartId + ' .xaxis_listname').append("<li>"+arrValue[i]+"</li>");
          $('#' + chartId + ' .xaxis_listname').css({'width': $('#' + chartId + ' svg').width() - 55 });          
          if ( $('#' + chartId + ' svg .category').length > 30) {
            $('#' + chartId + ' .xaxis_listname li:nth-child('+ k +')').css({'left': parseInt(numX) - (width_label/2) - 10 + 'px', 'width': width_label});
          } else {
            $('#' + chartId + ' .xaxis_listname li:nth-child('+ k +')').css({'left': parseInt(numX) - (width_label/2) - 10 + 'px', 'width': width_label});  
          }
        }
      }
      $('.comparing .detail_menu').remove();
      var listHeight = $('#' + chartId + ' .list_legend.column').height();
      
      
      if( $('#' + chartId + ' .list_legend.column').height() > 35 || $('#modal-zoom-chart .zoom-chart .list_legend.column').height() > 46){
        if( chartId == "modal-zoom-chart" ){  
          $('#modal-zoom-chart .zoom-chart .list_legend.column').css({'max-height': 46, 'overflow-y': 'auto'});
        } else {
          $('#' + chartId + ' .list_legend.column').css({'max-height': 35, 'overflow-y': 'auto'});
        }        
      }

    },
    generatePercentChart:function(options){
      var chartData = options.data;
      var chartId = options.chartId;
      var container = chartId;
      var itemId = "chartPercent";
      var w_chart = 120;
      if ( chartId == "modal-zoom-chart" && $('#'+container + " .zoom-chart .table_board").length == 0) {
        $('#'+container + " .zoom-chart").append('<ul class="zoom-chart-percent-list"></ul>');    
        var itemId = "zoomChartPercent";
        w_chart = 200;
      }
      var arr = jquery.parseJSON(chartData[0].data);
      var percent;
      var percent2;
      var percentArr = [];
      var percentArr2 = [];
      var dataset = [];
      var index;
      var typeGenerate = "donut";
      var colors = ["#000078", "#999999"];      
      for(var i=0; i< arr.length; i++){
        percent = parseInt(((arr[i].VALUE2 / arr[i].VALUE1) * 100),10);
        percent2 = 100 - percent;
        percentArr.push(percent);
        percentArr2.push(percent2);
        index = i+1;
        $('#' + container + ' ul').append("<li><div id="+ itemId + index + "></div></li>");        
        $('#' + container + ' #' + itemId + index).append("<div class='tooltip2'><span class='total'>" + percent + "%</span></div>").addClass('percent_chart_type');
      }
      for(var j = 0; j< arr.length; j++){
          dataset=[];
          index = j+1;
          dataset.push({label: arr[j].KEY , count: percentArr[j]}, {label: "total" , count: percentArr2[j]});
          var percentChart = App.util.d3Chart.generateDonutPieChart({container: container + ' #' + itemId + index, dataset: dataset, type: typeGenerate, valueUnitArr: "value", widthChart: w_chart, colors: colors, legend: true});
          $('#' + container + ' li:nth-child(' + index + ')').prepend('<p>Label ' + index +'</p>');
      }
      var percentLength = $('#' + chartId + ' ul li').length;
      if (percentLength === 4) {
          $('#' + chartId + ' li').css({'width': '50%'});
      }
    },
    generateDonutPieChart:function(options){
      var dataset = [];
      var typeGenerate = options.typeGenerate;
      var chartData = options.data;
      var arr = jquery.parseJSON(chartData[0].data);
      var arrLabel = [];
      var valueUnit = ( chartData[0].valueUnit ) ? chartData[0].valueUnit.toLowerCase() : "";
      var valueUnitArr = [];

      if ( !valueUnit || ( valueUnit !== "percent" && valueUnit !== "value" ) ) {
        valueUnit = "percent";
      }
      valueUnitArr.push(valueUnit);
      var chartId = options.chartId;
      var container = chartId;
      var w_chart = 130;
      var segment = options.segment;
      var segmentInfo = options.segmentInfo;
      var detailMenu = $('#contextmenu_chart').html();
      $('#' + chartId + ' .donut-inner .detail_menu').remove();
      if(chartId !== 'modal-zoom-chart'){
        $('#' + chartId).children().addClass('draggable');
      }
      
        this.dragDropChart();
      if ( chartId == "modal-zoom-chart" ) {
        container = chartId + " .zoom-chart";
        w_chart = 160;
        if ( typeGenerate === "pie" ) {
          $("#" + container).append('<div class="pie_chart_board"><button data-chart-id="'+ chartId +'" class="viewall ">'+ App.appModel.getLanguageType().dashboard.main.viewAll +'</button><div class="box_area "> <span class="square"></span><p></p> </div><p class="listbtnact"></p></div>');
        } else {
          $("#" + container).append('<div class="donut_chart_board"><button data-chart-id="'+ chartId +'" class="viewall ">'+ App.appModel.getLanguageType().dashboard.main.viewAll +'</button><div class="box_area "><p></p> </div><p class="listbtnact"></p></div>');
        }
      }     
      var colors = ["#000078", "#00a7bc", "#6C04A3", "#8C0098","#26A65B","#E87ED4", '#8870FF','#3E4651','#025159','#5659C9','#E7F76D','#92F22A',"#FD5B03", "#FEC606", "#3D8EB9", '#4572A7', '#63393E','#D33257', '#AA4643', '#89A54E', '#EBBD63','#80699B', '#3D96AE', '#DB843D','#CF000F', '#92A8CD', '#A47D7C', '#B5CA92', '#722809', '#B17E22', '#EEFF6B', '##BFE6EC'];
      if ( typeGenerate === "donut" ) {
        colors = ["#000078", "#00a7bc", "#6C04A3", "#8C0098","#26A65B","#E87ED4", '#8870FF', '#3E4651','#025159','#5659C9','#E7F76D','#92F22A', "#FD5B03", "#FEC606", "#3D8EB9", '#4572A7', '#63393E','#D33257', '#AA4643', '#89A54E', '#EBBD63', '#80699B', '#3D96AE', '#DB843D', '#CF000F', '#92A8CD', '#A47D7C', '#B5CA92', '#722809', '#B17E22', '#EEFF6B', '#BFE6EC'];
      }

      for ( property in arr[0] ) {
        arrLabel.push(property);
      }
      if (arrLabel.length === 0) {
        if(options.typeGenerate === 'pie'){
          this.setNoDataChart({chartId: chartId, chartType: 'PieChart'});
        }
        if(options.typeGenerate === 'donut'){
          this.setNoDataChart({chartId: chartId, chartType: 'DonutChart'});
        }
        if(chartId == "modal-zoom-chart"){
          $('#modal-zoom-chart .modal-zoom .listbtnact').hide(); 
        }
      }
      var id = " #chartPie";
      if(chartId == "modal-zoom-chart") {
      if (segment === 1){
        if( !$('#modal-zoom-chart .modal-zoom div').hasClass('segmentinfo') ){
          $('#modal-zoom-chart .modal-zoom').append("<div class='segmentinfo' style='display:none'><div class='statusbox'></div><div class='xbox'></div><div class='ybox'></div><div class='updateTimeBox'></div><div class='startDate'></div><div class='endDate'></div><div class='typeChart'></div><div class='segmentId'></div><div class='segmentSelected'></div><div class='saveD'></div></div>");
        }
        if( !$('#modal-zoom-chart .modal-zoom div').hasClass('detail_menu') ){
          $('#modal-zoom-chart .modal-zoom').append("<div class='detail_menu'><div class='info_value_chart'></div><ul></ul></div>");
          $('#modal-zoom-chart .modal-zoom .detail_menu ul').html(detailMenu);
        }
        
        $('#modal-zoom-chart .modal-zoom .segmentinfo .startDate').text( this.fromDate );
        $('#modal-zoom-chart .modal-zoom .segmentinfo .endDate').text( this.endDate );
        $('#modal-zoom-chart .modal-zoom .segmentinfo .typeChart').text( this.type );
        if(segmentInfo !== null){   
          for(var i=0; i< segmentInfo.length; i++){
            var index = i+1;      
            $('#modal-zoom-chart .modal-zoom .segmentinfo .statusbox').append("<p class='status"+index+"'>" + segmentInfo[i].status +"</p>");
            $('#modal-zoom-chart .modal-zoom .segmentinfo .xbox').append("<p class='x_value" + index +"'>"+ segmentInfo[i].x +"</p>");
            $('#modal-zoom-chart .modal-zoom .segmentinfo .ybox').append("<p class='y_value"+index+"'>"+segmentInfo[i].y+"</p>");
            $('#modal-zoom-chart .modal-zoom .segmentinfo .updateTimeBox').append("<p class='updateTime"+index+"'>"+segmentInfo[i].updateTime+"</p>"); 
            $('#modal-zoom-chart .modal-zoom .segmentinfo .segmentId').append( "<p class='segmentList"+index+"'>"+segmentInfo[i].segmentId+"</p>");
          }
        }
      } else if (segment === 0) {
        if( !$('#modal-zoom-chart .modal-zoom div').hasClass('segmentinfo') ){
          $('#modal-zoom-chart .modal-zoom').append("<div class='segmentinfo' style='display:none'><div class='saveD'></div></div>");
        }
      }
      } else {
        if ( typeGenerate === "donut" ) {
          id = " #chartDonut";
        if (segment === 1){
          if( !$('#' + chartId + ' .donut-inner div').hasClass('segmentinfo') ){
            $('#' + chartId + ' .donut-inner').append("<div class='segmentinfo' style='display:none'><div class='statusbox'></div><div class='xbox'></div><div class='ybox'></div><div class='updateTimeBox'></div><div class='startDate'></div><div class='endDate'></div><div class='typeChart'></div><div class='segmentId'></div><div class='segmentSelected'></div><div class='saveD'></div></div>");
          }
          if( !$('#' + chartId + ' .donut-inner div').hasClass('detail_menu') ){
            $('#' + chartId + ' .donut-inner').append("<div class='detail_menu'><div class='info_value_chart'></div><ul></ul></div>");
            $('#' + chartId + ' .donut-inner .detail_menu ul').html(detailMenu);  
          }

        $('#' + chartId + ' .donut-inner ul').empty();
        $('#' + chartId + ' .donut-inner ul').html(detailMenu);
        $('#' + chartId + ' .donut-inner .segmentinfo .startDate').text( this.fromDate );
        $('#' + chartId + ' .donut-inner .segmentinfo .endDate').text( this.endDate );
        $('#' + chartId + ' .donut-inner .segmentinfo .typeChart').text( this.type );
        if(segmentInfo !== null){
        for(var i=0; i< segmentInfo.length; i++){
          var index = i+1;      
          $('#' + chartId + ' .donut-inner .segmentinfo .statusbox').append("<p class='status"+index+"'>" + segmentInfo[i].status +"</p>");
          $('#' + chartId + ' .donut-inner .segmentinfo .xbox').append("<p class='x_value" + index +"'>"+ segmentInfo[i].x +"</p>");
          $('#' + chartId + ' .donut-inner .segmentinfo .ybox').append("<p class='y_value"+index+"'>"+segmentInfo[i].y+"</p>");
          $('#' + chartId + ' .donut-inner .segmentinfo .updateTimeBox').append("<p class='updateTime"+index+"'>"+segmentInfo[i].updateTime+"</p>"); 
          $('#' + chartId + ' .donut-inner .segmentinfo .segmentId').append( "<p class='segmentList"+index+"'>"+segmentInfo[i].segmentId+"</p>");
        }
        }
      } else if(segment === 0){
        if( !$('#' + chartId + ' .donut-inner div').hasClass('segmentinfo') ){
         $('#' + chartId + ' .donut-inner').append("<div class='segmentinfo' style='display:none'><div class='saveD'></div></div>");
        }
      }
        }
        if ( typeGenerate === "pie" ) {
          id = " #chartPie";
        if (segment === 1){
          if( !$('#' + chartId + ' .pie-inner div').hasClass('segmentinfo') ){
            $('#' + chartId + ' .pie-inner').append("<div class='segmentinfo' style='display:none'><div class='statusbox'></div><div class='xbox'></div><div class='ybox'></div><div class='updateTimeBox'></div><div class='startDate'></div><div class='endDate'></div><div class='typeChart'></div><div class='segmentId'></div><div class='segmentSelected'></div><div class='saveD'></div></div>");
          }
          if( !$('#' + chartId + ' .pie-inner div').hasClass('detail_menu') ){
            $('#' + chartId + ' .pie-inner').append("<div class='detail_menu'><div class='info_value_chart'></div><ul></ul></div>");
            $('#' + chartId + ' .pie-inner .detail_menu ul').html(detailMenu);  
          }

        $('#' + chartId + ' .pie-inner ul').empty();
        $('#' + chartId + ' .pie-inner ul').html(detailMenu);
        $('#' + chartId + ' .pie-inner .segmentinfo .startDate').text( this.fromDate );
        $('#' + chartId + ' .pie-inner .segmentinfo .endDate').text( this.endDate );
        $('#' + chartId + ' .pie-inner .segmentinfo .typeChart').text( this.type );
        if(segmentInfo !== null){
        for(var i=0; i< segmentInfo.length; i++){
          var index = i+1;      
          $('#' + chartId + ' .pie-inner .segmentinfo .statusbox').append("<p class='status"+index+"'>" + segmentInfo[i].status +"</p>");
          $('#' + chartId + ' .pie-inner .segmentinfo .xbox').append("<p class='x_value" + index +"'>"+ segmentInfo[i].x +"</p>");
          $('#' + chartId + ' .pie-inner .segmentinfo .ybox').append("<p class='y_value"+index+"'>"+segmentInfo[i].y+"</p>");
          $('#' + chartId + ' .pie-inner .segmentinfo .updateTimeBox').append("<p class='updateTime"+index+"'>"+segmentInfo[i].updateTime+"</p>"); 
          $('#' + chartId + ' .pie-inner .segmentinfo .segmentId').append( "<p class='segmentList"+index+"'>"+segmentInfo[i].segmentId+"</p>");
        }
        }
      } else if(segment === 0){
        if( !$('#' + chartId + ' .pie-inner div').hasClass('segmentinfo') ){
         $('#' + chartId + ' .pie-inner').append("<div class='segmentinfo' style='display:none'><div class='saveD'></div></div>");
        }
      }
        }
      }
      var firstKey = arrLabel[0];
      var arrValue = [];
      for(var i=0; i< arr.length; i++){
        arrValue.push(arr[i][firstKey]);
      }
      arrLabel.shift();
      var dataArr = [];
      var dataset = [];   
      for(var i = 0; i< arrLabel.length; i++){
        var location = i + 1;
        var keyArr = arrLabel[i];
          for(var j = 0; j < arr.length; j++){
            dataset.push({label:arrValue[j], count:arr[j][keyArr]});            
          }
        $('#' + chartId + ' .box_area').append("<div id='" + chartId + location +  "' class='donut_chart'></div>");          


        if (i === 0){
          var advanceChart = App.util.d3Chart.generateDonutPieChart({chartId: options.chartId, container: chartId + location, dataset: dataset, type: typeGenerate, colors: colors, legend: true, widthChart: w_chart, valueUnitArr: valueUnitArr});
          } else {
          var advanceChart = App.util.d3Chart.generateDonutPieChart({chartId: options.chartId, container: chartId + location, dataset: dataset, type: typeGenerate, colors: colors, legend: false, widthChart: w_chart, valueUnitArr: valueUnitArr});
          }

          dataset = [];
       }
        for(var j=0; j < arrLabel.length; j++){
          var index = j + 1;
          if (options.typeGenerate === 'pie'){          
            $('#'+ chartId + index).append("<p>"+ arrLabel[j] +"</p>");
          } else if (options.typeGenerate === 'donut'){
            $('#' + chartId + index).append("<p>"+ arrLabel[j] +"</p>");
          }
        }
        if (arrLabel.length === 6){
            // $('#modal-zoom-chart .donut_chart').css({'width': 28 + "%", 'margin': '10px 0'});
            // $('#modal-zoom-chart .tooltip').css({'right': 70});
        } else if (arrLabel.length === 3){
            $('#modal-zoom-chart .pie_chart_board .tooltip').css({'right': - 35});
        }
        if(chartId == "modal-zoom-chart") {
          var chartIdPopup = $('#modal-zoom-chart').children().width();
          if (chartIdPopup > 820){
            $('#' + chartId + ' .donut_chart').css({'margin': '30px 20px'});
            $('#' + chartId + ' .pie_chart_board .tooltip').css({'right': -35});
          }
        } else {
          var boxWidth = $('#' + chartId).width();
          if ( boxWidth > 750 ){
            $('#' + chartId + ' .donut_chart').css({'margin': '40px 50px 30px 10px'});
            $('#' + chartId + ' .pie_chart_board .tooltip').css({'right': -25});
          } else {
            $('#' + chartId + ' .donut_chart').css({'margin': '40px 5px 35px 5px'});
            $('#' + chartId + ' .pie_chart_board .tooltip').css({'right': -20});
          }
        }
        var legendLength = $('#' + chartId + ' .listbtnact button').length;
        if (legendLength > 6) {
          $('#' + chartId + ' .listbtnact').addClass('merge');
        }
        if (arrLabel.length > 5){
          $('#' + chartId + ' .box_area').addClass('comparePieDonut');
          $('#' + chartId + ' .box_area').parent().parent().css({'overflow-y': 'hidden', 'overflow-x': 'auto'});
          $('#modal-zoom-chart .box_area').parent().parent().css({'overflow-y': 'hidden', 'overflow-x': 'hidden'});
        }
        if (chartId != "modal-zoom-chart" && this.chartMergeTmp[chartId].columnCount+arrLabel.length > 6){
          $('#' + chartId).children().addClass('disable_compare');
        }
        var donutWidth = $('#'+ chartId + ' .donut_chart').width() + 20;
        var donutLength = $('#'+ chartId + ' .donut_chart').length;
        if ( donutLength === 6 && chartId != 'modal-zoom-chart'){
          $('#'+ chartId + ' .comparePieDonut').css({'width': donutWidth*6});
        }
        $('.comparing .detail_menu').remove();
        for(var i=0; i< donutLength;i++){
          var widthTooltip = $('#' + chartId + ' .donut_chart:eq('+i+') .tooltip .total').width();
          $('#' + chartId + ' .donut_chart:eq('+i+') .tooltip .total').css({'margin-left': - widthTooltip/2 });
        }
        
    },
    setValueDefaultPie: function(dataset, arr1, arrLabel) {
      var arrTmp = dataset;
      var arr2 = [];
      jquery.grep( arrLabel, function(d) {
        if ( jquery.inArray( d, arr1 ) === -1 ) {
          arr2.push(d);
        }
      });
      for ( var i = 0; i < arr2.length; i++ ) {
        arrTmp.push( { label: arr2[i], count: 0 } );
      }
      return arrTmp;
    },
    sortArrOfObjectsByParam: function( arrToSort, strObjParamToSortBy, sortAscending ) {
      if(sortAscending == undefined) sortAscending = true;

      if(sortAscending) {
          arrToSort.sort(function (a, b) {
              return a[strObjParamToSortBy] > b[strObjParamToSortBy];
          });
      }
      else {
        arrToSort.sort(function (a, b) {
          return a[strObjParamToSortBy] < b[strObjParamToSortBy];
        });
      }
    },
    generateAreaChart:function(options) {
      var arr = options.data;
      var dataset = [];
      var chartId = options.chartId;
      var container = chartId + " #chartArea";
      var h_chart = 140;
      // var h_chart = 163;
      var w_chart = this.getWidthChart("#" + chartId + " .area_chart_board") + 1;
      if(chartId == "modal-zoom-chart") {
        $("#" + chartId + " .zoom-chart").append('<div class="area_chart_board"></div>');
        container = chartId + " .area_chart_board";
        w_chart = this.getWidthChart("#" + container) + 1;
        h_chart = 320;
      }

      var maxCount = 0;
      for ( var i = 0; i < arr.length; i++ ) {
        var dateTmp = this.convertDateLineAreaChart(arr[i].KEY);
        dataset.push( {open: arr[i].MAIL_OPEN, click: arr[i].MAIL_CLICK, use: arr[i].COUPON_USE, date: dateTmp});
      }
      for (var i = 0; i < dataset.length; i++) {
        maxCount += dataset[i].open;
        maxCount += dataset[i].click;
        maxCount += dataset[i].use;
      }

      if ( maxCount === 0 ) {
        this.setEmptyChart("#" + chartId + " .area_chart_board");
        return;
      }

      var colors = ["#000078"];
      var advanceChart = App.util.d3Chart.generateAreaChart({container: container, dataset: dataset, colors: colors, chartWidth: w_chart, chartHeight: h_chart, type: this.type});
    },
    generateLineChart: function(options){
      var chartData = options.data;
      var arr = jquery.parseJSON(chartData[0].data);
      var dataset = [];
      var arrLabel = [];
      var dataArr = {};
      var dataArr2 = [];
      var obj = {};
      var chartId = options.chartId;
      var container = chartId + " #chartLine";
      var h_chart = 250;
      var w_chart = this.getWidthChart("#" + chartId + " .line_chart_board") - 30;
      var chartFlg = "dashboard";
      if(chartId == "modal-zoom-chart") {        
        container = chartId + " .zoom-chart";
        $("#" + chartId + " .zoom-chart").append('<div class="line_chart_board"></div>');
        $('#' + chartId + ' .line_chart_board').append('<p class="listbtnact"></p><button data-chart-id="'+ chartId +'" class="viewall ">' + App.appModel.getLanguageType().dashboard.main.viewAll + '</button>');
        w_chart = this.getWidthChart("#" + container)-20;
        if ( $(window).height() < 550 ) {
          h_chart = 345;
        } else {
          h_chart = 420;
        }        
        chartFlg = "zoom";
        $('#modal-zoom-chart .zoom-chart').append("<div class='title_line_chart'></div>");
        $('#modal-zoom-chart .modal-zoom').append("<p class='unit'></p>");
      } else {
        $('#' + chartId).children().addClass('draggable');
      }

      this.dragDropChart();
      var dataset2 = [];
      var dataset3 = [];
      var dataValue = [];
      var typeValue;
      for ( var property in arr[0] ) {
        arrLabel.push(property);
      }

      var firstKey = arrLabel[0];
      var titleArr = [];
      for(var i=0; i< arr.length; i++){
        titleArr.push(arr[i][firstKey]);
      }
      arrLabel.shift();

      var keys = [];
      for(var j=0; j< arr.length; j++){
        var indexDate = j + 1;
        function padNumber(number) {
          var string  = '' + number;
          string      = string.length < 2 ? '0' + string : string;
          return string;
            }
          date      = new Date('2017-01-01');
          next_date = new Date(date.setDate(date.getDate() + indexDate));
          formatted = next_date.getUTCFullYear() + '-' + padNumber(next_date.getUTCMonth() + 1) + '-' + padNumber(next_date.getUTCDate());
          keys.push(formatted);
      }
      for(var j = 0; j < arr.length; j++){
        for(var i=0; i< arrLabel.length; i++){
          
          var keyArr = arrLabel[i];
          var index = i + 1;
          var arrNum = "value" + index;
          dataArr[arrNum] = arr[j][keyArr];
          dataValue.push(arr[j][keyArr]);
        }
        var dateTmp = this.convertDateLineAreaChart(keys[j], "linechart");
            dataArr.date = dateTmp;
          dataset3.push(dataArr);

            dataArr = {};
        }
        var minValue = (Math.max.apply(Math,dataValue) * 1.5)/5 ;
        if (minValue < 1000){
          typeValue = 'number';
        } 
        if (minValue >= 1000 && minValue < 10000 ){
          typeValue = 'thousand';
        } 
        if (minValue >=10000 && minValue < 1000000000){
          typeValue = 'tenThousand';
        } 
        if (minValue >= 1000000000){
          typeValue = 'billion';
        }
        var colors = [ "#d62728","#1f77b4", "#1f77b4", "#8c0098", "#ff7f0e","#1f77b4",'#8c0098','#CF000F', '#26A65B', '#DB843D', '#B5CA92', '#722809', '#B17E22', '#EEFF6B', '#BFE6EC'];
        
        if (arrLabel.length === 0) {
        this.setNoDataChart({chartId: chartId, chartType: 'LineChart'});
        if (chartId == "modal-zoom-chart"){
          $('#modal-zoom-chart .line_chart_board .listbtnact').hide();
        }
      } else {
        App.util.d3Chart.generateLineChart({container: container, dataset: dataset3, titleArr: arrLabel, colors: colors, chartWidth: w_chart, chartHeight: h_chart, type: this.type, chartFlg: chartFlg, pointArr: titleArr, typeValue: typeValue});
      }
      
        if(chartId == "modal-zoom-chart") { 
          
          var changePosition = $('#modal-zoom-chart .zoom-chart .title_line_chart').html();
          $('#modal-zoom-chart .zoom-chart .title_line_chart').remove();
          $('#modal-zoom-chart .zoom-chart').append("<div class='title_line_chart'></div>");
          $('#modal-zoom-chart .zoom-chart .title_line_chart').html(changePosition).css({'margin-left': 30});
            if ( titleArr.length < 21 ){
              
              var widthChart = $('#modal-zoom-chart .zoom-chart svg').width() -50;
                for(var j=0; j< titleArr.length; j++){
                  var index = j+ 1;
                  $('#' + chartId + ' .zoom-chart .title_line_chart span:nth-child('+index+')').text(titleArr[j]);
                }
            } else {            
              var widthChart = $('#modal-zoom-chart .zoom-chart svg').width() ;
                for(var j=0; j< titleArr.length; j++){
                  var index = j+ 1;                
                  $('#' + chartId + ' .zoom-chart .title_line_chart span:nth-child('+index+')').text(titleArr[j]);
                }
              $('#modal-zoom-chart .modal-zoom .line_chart_board + svg').css({'margin-bottom': 30});
              $('#modal-zoom-chart .zoom-chart').css({'overflow-x': 'auto', 'overflow-y': 'hidden'});
            }
              var widthSvg = $('.modal-zoom .zoom-chart svg').attr('width');
              var widthPopup = $('.modal-zoom').width();
              if (widthSvg>widthPopup){
                $('#modal-zoom-chart .zoom-chart .listbtnact').css({'width': widthSvg});
              }        
        } else {
            $('#' + chartId + ' #chartLine .list_line_chart').remove();
            $('#' + chartId + ' #chartLine').append("<div class='list_line_chart'></div>");
            var widthChart = $('#' + chartId + ' svg').width() - 50;

            $('#' + chartId + ' #chartLine .list_line_chart').css({'width': widthChart, 'margin-left': 35});
            for(var j=0; j< titleArr.length; j++){
                  var index = j+ 1;
                  var point = titleArr.length - 1;
                  var width = widthChart/titleArr.length;
                  var location = j * ( widthChart / point) - (width/2);
                  var left = j * width;
                  $('#' + chartId + ' #chartLine .list_line_chart').append("<span>" + titleArr[j] + "</span>");
                  if (titleArr.length === 2){
                    $('#' + chartId + ' #chartLine .list_line_chart span:first-child').css({'left': 0, 'width': width, 'text-align': 'left'});
                    $('#' + chartId + ' #chartLine .list_line_chart span:last-child').css({'right': 0, 'width': width, 'text-align': 'right'}); 
                  } else if (titleArr.length === 3) {
                    $('#' + chartId + ' #chartLine .list_line_chart span:first-child').css({'left': 0, 'width': width, 'text-align': 'left'});
                    $('#' + chartId + ' #chartLine .list_line_chart span:nth-child(2)').css({'left': width, 'width': width, 'text-align': 'center'});
                    $('#' + chartId + ' #chartLine .list_line_chart span:last-child').css({'right': 0, 'width': width, 'text-align': 'right'}); 
                  } else{
                    $('#' + chartId + ' #chartLine .list_line_chart span:nth-child(' + index + ')').css({'left': location, 'width': width});  
                  }                
            }
          if (titleArr.length === 4){
            $('#' + chartId + ' #chartLine .list_line_chart span:first-child').css({'left': 0, 'width': width, 'text-align': 'left'});
            $('#' + chartId + ' #chartLine .list_line_chart span:last-child').css({'right': 0, 'width': width, 'text-align': 'right', 'left': 'auto'}); 
          }
      }      
      if (chartId != "modal-zoom-chart" && this.chartMergeTmp[chartId].columnCount+arrLabel.length > 6){
        $('#' + chartId).children().addClass('disable_compare');
      }
      if( $('#modal-zoom-chart .zoom-chart .listbtnact').height() > 51){ 
          $('#modal-zoom-chart .zoom-chart .listbtnact').css({'max-height': 51, 'overflow-y': 'auto'});   
      }
    },
    convertDateLineAreaChart: function(date, typeChart) {
      var dateTmp = date;
      switch ( this.type ) {
        case "true":
            var date1 = dateTmp.split("-");
            switch ( parseInt(date1[1]) ) {
              case 1:
                // dateTmp = date1[0] + "-03";
                break;
              case 2:
                // dateTmp = date1[0] + "-06";
                break;
              case 3:
                // dateTmp = date1[0] + "-09";
                break;
              case 4:
                // dateTmp = date1[0] + "-12";
                break;
            };
            if ( dateTmp ) {
              dateTmp += "-" + App.util.date.getDaysInMonth(dateTmp, "YYYY-MM");
            }
          break;
        case "fall":
          dateTmp = dateTmp + "-01";
          break;
      };
      return dateTmp;
    },
    showOptions: function(e){
      var _this = $(e.currentTarget);
      var index = _this.parent().parent().parent().parent().index();
      var className = $(_this).parent().parent().attr("class");
      var chartId = _this.data("id");
      var chartType = $('#' + chartId).children().children().attr('class');
      var h_percent = $('#PercentChart').height();
      $('#' +chartId+ ' .comparePieDonut').hide();
      if ( $(".popup_chart_options").length > 0 ) {
        var classNamePopup = $(".popup_chart_options").parent().attr("class");
        var idPopup = $(".popup_chart_options").parent().parent().attr("id");
        this.fadeInChart(classNamePopup, idPopup);       
      }
      var popupSelect = document.getElementById('select_chart_board');
      var oldId = $(popupSelect).parents().eq(3).attr('id');
      $('#' + oldId).children().children().css({'opacity': 1});
      $('.popup_chart_options').remove();
    
      if ( App.appModel.getLanguage() === "ja" ) {
        $(_this).parent().parent().parent().prepend('<div class="popup_chart_options"><button class="close_options"><i class="fa fa-times" aria-hidden="true"></i></button><div class="listicon"><ul data-id='+chartId+' class="select_action_chart"><li class="compareChart"><button><i class="fa fa-random" aria-hidden="true"></i></button><p>期間で比較</p></li><li class="downloadcsv"><button><i class="fa fa-file-excel-o" aria-hidden="true"></i></button><p>CSV出力</p></li><li><button id="select_chart"><i class="fa fa-pie-chart" aria-hidden="true"></i></button><p>グラフ変換</p></li><li class="download_image"><button><i class="fa fa-camera" aria-hidden="true"></i></button><p>画像出力</p></li><li class="fullWidthChart"><button><i class="fa fa-area-chart" aria-hidden="true"></i></button><p>Full width Chart</p></li></ul><ul id="select_chart_board" data-id='+chartId+'><li><button class="select_bar"><i class="fa fa-bar-chart" aria-hidden="true"></i></button><p>棒グラフ</p></li><li><button class="select_line"><i class="fa fa-line-chart" aria-hidden="true"></i></button><p>折れ線グラフ</p></li><li><button class="select_pie"><i class="fa fa-pie-chart" aria-hidden="true"></i></button><p>円グラフ</p></li><li><button class="select_donut"><i class="fa fa-dot-circle-o" aria-hidden="true"></i></button><p>ドーナツグラフ</p></li><li><button class="select_table"><i class="fa fa-table" aria-hidden="true"></i></button><p>表形式</p></li></ul></div></div>');
      } else {
        $(_this).parent().parent().parent().prepend('<div class="popup_chart_options"><button class="close_options"><i class="fa fa-times" aria-hidden="true"></i></button><div class="listicon"><ul data-id='+chartId+' class="select_action_chart"> <li class="compareChart"><button><i class="fa fa-random" aria-hidden="true"></i></button><p>Compare Chart</p></li><li class="downloadcsv"><button><i class="fa fa-file-excel-o" aria-hidden="true"></i></button><p>Download CSV</p></li><li><button id="select_chart"><i class="fa fa-pie-chart" aria-hidden="true"></i></button><p>Chart conversion</p></li><li class="download_image"><button><i class="fa fa-camera" aria-hidden="true"></i></button><p>Take Screenshot</p></li><li class="fullWidthChart"><button><i class="fa fa-area-chart" aria-hidden="true"></i></button><p>Full width Chart</p></li></ul><ul id="select_chart_board" data-id='+chartId+'><li><button class="select_bar"><i class="fa fa-bar-chart" aria-hidden="true"></i></button><p>Bar Chart</p></li><li><button class="select_line"><i class="fa fa-line-chart" aria-hidden="true"></i></button><p>Line Chart</p></li><li><button class="select_pie"><i class="fa fa-pie-chart" aria-hidden="true"></i></button><p>Pie Chart</p></li><li><button class="select_donut"><i class="fa fa-dot-circle-o" aria-hidden="true"></i></button><p>Donut Chart</p></li><li><button class="select_table"><i class="fa fa-table" aria-hidden="true"></i></button><p>Data Chart</p></li></ul></div></div>');
      }
      if ( chartId === 'PercentChart') {
        $('#PercentChart .percent_chart_board .popup_chart_options').css({'height': h_percent});
        $('#PercentChart').css({'height': h_percent});
        }
      if ( App.appModel.getLanguage() === "ja" ) {
        if ( $('#' + chartId).hasClass('full_chart') ){
          $('#' + chartId + " .fullWidthChart p").text('半幅に変更');
        } else {
          $('#' + chartId + " .fullWidthChart p").text('全幅に変更');
        }
      } else {
        if ( $('#' + chartId).hasClass('full_chart') ){
          $('#' + chartId + " .fullWidthChart p").text('Half width chart');
        } else {
          $('#' + chartId + " .fullWidthChart p").text('Full width chart');
        }
      }
      $( ".popup_chart_options" ).fadeIn("slow");

      switch ( className ) {
        case "column-inner":          
          $("#" + chartId + " .column-inner").css({"opacity": 0});
          break;
        case "donut-inner":
          $("#" + chartId + " .donut-inner").css({"opacity": 0});
          break;
        case "pie-inner":
          $("#" + chartId + " .pie-inner").css({"opacity": 0});
          break;
        case "area-inner":
          $("#" + chartId + " .area-inner").css({"opacity": 0});
          break;
        case "line-inner":
          $("#" + chartId + " .line-inner").css({"opacity": 0});
          break;
          case "table-inner":
          $("#" + chartId + " .table-inner").css({"opacity": 0});
          break;
          case "percent-inner":
          $("#" + chartId + " .line-inner").css({"opacity": 0});
          break;
          case "data-inner":
          $("#" + chartId + " .data-inner").css({"opacity": 0});
          break;
      };
      var popupWidth = $('.select_action_chart').width();
      $('.select_action_chart').css({'margin-left': -popupWidth/2});

    },
    closeOptions:function(e){
      var _this = $(e.currentTarget);
      var className = $(_this).parent().next().attr("class");
      var chartId = $(_this).parent().parent().parent().attr("id");
      $('#' + chartId + ' .popup_chart_options').remove();
      $('#' + chartId + ' .comparePieDonut').show();
      $(_this).parent().remove();

      this.fadeInChart(className, chartId);
    },
     fadeInChart: function(className, chartId) {
      switch ( className ) {
        case "column-inner":
          $("#" + chartId + " .column-inner").fadeIn("slow").css({"opacity": 1});
          break;
        case "donut-inner":
          $("#" + chartId + " .donut-inner").fadeIn("slow").css({"opacity": 1});
          break;
        case "pie-inner":
          $("#" + chartId + " .pie-inner").fadeIn("slow").css({"opacity": 1});
          break;
        case "area-inner":
          $("#" + chartId + " .area-inner").fadeIn("slow").css({"opacity": 1});
          break;
        case "line-inner":
          $("#" + chartId + " .line-inner").fadeIn("slow").css({"opacity": 1});
          break;
        case "table-inner":
          $("#" + chartId + " .table-inner").fadeIn("slow").css({"opacity": 1});
          break;
        case "percent-inner":
          $("#" + chartId + " .percent-inner").fadeIn("slow").css({"opacity": 1});
          break;
          case "data-inner":
          $("#" + chartId + " .data-inner").fadeIn("slow").css({"opacity": 1});
          break;
      };
    },
    downloadCSVDetail: function(e){
      this.setDate(0);
      var seft = $(e.currentTarget);
      var chartIdParam = $(seft).parent().parent().find('.zoom-chart-next').attr('data-id');
      var chartName = this.chartCollection.get(chartIdParam).get('name');
      this.chartModel.exportDetailChart({ typeParam: this.type, chartName: chartName, chartIdParam: chartIdParam, fromDate: this.fromDate, endDate: this.endDate});
    },
    selectOptionChart: function(e) {
      this.setDate(0);
      var seft = $(e.currentTarget);
      var chartIdParam = seft.parent().attr("data-id");
      var chartName = this.chartCollection.get(chartIdParam).get('name');
      this.chartModel.exportDetailChart({ typeParam: this.type, chartName: chartName, chartIdParam: chartIdParam, fromDate: this.fromDate, endDate: this.endDate});
    },
    showChartZoom:function(parentChartId,chartData,segment,segmentInfo){
          var _this = this;
          var chartType = AppConf.overridedChartType[parentChartId].toLowerCase();   
          var chartId = parentChartId;
          var isSegmentChart = segment;
          var charTitle = $("#" + chartId + ' h1 span').text();          
          $('#modal-zoom-chart .modal-zoom').removeClass('draggable');
          $('#' + chartId + ' .donut_chart svg .arc path').attr('class', '');
          $(".zoom-chart").html("");
          var chartTypeCheck = $('#' + chartId).children().children().attr('class');
          switch(chartTypeCheck){
            case 'column-inner':
              $('#modal-zoom-chart').addClass('barchart');
            break;
            case 'line-inner':
              $('#modal-zoom-chart').addClass('linechart');
            break;
            case 'pie-inner':
              $('#modal-zoom-chart').addClass('piechart');
            break;
            case 'donut-inner':
              $('#modal-zoom-chart').addClass('donutchart');
            break;
            case 'data-inner':
              $('#modal-zoom-chart').addClass('datachart');
            break;
          }
          
          $("#modal-zoom-chart").show();
          if ( ( this.type == 'date' && App.util.date.isToday(this.date) ) || ( this.type == 'week' && App.util.date.isThisWeek(this.date) ) || ( this.type == 'month' && App.util.date.isThisMonth(this.date) ) || ( this.type == 'quarter' && App.util.date.isThisQuarter(this.date) ) || ( this.type == 'year' && App.util.date.isThisYear(this.date) ) ) {
              $(".zoom-chart-next").addClass("disable");
          } else {
            $(".zoom-chart-next").removeClass("disable");
          }

         if(this.chartMergeTmp[chartId].count>0){
             $(".zoom-chart-next").addClass("disable");
            $(".zoom-chart-prev").addClass("disable");
          }else{
             $(".zoom-chart-prev").removeClass("disable");
          }

          var getIndex = function(models) {
            return models.id == chartId;
          };

          var index = this.chartCollection.models.findIndex(getIndex);
          var nextBtn = (this.chartCollection.models[index+1]) ? this.chartCollection.models[index+1] : this.chartCollection.models[0];
          var prevBtn = (this.chartCollection.models[index-1]) ? this.chartCollection.models[index-1] : this.chartCollection.models[this.chartCollection.models.length-1];
          $(".zoom-chart-next").attr("data-id" , chartId );
          $(".zoom-chart-prev").attr("data-id" , chartId );
          var chartTypeTitle;
          switch(this.type){
            case 'date':
            chartTypeTitle = '今日';
            break;
            case 'week':
            chartTypeTitle = '週間'; 
            break;
            case 'month':
            chartTypeTitle = '月間'; 
            break;
            case 'quarter':
            chartTypeTitle = '四半期'; 
            break;
            case 'year':
            chartTypeTitle = '年間'; 
            break;
          }
          $('#modal-zoom-chart .modal-zoom .chart_time').html(this.type + ': <span>' + this.fromDate + '</span> - <span>' + this.endDate+ '</span>');  
          
          switch ( chartType ) {
            case "barchart":              
              this.generateGroupedBarChart({data: chartData, chartId: "modal-zoom-chart", segment: isSegmentChart, segmentInfo: segmentInfo});
              $(".modal-zoom h3").html(charTitle);
              break;
            case "donuschart":
              this.generateDonutPieChart({data: chartData, chartId: "modal-zoom-chart", typeGenerate: "donut", segment: isSegmentChart, segmentInfo: segmentInfo});
              $(".modal-zoom h3").html(charTitle);
              break;
            case "piechart":
              this.generateDonutPieChart({data: chartData, chartId: "modal-zoom-chart", typeGenerate: "pie", segment: isSegmentChart, segmentInfo: segmentInfo});
              $(".modal-zoom h3").html(charTitle);
              break;
            case "areachart":
              this.generateAreaChart({data: jquery.parseJSON(chartData[0].data), chartId: "modal-zoom-chart"});
              $(".modal-zoom h3").html(charTitle);
              break;
            case "linechart":
              var titleArr = [];
              for ( var i = 0; i < chartData.length; i++ ) {
                titleArr.push(chartData[i].name);
              }
              // _this.generateLineChart({data1: jquery.parseJSON(chartData[0].data), data2: jquery.parseJSON(chartData[1].data), titleArr: titleArr, chartId: "modal-zoom-chart"});
              this.generateLineChart({data: chartData, titleArr: titleArr, chartId: "modal-zoom-chart"});
              $(".modal-zoom h3").html(charTitle);          
              break;
            case "tablechart":
              this.generateTableChart({data: chartData, chartId: "modal-zoom-chart"});
              $("#modal-zoom-chart .container-ispinner").remove();
              $(".modal-zoom h3").html(charTitle);
              
              $('#modal-zoom-chart .table_board').bind('scroll', function(){
                  var triggerPoint = 55;
                  if(this.scrollTop + this.clientHeight + triggerPoint > this.scrollHeight){
                    var currentPage = $('#modal-zoom-chart .table_board').attr('data-page');
                    var isZoomChart = true;
                    if( currentPage != ''){
                      $("#modal-zoom-chart .table_board").attr('data-page','')
                      $("#modal-zoom-chart").attr('data-page','').append('<div class="container-ispinner"><div class="ispinner ispinner--gray ispinner--animating"><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div></div></div>');
                      _this.renderChartDetail(_this.type,chartId,_this.fromDate,_this.endDate,50,currentPage,isZoomChart);
                    }
                  }
              });
              break;
            case "percentchart":
              this.generatePercentChart({data: chartData, chartId: "modal-zoom-chart"});
              $("#" + chartId + " .container-ispinner").remove();
              $(".modal-zoom h3").html(charTitle);
              break;
            case "datachart":
              this.generateDataChart({data: chartData, chartId: "modal-zoom-chart"});
              $("#modal-zoom-chart .container-ispinner").remove(); 
              $(".modal-zoom h3").html(charTitle);            
              $('#modal-zoom-chart .data_board').bind('scroll', function(){
                  var triggerPoint = 50;
                  if(this.scrollTop + this.clientHeight + triggerPoint > this.scrollHeight){
                    var currentPage = $('#modal-zoom-chart .data_board').attr('data-page');
                    var isZoomChart = true;
                    if( currentPage != ''){
                      $("#modal-zoom-chart .data_board").attr('data-page','')
                      $("#modal-zoom-chart").attr('data-page','').append('<div class="container-ispinner"><div class="ispinner ispinner--gray ispinner--animating"><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div></div></div>');
                      _this.renderChartDetail(_this.type,chartId,_this.fromDate,_this.endDate,50,currentPage,isZoomChart);
                      
                    }

                  }
              });
              break;
            default:
              errorData.push(model.get("chartType"));
              break;
          };
          var popupHeight = $('#modal-zoom-chart .modal-zoom').height();
          $('#modal-zoom-chart .modal-zoom').css({'margin-top': - popupHeight/2});

    },

    showPopupChartDetail: function(e){
      var seft = $(e.currentTarget);
      var chartIdParam = seft.attr("data-id");
      this.showChartZoom(chartIdParam,AppConf.cacheChartData[chartIdParam],AppConf.cacheSegment[chartIdParam],AppConf.cacheSegmentInfo[chartIdParam]);
      $('.chart_toolbar').show();
      if( $('#' + chartIdParam).children().children().attr('class') === 'column-inner' ){
        $('#modal-zoom-chart .modal-zoom').append("<div class='tooltipBarChart'><p class='titlename_col'></p><p class='value_col'></p></div>");
      }
    },
    handleChartPre: function(e) {
      $(".zoom-chart-next").removeClass("disable");
      var _this = this;
      var number = 1;
      this.setDate(-number);      
       App.util.showProgressScreen();
       var chartIdParam =  $(".zoom-chart-next").attr("data-id");

       this.chartModel.fetchDetailChart( { typeParam: this.type, chartIdParam: chartIdParam, fromDate: this.fromDate, endDate: this.endDate, perPage: 50, curPageParam: 1 } )
        .done(function(data) {
          var chartData = data.chartData;
          var segment = data.isSegmentChart;
          var segmentInfo = data.segmentInfo;               
          _this.showChartZoom(chartIdParam,chartData,segment,segmentInfo);
           App.util.hideProgressScreen();
        });
    },
    handleChartNext: function(e) {
      var _this = this;
      var number = 1;
      this.setDate(+number);
      App.util.showProgressScreen();
      var chartIdParam =  $(".zoom-chart-next").attr("data-id");
      this.chartModel.fetchDetailChart( { typeParam: this.type, chartIdParam: chartIdParam, fromDate: this.fromDate, endDate: this.endDate, perPage: 50, curPageParam: 1 } )
        .done(function(data) {
          var chartData = data.chartData;
          var segment = data.isSegmentChart;
          var segmentInfo = data.segmentInfo;
          _this.showChartZoom(chartIdParam,chartData,segment,segmentInfo);

           App.util.hideProgressScreen();

        });
    },
    setDate: function(number) {
        if ( !this.date ) {
            this.date = new Date();
        }
        switch ( this.type ) {
            case "date":
                this.date = App.util.date.setDate(this.date,"day", number)._d;
                this.fromDate = App.util.date.getToday(this.date, "YYYY-MM-DD");
                this.endDate = App.util.date.getToday(this.date, "YYYY-MM-DD");
                // if(App.util.date.isThisWeek(this.endDate)){
                //   var today = new Date();
                //   this.endDate = App.util.date.formatDate(today,"YYYY-MM-DD");
                // } 
                break;
            case "week":
                this.date = App.util.date.setDate(this.date,"week", number)._d;
                this.fromDate = App.util.date.getStartWeek(this.date, "YYYY-MM-DD");
                this.endDate = App.util.date.getEndWeek(this.date, "YYYY-MM-DD");
                if(App.util.date.isThisWeek(this.endDate)){
                  var today = new Date();
                  this.endDate = App.util.date.formatDate(today,"YYYY-MM-DD");
                } 
                break;
            case "month":
                this.date = App.util.date.setDate(this.date,"month", number)._d;
                this.fromDate = App.util.date.getStartMonth( this.date, "YYYY-MM-DD" );
                this.endDate  = App.util.date.getEndMonth( this.date, "YYYY-MM-DD" );
                if(App.util.date.isThisMonth(this.endDate)){
                  var today = new Date();
                  this.endDate = App.util.date.formatDate(today,"YYYY-MM-DD");
                } 
                break;
            case "year":
                this.date = App.util.date.setDate(this.date,"year", number)._d;
                this.fromDate = App.util.date.getStartYear( this.date, "YYYY-MM-DD" );
                this.endDate  = App.util.date.getEndYear( this.date, "YYYY-MM-DD" );
                if(App.util.date.isThisYear(this.endDate)){
                  var today = new Date();
                  this.endDate = App.util.date.formatDate(today,"YYYY-MM-DD");
                } 
                break;
            case "quarter":
              this.date = App.util.date.setDate(this.date,"quarter", number)._d;
              this.endDate = App.util.date.getEndQuarter(this.date, "YYYY-MM-DD" );
              this.fromDate = App.util.date.getStartQuarter(this.date, "YYYY-MM-DD" );
              if(App.util.date.isThisQuarter(this.endDate)){
                var today = new Date();
                this.endDate = App.util.date.formatDate(today,"YYYY-MM-DD");
              }
        };
    },
    showPopupChartSelect: function(){
        var _this = this;
        $('#modal-zoom-chart').hide();
        $('#select_date').show();
        var disabledDates =[];
        if(this.type === 'week'){
          $('#select_date').attr('class', 'week');
          $('#select_date .picker_date li').removeClass('disabled_date');
          $('#select_date .inner_content').prepend("<p class='detailDate'>比較する期間 (<span></span><span></span>)</p>"); 
        } else if (this.type === 'quarter'){
          $('#select_date').attr('class', 'quarter');
          $('#select_date .picker_date li').removeClass('disabled_date');
          $('#select_date .inner_content').prepend("<p class='detailDate'>比較する期間 (<span></span><span></span>)</p>"); 
        } else {
          $('#select_date').attr('class', '');
        }
        $('#select_date h1').text('日付を選択');
        $('.select_content .title_date').empty();
        $('.select_content .title_date').append("<input class='select_date_content' id='select_to_date' readonly='true' />");
        $('.select_content .confirm_select_compare button').removeClass('confirm_compare').addClass('select_date_confirm');
        var parentChartId = $('#modal-zoom-chart .zoom-chart-prev').attr('data-id');
        var today = new Date();
        var maxDate,format;
        $('#select_date .select_date_confirm').attr('chartId',parentChartId);
        if(this.type === 'date'){

          maxDate = App.util.date.getToday(today, "YYYY-MM-DD");
          format = "YYYY-MM-DD";
          $('#select_date').addClass('date');
        } else if(this.type === 'month'){

          format = "YYYY-MM";
          maxDate = App.util.date.getStartMonth(today, "YYYY-MM");
          $('#select_date').addClass('month');
        } else if (this.type === 'year'){

          maxDate = App.util.date.getStartMonth(today, "YYYY");
          format = "YYYY";
          $('#select_date').addClass('year');
        } else if (this.type === 'week'){

          maxDate = App.util.date.getStartWeek(today, "YYYY-MM-DD");
          format = 'YYYY-MM-DD';
          $('#select_date').addClass('week');
        } else if (this.type === 'quarter'){
          maxDate = App.util.date.getStartQuarter(today, "YYYY-MM-DD");
          format = 'YYYY-MM-DD';
          $('#select_date').addClass('quarter');
        }

        if(this.setDateArr[parentChartId]==undefined){
          this.setDateArr[parentChartId] = [];
        }
        if(maxDate!=undefined){
          this.setDateArr[parentChartId].push(maxDate);
          disabledDates = this.setDateArr[parentChartId];
        }
        var defaultValue = this.getDefaultDateSelect(parentChartId);
        disabledDates = disabledDates.concat(this.setDateArr[parentChartId]);
        $('#select_to_date').val(defaultValue);
        this.loadDateRange();

        $('#select_to_date').datetimepicker({
          format: format,
          ignoreReadonly: true,
          maxDate: maxDate,
          debug: false,
          useCurrent: false,
          disabledDates: disabledDates
        });
        
        var popup_height = $('.select_content').height();
        $('.select_content').css({'margin-top': -popup_height/2 + 'px'});
    },
    fetchChartDetailSelect: function(){
      var _this = this;
      var getDate = $('.select_date_content').val();
      switch(this.type){
        case 'date':
          this.fromDate = getDate;
          this.endDate = getDate; 
        break;
        case 'month':
          this.fromDate = App.util.date.getStartMonth(getDate, "YYYY-MM-DD"); 
          this.endDate = App.util.date.getEndMonth(getDate, "YYYY-MM-DD"); 
        break;
        case 'year':
          this.fromDate = App.util.date.getStartYear(getDate, "YYYY-MM-DD"); 
          this.endDate = App.util.date.getEndYear(getDate, "YYYY-MM-DD"); 
        break;
        case 'week':
          this.fromDate = App.util.date.getStartWeek(getDate, "YYYY-MM-DD");
          this.endDate = App.util.date.getEndWeek(getDate, "YYYY-MM-DD");
        break;
        case 'quarter':
          this.endDate = App.util.date.getEndQuarter(getDate, "YYYY-MM-DD" );
          this.fromDate = App.util.date.getStartQuarter(getDate, "YYYY-MM-DD" );
        break;
      }
      this.date = this.fromDate;
      var chartIdParam = $('#modal-zoom-chart .zoom-chart-prev').attr('data-id');
      this.setDateArr[chartIdParam] = [];
      this.setDateArr[chartIdParam].push(getDate);  
      this.chartModel.fetchDetailChart( { typeParam: this.type, chartIdParam: chartIdParam, fromDate: this.fromDate, endDate: this.endDate, perPage: 50, curPageParam: 1 } )
      .done(function(data) {
        var chartData = data.chartData;
        var segment = data.isSegmentChart;
        var segmentInfo = data.segmentInfo;               
        _this.showChartZoom(chartIdParam,chartData,segment,segmentInfo);
         App.util.hideProgressScreen();
         $('#select_date').hide();
         $('#select_date .detailDate').remove();
      });
    },
    getStartEndDate: function(date) {
        var result = {};
        switch ( this.type ) {
            case "date":
                var fromDate = App.util.date.getToday(date, "YYYY-MM-DD");
                var endDate = App.util.date.getToday(date, "YYYY-MM-DD");
                result.fromDate = fromDate;
                result.endDate = endDate;
                break;
            case "week":
                var fromDate = App.util.date.getStartWeek(date, "YYYY-MM-DD");
                var endDate = App.util.date.getEndWeek(date, "YYYY-MM-DD");
                if(App.util.date.isThisWeek(endDate)){
                  var today = new Date();
                  endDate = App.util.date.formatDate(today,"YYYY-MM-DD");
                } 
                result.fromDate = fromDate;
                result.endDate = endDate;
                break;
            case "month":
                var fromDate = App.util.date.getStartMonth( date, "YYYY-MM-DD" );
                var endDate  = App.util.date.getEndMonth( date, "YYYY-MM-DD" );
                if(App.util.date.isThisMonth(endDate)){
                  var today = new Date();
                  endDate = App.util.date.formatDate(today,"YYYY-MM-DD");
                } 
                result.fromDate = fromDate;
                result.endDate = endDate;
                break;
            case "year":
                var fromDate = App.util.date.getStartYear( date, "YYYY-MM-DD" );
                var endDate  = App.util.date.getEndYear( date, "YYYY-MM-DD" );
                if(App.util.date.isThisYear(endDate)){
                  var today = new Date();
                  endDate = App.util.date.formatDate(today,"YYYY-MM-DD");
                } 

                result.fromDate = fromDate;
                result.endDate = endDate;
                break;
            case "quarter":
              var endDate = App.util.date.getEndQuarter(date, "YYYY-MM-DD" );
              var fromDate = App.util.date.getStartQuarter(date, "YYYY-MM-DD" );
              if(App.util.date.isThisQuarter(endDate)){
                var today = new Date();
                endDate = App.util.date.formatDate(today,"YYYY-MM-DD");
              }
              result.fromDate = fromDate;
              result.endDate = endDate;
               break;
        };
        return result;
    },
     getLabel: function(date,type) {
        var result;
        switch ( this.type ) {
            case "date":
                 if(App.util.date.isToday(date)){
                    if ( App.appModel.getLanguage() === "ja" ) {
                       result = "本日";
               
                    }else{
                       result = "today";

                    }
                  }else{
                      result = App.util.date.formatDate(date,"YYYY-MM-DD");

                  }
                break;
            case "week":
                  if(App.util.date.isThisWeek(date)){
                      if ( App.appModel.getLanguage() === "ja" ) {
                        result = "今週";
          
                      }else{
                        result = "this week";

                      }
                  }else{
                      result = App.util.date.formatDate(date,"YYYY-W")+"w";

                  }
                  break;
            case "month":
                  if(App.util.date.isThisMonth(date)){
                      if ( App.appModel.getLanguage() === "ja" ) {
                        result = "今月";
                   
                      }else{
                       result = "this month";

                      }
                  }else{
                      result = App.util.date.formatDate(date,"YYYY-MM");

                  }
                  break;
            case "year":
                  if(App.util.date.isThisYear(date)){
                    if ( App.appModel.getLanguage() === "ja" ) {
                       result = "今年";

                    }else{
                       result = "this year";

                    }
                  }else{
                      result = App.util.date.formatDate(date,"YYYY");

                  }
                  break;
            case "quarter":
                  if(App.util.date.isThisQuarter(date)){
                    if ( App.appModel.getLanguage() === "ja" ) {
                       result = "今四半期";
                    }else{
                      result = "this quarter";
                    }
                  }else{
                      result = App.util.date.formatDate(date,"YYYY-Q")+"Q";

                  }
                  break;
               break;
        };
        return result;
     },
    closePopupChartDetail: function() {
        this.date = new Date();
        this.setDate();
        var chartId = $('#modal-zoom-chart .zoom-chart-prev').attr('data-id');
        $("#modal-zoom-chart #select_chart_board_detail").remove();
        $('#modal-zoom-chart').attr('class', '');
        $('.zoom-chart').css({'opacity': 1, 'visibility': 'visible'});
        $(".zoom-chart").html("");
        $("#modal-zoom-chart").hide();
        $("#modal-zoom-chart .xaxis_listname").remove();
        if( !$('#' + chartId).hasClass('comparing') ){
          $('#' + chartId + ' .refresh_chart').click();
        }
        if(this.isRefresh){
          this.renderChartList();
          this.isRefresh = false;
        }
        $('#modal-zoom-chart .modal-zoom .tooltipBarChart').remove();
        $('#modal-zoom-chart .modal-zoom .unit').remove();
        $('#select_date .picker_date').remove();
        $('#select_date .detailDate').remove();
        // $('#select_date').attr('class', '');
    },
    closePopupSelectDate: function(e){
      var seft = $(e.currentTarget);
      var chartId = $(seft).parent().find('.confirm_compare').attr('chartid');
      if( $('#select_date input').hasClass('select_date_content') ){
        $("#modal-zoom-chart").show();
        $("#select_date").hide();
      } else {
        $("#select_date").hide();
        $('#' + chartId).children().children().css({'opacity': 1});
      }
    },
    showLineSelect:function(e){
      var _this = $(e.currentTarget);
      var chartId = $(_this).data("chart-id");
      var index = $(_this).index();
      var indexChart = $(_this).index() + 1;      
      var className = $('#' + chartId + ' .line_chart_board .listbtnact button:nth-child(' + indexChart + ')').attr('class');
      $("#" + chartId + " .mouse-line, .mouse-box, .mouse-per-line").css({"opacity": 0});
      var text = $('#' + chartId + ' svg .mouse-over-effects g:eq(' + index + ') text tspan').text();
      if(className === 'hider')
      {
          $('#' + chartId + ' .line_chart_board .listbtnact button:nth-child(' + indexChart + ')').attr('class', '');
          $('#' + chartId + ' .seg:nth-child(' + indexChart + ')').show();
          $('#' + chartId + ' .mouse-over-effects').show();
      }
      else
      {   
          $('#' + chartId + ' .line_chart_board .listbtnact button:nth-child(' + indexChart + ')').attr('class', 'hider');
          $('#' + chartId + ' .mouse-over-effects').show();
          $('#' + chartId + ' .line_chart_board .viewall').show();
          $('#' + chartId + ' .seg:nth-child(' + indexChart + ')').hide();
      }
    },
    viewAllBarChart: function(e){
      var _this = $(e.currentTarget);
      var chartId = $(_this).data("chart-id");
      if(chartId === 'modal-zoom-chart'){
          $('#modal-zoom-chart svg .category').show();
          $('#modal-zoom-chart .list_legend.column button').removeClass('hider');
      } else {
          $('#' + chartId + ' svg .category').show();
          $('#' + chartId + ' .list_legend.column button').removeClass('hider');
      }

      $(_this).hide();
    },
    viewAllLineChart: function(e){
      var _this = $(e.currentTarget);
      var chartId = $(_this).data("chart-id");
      $('#' + chartId + ' .line_chart_board .listbtnact button').attr('class', '');
      $('#' + chartId + ' .mouse-over-effects').show();
      $('#' + chartId + ' .mouse-line').show();
      $('#' + chartId + ' .seg').show();
      $(_this).hide();
    },
    viewAllPieChart: function(e){
      var _this = $(e.currentTarget);
      var chartId = $(_this).data("chart-id");
      $('#' + chartId + ' .pie_chart_board .listbtnact button').attr('class', '');
      $(_this).hide();
    },
    viewAllDonutChart: function(e){
      var _this = $(e.currentTarget);
      var chartId = $(_this).data("chart-id");
      $('#' + chartId + ' .donut_chart_board .arc').show();
      $('#' + chartId + ' .donut_chart_board .listbtnact button').attr('class', '');
      $(_this).hide();
    },
    menuActive: function(e) {
      var _this = $(e.currentTarget);
      $("#chart_board").html("");
      $("#chart_board").scrollTop(0);
      $(".main_screen .topbar .leftbar li").removeClass("active");
      _this.addClass("active");
      var liIndex = $('.main_screen .topbar .leftbar li.active').index();
      switch(liIndex){
        case 0:
          this.type='date';
          break;
        case 1:
          this.type='week';
          break;
        case 2:
            this.type='month';
            break;
        case 3:
            this.type='quarter';
            break;
        case 4:
            this.type='year';
            break;
      };      
      this.fetchChartList();
    },
    generateEmptyLayout: function() {
      var message = App.appModel.getLanguageType().dashboard.main.noRecord;
      $("#chart_board").html('<div class="listchart"><div class="error_chart"><div class="nodataicn"><p>' + message + '</p></div></div>');
    },
    showProgress: function(){
      var container = $('.box_style').length;
      for(var i = 1; i <= container; i++) {
        $('.listchart .box_style:nth-child(' + i + ')').append('<div class="container-ispinner"><div class="ispinner ispinner--gray ispinner--animating"><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div></div></div>');
      }      
    },
    setNoDataChart: function(element){
      var chartId = element.chartId;
      var chartType = element.chartType;
      var error;
      if ( App.appModel.getLanguage() === "ja" ) {
        error = "データが存在しません";
      } else {
        error = "Data Not Found";
      }
      switch(chartType){
        case 'BarChart':
          $('#' + chartId + ' #chartColumn').empty();
          $('#' + chartId + ' #chartColumn').append("<p class='emptyText'>"+error+"</p>");
        break;
        case 'DonutChart':
        case 'PieChart':
          $('#' + chartId + ' .box_area .donut_chart').empty();
          $('#' + chartId + ' .box_area').append("<p class='emptyText'>"+error+"</p>");
        break;
        case 'LineChart':
          $('#' + chartId + ' #chartLine').empty();
          $('#' + chartId + ' #chartLine').append("<p class='emptyText'>"+error+"</p>");
        break;
        case 'DataChart':
          $('#' + chartId + ' .title_board .emptyText').remove();
          $('#' + chartId + ' .data_board').empty();
          $('#' + chartId + ' .title_board #title_list').css({'border-bottom': '0 none'});
          $('#' + chartId + ' .title_board').append("<p class='emptyText'>"+error+"</p>");
        break;
        }
        $('#' + chartId + ' h1 .show_options').remove();
        $('#' + chartId + ' h1 .refresh_chart').css({'right': 0});
        if ( chartId == "modal-zoom-chart" ) {
          $('#modal-zoom-chart  .zoom-chart .box_area .emptyText').remove();
          $('#modal-zoom-chart  .zoom-chart').append("<p class='emptyText'>"+error+"</p>");
        }

        
      return error;
    },
    setEmptyChart: function(element, error) {
      var message = App.appModel.getLanguageType().dashboard.main.noRecord;
      if ( error === "error" ) {
        message = App.appModel.getLanguageType().dashboard.main.errorMsg.getMainMsgErr1;
      }
      var chartId = element.split(" ")[0];
      var chartType = element.split(" ")[1];
      switch ( chartType ) {
        case ".donut_chart_board":
        case ".pie_chart_board":
          $(element + " .box_area").remove();
          break;
      };
      $(element).append('<span class="no_records">' + message + '</span>');
      $(element + " .show_options").hide();
      $(element + " .show_popup_detail").hide();
      $(chartId + " .container-ispinner").remove();
    },
    getWidthChart: function(element) {
      var w_chart = $(element).width();
      return w_chart;
    },
    showPopupSelectChart:function(e){
      var seft = $(e.currentTarget);
      $('.select_action_chart').css({'opacity': 0, 'visibility': 'hidden'});
      $('#select_chart_board').css({'opacity': 1, 'visibility': 'visible'});
      var parentChart = $(seft).parent().parent().parent().parent().next().attr('class');
      switch (parentChart) {
        case 'column-inner':
          $('#select_chart_board li:nth-child(1)').hide();
        break;
        case 'line-inner':
          $('#select_chart_board li:nth-child(2)').hide();
        break;
        case 'pie-inner':
          $('#select_chart_board li:nth-child(3)').hide();
        break;
        case 'donut-inner':
          $('#select_chart_board li:nth-child(4)').hide();
        break;
        case 'data-inner':
          $('#select_chart_board li:nth-child(5)').hide();
        break;
      }
    },
    changeTypeChartDetail: function(e){
      var seft = $(e.currentTarget);
      var chartId = $('.zoom-chart-next').attr('data-id');
      $('.zoom-chart').css({'visibility': 'hidden', 'opacity': 0});
      var chartId = seft.parents().eq(1).find('.zoom-chart-next').attr('data-id');
      var chartType = $('#modal-zoom-chart').attr('class');
      $('#select_chart_board_detail').remove();
      if ( App.appModel.getLanguage() === "ja" ) {
        $('.modal-zoom').append("<ul id='select_chart_board_detail' data-id="+chartId+"><li><button class='select_bar'><i class='fa fa-bar-chart' aria-hidden='true'></i></button><p>棒グラフ</p></li><li><button class='select_line'><i class='fa fa-line-chart' aria-hidden='true'></i></button><p>折れ線グラフ</p></li><li><button class='select_pie'><i class='fa fa-pie-chart' aria-hidden='true'></i></button><p>円グラフ</p></li><li><button class='select_donut'><i class='fa fa-dot-circle-o' aria-hidden='true'></i></button><p>ドーナツグラフ</p></li><li><button class='select_table'><i class='fa fa-table' aria-hidden='true'></i></button><p>表形式</p></li></ul>");
      } else {
        $('.modal-zoom').append("<ul id='select_chart_board_detail' data-id="+chartId+"><li><button class='select_bar'><i class='fa fa-bar-chart' aria-hidden='true'></i></button><p>Bar Chart</p></li><li><button class='select_line'><i class='fa fa-line-chart' aria-hidden='true'></i></button><p>Line Chart</p></li><li><button class='select_pie'><i class='fa fa-pie-chart' aria-hidden='true'></i></button><p>Pie Chart</p></li><li><button class='select_donut'><i class='fa fa-dot-circle-o' aria-hidden='true'></i></button><p>Donut Chart</p></li><li><button class='select_table'><i class='fa fa-table' aria-hidden='true'></i></button><p>Data Chart</p></li></ul>");
      }
      switch(chartType){
        case 'barchart':
          $('#select_chart_board_detail li:nth-child(1)').hide();
        break;
        case 'linechart':
          $('#select_chart_board_detail li:nth-child(2)').hide();
        break;
        case 'piechart':
          $('#select_chart_board_detail li:nth-child(3)').hide();
        break;
        case 'donutchart':
          $('#select_chart_board_detail li:nth-child(4)').hide();
        break;
        default:
          $('#select_chart_board_detail li:nth-child(5)').hide();
        break;
      }
      $('#modal-zoom-chart #select_chart_board_detail').css({'opacity': 1, 'visibility': 'visible'});
      $('.chart_toolbar').hide();
      $('#modal-zoom-chart .modal-zoom .unit').hide();
    },
    selectChartType:function(e){
      var _this = this;
      var seft = $(e.currentTarget);
      var chartIndex = $(seft).index();
      var parentChartId = $(seft).parent().attr("data-id");
      var chartChildId = $('#' + parentChartId).children().children().next().attr('class');
      var titleChart = $('#' + parentChartId + ' h1').text();
      var numPerPage = 50;
      var chartType;
      if (chartChildId === 'table-inner' || chartChildId === 'data-inner'){
        numPerPage = 50;        
      }
      switch (chartIndex) {
        case 0:
        AppConf.overridedChartType[parentChartId] = 'BarChart';
        chartType = 'BarChart';
        break;
        case 1:
         AppConf.overridedChartType[parentChartId] = 'LineChart';
         chartType = 'LineChart';
        break;
        case 2:
          AppConf.overridedChartType[parentChartId] = 'PieChart';
          chartType = 'PieChart';
        break;
        case 3:
          AppConf.overridedChartType[parentChartId] = 'DonusChart';
          chartType = 'DonusChart';
        break;
        case 4:
          AppConf.overridedChartType[parentChartId] = 'DataChart';
          chartType = 'DataChart';
        break;
      }
      App.btApi.saveUserDefine({
        chartId: parentChartId,
        fullWidthFlg: null,
        chartType:chartType,
        displayFlg: null
        }).done(function(res) {
          console.log('had change');
        }).fail(function(err) {
          alert('faild');
        });
       _this.showChart(parentChartId,AppConf.cacheChartData[parentChartId],AppConf.cacheSegment[parentChartId],
          AppConf.cacheSegmentInfo[parentChartId]);
    },

    showChart:function(parentChartId,chartData,segment,segmentInfo){
       var titleChart = $('#' + parentChartId + ' h1').text();
       var chartType = AppConf.overridedChartType[parentChartId];
        switch (chartType.toLowerCase()) {
          case 'barchart':
          $('#' + parentChartId).html("<div class='column_chart_board'><div class='column-inner'><h1></h1><div id='chartColumn'></div><div class='list_legend column'></div><p class='unit'></p></div></div>");
          $('#' + parentChartId + ' h1').append("<span>" + titleChart + "</span><button data-id='" +  parentChartId +"' class='show_options'><i class='fa fa-ellipsis-v' aria-hidden='true'></i></button><button data-id='" +  parentChartId +"' class='show_popup_detail'><i class='fa fa-search-plus' aria-hidden='true'></i></button><button class='refresh_chart'><i class='fa fa-refresh' aria-hidden='true'></i></button>");

          this.generateGroupedBarChart({chartId: parentChartId, data: chartData, segment: segment, segmentInfo:segmentInfo});
          break;
          case 'linechart':
          $('#' + parentChartId).html("<div class='line_chart_board'><div class='line-inner'><h1></h1><div class='box_area'><div id='chartLine'></div></div><div class='listbtnact'></div><p class='unit'></p></div></div>");
            $('#' + parentChartId + ' h1').append("<span>" + titleChart + "</span>" + "<button data-id='" +  parentChartId +"' class='show_options'><i class='fa fa-ellipsis-v' aria-hidden='true'></i></button><button data-id='" +  parentChartId +"' class='show_popup_detail'><i class='fa fa-search-plus' aria-hidden='true'></i></button><button class='refresh_chart'><i class='fa fa-refresh' aria-hidden='true'></i></button>");

            this.generateLineChart({chartId: parentChartId, data: chartData});
          break;
         case 'piechart':
          $('#' + parentChartId).html("<div class='pie_chart_board'><div class='pie-inner'><h1></h1><div class='box_area '></div><div class='listbtnact'></div></div></div>");
            $('#' + parentChartId + ' h1').append("<span>" + titleChart + "</span>"  + "<button data-id='" +  parentChartId +"' class='show_options'><i class='fa fa-ellipsis-v' aria-hidden='true'></i></button><button data-id='" +  parentChartId +"' class='show_popup_detail'><i class='fa fa-search-plus' aria-hidden='true'></i></button><button class='refresh_chart'><i class='fa fa-refresh' aria-hidden='true'></i></button>");

            this.generateDonutPieChart({chartId: parentChartId, data: chartData, typeGenerate: 'pie', segment: segment, segmentInfo:segmentInfo});
          break;
          case 'donuschart':
          $('#' + parentChartId).html("<div class='donut_chart_board'><div class='donut-inner'><h1></h1><div class='box_area '></div><div class='listbtnact'></div></div></div>");
            $('#' + parentChartId + ' h1').append("<span>" + titleChart + "</span>"  + "<button data-id='" +  parentChartId +"' class='show_options'><i class='fa fa-ellipsis-v' aria-hidden='true'></i></button><button data-id='" +  parentChartId +"' class='show_popup_detail'><i class='fa fa-search-plus' aria-hidden='true'></i></button><button class='refresh_chart'><i class='fa fa-refresh' aria-hidden='true'></i></button>");
            this.generateDonutPieChart({chartId: parentChartId, data: chartData, typeGenerate: 'donut', segmentInfo:segmentInfo, segment:segment});
          break;
          case 'datachart':
            $('#' + parentChartId).html("<div class='datachart_board'><div class='data-inner'><h1></h1><div class='title_board'><div id='title_list'></div></div><ul class='data_board box_message'></ul></div></div>");
            $('#' + parentChartId + ' h1').append("<span>" + titleChart + "</span>"  + "<button data-id='" +  parentChartId +"' class='show_options'><i class='fa fa-ellipsis-v' aria-hidden='true'></i></button><button data-id='" +  parentChartId +"' class='show_popup_detail'><i class='fa fa-search-plus' aria-hidden='true'></i></button><button class='refresh_chart'><i class='fa fa-refresh' aria-hidden='true'></i></button>");
            this.generateDataChart({chartId: parentChartId, data: chartData});
          break;
        }
    },

    compareChartDisplay:function(e){
    var seft = $(e.currentTarget);
    var _this = this;
    $('#select_date').show().attr('class', '').addClass(this.type);
    $('.popup_chart_options').remove();
    $('#select_date .inner_content .picker_date').remove();
    $('.title_date input').remove();
    $('.title_date').empty();
    $('.title_date').append("<p class='detailDate'>比較する期間 (<span></span><span></span>)</p><input class='to_date' id='compare_to_date' readonly='true'>");
    $('.select_content .confirm_select_compare button').removeClass('select_date_confirm').addClass('confirm_compare');
    var parentChartId = $(seft).parent().attr("data-id");
    var popup_height = $('.select_content').height();
    $('.select_content').css({'margin-top': -popup_height/2 + 'px'});
    $('.confirm_compare').attr("chartId",parentChartId);
    var format, minDate, maxDate;
    var disabledDates =[];
    var today = new Date();
    var n = today.getMonth()+1;
    var y = today.getFullYear();
    
    switch(this.type){
      case 'year':
        if ( App.appModel.getLanguage() === "ja" ) {
          $('#select_date .select_content h1').text('年を選択');
        } else {
          $('#select_date .select_content h1').text('Select Year');
        }        
        format = 'YYYY';
        maxDate = y.toString();
      break;
      case 'quarter':
      if ( App.appModel.getLanguage() === "ja" ) {
          $('#select_date .select_content h1').text('四半期を選択');
        } else {
          $('#select_date .select_content h1').text('Select Quarter');
        }
         maxDate = App.util.date.getStartQuarter(today, "YYYY-MM-DD");
         format = 'YYYY-MM-DD';
      break;
      case 'month':
        if ( App.appModel.getLanguage() === "ja" ) {
          $('#select_date .select_content h1').text('月を選択');
        } else {
          $('#select_date .select_content h1').text('Select Month');
        }
      format = 'YYYY-MM';
      maxDate = App.util.date.getStartMonth(today, "YYYY-MM");
      var month =  maxDate.split("-", 2)[1];
      var year = maxDate.split("-", 1);
      $('.detailDate span:first-child').text(maxDate);
      $('.detailDate span:first-child').text('');
      break;
      case 'week':
        if ( App.appModel.getLanguage() === "ja" ) {
          $('#select_date .select_content h1').text('週番号を選択');
        } else {
          $('#select_date .select_content h1').text('Select Week');
        }
      maxDate = App.util.date.getStartWeek(today, "YYYY-MM-DD");
      format = 'YYYY-MM-DD';

      
      break;
      case 'date':
        if ( App.appModel.getLanguage() === "ja" ) {
          $('#select_date .select_content h1').text('日付を選択');
        } else {
          $('#select_date .select_content h1').text('Select Date');
        }
        format = 'YYYY-MM-DD';
        minDate = false;
        maxDate = App.util.date.getToday(today-1, format);
        $('.detailDate span:first-child').text(maxDate);
        $('.detailDate span:first-child').text('');
      break;
      }

      if(this.setDateArr[parentChartId]==undefined){
          this.setDateArr[parentChartId] = [];
        }
        if(maxDate!=undefined){
          this.setDateArr[parentChartId].push(maxDate);  
          disabledDates = this.setDateArr[parentChartId];
        }
        var defaultValue = this.getDefaultDate(parentChartId);
        //disabledDates.push(defaultValue);
        disabledDates = disabledDates.concat(this.setDateArr[parentChartId]);
        $('#compare_to_date').val(defaultValue);
        this.loadDateRange();
    

      $('.to_date').datetimepicker({
        format: format,
        ignoreReadonly: true,
        minDate: minDate,
        maxDate: maxDate,
        disabledDates: disabledDates,
        debug: false,
        useCurrent: false
        }
      )
      .on('dp.update', function (ev) {
      var chartId = $('.confirm_compare').attr("chartId");
        switch(_this.type){
           case 'month':
            _this.checkMonth(chartId);
           break;
           case 'year':
           _this.checkYear(chartId);
           break;
        };
      })
      .on('dp.change', function (ev) {
           _this.loadDateRange();
      })
    },

    loadDateRange:function(){
      if( $('#select_date input').hasClass('to_date') ){
        inputVal = $('#compare_to_date').val();
      } else {
        inputVal = $('#select_to_date').val();
      }        
        var startDateChange, endDateChange;

          switch(this.type){
            case 'year':
            startDateChange = App.util.date.getStartYear(inputVal, "YYYY-MM-DD"); 
            endDateChange = App.util.date.getEndYear(inputVal, "YYYY-MM-DD"); 
            break;
            case 'month':
              startDateChange = App.util.date.getStartMonth(inputVal, "YYYY-MM-DD"); 
              endDateChange = App.util.date.getEndMonth(inputVal, "YYYY-MM-DD"); 
            break;
            case 'date':
              startDateChange = inputVal;
              endDateChange = inputVal;
            break;

            case 'quarter':
              startDateChange = App.util.date.getStartQuarter(inputVal, "YYYY-MM-DD"); 
              endDateChange = App.util.date.getEndQuarter(inputVal, "YYYY-MM-DD"); 
            break;

            case 'week':
              startDateChange = App.util.date.getStartWeek(inputVal, "YYYY-MM-DD"); 
              endDateChange = App.util.date.getEndWeek(inputVal, "YYYY-MM-DD"); 
            break;
          }
          $('.detailDate span:first-child').text(startDateChange);
          $('.detailDate span:last-child').text(' ~ ' + endDateChange);

    },

    showDateRange:function(e){
      var seft = $(e.currentTarget);
      var content = $(seft).text();
      var year = $('.selectYear b').text();
      var day = $('#compare_to_date').val();

      var d = new Date("Jan 01, "+year+" 01:00:00");
      var w = d.getTime() + 604800000 * (content-1);
      var n2 = new Date(w + 518400000);      
      maxDate = App.util.date.getStartWeek(n2, "YYYY-MM-DD");
      endDate = App.util.date.getEndWeek(n2, "YYYY-MM-DD");
      $('#compare_to_date').val(maxDate);
      $('.detailDate span:first-child').text(maxDate);
      $('.detailDate span:last-child').text(' ~ ' + endDate);  
      
      var dateSelect = [];
      if(this.type === 'week'){        
        content = App.util.date.getStartWeek(n2, "YYYY-MM-DD");
      }
    },
    nextYear: function(e){
      e.preventDefault();
      var seft = $(e.currentTargett);
      var year = $('.selectYear b').text();
      var result;
      result = parseInt(year) + 1;
      var chartId = $('.confirm_compare').attr("chartId");
      var yearCurrent = parseInt(new Date().getFullYear());
      if ( parseInt(result) >= parseInt(yearCurrent) ){
        $('#next_year').css({'pointer-events': 'none', 'cursor': 'default', 'color': '#ccc'});
        $('.selectYear b').text(yearCurrent);
      } else {
        $('#next_year').css({'pointer-events': 'auto', 'cursor': 'default', 'color': '#999'});
        $('.selectYear b').text(result);
      }
      switch(this.type){
        case 'quarter':
          $('.quarter .picker_date ul').empty();
          $('.quarter .picker_date ul').append("<li data-date='"+result+"-01-01'>Q1</li><li data-date='"+result+"-04-01'>Q2</li><li data-date='"+result+"-07-01'>Q3</li><li data-date='"+result+"-10-01'>Q4</li>");
          this.checkQuarter(chartId);
        break;
        case 'week':
          $('.week .picker_date ul').empty();
          for(var i=1; i<=52; i++){
            $('.week .picker_date ul').append("<li>"+i+"</li>");
          }
          this.checkWeek(chartId);
        break;
        case 'month':
          this.checkMonth(chartId);
        break;
      }

    },
    prevYear: function(e){
      e.preventDefault();
      var seft = $(e.currentTargett);
      var year = $('.selectYear b').text();
      var result;
      var chartId = $('.confirm_compare').attr("chartId");
      result = parseInt(year) -1;
      var yearCurrent = parseInt(new Date().getFullYear());
      if ( parseInt(result) < parseInt(yearCurrent) ){
        $('#next_year').css({'pointer-events': 'auto', 'cursor': 'default', 'color': '#999'});
        $('.selectYear b').text(result);
      }
      switch(this.type){
        case 'quarter':
          $('.quarter .picker_date ul').empty();
          $('.quarter .picker_date ul').append("<li data-date='"+result+"-01-01'>Q1</li><li data-date='"+result+"-04-01'>Q2</li><li data-date='"+result+"-07-01'>Q3</li><li data-date='"+result+"-10-01'>Q4</li>");
          this.checkQuarter(chartId);
        break;
        case 'week':
          $('.week .picker_date ul').empty();
          for(var i=1; i<=52; i++){
            $('.week .picker_date ul').append("<li>"+i+"</li>");
          }
        this.checkWeek(chartId);
        break;
         case 'month':
          this.checkMonth(chartId);
        break;
      }
    },
    checkQuarter: function(chartId){  

        var currentYear = $('.selectYear b').text();
        if (this.setDateArr[chartId].length > 0){
            for(var i = 0; i<this.setDateArr[chartId].length; i++){
              var yearSelect = this.setDateArr[chartId][i];
              var getYear = yearSelect.split("-", 3);            
              if ( getYear[0] === currentYear ){
                  switch(getYear[1]){
                    case '01':
                      $('.picker_date li:nth-child(1)').attr('class','disabled_date');
                    break;
                    case '04':
                      $('.picker_date li:nth-child(2)').attr('class','disabled_date');
                    break;
                    case '07':
                      $('.picker_date li:nth-child(3)').attr('class','disabled_date');
                    break;
                    case '10':
                      $('.picker_date li:nth-child(4)').attr('class','disabled_date');
                    break;
                  }
                
              }
            } 
          }
      
       var thisQuarter = App.util.date.getStartQuarter(new Date(), "YYYY-MM-DD");
       var tmp = thisQuarter.split("-", 2);
       if(currentYear==tmp[0]){
          //current year
          var thisMonth = tmp[1];
           switch(getYear[1]){
                    case '01':
                      $('.quarter .picker_date li:nth-child(1)').attr('class','disabled_date');
                      $('.quarter .picker_date li:nth-child(2)').attr('class','disabled_date');
                      $('.quarter .picker_date li:nth-child(3)').attr('class','disabled_date');
                      $('.quarter .picker_date li:nth-child(4)').attr('class','disabled_date');
                    break;
                    case '04':
                      $('.quarter .picker_date li:nth-child(3)').attr('class','disabled_date');
                      $('.quarter .picker_date li:nth-child(4)').attr('class','disabled_date');
                    break;
                    case '07':
                      $('.quarter .picker_date li:nth-child(3)').attr('class','disabled_date');
                      $('.quarter .picker_date li:nth-child(4)').attr('class','disabled_date');
                    break;
                    case '10':
                      $('.quarter .picker_date li:nth-child(4)').attr('class','disabled_date');
                    break;
                  }
       }  
    },
    checkWeek: function(chartId){
        if (this.setDateArr[chartId].length > 0){
            for(var i = 0; i<this.setDateArr[chartId].length; i++){
              var yearSelect = this.setDateArr[chartId][i];
              var getYear = yearSelect.split("-", 3);
              var currentYear = $('.selectYear b').text();
              if ( getYear[0] === currentYear ){
                var indexWeek = App.util.date.getWeekNumber(yearSelect);
                    $('.picker_date li:nth-child('+indexWeek+')').attr('class','disabled_date');
              }
            } 
          }

          var today = App.util.date.getStartWeek(new Date(), "YYYY-MM-DD");

          var thisYear = today.split("-", 3)[0];
          if(currentYear == thisYear){
            var indexWeek = App.util.date.getWeekNumber(yearSelect) + 1;

            for(indexWeek;indexWeek<=52;indexWeek++){
              $('.picker_date li:nth-child('+indexWeek+')').attr('class','future_disabled_date');
            }            
          }

          //binding default value
          var selectedIndex = App.util.date.getWeekNumber($('#compare_to_date').val());
          $('.picker_date li:nth-child('+(selectedIndex)+')').attr('class','selected_date');
      },
    checkMonth: function(chartId){
        if (this.setDateArr[chartId].length > 0){
            for(var i = 0; i<this.setDateArr[chartId].length; i++){
              var yearSelect = this.setDateArr[chartId][i];
              var getYear = yearSelect.split("-", 2);
              var currentYear = $('.month .list-unstyled .datepicker-months .picker-switch').text();
              if ( getYear[0] === currentYear ){
                var numMonth = parseInt(getYear[1]);
                $('.datepicker-months tbody tr td span:nth-child('+numMonth+')').addClass('disabled');
              }
            } 
          }
      },
    checkYear: function(chartId){
        if (this.setDateArr[chartId].length > 0){
            for(var i = 0; i<this.setDateArr[chartId].length; i++){
              var yearSelect = this.setDateArr[chartId][i];
              $('.datepicker-years tbody tr td span.year:contains('+yearSelect+')').addClass('disabled');
            } 
          }
      },  
    selectDate: function(e){
      var seft = $(e.currentTarget);
      var content = $(seft).text();      
      var year = $('.selectYear b').text();
      var dateSelect = [];
      if(this.type === 'week'){        
        var d = new Date("Jan 01, "+year+" 01:00:00");
        var w = d.getTime() + 604800000 * (content-1);
        var n2 = new Date(w + 518400000);
        content = App.util.date.getStartWeek(n2, "YYYY-MM-DD");
      }
      else if (this.type === 'quarter'){
          switch(content){
          case 'Q1':
          content = year + '-01-01';
          break;
          case 'Q2':
          content = year + '-04-01';
          break;
          case 'Q3':
          content = year + '-07-01';
          break;
          case 'Q4':
          content = year + '-10-01';
          break;
        }
      } else{
          content = year + '-01-01';
      }
      $('#compare_to_date').val(content);
      $('#select_to_date').val(content);
      this.loadDateRange();
      $('#select_date .inner_content .picker_date').remove();
    },
    modifyPicker: function(){
      var dateDataId = $('.quarter .picker_date li').attr('data-date');
      var year = new Date().getFullYear();
      var chartId = $('.confirm_compare').attr("chartId");
      var dataDate, index; 
      switch(this.type){
        case 'quarter':        
        $('#select_date .inner_content').append("<div class='picker_date'><span class='before'></span><div class='selectYear'><span class='glyphicon glyphicon-chevron-left' id='prev_year'></span><b>"+year+"</b><span class='glyphicon glyphicon-chevron-right' id='next_year'></span></div><ul><li data-date='"+year+"-01-01'>Q1</li><li data-date='"+year+"-04-01'>Q2</li><li data-date='"+year+"-07-01'>Q3</li><li data-date='"+year+"-10-01'>Q4</li></ul><span class='after'></span></div>");
        
         var currentValue =$('#compare_to_date').val();
          var thisYear = new Date().getFullYear();
          var currentYear = currentValue.split("-", 3)[0];
           $('.selectYear b').text(currentYear);
          //do not show future quarter
            var thisMonth = currentValue.split("-", 3)[1];
            switch(thisMonth){
                  case '01':
                    $('.quarter .picker_date li:nth-child(1)').attr('class','selected_date');
                    
                  break;
                  case '04':
                    $('.quarter .picker_date li:nth-child(2)').attr('class','selected_date');
                   
                  break;
                  case '07':
                    $('.quarter .picker_date li:nth-child(3)').attr('class','selected_date');
                    
                  break;
                  case '10':
                    $('.quarter .picker_date li:nth-child(4)').attr('class','selected_date');

                  break;
                }
        this.checkQuarter(chartId);
        break;
        case 'week':
        $('#select_date .inner_content .picker_date').remove();
        $('#select_date .inner_content').append("<div class='picker_date type'><span class='before'></span><div class='selectYear'><span class='glyphicon glyphicon-chevron-left' id='prev_year'></span><b>"+year+"</b><span class='glyphicon glyphicon-chevron-right' id='next_year'></span></div><ul></ul><span class='after'></span></div>")
        for(var i=1; i<=52; i++){
          $('#select_date .inner_content .picker_date ul').append("<li>"+i+"</li>");
        }
        this.checkWeek(chartId);
        break;
        case 'month':
        this.checkMonth(chartId);
        break;
        case 'year':
        this.checkYear(chartId);
        break;         
      }
      if(year==parseInt(new Date($('#compare_to_date').val()).getFullYear())){
        $('#next_year').css({'pointer-events': 'none', 'cursor': 'default', 'color': '#ccc'});
      }
    },
    selectDatePicker: function(){
      var chartId = $('.select_date_confirm').attr("chartId");
      var year = new Date().getFullYear();
      switch(this.type){
        case 'quarter':
        $('#select_date .inner_content .picker_date').remove();  
        $('#select_date .inner_content').append("<div class='picker_date'><span class='before'></span><div class='selectYear'><span class='glyphicon glyphicon-chevron-left' id='prev_year'></span><b>"+year+"</b><span class='glyphicon glyphicon-chevron-right' id='next_year'></span></div><ul><li data-date='"+year+"-01-01'>Q1</li><li data-date='"+year+"-04-01'>Q2</li><li data-date='"+year+"-07-01'>Q3</li><li data-date='"+year+"-10-01'>Q4</li></ul><span class='after'></span></div>");
        
         var currentValue =$('#select_to_date').val();
          var thisYear = new Date().getFullYear();
          var currentYear = currentValue.split("-", 3)[0];
           $('.selectYear b').text(currentYear);
          //do not show future quarter
            var thisMonth = currentValue.split("-", 3)[1];
            switch(thisMonth){
                  case '01':
                    $('.picker_date li:nth-child(1)').attr('class','selected_date');
                    
                  break;
                  case '04':
                    $('.picker_date li:nth-child(2)').attr('class','selected_date');
                   
                  break;
                  case '07':
                    $('.picker_date li:nth-child(3)').attr('class','selected_date');
                    
                  break;
                  case '10':
                    $('.picker_date li:nth-child(4)').attr('class','selected_date');

                  break;
                }
        this.checkQuarter(chartId);
        break;
        case 'week':
        $('#select_date .inner_content .picker_date').remove();
        $('#select_date .inner_content').append("<div class='picker_date type'><span class='before'></span><div class='selectYear'><span class='glyphicon glyphicon-chevron-left' id='prev_year'></span><b>"+year+"</b><span class='glyphicon glyphicon-chevron-right' id='next_year'></span></div><ul></ul><span class='after'></span></div>")
        for(var i=1; i<=52; i++){
          $('#select_date .inner_content .picker_date ul').append("<li>"+i+"</li>");
        }
        this.checkWeek(chartId);
        break;
        case 'month':
        this.checkMonth(chartId);
        break;
        case 'year':
        this.checkYear(chartId);
        break;    
      }
    },
    compareChart:function(e){
    var seft = $(e.currentTarget);
    $('#select_date').hide();
       var _this = this;
       var seft = $(e.currentTarget);
       var chartType;
       var parentChartId = $(seft).attr("chartId");
       var chartChildId = $('#' + parentChartId).children().children().next().attr('class');
       var titleChart = $('#' + parentChartId + ' h1').text();
       var numPerPage = 50;
       var dateStr = $('#compare_to_date').val();
       var startEndDate = this.getStartEndDate(new Date(dateStr)); 
       $('#' + parentChartId).addClass('comparing');  
        this.setDateArr[parentChartId].push(dateStr);      
       this.chartModel.fetchDetailChart( { typeParam: this.type, chartIdParam: parentChartId, fromDate: startEndDate.fromDate, endDate: startEndDate.endDate } )
         .done(function(data) {
          var chartId = parentChartId;
          var chartData = data.chartData;
          var tmp;

          if(_this.chartMergeTmp[parentChartId].count>0){
              tmp = _this.mergeData( _this.type,AppConf.cacheChartData[parentChartId][0].data,data.chartData[0].data,"",_this.getLabel(new Date(dateStr)));  
              _this.chartMergeTmp[parentChartId].count=_this.chartMergeTmp[parentChartId].count+1;
          }else{
               tmp = _this.mergeData( _this.type,AppConf.cacheChartData[parentChartId][0].data,data.chartData[0].data,_this.getLabel(_this.date),_this.getLabel(new Date(dateStr)));  
                _this.chartMergeTmp[parentChartId].count=1;

          }
          AppConf.cacheChartData[parentChartId][0].data = tmp;
          _this.showChart(chartId,AppConf.cacheChartData[parentChartId],AppConf.cacheSegment[parentChartId],
          AppConf.cacheSegmentInfo[parentChartId]);
          //reset
          _this.date = new Date();
          _this.setDate();
      });
      $('#select_date').hide();
    },

    getDefaultDate:function(chartId){
       var defaultValue;
        switch(this.type){
        case 'quarter':        
          var currentQuarter = App.util.date.getStartQuarter(new Date(), "YYYY-MM-DD");
          //max 6 time
          for(var i=0;i<=6;i++){
             if(this.setDateArr[chartId].indexOf(currentQuarter)==-1){
               defaultValue = currentQuarter;                            
               break;
             }
             var lastQuarter = new Date(currentQuarter);
             lastQuarter.setDate(lastQuarter.getDate()-1);
             currentQuarter = App.util.date.getStartQuarter(lastQuarter, "YYYY-MM-DD");
          }
        break;
        case 'week':

          var currentWeek = App.util.date.getStartWeek(new Date(), "YYYY-MM-DD");
          //max 6 time
          for(var i=0;i<=6;i++){
             if(this.setDateArr[chartId].indexOf(currentWeek)==-1){
               defaultValue = currentWeek;                            
               break;
             }
             var lastWeek = new Date(currentWeek);
             lastWeek.setDate(lastWeek.getDate()-1);
             currentWeek = App.util.date.getStartWeek(lastWeek, "YYYY-MM-DD");
          }
           
        break;
        case 'month':
          var currentMonth = App.util.date.getStartMonth(new Date(), "YYYY-MM");
          //max 6 time
          for(var i=0;i<=6;i++){
             if(this.setDateArr[chartId].indexOf(currentMonth)==-1){
               defaultValue = currentMonth;                            
               break;
             }
             var lastMonth = new Date(currentMonth);
             lastMonth.setDate(lastMonth.getDate()-1);
             currentMonth = App.util.date.getStartMonth(lastMonth, "YYYY-MM");
          }
        
        break;
        case 'year':

         var currentYear = App.util.date.getStartYear(new Date(), "YYYY");
          //max 6 time
          for(var i=0;i<=6;i++){
             if(this.setDateArr[chartId].indexOf(currentYear)==-1){
               defaultValue = currentYear;                            
               break;
             }
             var lastYear = new Date(currentYear);
             lastYear.setDate(lastYear.getDate()-1);
             currentYear = App.util.date.getStartYear(lastYear, "YYYY");
          }
        
        break;       
        case 'date':
          var today = App.util.date.getToday(new Date(), "YYYY-MM-DD");
          //max 6 time
          for(var i=0;i<=6;i++){
             if(this.setDateArr[chartId].indexOf(today)==-1){
               defaultValue = today;                            
               break;
             }
             var yesterday = new Date(today);
             yesterday.setDate(yesterday.getDate() -1);
             today = App.util.date.getToday(yesterday, "YYYY-MM-DD");
          }
        break;     
      }
      return defaultValue;
    },
    getDefaultDateSelect:function(chartId){
       var defaultValue;
        switch(this.type){
        case 'quarter':        
          var currentQuarter = App.util.date.getStartQuarter(new Date(), "YYYY-MM-DD");
          defaultValue = currentQuarter;  
        break;
        case 'week':
          var currentWeek = App.util.date.getStartWeek(new Date(), "YYYY-MM-DD");
          defaultValue = currentWeek;
           
        break;
        case 'month':
          var currentMonth = App.util.date.getStartMonth(new Date(), "YYYY-MM");
          defaultValue = currentMonth;        
        break;
        case 'year':
         var currentYear = App.util.date.getStartYear(new Date(), "YYYY");
         defaultValue = currentYear; 
        
        break;       
        case 'date':
          var today = App.util.date.getToday(new Date(), "YYYY-MM-DD");
          defaultValue = today; 
        break;     
      }
      return defaultValue;
    },
    mergeData:function(type,data1,data2,label1,label2){
      var arr1 = jquery.parseJSON(data1);
      var arr2 = jquery.parseJSON(data2);  
      if(arr2.length == 0){
        alert (label2+"のデータがありません");
        //return data1;
      }
      var arrLabel = [];
      var arrLabel2 = [];

      var arrayX = [];
      var arrayValue1 = [];
      var arrayValue2 = [];

      var result = [];

      
      for ( property in arr1[0] ) {
            arrLabel.push(property);
      };

      for ( property in arr2[0] ) {
            arrLabel2.push(property);
        };
          for(var i in arr1){
            if(type=='quarter'){
               var firstRow = arr1[i][arrLabel[0]];
              if(firstRow=='01月'||firstRow=='04月'||firstRow=='07月'||firstRow=='10月'){
                 arr1[i][arrLabel[0]] = '第一グループ';
              }else if(firstRow=='02月'||firstRow=='05月'||firstRow=='08月'||firstRow=='11月'){
                 arr1[i][arrLabel[0]] = '第二グループ'
              }else if(firstRow=='03月'||firstRow=='06月'||firstRow=='09月'||firstRow=='12月'){
                 arr1[i][arrLabel[0]] = '第三グループ'
              }
            }
            arrayX.push(arr1[i][arrLabel[0]]);
            var tmp = [];
          for(var j = 1 ; j<arrLabel.length;j++){             
             tmp[arrLabel[j]]=arr1[i][arrLabel[j]];
          }

          arrayValue1[arr1[i][arrLabel[0]]]=tmp;

        }

         for (var i in arr2){

             if(type=='quarter'){
              var firstRow = arr2[i][arrLabel2[0]];
              if(firstRow=='01月'||firstRow=='04月'||firstRow=='07月'||firstRow=='10月'){
                 arr2[i][arrLabel[0]] = '第一グループ';
              }else if(firstRow=='02月'||firstRow=='05月'||firstRow=='08月'||firstRow=='11月'){
                 arr2[i][arrLabel[0]] = '第二グループ';
              }else if(firstRow=='03月'||firstRow=='06月'||firstRow=='09月'||firstRow=='12月'){
                 arr2[i][arrLabel[0]] = '第三グループ';

              }
            }
            arrayX.push(arr2[i][arrLabel2[0]]);

          var tmp = [];
          for(var j = 1 ; j<arrLabel2.length;j++){             
             tmp[arrLabel2[j]]=arr2[i][arrLabel2[j]];
          }
          arrayValue2[arr2[i][arrLabel2[0]]]=tmp;
          }
           var arrayXMerged = this.uniqueArr(arrayX);

           for(var x in arrayXMerged){
            var tmp = {};
            tmp[arrLabel[0]]=arrayXMerged[x];
            for(var y = 1 ; y<arrLabel.length;y++){
               tmp[label1+arrLabel[y]]=(arrayValue1[arrayXMerged[x]]==undefined?null:arrayValue1[arrayXMerged[x]][arrLabel[y]]);
            }
            for(var y = 1 ; y<arrLabel2.length;y++){
               tmp[label2+arrLabel2[y]]=(arrayValue2[arrayXMerged[x]]==undefined?null:arrayValue2[arrayXMerged[x]][arrLabel2[y]]);
            }
            result.push(tmp);
          }
     return JSON.stringify(result);
    },

    uniqueArr:function(arr){
      var a = arr.concat();
      for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
      }

    return a;
    },

    selectChartTypeDetail:function(e){
      var _this = this;
      var seft = $(e.currentTarget);
      var chartIndex = $(seft).index();
      var parentChartId = $(seft).parent().attr("data-id");
      var titleChart = $('#' + parentChartId + ' h1').text();
      var numPerPage = 50;
      $('#modal-zoom-chart .zoom-chart').html("");
      $('.zoom-chart').css({'visibility': 'visible', 'opacity': 1});
      $('.chart_toolbar').show();
      $('#modal-zoom-chart .modal-zoom .unit').remove();
      $('#' + parentChartId).removeClass('comparing');
      switch (chartIndex) {
        case 0:
        this.chartModel.fetchDetailChart( { typeParam: this.type, chartIdParam: parentChartId, fromDate: this.fromDate, endDate: this.endDate } )
        .done(function(data) {
          var chartData = data.chartData;
          var segment = data.isSegmentChart;
          var segmentInfo = data.segmentInfo;     
          _this.generateGroupedBarChart({data: chartData, chartId: "modal-zoom-chart", segment:segment, segmentInfo:segmentInfo});
        });
        AppConf.overridedChartType[parentChartId] = 'BarChart';
        $('#modal-zoom-chart').attr('class', 'barchart');
        break;
        case 1:
        $('#' + parentChartId).html("<div class='line_chart_board'><div class='line-inner'><h1></h1><div id='chartLine'></div><div class='listbtnact'></div></div></div>");
          $('#' + parentChartId + ' h1').append(titleChart + "<button data-id='" +  parentChartId +"' class='show_options'><i class='fa fa-ellipsis-v' aria-hidden='true'></i></button><button data-id='" +  parentChartId +"' class='show_popup_detail'><i class='fa fa-search-plus' aria-hidden='true'></i></button><button class='refresh_chart'><i class='fa fa-refresh' aria-hidden='true'></i></button>");
          this.chartModel.fetchDetailChart( { typeParam: this.type, chartIdParam: parentChartId, fromDate: this.fromDate, endDate: this.endDate } )
          .done(function(data) {
            var chartData = data.chartData;
            var segment = data.isSegmentChart;
            var segmentInfo = data.segmentInfo;         
            _this.generateLineChart({chartId: "modal-zoom-chart", data: chartData});
          });
          AppConf.overridedChartType[parentChartId] = 'LineChart';
          $('#modal-zoom-chart').attr('class', 'linechart');
        break;
        case 2:
          this.chartModel.fetchDetailChart( { typeParam: this.type, chartIdParam: parentChartId, fromDate: this.fromDate, endDate: this.endDate } )
          .done(function(data) {
            var chartData = data.chartData;
            var segment = data.isSegmentChart;
            var segmentInfo = data.segmentInfo;       
            _this.generateDonutPieChart({chartId: "modal-zoom-chart", data: chartData, typeGenerate: 'pie', segment:segment, segmentInfo:segmentInfo});
          });
          AppConf.overridedChartType[parentChartId] = 'PieChart';
          $('#modal-zoom-chart').attr('class', 'piechart');
        break;
        case 3:
          this.chartModel.fetchDetailChart( { typeParam: this.type, chartIdParam: parentChartId, fromDate: this.fromDate, endDate: this.endDate } )
          .done(function(data) {
            var chartData = data.chartData;
            var segment = data.isSegmentChart;
            var segmentInfo = data.segmentInfo;      
            _this.generateDonutPieChart({chartId: "modal-zoom-chart", data: chartData, typeGenerate: 'donut', segment:segment, segmentInfo:segmentInfo});
          });
          AppConf.overridedChartType[parentChartId] = 'DonusChart';
          $('#modal-zoom-chart').attr('class', 'donutchart');
        break;
        case 4:
          this.chartModel.fetchDetailChart( { typeParam: this.type, chartIdParam: parentChartId, fromDate: this.fromDate, endDate: this.endDate, perPage: numPerPage, curPageParam: 1 } )
          .done(function(data) {
            var chartData = data.chartData;  
            _this.generateDataChart({chartId: "modal-zoom-chart", data: chartData});
          });
          AppConf.overridedChartType[parentChartId] = 'DataChart';
          $('#modal-zoom-chart').attr('class', 'datachart');
        break;
      }
      $('#select_chart_board_detail').remove();
      setTimeout(function(){ 
        var popupHeight = $('#modal-zoom-chart .modal-zoom').height();
        $('#modal-zoom-chart .modal-zoom').css({'margin-top': - popupHeight/2});
      }, 1000);
    },
    openSubMenu:function(e){
     var seft = $(e.currentTarget);
     if ($(seft).hasClass('active')){
      $(seft).removeClass('active');
     } else {
      $(seft).addClass('active');
     }
    },
    convertSVG: function(){
      var svg = document.querySelector('.zoom-chart svg');
      var img = document.querySelector('#imageSVG');
      var canvas = document.querySelector('#canvas');
        if ( svg !== null ) {
          // get svg data
        var xml = new XMLSerializer().serializeToString(svg);
        // make it base64
        var svg64 = btoa(unescape(encodeURIComponent(xml)));
        var b64Start = 'data:image/svg+xml;base64,';
        var image64 = b64Start + svg64;
        img.src = image64;

        canvas.getContext('2d').drawImage(img, 0, 0);
          var dt = canvas.toDataURL('image/png');
          dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
          dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
        }
    },
    downloadImage:function(e){
      var seft = $(e.currentTarget);
      var parent = $(seft).parent().attr('data-id');
      $('#modal-zoom-chart').css({'z-index':-6});
      $('#' + parent + ' .show_popup_detail').click();
      
      setTimeout(function(){ $('.getscreenshot').click();}, 500);
      setTimeout(function(){ $('#modal-zoom-chart .btnCloseZoom').click();}, 1000);

    },
    exportToImage: function(e){
      var seft = $(e.currentTarget);      
      $('#modal-zoom-chart .tooltip').css({'border': '2px solid #ccc'});
      $('#modal-zoom-chart .chart_toolbar').hide();
      $('.btnCloseZoom').hide();
      $('.refresh_chart_detail').hide();
      $('#modal-zoom-chart .zoom-chart .xaxis_listname').show();
      
      $('.zoom-chart svg .x.axis .tick text').css({'opacity': 0});
      
      if ($('.zoom-chart .list_legend').hasClass('column')){
        $('#modal-zoom-chart .zoom-chart').append("<span class='lineBar'></span>");
      }
      $('.zoom-chart .line_chart_board').append("<span class='lineHorizontally'></span>");
      $('.zoom-chart .line_chart_board').append("<span class='lineVertical'></span>");
      $('.zoom-chart .line_chart_board .lineHorizontally').css({ 'width': $('.zoom-chart svg').width() -50} );
      
    
      if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){        
        $('#imageSVG').css({'display': 'none'});
        if ($('.zoom-chart .list_legend').hasClass('column') || $('.zoom-chart').children().hasClass('line_chart_board')){
          $('#imageSVG').css({'display': 'block'});
          $('.zoom-chart svg').css({'opacity': 0});
        }
      }
      this.convertSVG();
      var element = $(".modal-zoom");
      var imageData;
      html2canvas([$('.modal-zoom')[0]], {
      useCORS: true,
      allowTaint: true
      }).then(function (canvas) {
        if (navigator.msSaveBlob) {
          var URL=window.URL;
          var BlobBuilder = window.MSBlobBuilder;
          navigator.saveBlob=navigator.msSaveBlob;
          var imgBlob = canvas.msToBlob();          
        if (BlobBuilder && navigator.saveBlob) {          
          var showSave =  function (data, name, mimetype) {
            var builder = new BlobBuilder();
            builder.append(data);
            var blob = builder.getBlob(mimetype||"application/octet-stream");
            if (!name)
              name = "Download.bin";
              navigator.saveBlob(blob, name);
            };
            showSave(imgBlob, 'layout.png',"image/png");
          }
        } else {         
          $('body').append('<a id="export-image-container" download="layout.png">');
          img = canvas.toDataURL("image/png");
          img = img.replace('data:image/png;base64,', '');
          finalImageSrc = 'data:image/png;base64,' + img;

          $('#export-image-container').attr('href', finalImageSrc);
          $('#export-image-container')[0].click();
          $('#export-image-container').remove();
        }
        $('#modal-zoom-chart .tooltip').css({'border': '0 none'});
        $('#modal-zoom-chart .chart_toolbar').show();
        $('.btnCloseZoom').show();
        $('.refresh_chart_detail').show();
        $('#imageSVG').attr('src', '');
        $('.zoom-chart svg .x.axis .tick text').css({'opacity': 1});
        $('#modal-zoom-chart .zoom-chart .lineBar').remove();
        $('.zoom-chart .line_chart_board .lineHorizontally').remove();
        $('.zoom-chart .line_chart_board .lineVertical').remove();
        $('#modal-zoom-chart').css({'z-index':160});
      });
    },
    showMenuList:function(e){
      e.preventDefault();
      var seft = $(e.currentTarget);
      var that = this;
      var chartType = $(seft).parents().eq(3).attr('class');
      var parentId = $(seft).parents().eq(5).attr('id');

    if ( chartType === 'column-inner' ){
        var currentCol = $(seft).find('.name').text();
        var currentGroup = $(seft).find('.group').text();
        var currentXbox = $('#' + parentId + ' .column-inner .segmentinfo .xbox p').length;
        var currentYbox = $('#' + parentId + ' .column-inner .segmentinfo .ybox p').length;

        $('#' + parentId + ' .detail_menu ul li').show();
        $('#' + parentId + ' .detail_menu ul li:contains("ユーザーリスト")').hide();
        if ( $('#' + parentId + ' .info_value_chart button').length === 0){
          $('#' + parentId + ' .detail_menu .info_value_chart').append("<button class='save btnDetail'>セグメント抽出</button>");
        }
        if ( $('#'+ parentId + ' .info_value_chart .update').length === 1){
          $('#' + parentId + ' .detail_menu .info_value_chart button').remove();
          $('#' + parentId + ' .detail_menu .info_value_chart').append("<button class='save btnDetail'>セグメント抽出</button>");
        }
          $('#' + parentId + ' .detail_menu .info_value_chart p').remove();
          var flagSegment = false;             
          for(var i=1; i <= currentXbox; i++){
            var xboxPoint = $('#' + parentId + ' .column-inner .segmentinfo .xbox p:nth-child(' + i + ')').text();
            var yboxPoint = $('#' + parentId + ' .column-inner .segmentinfo .ybox p:nth-child(' + i + ')').text();
            var updateTimeBox = $('#' + parentId + ' .column-inner .segmentinfo .updateTimeBox p:nth-child(' + i + ')').text();
            var statusPoint = $('#' + parentId + ' .column-inner .segmentinfo .statusbox p:nth-child(' + i + ')').text();
            var segmentId;
            
            if (currentCol === xboxPoint && currentGroup === yboxPoint) { 
              segmentId = $('#' + parentId + ' .column-inner .segmentinfo .segmentId p:nth-child('+i+')').text();
              $('#' + parentId + ' .column-inner .segmentinfo .segmentSelected').text(segmentId);
              flagSegment = true;
                switch (statusPoint) {
                  case '0':
                  $('#' + parentId + ' .detail_menu .info_value_chart button').remove();
                  $('#' + parentId + ' .detail_menu .info_value_chart p').remove();
                  $('#' + parentId + ' .detail_menu ul li').show();
                  $('#' + parentId + ' .detail_menu .info_value_chart').append("<p>セグメント抽出依頼: <span>"+ updateTimeBox +"</span></p>");
                  $('#' + parentId + ' .detail_menu ul li:contains("ユーザーリスト")').hide();
                  break;
                  case '1':
                  $('#' + parentId + ' .detail_menu .info_value_chart button').remove();
                  $('#' + parentId + ' .detail_menu ul li:contains("ユーザーリスト")').show();
                  $('#' + parentId + ' .detail_menu .info_value_chart').append("<p>Processing</p>");
                  $('#' + parentId + ' .detail_menu ul li:contains("ユーザーリスト")').hide();
                  break;
                  case '2':
                  $('#' + parentId + ' .detail_menu .info_value_chart button').remove();
                  $('#' + parentId + ' .detail_menu .info_value_chart p').remove();
                  $('#' + parentId + ' .detail_menu .info_value_chart').append("<button class='update btnDetail' style='display:block;margin:0 auto 8px;'>データ更新</button>");
                  $('#' + parentId + ' .detail_menu .info_value_chart').append("<p>最後更新日時: <span>"+ updateTimeBox +"</span></p>");
                  $('#' + parentId + ' .detail_menu ul li:contains("ユーザーリスト")').show();
                  break;
                  case '-1':
                  $('#' + parentId + ' .detail_menu .info_value_chart button').remove();
                  $('#' + parentId + ' .detail_menu .info_value_chart p').remove();
                  $('#' + parentId + ' .detail_menu .info_value_chart').append("<p style='color: #ff0000'>セグメント抽出失敗</p>");
                  $('#' + parentId + ' .detail_menu .info_value_chart').append("<button class='update btnDetail'>データ更新</button>");
                  $('#' + parentId + ' .detail_menu ul li').hide();
                  $('#' + parentId + ' .detail_menu ul li:contains("ユーザーリスト")').hide();
                  break;
                  default:
                  $('#' + parentId + ' .detail_menu .info_value_chart button').remove();
                  $('#' + parentId + ' .detail_menu .info_value_chart').append("<button class='save btnDetail'>セグメント抽出</button>");
                  break;
                }
            }
          }
        if (!flagSegment){
          $('#' + parentId + ' .detail_menu .info_value_chart button').remove();
          $('#' + parentId + ' .detail_menu .info_value_chart').append("<button class='save btnDetail'>セグメント抽出</button>");
          $('#' + parentId + ' .detail_menu ul li').hide();
        }
        var typeChart = $('#' + parentId + ' .column-inner .segmentinfo .typeChart').text();
        var startDate = $('#' + parentId + ' .column-inner .segmentinfo .startDate').text();
        var endDate = $('#' + parentId + ' .column-inner .segmentinfo .endDate').text();
        $("#" + parentId + " .detail_menu").finish().toggle(100).
        css({
            top: event.pageY - 70 + "px" ,
            left: event.pageX - 10 + "px" 
        });
        function handler( event ) {var target = $( event.target );}
        $( "#" + parentId + " .info_value_chart .save" ).click( handler, function(){
          var lastSavedSegmentId;
          App.btApi.saveSegment({
          chartId: parentId,
          type: typeChart,
          startDate: startDate,
          endDate: endDate,
          x: currentCol,
          y: currentGroup
            }).done(function(res) {
          lastSavedSegmentId = res.segmentId;
            that.chartModel.fetchDetailChart( { typeParam: that.type, chartIdParam: parentId, fromDate: that.fromDate, endDate: that.endDate } )
            .done(function(data) {
              var chartId = parentId;
              var chartData = data.chartData;
              var segment = data.isSegmentChart;
              var segmentInfo = data.segmentInfo;       
              that.generateGroupedBarChart({chartId: parentId, data: chartData, segment: segment, segmentInfo: segmentInfo});
            $('#' + parentId + ' .segmentinfo .segmentSelected').text(lastSavedSegmentId);
            });
            $('.detail_menu').hide();
            }).fail(function(err) {
              alert('faild');
            });
            
        })

        $( "#" + parentId + " .info_value_chart .update" ).click( handler, function(){
          App.btApi.updateSegment({
          segmentId: segmentId
            }).done(function(res) {
              
          that.chartModel.fetchDetailChart( { typeParam: that.type, chartIdParam: parentId, fromDate: that.fromDate, endDate: that.endDate } )
            .done(function(data) {
              var chartId = parentId;
              var chartData = data.chartData;
              var segment = data.isSegmentChart;
              var segmentInfo = data.segmentInfo;       
              that.generateGroupedBarChart({chartId: parentId, data: chartData, segment: segment, segmentInfo: segmentInfo});
            });
            $('.detail_menu').hide();
            }).fail(function(err) {
              alert('faild');
            });
            $('#' + parentId + ' .list_legend.column').html('');
        })
        $('#modal-detail-action .content_detail ul').scroll(function(){
              var triggerPoint = 30;
              if(this.scrollTop + this.clientHeight + triggerPoint > this.scrollHeight){
                var currentPage = $('#modal-detail-action .content_detail').attr('data-page');
                point = 1;
                if( currentPage != ''){
              $('#modal-detail-action .content_detail').attr('data-page','').append('<div class="container-ispinner"><div class="ispinner ispinner--gray ispinner--animating"><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div></div></div>');
                that.chartModel.fetchListUser({segmentId: segmentId, page: currentPage, perPage: 50, order: 1})
                  .done(function(data) {
                    var dataShop = data.data;
                    var maxPage = data.maxPage;
                    that.generatePopupListUser({ data: dataShop, page: currentPage, maxPage: maxPage })
                  }).fail(function(err) {

                  });      

                }
              }
          });      
    } else {
        var parent = $(seft).parents().eq(6).attr('id');
        var currentCol = $(seft).parents().eq(2).find('p').text();
        var colIndex = $(seft).index() + 1;
        var currentGroup = $('#' + parent + ' .listbtnact button:nth-child(' + colIndex + ') span').text();
        var chartTypeSelect, checkType;
        checkType = $('#' + parent).children().children().attr('class');
        if(checkType === 'donut-inner'){
          chartTypeSelect = 'donutChart';
        } else {
          chartTypeSelect = 'pieChart';
        }
        $('#' + parent + ' .detail_menu .info_value_chart').html('');
        $('#' + parent + ' .segmentSelect').attr('d', $('#' + parent + ' .segmentinfo .saveD').text());
        $('#' + parent + ' .segmentSelect').attr('class','removeSegment');
        var targetSement = $('#' + parent + ' .removeSegment').parents().eq(3).attr('id');
        $('#' + parent + ' svg .arc path').attr('class','');
        $(seft).find('path').attr('class','segmentSelect');
        if ( $('#' + targetSement + ' svg .arc .segmentSelect').length == 0 ) {
          $('#' + targetSement + ' .tooltip .total').show().css({'color': 'rgb(46, 48, 146)'});
          $('#' + targetSement + ' .tooltip .total span').css({'color': 'rgb(46, 48, 146)'});
          $('#' + targetSement + ' .tooltip .total1').hide();
        }
        var contentD = $(seft).find('path').attr('d');
        $('#' + parent + ' .segmentinfo .saveD').text(contentD);
        var donutLength = $('#' + parent + ' .box_area .donut_chart .segmentSelect').length;
        if (donutLength === 0){
          $('#' + parent + ' .donut_chart .tooltip .total').show();
          $('#' + parent + ' .donut_chart .tooltip .total1').hide();
        }
        
        var currentXbox = $('#' + parent + ' .segmentinfo .xbox p').length;
        var currentYbox = $('#' + parent + ' .segmentinfo .ybox p').length;

        $('#' + parent + ' .detail_menu ul li').show();
        $('#' + parent + ' .detail_menu ul li:contains("ユーザーリスト")').hide();
        if ( $('#' + parent + ' .info_value_chart button').length === 0){
          $('#' + parent + ' .detail_menu .info_value_chart').append("<button class='save btnDetail'>セグメント抽出</button>");
        }
        if ( $('#' + parent + ' .info_value_chart .update').length === 1){
          $('#' + parent + ' .detail_menu .info_value_chart button').remove();
          $('#' + parent + ' .detail_menu .info_value_chart').append("<button class='save btnDetail'>セグメント抽出</button>");
        }
          var flagSegment=false;                          
          for(var i=1; i <= currentXbox; i++){
            var xboxPoint = $('#' + parent + ' .segmentinfo .xbox p:nth-child(' + i + ')').text();
            var yboxPoint = $('#' + parent + ' .segmentinfo .ybox p:nth-child(' + i + ')').text();
            var updateTimeBox = $('#' + parent + ' .segmentinfo .updateTimeBox p:nth-child(' + i + ')').text();
            var statusPoint = $('#' + parent + ' .segmentinfo .statusbox p:nth-child(' + i + ')').text();
            var segmentId;
            if (currentCol === xboxPoint && currentGroup === yboxPoint) {  
              flagSegment = true;
              segmentId = $('#' + parent + ' .segmentinfo .segmentId p:nth-child(' + i + ')').text();
              // $('#' + parent + ' .segmentinfo .segmentSelected').empty();
              $('#' + parent + ' .segmentinfo .segmentSelected').text(segmentId);
              $('#' + parent + ' .detail_menu .info_value_chart p').remove(); 

                switch (statusPoint) {
                  case '0':
                  $('#' + parent + ' .detail_menu .info_value_chart button').remove();
                  $('#' + parent + ' .detail_menu ul li').show();
                  $('#' + parent + ' .detail_menu .info_value_chart').append("<p>セグメント抽出依頼: <span>"+ updateTimeBox +"</span></p>");
                  $('#' + parent + ' .detail_menu ul li:contains("ユーザーリスト")').hide();
                  break;
                  case '1':
                  $('#' + parent + ' .detail_menu .info_value_chart button').remove();
                  $('#' + parent + ' .detail_menu .info_value_chart').append("<p>Processing</p>");
                  $('#' + parent + ' .detail_menu ul li:contains("ユーザーリスト")').hide();
                  break;
                  case '2':
                  $('#' + parent + ' .detail_menu .info_value_chart button').remove();
                  $('#' + parent + ' .detail_menu .info_value_chart').append("<button class='update btnDetail' style='display:block;margin:0 auto 8px;'>データ更新</button>");
                  $('#' + parent + ' .detail_menu .info_value_chart').append("<p>最後更新日時: <span>"+ updateTimeBox +"</span></p>");
                  $('#' + parent + ' .detail_menu ul li:contains("ユーザーリスト")').show();
                  break;
                  case '-1':
                  $('#' + parent + ' .detail_menu .info_value_chart button').remove();
                  $('#' + parent + ' .detail_menu .info_value_chart').append("<p style='color: #ff0000'>セグメント抽出失敗</p>");
                  $('#' + parent + ' .detail_menu .info_value_chart').append("<button class='update btnDetail'>データ更新</button>");
                  $('#' + parent + ' .detail_menu ul li').hide();
                  $('#' + parent + ' .detail_menu ul li:contains("ユーザーリスト")').hide();
                  break;
                }
            }            
          }
        var typeChart = $('#' + parent + ' .segmentinfo .typeChart').text();
        var startDate = $('#' + parent + ' .segmentinfo .startDate').text();
        var endDate = $('#' + parent + ' .segmentinfo .endDate').text();
        if (!flagSegment){
            $('#' + parent + ' .detail_menu .info_value_chart button').remove();
            $('#' + parent + ' .detail_menu .info_value_chart').append("<button class='save btnDetail'>セグメント抽出</button>");
            $('#' + parent + ' .detail_menu ul li').hide();
        }
        $("#" + parent + " .detail_menu").finish().toggle(100).
        css({
            top: event.pageY - 70 + "px" ,
            left: event.pageX + 20 + "px" 
        });
        function handler( event ) {var target = $( event.target );}
        $( "#" + parent + " .info_value_chart .save" ).click( handler, function(){
          $('#' + parent + ' .box_area').html('');
          $('#' + parent + ' .listbtnact').html('');
          var lastSavedSegmentId;
          App.btApi.saveSegment({
          chartId: parent,
          type: typeChart,
          startDate: startDate,
          endDate: endDate,
          x: currentCol,
          y: currentGroup
            }).done(function(res) {
          lastSavedSegmentId = res.segmentId;
          that.chartModel.fetchDetailChart( { typeParam: that.type, chartIdParam: parent, fromDate: that.fromDate, endDate: that.endDate } )
          .done(function(data) {
            var chartId = parent;
            var chartData = data.chartData;
            var segment = data.isSegmentChart;
            var segmentInfo = data.segmentInfo;
            var typeGenerate;
            if(chartTypeSelect === 'donutChart'){
              typeGenerate = 'donut';
            } else {
              typeGenerate = 'pie';
            }
            that.generateDonutPieChart({chartId: parent, data: chartData, typeGenerate: typeGenerate, segment: segment, segmentInfo: segmentInfo});
            $('#' + parent + ' .segmentinfo .segmentSelected').text(lastSavedSegmentId);
          });
            
          $('#' + parent + ' .detail_menu').hide();
            }).fail(function(err) {
              alert('faild');
            });
        });
        $( "#" + parent + " .info_value_chart .update" ).click( handler, function(){
          $('#' + parent + ' .box_area').html('');
          $('#' + parent + ' .listbtnact').html('');
          App.btApi.updateSegment({
          segmentId: segmentId
            }).done(function(res) {
              that.chartModel.fetchDetailChart( { typeParam: that.type, chartIdParam: parent, fromDate: that.fromDate, endDate: that.endDate } )
              .done(function(data) {
                var chartId = parent;
                var chartData = data.chartData;
                var segment = data.isSegmentChart;
                var segmentInfo = data.segmentInfo;           
                that.generateDonutPieChart({chartId: parent, data: chartData, typeGenerate: 'donut', segment: segment, segmentInfo: segmentInfo});
              });
              $('#' + parent + ' .detail_menu').hide();
            }).fail(function(err) {
              alert('faild');
            });
        });
        $('#modal-detail-action .content_detail ul').scroll(function(){
              var triggerPoint = 30;
              var segmentSelected = $('#' +parent+ ' .segmentinfo .segmentSelected').text();
              if(this.scrollTop + this.clientHeight + triggerPoint > this.scrollHeight){
                var currentPage = $('#modal-detail-action .content_detail').attr('data-page');
                point = 1;
                if( currentPage != ''){
              $('#modal-detail-action .content_detail').attr('data-page','').append('<div class="container-ispinner"><div class="ispinner ispinner--gray ispinner--animating"><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div></div></div>');
                that.chartModel.fetchListUser({segmentId: segmentSelected, page: currentPage, perPage: 50, order: 1})
                  .done(function(data) {
                    var dataShop = data.data;
                    var maxPage = data.maxPage;
                    that.generatePopupListUser({ data: dataShop, page: currentPage, maxPage: maxPage })
                  }).fail(function(err) {

                  });      

                }
              }
          });
        }
    }, 
    closeIframe: function(){
      $('.iframe_box').hide();
      $('.iframe_segment').attr('src','');
    },
    closeModalDetail:function(){
      $('#modal-detail-action').hide();
      $('#modal-detail-action ul').empty();
    },
    showPopupSelectShop: function(){
      $('.listshopbg').show();
      $('#search_shop_list').val('');
      $('#list_shop_select li').css({'display': 'inline-block'});
      $('.select_filter p').removeClass('select');      
      var listShopHeight = $('.list_shop_detail').height()/2;
      $('.list_shop_detail').css({'margin-top': -listShopHeight});
      // $(".list_shop_detail ul li").removeClass('active');
      var listShopSelect = $('.loadShopValue').text().split(",");
      if( !$('#list_shop_select').hasClass('render') ){
        for(var j=0; j< listShopSelect.length; j++){
          $(".list_shop_detail ul li:contains(" + listShopSelect[j] + ") span").parents().eq(1).addClass('active');
        }
      }      
      $('#list_shop_select').addClass('render');
      var numActive = $(".list_shop_detail .active").length;
      var numLi = $(".list_shop_detail li").length;
      if (numActive === numLi) {
        $('.select_filter p').addClass('select');
      }
    },
    closePopupSelectShop: function(){
      $('.confirm_reset, .listshopbg').hide();
    },
    selectSegmentDonut: function(e){
      var seft = $(e.currentTarget);
        var parent = $(seft).parents().eq(7).attr('id');
        $('#' + parent + ' .segmentSelect').attr('d', $('#' + parent + ' .segmentinfo .saveD').text());
        $('#' + parent + ' .segmentSelect').attr('class','removeSegment');
        $('#' + parent + ' .removeSegment').attr('id', 'falseSelect');
        var targetSement = $('#' + parent + ' .removeSegment').parents().eq(3).attr('id');
        
        $('#' + parent + ' svg .arc path').attr('class','');
        $('#' + parent + ' svg .arc path').attr('id','');
        $(seft).attr('class','segmentSelect');
        if ( $('#' + targetSement + ' svg .arc .segmentSelect').length == 0 ) {
          $('#' + targetSement + ' .tooltip .total').show().css({'color': 'rgb(46, 48, 146)'});
          $('#' + targetSement + ' .tooltip .total span').css({'color': 'rgb(46, 48, 146)'});
          $('#' + targetSement + ' .tooltip .total1').hide();
        }
        var contentD = $(seft).attr('d');
        $('#' + parent + ' .segmentinfo .saveD').text(contentD);
    },
    selectSegmentDonutDetail: function(e){
        var seft = $(e.currentTarget);
        var text = $('#modal-zoom-chart .segmentinfo .saveD').text();
        $('#modal-zoom-chart .segmentSelectDetail').attr('d', text);    
        $('#modal-zoom-chart .segmentSelectDetail').attr('class','removeSegment');
        $('#modal-zoom-chart .removeSegment').attr('id', 'falseSelect');
        var targetSement = $('#modal-zoom-chart .removeSegment').parents().eq(3).attr('id');
        $('#modal-zoom-chart .donut_chart svg .arc path').attr('class','');
        $(seft).attr('class','segmentSelectDetail');
         if ( $('#' + targetSement + ' svg .arc .segmentSelectDetail').length == 0 ) {
          $('#' + targetSement + ' .tooltip .total').show().css({'color': 'rgb(46, 48, 146)'});
          $('#' + targetSement + ' .tooltip .total span').css({'color': 'rgb(46, 48, 146)'});
          $('#' + targetSement + ' .tooltip .total1').hide();
        }
        var contentD = $(seft).attr('d');
        $('#modal-zoom-chart .saveD').text(contentD);
    },
    showMenuListDetail:function(e){
      e.preventDefault();
      var seft = $(e.currentTarget);
      var that = this;
      var parentId = $('.modal-zoom .zoom-chart-next').attr('data-id');

      var chartType = $('#' + parentId).children().children().attr('class');
      if (chartType === 'column-inner') {
        var currentCol = $(seft).find('.name').text();
        var currentGroup = $(seft).find('.group').text();
        var currentXbox = $('#modal-zoom-chart .modal-zoom .segmentinfo .xbox p').length;
        var currentYbox = $('#modal-zoom-chart .modal-zoom .segmentinfo .ybox p').length;
        var typeChart = this.type;
        var startDate = $('#modal-zoom-chart .chart_time span:nth-child(1)').text();
        var endDate = $('#modal-zoom-chart .chart_time span:nth-child(2)').text();
        
        $('#modal-zoom-chart .modal-zoom .detail_menu ul li').show();
        if ( $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').length === 0){
          $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<button class='save btnDetail'>セグメント抽出</button>");
        }
        if ( $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart .update').length === 1){
          $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').remove();
          $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<button class='save btnDetail'>セグメント抽出</button>");
        }
        $('#modal-zoom-chart .modal-zoom .detail_menu ul li:contains("ユーザーリスト")').hide();
          $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart p').remove();
          var flagSegment=false;                
          for(var i=1; i <= currentXbox; i++){
            var xboxPoint = $('#modal-zoom-chart .modal-zoom .segmentinfo .xbox p:nth-child(' + i + ')').text();
            var yboxPoint = $('#modal-zoom-chart .modal-zoom .segmentinfo .ybox p:nth-child(' + i + ')').text();
            var updateTimeBox = $('#modal-zoom-chart .modal-zoom .segmentinfo .updateTimeBox p:nth-child(' + i + ')').text();
            var startDateBox = $('#modal-zoom-chart .modal-zoom .segmentinfo .startDate').text();
            var statusPoint = $('#modal-zoom-chart .modal-zoom .segmentinfo .statusbox p:nth-child(' + i + ')').text();
            var segmentId;
            
            if (currentCol === xboxPoint && currentGroup === yboxPoint && startDate === startDateBox) { 
              segmentId = $('#modal-zoom-chart .modal-zoom .segmentinfo .segmentId p:nth-child('+i+')').text();
              $('#modal-zoom-chart .modal-zoom .segmentinfo .segmentSelected').text(segmentId);
              flagSegment=true;        
                switch (statusPoint) {
                  case '0':
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').remove();
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart p').remove();
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<p>セグメント抽出依頼: <span>"+ updateTimeBox +"</span></p>");
                  $('#modal-zoom-chart .modal-zoom .detail_menu ul li:contains("ユーザーリスト")').hide();
                  break;
                  case '1':
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').remove();
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<p>Processing</p>");
                  $('#modal-zoom-chart .modal-zoom .detail_menu ul li:contains("ユーザーリスト")').hide();
                  break;
                  case '2':
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').remove();
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart p').remove();
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<button class='update btnDetail' style='display:block;margin:0 auto 8px;'>データ更新</button>");
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<p>最後更新日時: <span>"+ updateTimeBox +"</span></p>");
                  $('#modal-zoom-chart .modal-zoom .detail_menu ul li:contains("ユーザーリスト")').show();
                  break;
                  case '-1':
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').remove();
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart p').remove();
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<p style='color: #ff0000'>セグメント抽出失敗</p>");
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<button class='update btnDetail'>データ更新</button>");
                  $('#modal-zoom-chart .modal-zoom .detail_menu ul li').hide();
                  $('#modal-zoom-chart .modal-zoom .detail_menu ul li:contains("ユーザーリスト")').hide();
                  break;
                }
            } 
          }        
        if (!flagSegment){
          $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').remove();         
          $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<button class='save btnDetail'>セグメント抽出</button>");
          $('#modal-zoom-chart .modal-zoom .detail_menu ul li').hide();
        }
        $('#modal-zoom-chart .modal-zoom .detail_menu').finish().toggle(100).
        css({
            top: event.pageY - 70 + "px" ,
            left: event.pageX - 10 + "px" 
        });
        function handler2( event ) {var target = $( event.target );}
        $( "#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart .save" ).click( handler2, function(){
          var lastSavedSegmentId;
          App.btApi.saveSegment({
          chartId: parentId,
          type: typeChart,
          startDate: startDate,
          endDate: endDate,
          x: currentCol,
          y: currentGroup
            }).done(function(res) {
            lastSavedSegmentId = res.segmentId;
            that.chartModel.fetchDetailChart( { typeParam: that.type, chartIdParam: parentId, fromDate: that.fromDate, endDate: that.endDate } )
            .done(function(data) {
              var chartId = parentId;
              var chartData = data.chartData;
              var segment = data.isSegmentChart;
              var segmentInfo = data.segmentInfo;         
              that.generateGroupedBarChart({chartId: "modal-zoom-chart", data: chartData, segment: segment, segmentInfo: segmentInfo, chartType: "BarChart"});
              $('#modal-zoom-chart .modal-zoom .segmentSelected').text(lastSavedSegmentId);
            });
            }).fail(function(err) {
              alert('faild');
            });            
            $('.detail_menu').hide();
        });
        $( "#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart .update" ).click( handler2, function(){          
          App.btApi.updateSegment({
          segmentId: segmentId
            }).done(function(res) {
              alert('done');
            that.chartModel.fetchDetailChart( { typeParam: that.type, chartIdParam: parentId, fromDate: that.fromDate, endDate: that.endDate, chartType: "BarChart" } )
            .done(function(data) {
              var chartId = parentId;
              var chartData = data.chartData;
              var segment = data.isSegmentChart;
              var segmentInfo = data.segmentInfo;     
              that.generateGroupedBarChart({chartId: "modal-zoom-chart", data: chartData, segment: segment, segmentInfo: segmentInfo});
            });
            }).fail(function(err) {
              alert('faild');
            });
            $('.detail_menu').hide();
        })
        $('#modal-detail-action .content_detail ul').scroll(function(){
              var triggerPoint = 30;
              var segmentSelected = $('#modal-zoom-chart .segmentinfo .segmentSelected').text();
              if(this.scrollTop + this.clientHeight + triggerPoint > this.scrollHeight){
                var currentPage = $('#modal-detail-action .content_detail').attr('data-page');
                point = 1;
                if( currentPage != ''){
              $('#modal-detail-action .content_detail').attr('data-page','').append('<div class="container-ispinner"><div class="ispinner ispinner--gray ispinner--animating"><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div></div></div>');
                that.chartModel.fetchListUser({segmentId: segmentSelected, page: currentPage, perPage: 50, order: 1})
                  .done(function(data) {
                    var dataShop = data.data;
                    var maxPage = data.maxPage;
                    that.generatePopupListUser({ data: dataShop, page: currentPage, maxPage: maxPage })
                  }).fail(function(err) {

                  });      

                }
              }
          });

      } else{
        var currentCol = $(seft).parents().eq(2).find('p').text();
        var colIndex = $(seft).index() + 1;
        var currentGroup = $('#modal-zoom-chart .zoom-chart .listbtnact button:nth-child(' + colIndex + ') span').text();
        var chartTypeCheck = $('#modal-zoom-chart').attr('class');
        $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').html('');
        var text = $('#modal-zoom-chart .segmentinfo .saveD').text();
          $('#modal-zoom-chart .segmentSelectDetail').attr('d', text);        

        $('#modal-zoom-chart .segmentSelectDetail').attr('class','removeSegment');
        var targetSement = $('#modal-zoom-chart .removeSegment').parents().eq(3).attr('id');
        $('#modal-zoom-chart .donut_chart svg .arc path').attr('class','');
        $(seft).find('path').attr('class','segmentSelectDetail');
         if ( $('#' + targetSement + ' svg .arc .segmentSelectDetail').length == 0 ) {
          $('#' + targetSement + ' .tooltip .total').show().css({'color': 'rgb(46, 48, 146)'});
          $('#' + targetSement + ' .tooltip .total span').css({'color': 'rgb(46, 48, 146)'});
          $('#' + targetSement + ' .tooltip .total1').hide();
        }
        var contentD = $(seft).find('path').attr('d');
        $('#modal-zoom-chart .saveD').text(contentD);

        var currentXbox = $('#modal-zoom-chart .modal-zoom .segmentinfo .xbox p').length;
        var currentYbox = $('#modal-zoom-chart .modal-zoom .segmentinfo .ybox p').length;
        
        $('#modal-zoom-chart .modal-zoom .detail_menu ul li').show();
        $('#modal-zoom-chart .modal-zoom .detail_menu ul li:contains("ユーザーリスト")').hide();
        if ( $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').length === 0){
          $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<button class='save btnDetail'>セグメント抽出</button>");
        }
        if ( $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart .update').length === 1){
          $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').remove();
          $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<button class='save btnDetail'>セグメント抽出</button>");
        }
        
        var flagSegment=false; 
        var typeChart = this.type;
        var startDate = $('#modal-zoom-chart .chart_time span:nth-child(1)').text();
        var endDate = $('#modal-zoom-chart .chart_time span:nth-child(2)').text();                  
          for(var i=1; i <= currentXbox; i++){
            var xboxPoint = $('#modal-zoom-chart .modal-zoom .segmentinfo .xbox p:nth-child(' + i + ')').text();
            var yboxPoint = $('#modal-zoom-chart .modal-zoom .segmentinfo .ybox p:nth-child(' + i + ')').text();
            var updateTimeBox = $('#modal-zoom-chart .modal-zoom .segmentinfo .updateTimeBox p:nth-child(' + i + ')').text();
            var statusPoint = $('#modal-zoom-chart .modal-zoom .segmentinfo .statusbox p:nth-child(' + i + ')').text();
            var segmentId;
            if (currentCol === xboxPoint && currentGroup === yboxPoint) {
              flagSegment=true;
              segmentId = $('#modal-zoom-chart .modal-zoom .segmentinfo .segmentId p:nth-child('+i+')').text();
              $('#modal-zoom-chart .modal-zoom .segmentinfo .segmentSelected').text(segmentId);
              $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart p').remove();    
                switch (statusPoint) {
                  case '0':
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').remove();
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<p>セグメント抽出依頼: <span>"+ updateTimeBox +"</span></p>");
                  $('#modal-zoom-chart .modal-zoom .detail_menu ul li:contains("ユーザーリスト")').hide();
                  break;
                  case '1':
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').remove();
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<p>Processing</p>");
                  $('#modal-zoom-chart .modal-zoom .detail_menu ul li:contains("ユーザーリスト")').hide();
                  break;
                  case '2':
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').remove();
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<button class='update btnDetail' style='display:block;margin:0 auto 8px;'>データ更新</button>");
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<p>最後更新日時: <span>"+ updateTimeBox +"</span></p>");
                  $('#modal-zoom-chart .modal-zoom .detail_menu ul li:contains("ユーザーリスト")').show();
                  break;
                  case '-1':
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').remove();
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<p style='color: #ff0000'>セグメント抽出失敗</p>");
                  $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<button class='update btnDetail'>データ更新</button>");
                  $('#modal-zoom-chart .modal-zoom .detail_menu ul li').hide();
                  $('#modal-zoom-chart .modal-zoom .detail_menu ul li:contains("ユーザーリスト")').hide();
                  break;
                }
            }            
          }
        if (!flagSegment){
            $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart button').remove();
            $('#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart').append("<button class='save btnDetail'>セグメント抽出</button>");
            $('#modal-zoom-chart .modal-zoom .detail_menu ul li').hide();
        }
        $("#modal-zoom-chart .modal-zoom .detail_menu").finish().toggle(100).
        css({
            top: event.pageY - 70 + "px" ,
            left: event.pageX + 20 + "px" 
        });
        function handlers( event ) {var target = $( event.target );}
        $( "#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart .save" ).click( handlers, function(){
          $('#modal-zoom-chart .zoom-chart .donut_chart_board .box_area').html('');
          $('#modal-zoom-chart .zoom-chart .pie_chart_board .box_area').html('');
          $('#modal-zoom-chart .zoom-chart').html('');
          var lastSavedSegmentId;
          App.btApi.saveSegment({
          chartId: parentId,
          type: typeChart,
          startDate: startDate,
          endDate: endDate,
          x: currentCol,
          y: currentGroup
            }).done(function(res) {
            lastSavedSegmentId = res.segmentId;
          that.chartModel.fetchDetailChart( { typeParam: that.type, chartIdParam: parentId, fromDate: that.fromDate, endDate: that.endDate } )
          .done(function(data) {
            var chartId = parentId;
            var chartData = data.chartData;
            var segment = data.isSegmentChart;
            var segmentInfo = data.segmentInfo;
            var typeGenerate, chartTypeSelect;
            if(chartTypeCheck === 'donutchart'){
              typeGenerate = 'donut';
              chartTypeSelect = 'DonusChart';
            } else {
              typeGenerate = 'pie';
              chartTypeSelect = 'PieChart';
            }
            that.generateDonutPieChart({chartId: "modal-zoom-chart", data: chartData, typeGenerate: typeGenerate, segment: segment, segmentInfo: segmentInfo, chartType: chartTypeSelect});
            $('#modal-zoom-chart .modal-zoom .segmentSelected').text(lastSavedSegmentId);
            // $('#modal-zoom-chart .modal-zoom .detail_menu ul').html('<li>メール配信</li><li>クーポン配布</li><li>プッシュ通知</li>');
          });          
          $('.detail_menu').hide();
            }).fail(function(err) {
              alert('faild');
            });
        })
         $( "#modal-zoom-chart .modal-zoom .detail_menu .info_value_chart .update" ).click( handlers, function(){
          $('#modal-zoom-chart .zoom-chart .donut_chart_board .box_area').html('');
          $('#modal-zoom-chart .zoom-chart').html('');
          App.btApi.updateSegment({
          segmentId: segmentId
            }).done(function(res) {
              alert('done');
              that.chartModel.fetchDetailChart( { typeParam: that.type, chartIdParam: parentId, fromDate: that.fromDate, endDate: that.endDate } )
              .done(function(data) {
                var chartId = parentId;
                var chartData = data.chartData;
                var segment = data.isSegmentChart;
                var segmentInfo = data.segmentInfo;      
                that.generateDonutPieChart({chartId: "modal-zoom-chart", chartType: "DonusChart", data: chartData, typeGenerate: 'donut', segment: segment, segmentInfo: segmentInfo});
              });
              $('.detail_menu').hide();
            }).fail(function(err) {
              alert('faild');
            });
        })
        $('#modal-detail-action .content_detail ul').scroll(function(){
              var triggerPoint = 30;
              var segmentSelected = $('#modal-zoom-chart .segmentinfo .segmentSelected').text();
              if(this.scrollTop + this.clientHeight + triggerPoint > this.scrollHeight){
                var currentPage = $('#modal-detail-action .content_detail').attr('data-page');
                point = 1;
                if( currentPage != ''){
              $('#modal-detail-action .content_detail').attr('data-page','').append('<div class="container-ispinner"><div class="ispinner ispinner--gray ispinner--animating"><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div><div class="ispinner__blade"></div></div></div>');
                that.chartModel.fetchListUser({segmentId: segmentSelected, page: currentPage, perPage: 50, order: 1})
                  .done(function(data) {
                    var dataShop = data.data;
                    var maxPage = data.maxPage;
                    that.generatePopupListUser({ data: dataShop, page: currentPage, maxPage: maxPage })
                  }).fail(function(err) {

                  });      

                }
              }
          });

      }
    },
    selectActionDataFromPopup: function(options){
      var idChart = options.id;
      var segmentId = options.segmentId;
      $('#modal-detail-action .list_action_btn button').click(function(e){
        var seft = $(e.currentTarget);
        var index = $(seft).text();
        switch(index) {
        case 'メール配信':
        window.open('#selectTemplate?segmentId=' + segmentId + '&p=' + App.util.common.getUrlParameter('p'), "popUpWindow", "resizable=yes;scrollbars=yes;toolbar=yes;menubar=no;location=no;directories=no;status=no';top=0;left=250;width=1100;height=733");
        break;
        case 'クーポン配布':
        window.open('#couponInformation/0?segmentId=' + segmentId + '&p=' + App.util.common.getUrlParameter('p'), "popUpWindow", "resizable=yes;scrollbars=yes;toolbar=yes;menubar=no;location=no;directories=no;status=no';top=0;left=250;width=1100;height=733");
        break;
        case 'プッシュ通知':
        window.open('#notificationSetting?segmentId=' + segmentId + '&p=' + App.util.common.getUrlParameter('p'), "popUpWindow", "resizable=yes;scrollbars=yes;toolbar=yes;menubar=no;location=no;directories=no;status=no';top=0;left=250;width=1100;height=733");
        break;
        case 'ユーザーリスト':
        break;
      }
      })
    },
    selectActionData: function(e){
      App.util.showProgressScreen();
      var that = this;
      var seft = $(e.currentTarget);
      var index = $(seft).text();
      var dashboardId = $(seft).parents().eq(4).attr('id');
      var div_eTypes = [],div_changes = [];
      var detectSave = $('#' + dashboardId + ' .detail_menu .info_value_chart button').text();
      var segmentId = $('#' + dashboardId + ' .segmentinfo .segmentSelected').text();
      switch(index) {
      case 'メール配信':
      window.open('#selectTemplate?segmentId=' + segmentId + '&p=' + App.util.common.getUrlParameter('p'), "popUpWindow", "resizable=yes;scrollbars=yes;toolbar=yes;menubar=no;location=no;directories=no;status=no';top=0;left=250;width=1100;height=733");
      break;
      case 'クーポン配布':
        
      window.open('#couponInformation/0?segmentId=' + segmentId + '&p=' + App.util.common.getUrlParameter('p'), "popUpWindow", "resizable=yes;scrollbars=yes;toolbar=yes;menubar=no;location=no;directories=no;status=no';top=0;left=250;width=1100;height=733");
      break;
      case 'プッシュ通知':
        
      window.open('#notificationSetting?segmentId=' + segmentId + '&p=' + App.util.common.getUrlParameter('p'), "popUpWindow", "resizable=yes;scrollbars=yes;toolbar=yes;menubar=no;location=no;directories=no;status=no';top=0;left=250;width=1100,height=733");
      break;
      case 'ユーザーリスト':
            var segmentSelected = $('#' +dashboardId+ ' .segmentinfo .segmentSelected').text();
            that.chartModel.fetchListUser( { segmentId: segmentSelected, page: 1, perPage: 50, order: 1 } )
            .done(function(data) {
              var dataShop = data.data;
              var maxPage = data.maxPage;
              var page = data.page;
              that.generatePopupListUser({data: dataShop, maxPage: maxPage, page: page });
            });


      $('#modal-detail-action').show();
        $('#modal-detail-action .content_detail .modalinfo .name').text( $('#' + dashboardId + ' h1 span').text() );
          $('#modal-detail-action .content_detail .modalinfo .type').text( that.type );
          $('#modal-detail-action .content_detail .modalinfo .fromDay').text( that.fromDate );
          $('#modal-detail-action .content_detail .modalinfo .toDay').text( that.endDate );
          that.selectActionDataFromPopup({id: dashboardId, segmentId: segmentId});
      break 
      }
      var h_window = $(window).height() -51;
      $('.iframe_segment').css({'height': h_window, 'margin-top': -(h_window)/2});
      $('.detail_menu').hide();      
      App.util.hideProgressScreen();
    },
    selectActionDataDetail:function(e){
      App.util.showProgressScreen();
      var seft = $(e.currentTarget);
      var that = this;
      var index = $(seft).text();
      var dashboardId = $('zoom-chart-prev').attr('data-id');
      var detectSave = $('#modal-zoom-chart .detail_menu .info_value_chart button').text();
      
      var segmentId = $('#modal-zoom-chart .segmentinfo .segmentSelected').text(); 
      switch(index) {
      case 'メール配信':
      window.open('#selectTemplate?segmentId=' + segmentId + '&p=' + App.util.common.getUrlParameter('p'), "popUpWindow", "resizable=yes;scrollbars=yes;toolbar=yes;menubar=no;location=no;directories=no;status=no';top=0;left=250;width=1100;height=733");
      break;
      case 'クーポン配布':
      window.open('#couponInformation/0?segmentId=' + segmentId + '&p=' + App.util.common.getUrlParameter('p'), "popUpWindow", "resizable=yes;scrollbars=yes;toolbar=yes;menubar=no;location=no;directories=no;status=no';top=0;left=250;width=1100;height=733");
      break;
      case 'プッシュ通知':
      window.open('#notificationSetting?segmentId=' + segmentId + '&p=' + App.util.common.getUrlParameter('p'), "popUpWindow", "resizable=yes;scrollbars=yes;toolbar=yes;menubar=no;location=no;directories=no;status=no';top=0;left=250;width=1100;height=733");
      break;
      case 'ユーザーリスト':
      var segmentSelected = $('#modal-zoom-chart .segmentinfo .segmentSelected').text();
            that.chartModel.fetchListUser( { segmentId: segmentSelected, page: 1, perPage: 50, order: 1 } )
            .done(function(data) {
              var dataShop = data.data;
              var maxPage = data.maxPage;
              var page = data.page;
              that.generatePopupListUser({data: dataShop, maxPage: maxPage, page: page });
            });
      $('#modal-zoom-chart').hide();
      $('#modal-detail-action').show();
        $('#modal-detail-action .content_detail .modalinfo .name').text( $('#modal-zoom-chart .modal-zoom h3').text() );
          $('#modal-detail-action .content_detail .modalinfo .type').text( that.type );
          $('#modal-detail-action .content_detail .modalinfo .fromDay').text( that.fromDate );
          $('#modal-detail-action .content_detail .modalinfo .toDay').text( that.endDate );
          that.selectActionDataFromPopup({id: dashboardId, segmentId: segmentId});
      break; 
      }

      var h_window = $(window).height() -51;
      $('.iframe_segment').css({'height': h_window, 'margin-top': -(h_window)/2});
      $('.detail_menu').hide();      
      
      App.util.hideProgressScreen();
    },
    selectFilterShop:function(e){
      e.preventDefault();
      var seft = $(e.currentTarget);
      var index = $(seft).index();
      var checkClass = $('.select_filter p').hasClass('select');
      switch(checkClass){
        case false:
        $('#list_shop_select li').addClass('active');
        $(seft).addClass('select');
        break;
        case true:
        $('#list_shop_select li').removeClass('active');
        $(seft).removeClass('select');
        break;
      }
    },
    checkSelectAll: function(e){
      e.preventDefault();
      var numActive = $(".list_shop_detail .active").length;
      var numLi = $(".list_shop_detail li").length;
      if (numActive < numLi) {
        $('.select_filter p').removeClass('select');
      }
    },
    refreshChart: function(e){
      var _this = this;
      var seft = $(e.currentTarget);
      var parentChartId = $(seft).parents().eq(3).attr("id");
      var childClass = $(seft).parents().eq(1).attr("class");
      $('#' + parentChartId).removeClass('comparing');
      if(this.chartMergeTmp[parentChartId].count>0){
        this.chartMergeTmp[parentChartId].count = 0;
      }

      this.setDateArr[parentChartId] = [];

      var numPerPage = 50;
      if (childClass === 'table-inner' || childClass === 'data-inner'){
        numPerPage = 50;        
      }
     this.chartModel.fetchDetailChart( { typeParam: this.type, chartIdParam: parentChartId, fromDate: this.fromDate, endDate: this.endDate } )
        .done(function(data) {
          var chartId = parentChartId;
          var chartData = data.chartData;
          var segment = data.isSegmentChart;
          var segmentInfo = data.segmentInfo;  
          AppConf.cacheChartData[chartId]=chartData;
          AppConf.cacheSegment[chartId]=segment;
          AppConf.cacheSegmentInfo[chartId]=segmentInfo;
          _this.chartMergeTmp[chartId] = {};
          _this.chartMergeTmp[chartId].count = 0;
          var tmp = JSON.parse(chartData[0].data);
          if(tmp != null && tmp != undefined && tmp.length > 0){
            _this.chartMergeTmp[chartId].columnCount = Object.keys(tmp[0]).length-1;
          }else{
            _this.chartMergeTmp[chartId].columnCount = 0;
          }
          _this.showChart(chartId,chartData,segment,segmentInfo);
          $("#" + chartId + ' svg').attr('data-id', chartId);
      }); 
      this.dragDropChart();  
    },
    refreshChartDetail: function(e){
      var _this = this;
      var seft = $(e.currentTarget);
      this.isRefresh = true;

      // var chartIndex = $(seft).index();
      var parentChartId = $(seft).parent().find('.zoom-chart-next').attr("data-id");
      if(this.chartMergeTmp[parentChartId].count>0){
        this.chartMergeTmp[parentChartId].count = 0;
      }

      this.setDateArr[parentChartId] = [];
      var chartParentType = $('#' + parentChartId).children().children().attr('class');
      var numPerPage = 50;
      var fromDate = $('#modal-zoom-chart .modal-zoom .chart_time span:first-child').text();
      var endDate = $('#modal-zoom-chart .modal-zoom .chart_time span:last-child').text();
      $('#modal-zoom-chart .zoom-chart').html("");
      $('#modal-zoom-chart .chart_toolbar').show();
      $('.zoom-chart').css({'visibility': 'visible', 'opacity': 1});
      $('#select_chart_board_detail').css({'opacity': 0, 'visibility': 'hidden'});
       App.util.showProgressScreen();
       this.chartModel.fetchDetailChart( { typeParam: this.type, chartIdParam: parentChartId, fromDate: fromDate, endDate: endDate } )
        .done(function(data) {
          var chartData = data.chartData;
          var segment = data.isSegmentChart;
          var segmentInfo = data.segmentInfo;               
          _this.showChartZoom(parentChartId,chartData,segment,segmentInfo);

           App.util.hideProgressScreen();
      });        
    },
    closePopupCompare: function(e){
      var seft = $(e.currentTarget);
      $('#select_date').hide();
      // $('#select_date').attr('class', '');
      $('#select_date .picker_date').remove();
      $('#select_date .detailDate').remove();
      var chartId = $(seft).parent().find('.confirm_select_compare button').attr('chartid');
      $('#' + chartId).children().children().css({'opacity': 1});
      if( $('#select_date input').hasClass('select_date_content') ){
        $('#modal-zoom-chart').show();
      }
    },
    setChartWidth:function(e){
      var _this = this;
      var seft = $(e.currentTarget);
      var chartId = $(seft).parent().attr('data-id');
      var fullWidthFlg;
      if ( $('#' + chartId).hasClass('full_chart') ){
        fullWidthFlg = 0;
      } else {
        fullWidthFlg = 1;
      }

      App.btApi.saveUserDefine({
      chartId: chartId,
      fullWidthFlg: fullWidthFlg,
      chartType:null,
      displayFlg: null
        }).done(function(res) {
          _this.fetchChartList();
        }).fail(function(err) {
          alert('faild');
        });
    },
    showTooltipBarchart: function(e){
      var seft = $(e.currentTarget);
      var chartId = $('#modal-zoom-chart .zoom-chart-prev').attr('data-id');
      var index = $(seft).index() - 2;
      var getLeft, subLeft, leftX, getTop,getName,getValue, getColor;
      var widthZoom = $('.zoom-chart').width();
      getLeft = $(seft).attr('transform');
      subLeft = getLeft.split('(')[1];
      leftX = subLeft.split(',')[0];
      if(leftX>widthZoom){
        leftX = leftX-($('#modal-zoom-chart svg').width() - widthZoom);
      }
      getTop = $(seft).find('rect').attr('height');
      getName = $(seft).find('.group').text();
      getValue = $(seft).find('.bar').text();
      getColor = $(seft).find('.bar').css('fill');
      $('.tooltipBarChart .titlename_col').text(getName).css({'color': getColor});
      $('.tooltipBarChart .value_col').text(getValue);
      $('.tooltipBarChart').css({'display': 'block', 'bottom': parseInt(getTop) + 100 + 'px', 'left': parseInt(leftX) + parseInt( $(seft).children().attr('width') )/2 - 40 + 'px'});
    },
    hideTooltipBarChart: function(){
      $('.tooltipBarChart').hide();
    },
    showPopupConfirmReset: function(){
      $('#confirm_reset').show();
      $('.confirm_box_chart').css({'margin-top': -($('.confirm_box_chart').height())/2 });     

    },
    resetChartList: function(){
      var _this = this;
      App.btApi.resetChartList({
        }).done(function(res) {
          _this.fetchChartList();
          _this.closePopupSelectShop();
        }).fail(function(err) {
          alert('faild');
        });
      this.type = 'year';
      $('.main_screen .topbar .leftbar li').removeClass('active');
      $('.main_screen .topbar .leftbar li:last-child').addClass('active'); 
      this.chartModel.fetchListShop(  )
        .done(function(data) {
          var mailFlg = data.workflowMailFlg;
          var couponFlg = data.workflowCouponFlg;
          var notificationFlg = data.notificationFlg;
          var userListFlg = data.userListFlg;
          var chartData = data.filterInfo;
          _this.generateListShop({ data: chartData, mail: mailFlg, coupon: couponFlg, notification: notificationFlg, userlist: userListFlg});
        }).fail(function(err) {
          _this.generateListShop({ data: chartData, mail: 0, coupon: 0, notification: 0, userlist: 0});
        });
        AppConf.overridedChartType = {};

    }
    

  });

  return ChartBoardLayoutView;

})();
