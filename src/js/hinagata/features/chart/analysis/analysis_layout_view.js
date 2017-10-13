var Backbone = require('backbone');
var DialogueCommonItemView = require('../../dialogue/dialogue_common_item_view.js');
var ModalDateRangeItemView = require('./select_date_range/dateRangeTemplate_item_view.js');
var ModalSelectMonetaryItemView = require('./select_monetary/monetaryTemplate_item_view.js');
var AdvanceChartItemView = require('./advance_chart/advanceChart_item_view.js');
var ModalExportDataItemView = require('./export_data/exportDataTemplate_item_view.js');

var ModalStoreHomeOutCompareItemView = require('./modal_store/modal_store_home_out_compare_item_view.js');
var ModalStoreEditOutCompareItemView = require('./modal_store/modal_store_edit_out_compare_item_view.js');
var ModalStoreHomeInCompareItemView1 = require('./modal_store/modal_store_home_in_compare_item_view1.js');
var ModalStoreEditInCompareItemView1 = require('./modal_store/modal_store_edit_in_compare_item_view1.js');
var ModalStoreHomeInCompareItemView2 = require('./modal_store/modal_store_home_in_compare_item_view2.js');
var ModalStoreEditInCompareItemView2 = require('./modal_store/modal_store_edit_in_compare_item_view2.js');

var CountModel = require('../../../models/count_model.js');
var AnalysisModel = require('../../../models/analysis_model.js');
var ValidationModel = require('../../../models/validation_model.js');

require('../../../../../../lib/components/jquery/jquery.event.move.js');
require('../../../../../../lib/components/jquery/jquery.twentytwenty.js');

module.exports = (function () {
    var MainNavView = Backbone.Marionette.LayoutView.extend({
        template: require('./analysis_layout_template.html'),
        regions: {
            "navRegion": "#main-nav-region",
            "dialogueCommonRegion": "#dialogue-common-region",
            "modalDateRangeRegion" : "#modal-date-range",
            "modalSelectMonetaryRegion" : "#modal-monetary",
            "advanceChartRegion" : "#advance-chart-region",
            "advanceChartRegion1" : "#before-graph-container",
            "advanceChartRegion2" : "#insert-graph-container",
            "modalExportDataRegion" : "#modal-export-data",
            "modalStoreHomeRegion" : "#modal-store-home-region",
            "modalStoreEditRegion" : "#modal-store-edit-region",
            "modalStoreHomeOutCompareRegion" : "#modal-store-home-out-compare-region",
            "modalStoreEditOutCompareRegion" : "#modal-store-edit-out-compare-region",
            "modalStoreHomeInCompareRegion1" : "#modal-store-home-in-compare-region1",
            "modalStoreEditInCompareRegion1" : "#modal-store-edit-in-compare-region1",
            "modalStoreHomeInCompareRegion2" : "#modal-store-home-in-compare-region2",
            "modalStoreEditInCompareRegion2" : "#modal-store-edit-in-compare-region2"
        },
        ui: {
            "slideMenu" : "#slide-menu-btn",
            "logoutBtn" : "#logout-btn",
            "topMenu" : ".topbar .top_menu li",
            "topMenuSRFM" : ".topbar .leftbar li",
            "defaultBottomMenuLeft" : "#default_navbottom .listactbtn li",
            "defaultBottomMF" : "#default_navbottom .graph_info li",
            "compareBottomMF" : ".navbottom_compare  .graph_info li",
            "compareBottomLeft": "#compare_navbottom_left .listactbtn li",
            "compareBottomRight": "#compare_navbottom_right .listactbtn li",
            "bottomMF" : ".bottom_bar .graph_info li",
            "bottomLeft" : ".bottom_bar .listactbtn li a",
            "dateText" : ".date-text",
            "weekText" : ".week-text",
            "preDefaultButton" : "#page_slider .pre_btn",
            "nextDefaultButton" : "#page_slider .next_btn",
            "preLeftButton" : "#page_slider1 .pre_btn",
            "nextLeftButton" : "#page_slider1 .next_btn",
            "preRightButton" : "#page_slider2 .pre_btn",
            "nextRightButton" : "#page_slider2 .next_btn",
            "calendarButton" : ".page_slider #calendar-btn",
            "exportButton" : ".topbar .downloadicn",
            "groupSltControllHome" : ".group-slt-controll li .home-inner",
            "groupSltControllEdit" : ".group-slt-controll li .edit-inner"
        },
        events: function() {
            return ( applican.config.device_os === "IOS" ) ?
            {
                "touchend @ui.slideMenu" : "toggleSlideMenu",
                "touchend @ui.logoutBtn" : "execLogout",
                "touchend @ui.topMenuSRFM" : "generateCharttopMenuSRFM",
                "touchend @ui.defaultBottomMF" : "generateDefaultBottomMF",
                "touchend @ui.compareBottomMF" : "generateCompareBottomMF",
                "touchend @ui.defaultBottomMenuLeft" : "generateChartDefaultBottomMenuLeft",
                "touchend @ui.compareBottomLeft" : "generateChartCompareBottomMenuLeft",
                "touchend @ui.compareBottomRight" : "generateChartCompareBottomMenuRight",
                "touchend @ui.preDefaultButton" : "handleDefaultPre",
                "touchend @ui.nextDefaultButton" : "handleDefaultNext",
                "touchend @ui.preLeftButton" : "handlePreLeft",
                "touchend @ui.nextLeftButton" : "handleNextLeft",
                "touchend @ui.preRightButton" : "handlePreRight",
                "touchend @ui.nextRightButton" : "handleNextRight",
                "touchend @ui.calendarButton": "showModalDateRange",
                "touchend @ui.exportButton" : "showExport",
                "touchend .date-range-control #btn-cancel" : "hideModalDateRange",
                "touchend .date-range-control #btn-set": "setRangeChart",
                "touchend .monetary-control #btn-cancel" : "hideModalSelectMonetary",
                "touchend .monetary-control #btn-set": "setMonetaryChart",
                "touchend .twentytwenty-handle .closebtn" : "closeCompare",
                "touchend .export-data-control #btn-cancel" : "closeExport",
                "touchend .data-limit a" : "setDataLimit",
                "touchend .data-type a" : "setDataType",
                "touchend .export-data-control #btn-export" : "exportChart",
                "touchend @ui.groupSltControllHome" : "modalStoreControllHome",
                "touchend @ui.groupSltControllEdit" : "modalStoreControllEdit",
                "touchend .block-average .list-item li" : "changeAdvanceChart"
            }:{
                "click @ui.slideMenu" : "toggleSlideMenu",
                "click @ui.logoutBtn" : "execLogout",
                "click @ui.topMenuSRFM" : "generateCharttopMenuSRFM",
                "click @ui.defaultBottomMF" : "generateDefaultBottomMF",
                "click @ui.compareBottomMF" : "generateCompareBottomMF",
                "click @ui.defaultBottomMenuLeft" : "generateChartDefaultBottomMenuLeft",
                "click @ui.compareBottomLeft" : "generateChartCompareBottomMenuLeft",
                "click @ui.compareBottomRight" : "generateChartCompareBottomMenuRight",
                "click @ui.preDefaultButton" : "handleDefaultPre",
                "click @ui.nextDefaultButton" : "handleDefaultNext",
                "click @ui.preLeftButton" : "handlePreLeft",
                "click @ui.nextLeftButton" : "handleNextLeft",
                "click @ui.preRightButton" : "handlePreRight",
                "click @ui.nextRightButton" : "handleNextRight",
                "click @ui.calendarButton": "showModalDateRange",
                "click @ui.exportButton" : "showExport",
                "click .date-range-control #btn-cancel" : "hideModalDateRange",
                "click .date-range-control #btn-set": "setRangeChart",
                "click .monetary-control #btn-cancel" : "hideModalSelectMonetary",
                "click .monetary-control #btn-set": "setMonetaryChart",
                "click .twentytwenty-handle .closebtn" : "closeCompare",
                "click .export-data-control #btn-cancel" : "closeExport",
                "click .data-limit a" : "setDataLimit",
                "click .data-type a" : "setDataType",
                "click .export-data-control #btn-export" : "exportChart",
                "click @ui.groupSltControllHome" : "modalStoreControllHome",
                "click @ui.groupSltControllEdit" : "modalStoreControllEdit",
                "click .block-average .list-item li" : "changeAdvanceChart"
            }
        },
        templateHelpers: {
            getTitle: function() {
                return App.appModel.getLanguageType().analysis.menu.titleAnalysis;
            },
            getRecency: function() {
                return App.appModel.getLanguageType().analysis.menu.menuTopAnalysis.recency;
            },
            getFrequency: function() {
                return App.appModel.getLanguageType().analysis.menu.menuTopAnalysis.frequency;
            },
            getMonetary: function() {
                return App.appModel.getLanguageType().analysis.menu.menuTopAnalysis.monetary;
            },
            getWeek: function() {
                return App.appModel.getLanguageType().analysis.menu.menuBottomAnalysis.week;
            },
            getMonth: function() {
                return App.appModel.getLanguageType().analysis.menu.menuBottomAnalysis.month;
            },
            getYear: function() {
                return App.appModel.getLanguageType().analysis.menu.menuBottomAnalysis.year;
            },
            getRange: function() {
                return App.appModel.getLanguageType().analysis.menu.menuBottomAnalysis.range;
            },
            getSubscribes: function() {
                return App.appModel.getLanguageType().analysis.main.subscribers;
            },
        },
        SidebarConf: {
          showSidebar: true
        },
        initialize: function(options){
            this.maxCount = 0;
            this.topMenuType = "advance";
            this.type = "M1";
            this.typeDate = "month";
            this.typeRC = "";
            this.date = "";
            this.dateCompare1 = "";
            this.dateCompare2 = "";
            this.compareType = "";
            this.typeCompare;
            this.typeDateCompare;
            this.emptyData = "";
            this.dataLimit = "currentView";
            this.dataType = "image/png";
            this.chart = "";
            this.pointHomeOutCompare = 0;
            this.pointEditOutCompare = 0;
            this.pointHomeInCompare1 = 0;
            this.pointEditInCompare1 = 0;
            this.pointHomeInCompare2 = 0;
            this.pointEditInCompare2 = 0;
            this.dialogueCommon = new DialogueCommonItemView( { type: "logout" });
            this.modalDateRangeItemView = new ModalDateRangeItemView();
            this.modalSelectMonetaryItemView = new ModalSelectMonetaryItemView();
            this.modalExportDataItemView = new ModalExportDataItemView();
            this.countModel = new CountModel();
            this.analysisModel = new AnalysisModel();
            this.validationModel = new ValidationModel();

            App.util.bindProgressScreen(this, this.countModel);
            App.util.bindProgressScreen(this, this.analysisModel);
            this.listenTo(this.analysisModel, 'sync', this.getChart);
            this.listenTo(this, 'load:sync', this.onLoad);
        },
        onRender: function() {
            this.showDialogueCommon();
            this.showSelectRangeDate();
            this.showSelectMonetary();
            this.showAdvanceChart();
            this.showExportData();
            // this.showModalStore();
            // this.fetchDemoGraphicAll();
            // this.fetchAdvanced();
        },
        showDialogueCommon: function() {
            this.dialogueCommonRegion.show ( this.dialogueCommon );
        },
        showSelectRangeDate: function() {
            this.modalDateRangeRegion.show( this.modalDateRangeItemView );
        },
        showSelectMonetary: function() {
            this.modalSelectMonetaryRegion.show( this.modalSelectMonetaryItemView );
        },
        showModalStore: function() {
            this.modalStoreHomeOutCompareRegion.show( new ModalStoreHomeOutCompareItemView() );
            this.modalStoreEditOutCompareRegion.show( new ModalStoreEditOutCompareItemView() );

            this.modalStoreHomeInCompareRegion1.show( new ModalStoreHomeInCompareItemView1() );
            this.modalStoreEditInCompareRegion1.show( new ModalStoreEditInCompareItemView1() );

            this.modalStoreHomeInCompareRegion2.show( new ModalStoreHomeInCompareItemView2() );
            this.modalStoreEditInCompareRegion2.show( new ModalStoreEditInCompareItemView2() );
        },
        showAdvanceChart: function(container) {
            switch ( container ) {
                case "before-graph-container":
                    this.advanceChartRegion1.show( new AdvanceChartItemView() );
                    break;
                case "insert-graph-container":
                    this.advanceChartRegion2.show( new AdvanceChartItemView() );
                    break;
                default:
                    this.advanceChartRegion.show( new AdvanceChartItemView() );
                    break;
            };
        },
        showExportData: function() {
            this.modalExportDataRegion.show( this.modalExportDataItemView );
        },
        showExport: function(e) {
            e.preventDefault();
            this.modalExportDataItemView.showModalExportData();
        },
        closeExport: function(e) {
            e.preventDefault();
            this.modalExportDataItemView.hideModalExportData();
            this.clearDataExport();
        },
        setDataLimit: function(e) {
            e.preventDefault;
            var _this = $(e.currentTarget);
            this.dataLimit = _this.attr("data-limit");
            $(".data-limit a").removeClass("active");
            _this.addClass("active");
        },
        clearDataExport: function() {
            $("#modal-export-data .error-info").html("");
            this.dataLimit = "currentView";
            this.dataType = "image/png";
            $(".data-limit a").removeClass("active");
            $(".data-type a").removeClass("active");
            $(".data-limit a:eq(0)").addClass("active");
            $(".data-type a:eq(1)").addClass("active");
        },
        setDataType: function(e) {
            e.preventDefault;
            var _this = $(e.currentTarget);
            this.dataType = _this.attr("data-type");
            $(".data-type a").removeClass("active");
            _this.addClass("active");
        },
        exportChart: function(e) {
            e.preventDefault();
            if ( this.dataLimit === "currentView" ) {
                if ( this.dataType === "application/vnd.ms-excel" || this.dataType === "text/csv" ) {
                    App.util.highchart.exportChartCsv({chart: this.chart, type: this.dataType});
                } else {
                    // App.util.highchart.postChart({chart: this.chart, type: this.dataType});
                    App.util.highchart.exportChart({chart: this.chart, type: this.dataType});
                }
                this.clearDataExport();
                this.modalExportDataItemView.hideModalExportData();
            } else {
                $("#modal-export-data .error-info").html("次フェース");
            }
        },
        onLoad: function() {
            var windowH = $(window).height(),
                posTopOutCompare = $('.page_slider').offset().top + 15;

            $('#master-container').css('height', windowH);
            $('.subscribers-wrapper.out-compare').css({'top' : + posTopOutCompare + 'px'});
            if ($('.navbar-header li:eq(0)').hasClass('active')) {
                $('.block-average').show();
            }

            // var offsetTop = $('#default_navbottom .group-slt-controll li[data-store="home"]').offset().top;
            // var offsetLeft = $('#default_navbottom .group-slt-controll li[data-store="home"]').offset().left;

            // Set date text
            this.setDateText();

            // Load plugin jquery for select date range
            this.modalDateRangeItemView.loadDatePicker1();
            this.modalDateRangeItemView.loadDatePicker2();

            this.fetchAdvanced();
            this.showPartOfChart();
            // this.closePartOfGrowth();
            // $(".subscribers-wrapper.out-compare").hide();
            
            var contentH = $('#master-container').height();
            if ( windowH > contentH ) {
                $('.page-center #create_message, #master-container').css('height', windowH);        
            } else {
                $('.page-center #create_message').css('height', contentH);
            } 

            var loginName = App.appModel.getAuthInfo().loginName;
            if ( loginName ) {
                $("#loginName").text(loginName);
            } else {
                $("#loginName").text(App.appModel.getLanguageType().sidebar.loginName);
            }

            // set active nav-sidebar
            $(".nav-sidebar .navi_main li").removeClass("active");
            $(".nav-sidebar .navi_main li:eq(4)").addClass("active");
            App.util.hideProgressScreen();
        },
        getChart: function() {
            var container = "";
            switch ( this.compareType ) {
                case "0":
                    container = "insert-graph-container";
                    break;
                case "1":
                    container = "before-graph-container";
                    break;
                default:
                    container = "graph-container";
                    break;
            };
            switch ( this.topMenuType ) {
                case "growth":
                    this.getGrowthChart(container);
                    break;
                case "demoGraphics":
                    this.getDemoGraphic(container);
                    break;
                case "store":
                    this.getStoreChart(container);
                    break;
                case "recency":
                    this.getRencencyChartD3(container);
                    break;
                case "frequency":
                    this.getFrequencyChartD3(container);
                    break;
                case "monetary":
                    this.getMonetaryChartD3(container);
                    break;
            };

            if ( !this.typeRC && this.classBottom !== "leftcol" && this.classBottom !== "rightcol" ) {
                if ( this.compareType === "0" ) {
                    this.compareType = "1";
                    this.fetchRangeDate();
                } else if ( this.compareType === "1" ) {
                    this.initCompare();
                }
            }
        },
        compareChart: function(){
            $(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({default_offset_pct: 0.5});
        },
        clearAllChart:function(){
            $("#before-graph-container, #insert-graph-container, #graph-container, #advanceChart").html("");
            $(".chartslide_compare, #compare_navbottom").hide();
            $("#page_slider").show();
            $("#default_navbottom").show();
        },
        setPostionCompare: function() {
            var h_compare_container = $(window).height() / 2;
            var offsetT = $(".twentytwenty-handle").offset().top;
            $(".compare-wrapper").css({"top" : -offsetT + 15 + $('.block-average').height() + "px"});
            $(".close-wrapper").css({"height": parseInt(h_compare_container) + "px"});
            // $(".close-wrapper").css({"bottom" : -($(".highcharts-container").height()/2 - 60) + "px"});

            // Set position for subcribers in compare
            // var posTopInCompare = $('.page_slider').offset().top + $('.page_slider').height() + 14;
            // $('.subscribers-wrapper.in-compare').css({'top' : + posTopInCompare + 'px'});
        },
        initCompare: function() {
            $("#graph-container").html("");
            $("#default_navbottom").hide();
            $("#graph-container").css({"padding-top": ""});
            $("#page_slider").hide();
            $(".advance-chart").hide();
            $("#compare_navbottom_left li:eq(4), #compare_navbottom_right li:eq(4)").hide();
            // $(".chartslide_compare").show();
            $(".chartslide_compare").removeClass("active");
            $("#compare_navbottom_left, #compare_navbottom_right, .chartslide_compare").show();
            this.showPartOfChartCompare();
            // if ( this.topMenuType === "advance" ) {
            //     $(".chartslide_compare").addClass("active");
            // }
            // $("#compare_navbottom_left, #compare_navbottom_right, .chartslide_compare").show();
            // if ( this.topMenuType === "advance" ) {
            //     $("#compare_navbottom_left .graph_info li:eq(1)").html("N");
            //     $("#compare_navbottom_left .graph_info").addClass("advance");
            //     $("#compare_navbottom_right .graph_info li:eq(1)").html("N");
            //     $("#compare_navbottom_right .graph_info").addClass("advance");
            // } else {
            //     $("#compare_navbottom_left .graph_info li:eq(1)").html("F");
            //     $("#compare_navbottom_right .graph_info li:eq(1)").html("F");
            //     $("#compare_navbottom_left .graph_info").removeClass("advance");
            //     $("#compare_navbottom_right .graph_info").removeClass("advance");
            // }
            this.compareChart();
            this.setPostionCompare();
            this.setActiveCompare();
        },
        setActiveCompare: function() {
            $("#compare_navbottom_left .listactbtn li").removeClass("active");
            $("#compare_navbottom_right .listactbtn li").removeClass("active");
            $("#compare_navbottom_left .graph_info li").removeClass("active");
            $("#compare_navbottom_right .graph_info li").removeClass("active");
            switch ( this.typeDateCompare ) {
                case "week":
                    $("#compare_navbottom_left .listactbtn li:eq(0)").addClass("active");
                    $("#compare_navbottom_right .listactbtn li:eq(0)").addClass("active");
                    break;
                case "month":
                    $("#compare_navbottom_left .listactbtn li:eq(1)").addClass("active");
                    $("#compare_navbottom_right .listactbtn li:eq(1)").addClass("active");
                    break;
                case "year":
                    $("#compare_navbottom_left .listactbtn li:eq(2)").addClass("active");
                    $("#compare_navbottom_right .listactbtn li:eq(2)").addClass("active");
                    break;
            };
            switch ( this.typeCompare ) {
                case "all":
                    $("#compare_navbottom_left .graph_info li").addClass("active");
                    $("#compare_navbottom_right .graph_info li").addClass("active");
                    break;
                case "M":
                case "M1":
                    $("#compare_navbottom_left .graph_info li:eq(0)").addClass("active");
                    $("#compare_navbottom_right .graph_info li:eq(0)").addClass("active");
                    break;
                case "F":
                case "N":
                    $("#compare_navbottom_left .graph_info li:eq(1)").addClass("active");
                    $("#compare_navbottom_right .graph_info li:eq(1)").addClass("active");
                    break;
            };
            if ( this.typeRC === "range" ) {
                $("#compare_navbottom_left .listactbtn li").removeClass("active");
                $("#compare_navbottom_left .listactbtn li:eq(3)").addClass("active");
                $("#compare_navbottom_right .listactbtn li").removeClass("active");
                $("#compare_navbottom_right .listactbtn li:eq(3)").addClass("active");
            }
        },
        closeCompare: function(e) {
            e.preventDefault();
            this.clearAllChart();
            $(".page_slider #calendar-btn").removeClass("active");
            $(".bottom_bar .graph_info li").removeClass("disable");
            this.typeRC = "";
            this.emptyData = "";
            this.classBottom = "";
            this.compareType = "";
            this.setActiveBottomLeft();
            this.fetchDataGraphic();
            $('.block-average').removeClass('pos-compare');
            // if ( this.topMenuType === "advance" ) {
            //     $(".advance-chart").show();
            // }
            // if ( $('.top_menu li').eq(0).hasClass('active') ) {
            //     $(".subscribers-wrapper.out-compare").show();
            //     $(".subscribers-wrapper.in-compare").hide();
            // }
            this.showPartOfChart();
        },
        getGrowthChart: function(container) {
            this.emptyData = "";
            var categories = [];
            var totalCount = 0;
            for ( var i = 1; i <= 32; i++ ) {
                categories.push(i);
            }
            var dataGrowth = [];
            dataGrowth.push(this.analysisModel.getGrowth().growth1);
            dataGrowth.push(this.analysisModel.getGrowth().growth2);
            dataGrowth.push(this.analysisModel.getGrowth().growth3);
            dataGrowth.push(this.analysisModel.getGrowth().growth4);
            dataGrowth.push(this.analysisModel.getGrowth().growth5);
            dataGrowth.push(this.analysisModel.getGrowth().growth6);
            dataGrowth.push(this.analysisModel.getGrowth().growth7);
            dataGrowth.push(this.analysisModel.getGrowth().growth8);
            dataGrowth.push(this.analysisModel.getGrowth().growth9);
            dataGrowth.push(this.analysisModel.getGrowth().growth10);
            dataGrowth.push(this.analysisModel.getGrowth().growth11);
            dataGrowth.push(this.analysisModel.getGrowth().growth12);
            dataGrowth.push(this.analysisModel.getGrowth().growth13);
            dataGrowth.push(this.analysisModel.getGrowth().growth14);
            dataGrowth.push(this.analysisModel.getGrowth().growth15);
            dataGrowth.push(this.analysisModel.getGrowth().growth16);
            dataGrowth.push(this.analysisModel.getGrowth().growth17);
            dataGrowth.push(this.analysisModel.getGrowth().growth18);
            dataGrowth.push(this.analysisModel.getGrowth().growth19);
            dataGrowth.push(this.analysisModel.getGrowth().growth20);
            dataGrowth.push(this.analysisModel.getGrowth().growth21);
            dataGrowth.push(this.analysisModel.getGrowth().growth22);
            dataGrowth.push(this.analysisModel.getGrowth().growth23);
            dataGrowth.push(this.analysisModel.getGrowth().growth24);
            dataGrowth.push(this.analysisModel.getGrowth().growth25);
            dataGrowth.push(this.analysisModel.getGrowth().growth26);
            dataGrowth.push(this.analysisModel.getGrowth().growth27);
            dataGrowth.push(this.analysisModel.getGrowth().growth28);
            dataGrowth.push(this.analysisModel.getGrowth().growth29);
            dataGrowth.push(this.analysisModel.getGrowth().growth30);
            dataGrowth.push(this.analysisModel.getGrowth().growth31);
            for ( var i = 0; i < dataGrowth.length; i++ ) {
                totalCount += parseInt(dataGrowth[i]);
            }
            $(".subscribers-wrapper .block-subscribers .number.subscrib").text(totalCount);

            var maxY;
            var typeDateTmp;
            var type;
            if ( this.compareType ) {
                typeDateTmp = this.typeDateCompare;
                type = this.typeCompare;
            } else {
                typeDateTmp = this.typeDate;
                type = this.type;
            }
            maxY = this.setMaxY1(typeDateTmp);

            var growthChart = App.util.highchart.generateChartGrowth({container: container, maxY: maxY, series: dataGrowth, type: type, typeDate: typeDateTmp, topMenuType: this.topMenuType,  chartWidth: $(window).width() - 60, categories: categories});
            this.chart = growthChart;
            if ( this.compareType === "1" || !this.compareType ) {
                this.setPosition();
            }

            if ( !this.typeRC || this.typeRC === "setMonetary" ) {
                this.setDateText();
            }
        },
        generateGrowthEmpty: function(container) {
            var categories = [];
            var dataGrowth = [];
            for ( var i = 1; i <= 32; i++ ) {
                categories.push(i);
                dataGrowth.push(0);
            }
            var maxY;
            var typeDateTmp;
            var type;
            if ( this.compareType ) {
                typeDateTmp = this.typeDateCompare;
                type = this.typeCompare;
            } else {
                typeDateTmp = this.typeDate;
                type = this.type;
            }
            maxY = this.setMaxY1(typeDateTmp);

            var growthChart = App.util.highchart.generateChartGrowth({container: container, maxY: maxY, series: dataGrowth, type: type, typeDate: typeDateTmp, topMenuType: this.topMenuType,  chartWidth: $(window).width() - 60, categories: categories});
            this.chart = "";
            if ( this.compareType === "1" || !this.compareType ) {
                this.setPosition();
            }

            if ( !this.typeRC || this.typeRC === "setMonetary" ) {
                this.setDateText();
            }
        },
        getDemoGraphic: function(container) {
            this.emptyData = "";
            var dataArrF = [];
            // var countM = 0;
            // var countF = 0;
            // var totalCount = 0;
            dataArrF.push(this.analysisModel.getDataF().age.age0);
            dataArrF.push(this.analysisModel.getDataF().age.age5);
            dataArrF.push(this.analysisModel.getDataF().age.age10);
            dataArrF.push(this.analysisModel.getDataF().age.age15);
            dataArrF.push(this.analysisModel.getDataF().age.age20);
            dataArrF.push(this.analysisModel.getDataF().age.age25);
            dataArrF.push(this.analysisModel.getDataF().age.age30);
            dataArrF.push(this.analysisModel.getDataF().age.age35);
            dataArrF.push(this.analysisModel.getDataF().age.age40);
            dataArrF.push(this.analysisModel.getDataF().age.age45);
            dataArrF.push(this.analysisModel.getDataF().age.age50);
            dataArrF.push(this.analysisModel.getDataF().age.age55);
            dataArrF.push(this.analysisModel.getDataF().age.age60);
            dataArrF.push(this.analysisModel.getDataF().age.age65);
            dataArrF.push(this.analysisModel.getDataF().age.age70);
            dataArrF.push(this.analysisModel.getDataF().age.age75);
            dataArrF.push(this.analysisModel.getDataF().age.age80);
            dataArrF.push(this.analysisModel.getDataF().age.age85);
            dataArrF.push(this.analysisModel.getDataF().age.age90);
            // for ( var i = 0; i < dataArrF.length; i++ ) {
            //     countF += parseInt(dataArrF[i]);
            // }

            var dataArrM = [];
            dataArrM.push(this.analysisModel.getDataM().age.age0);
            dataArrM.push(this.analysisModel.getDataM().age.age5);
            dataArrM.push(this.analysisModel.getDataM().age.age10);
            dataArrM.push(this.analysisModel.getDataM().age.age15);
            dataArrM.push(this.analysisModel.getDataM().age.age20);
            dataArrM.push(this.analysisModel.getDataM().age.age25);
            dataArrM.push(this.analysisModel.getDataM().age.age30);
            dataArrM.push(this.analysisModel.getDataM().age.age35);
            dataArrM.push(this.analysisModel.getDataM().age.age40);
            dataArrM.push(this.analysisModel.getDataM().age.age45);
            dataArrM.push(this.analysisModel.getDataM().age.age50);
            dataArrM.push(this.analysisModel.getDataM().age.age55);
            dataArrM.push(this.analysisModel.getDataM().age.age60);
            dataArrM.push(this.analysisModel.getDataM().age.age65);
            dataArrM.push(this.analysisModel.getDataM().age.age70);
            dataArrM.push(this.analysisModel.getDataM().age.age75);
            dataArrM.push(this.analysisModel.getDataM().age.age80);
            dataArrM.push(this.analysisModel.getDataM().age.age85);
            dataArrM.push(this.analysisModel.getDataM().age.age90);
            // for ( var i = 0; i < dataArrM.length; i++ ) {
            //     countM += parseInt(dataArrM[i]);
            // }

            // switch ( this.type ) {
            //     case "all":
            //         totalCount = countM + countF;
            //         $(".subscribers-wrapper .block-subscribers .number.male").show();
            //         $(".subscribers-wrapper .block-subscribers .number.female").show();
            //         break;
            //     case "F":
            //         totalCount = countF;
            //         $(".subscribers-wrapper .block-subscribers .number.male").hide();
            //         $(".subscribers-wrapper .block-subscribers .number.female").hide();
            //         break;
            //     case "M":
            //         totalCount = countM;
            //         $(".subscribers-wrapper .block-subscribers .number.male").hide();
            //         $(".subscribers-wrapper .block-subscribers .number.female").hide();
            //         break;
            // };
            // $(".subscribers-wrapper .block-subscribers .number.male").text(countM);
            // $(".subscribers-wrapper .block-subscribers .number.female").text(countF);
            // $(".subscribers-wrapper .block-subscribers .number.subscrib").text(totalCount);

            this.setCountSubscribes(dataArrF, dataArrM, this.type);
            var maxY;
            var typeDateTmp;
            var type;
            if ( this.compareType ) {
                typeDateTmp = this.typeDateCompare;
                type = this.typeCompare;
            } else {
                typeDateTmp = this.typeDate;
                type = this.type;
            }
            maxY = this.setMaxY1(typeDateTmp);

            var demoGraphicChart = App.util.highchart.generateChartDemoGraphic({container: container, maxY: maxY, dataM: dataArrM, dataF: dataArrF, type: type, typeDate: typeDateTmp, topMenuType: this.topMenuType,  chartWidth: $(window).width() - 60});
            this.chart = demoGraphicChart;
            if ( this.compareType === "1" || !this.compareType ) {
                this.setPosition();
            }

            if ( !this.typeRC || this.typeRC === "setMonetary" ) {
                this.setDateText();
            }
        },
        generateDemoGraphicEmpty: function(container) {
            var dataArrF = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            var dataArrM = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            var maxY;
            var typeDateTmp;
            var type;
            if ( this.compareType ) {
                typeDateTmp = this.typeDateCompare;
                type = this.typeCompare;
            } else {
                typeDateTmp = this.typeDate;
                type = this.type;
            }
            maxY = this.setMaxY1(typeDateTmp);

            var demoGraphicChart = App.util.highchart.generateChartDemoGraphic({container: container, maxY: maxY, dataM: dataArrM, dataF: dataArrF, type: type, typeDate: typeDateTmp, topMenuType: this.topMenuType,  chartWidth: $(window).width() - 60});
            this.chart = "";
            if ( this.compareType === "1" || !this.compareType ) {
                this.setPosition();
            }

            if ( !this.typeRC || this.typeRC === "setMonetary" ) {
                this.setDateText();
            }
        },
        getStoreChart: function(container) {
            this.emptyData = "";
            var categories = [];
            var totalCount = 0;
            for ( var i = 1; i <= 32; i++ ) {
                if ( i < 10 ) {
                    categories.push("Store0" + i);
                } else {
                    categories.push("Store" + i);
                }
            }
            var dataStore = [];
            dataStore.push(this.analysisModel.getStore().store1);
            dataStore.push(this.analysisModel.getStore().store2);
            dataStore.push(this.analysisModel.getStore().store3);
            dataStore.push(this.analysisModel.getStore().store4);
            dataStore.push(this.analysisModel.getStore().store5);
            dataStore.push(this.analysisModel.getStore().store6);
            dataStore.push(this.analysisModel.getStore().store7);
            dataStore.push(this.analysisModel.getStore().store8);
            dataStore.push(this.analysisModel.getStore().store9);
            dataStore.push(this.analysisModel.getStore().store10);
            dataStore.push(this.analysisModel.getStore().store11);
            dataStore.push(this.analysisModel.getStore().store12);
            dataStore.push(this.analysisModel.getStore().store13);
            dataStore.push(this.analysisModel.getStore().store14);
            dataStore.push(this.analysisModel.getStore().store15);
            dataStore.push(this.analysisModel.getStore().store16);
            dataStore.push(this.analysisModel.getStore().store17);
            dataStore.push(this.analysisModel.getStore().store18);
            dataStore.push(this.analysisModel.getStore().store19);
            dataStore.push(this.analysisModel.getStore().store20);
            dataStore.push(this.analysisModel.getStore().store21);
            dataStore.push(this.analysisModel.getStore().store22);
            dataStore.push(this.analysisModel.getStore().store23);
            dataStore.push(this.analysisModel.getStore().store24);
            dataStore.push(this.analysisModel.getStore().store25);
            dataStore.push(this.analysisModel.getStore().store26);
            dataStore.push(this.analysisModel.getStore().store27);
            dataStore.push(this.analysisModel.getStore().store28);
            dataStore.push(this.analysisModel.getStore().store29);
            dataStore.push(this.analysisModel.getStore().store30);
            dataStore.push(this.analysisModel.getStore().store31);
            for ( var i = 0; i < dataStore.length; i++ ) {
                totalCount += parseInt(dataStore[i]);
            }
            $(".subscribers-wrapper .block-subscribers .number.subscrib").text(totalCount);

            var maxY;
            var typeDateTmp;
            var type;
            if ( this.compareType ) {
                typeDateTmp = this.typeDateCompare;
                type = this.typeCompare;
            } else {
                typeDateTmp = this.typeDate;
                type = this.type;
            }
            maxY = this.setMaxY1(typeDateTmp);

            var storeChart = App.util.highchart.generateChartStores({container: container, maxY: maxY, series: dataStore, type: type, typeDate: typeDateTmp, topMenuType: this.topMenuType,  chartWidth: $(window).width() - 60, categories: categories});
            this.chart = storeChart;
            if ( this.compareType === "1" || !this.compareType ) {
                this.setPosition();
            }

            if ( !this.typeRC ) {
                this.setDateText();
            }
        },
        generateStoreEmpty: function(container) {
            var categories = [];
            var dataStore = [];
            for ( var i = 1; i <= 32; i++ ) {
                if ( i < 10 ) {
                    categories.push("Store0" + i);
                } else {
                    categories.push("Store" + i);
                }
                dataStore.push(0);
            }
            var maxY;
            var typeDateTmp;
            var type;
            if ( this.compareType ) {
                typeDateTmp = this.typeDateCompare;
                type = this.typeCompare;
            } else {
                typeDateTmp = this.typeDate;
                type = this.type;
            }
            maxY = this.setMaxY1(typeDateTmp);

            var storeChart = App.util.highchart.generateChartStores({container: container, maxY: maxY, series: dataStore, type: type, typeDate: typeDateTmp, topMenuType: this.topMenuType,  chartWidth: $(window).width() - 60, categories: categories});
            this.chart = "";
            if ( this.compareType === "1" || !this.compareType ) {
                this.setPosition();
            }

            if ( !this.typeRC || this.typeRC === "setMonetary" ) {
                this.setDateText();
            }
        },
        getRencencyChartD3: function(container) {
            this.emptyData = "";
            var maxCount = this.analysisModel.getMaxCount();
            if(maxCount > 0){
                var categories = this.analysisModel.getCategoriesRecency();
                var dataArrM = [];
                var dataArrF = [];
                $.each(this.analysisModel.getData(), function(index, object) {
                    dataArrM.push(App.util.text.parseNumberToPercent(object.VALUE, maxCount));
                });
                this.setCountSubscribes(dataArrF, dataArrM, this.type, maxCount);
                var data = {dataArrM: dataArrM};
                var typeDateTmp;
                var type;
                if ( this.compareType ) {
                    typeDateTmp = this.typeDateCompare;
                    type = this.typeCompare;
                } else {
                    typeDateTmp = this.typeDate;
                    type = this.type;
                }
                var recencyChart = App.util.d3Chart.generateGroupedBarChart({container: container, data: data, maxCount: maxCount, type: type, typeDate: typeDateTmp, topMenuType: this.topMenuType, categories: categories, chartWidth: $(window).width() - 60, chartHeight: 520, chartFlg: "detail"});
                this.chart = recencyChart;
                this.setPositionD3();
            } else {
                this.setEmptyData();
            }
            if ( !this.typeRC || this.typeRC === "setMonetary" ) {
                this.setDateText();
            }
        },
        getFrequencyChartD3: function(container) {
            this.emptyData = "";
            var maxCount = this.analysisModel.getMaxCount();
            if(maxCount > 0){
                var categories = this.analysisModel.getCategories();
                var dataArrF = [];
                $.each(this.analysisModel.getDataF(), function(index, object) {
                    dataArrF.push(App.util.text.parseNumberToPercent(object.VALUE, maxCount));
                }); 
                var dataArrM = [];
                $.each(this.analysisModel.getDataM(), function(index, object) {
                    dataArrM.push(App.util.text.parseNumberToPercent(object.VALUE, maxCount));
                }); 
                this.setCountSubscribes(dataArrF, dataArrM, this.type, maxCount);
                var typeDateTmp;
                var type;
                var data;
                if ( this.compareType ) {
                    typeDateTmp = this.typeDateCompare;
                    type = this.typeCompare;
                } else {
                    typeDateTmp = this.typeDate;
                    type = this.type;
                }
                if (type == "all") {
                    data = {dataArrM: dataArrM,dataArrF: dataArrF};
                } else  if (type == "F") {
                    data = {dataArrF: dataArrF};
                } else {
                    data = {dataArrM: dataArrM};
                }
                var frequencyChart = App.util.d3Chart.generateGroupedBarChart({container: container, data: data, maxCount: maxCount, type: type, typeDate: typeDateTmp, topMenuType: this.topMenuType, categories: categories, chartWidth: $(window).width() - 60, chartHeight: 520, chartFlg: "detail"});
                this.chart = frequencyChart;
                this.setPositionD3();
            } else {
                this.setEmptyData();
            }
            if ( !this.typeRC || this.typeRC === "setMonetary" ) {
                this.setDateText();
            }
            
            if ( maxCount > 0 ) {
                if ( !this.compareType ) {
                    $("#graph-container").prepend("<p class='times'>" + App.appModel.getLanguageType().analysis.main.times + "</p>");
                } else {
                    if ( this.classBottom === 'leftcol') {
                        $("#before-graph-container").prepend("<p class='times'>" + App.appModel.getLanguageType().analysis.main.times + "</p>");
                    } else if ( this.classBottom === 'rightcol' ) {
                        $("#insert-graph-container").prepend("<p class='times'>" + App.appModel.getLanguageType().analysis.main.times + "</p>");
                    } else {
                        $("#before-graph-container").prepend("<p class='times'>" + App.appModel.getLanguageType().analysis.main.times + "</p>");
                        $("#insert-graph-container").prepend("<p class='times'>" + App.appModel.getLanguageType().analysis.main.times + "</p>");
                    }
                }
            }
        },
        getMonetaryChartD3: function(container) {
            this.emptyData = "";
            var maxCount = this.analysisModel.getMaxCount();
            if(maxCount > 0){
                var categories = this.analysisModel.getCategories();
                var dataArrF = [];
                $.each(this.analysisModel.getDataF(), function(index, object) {
                    dataArrF.push(App.util.text.parseNumberToPercent(object.VALUE, maxCount));
                }); 
                var dataArrM = [];
                $.each(this.analysisModel.getDataM(), function(index, object) {
                    dataArrM.push(App.util.text.parseNumberToPercent(object.VALUE, maxCount));
                }); 
                this.setCountSubscribes(dataArrF, dataArrM, this.type, maxCount);
                var typeDateTmp;
                var type;
                var data;
                if ( this.compareType ) {
                    typeDateTmp = this.typeDateCompare;
                    type = this.typeCompare;
                } else {
                    typeDateTmp = this.typeDate;
                    type = this.type;
                }
                if (type == "all") {
                    data = {dataArrM: dataArrM,dataArrF: dataArrF};
                } else  if (type == "F") {
                    data = {dataArrF: dataArrF};
                } else {
                    data = {dataArrM: dataArrM};
                }
                var monetaryChart = App.util.d3Chart.generateGroupedBarChart({container: container, data:data, maxCount: maxCount, type: type, typeDate: typeDateTmp, topMenuType: this.topMenuType, categories: categories, chartWidth: $(window).width() - 60, chartHeight: 520, chartFlg: "detail"});
                this.chart = monetaryChart;
                this.setPositionD3();
            } else {
                this.setEmptyData();
            }
            if ( !this.typeRC || this.typeRC === "setMonetary" ) {
                this.setDateText();
            }
        },
        getAdvanceChartD3: function(container) {
            this.emptyData = "";
            this.showAdvanceChart(container);

            $(".block-average .list-item").removeClass("active");
            if ( this.type === "M1" ) {
                $(".block-average .monetary .list-item").addClass("active");
            } else {
                $(".block-average .customers .list-item").addClass("active");
            }

            var type;
            if ( this.compareType ) {
                type = this.typeCompare;
            } else {
                type = this.type;
            }

            var yAxis = 7;
            var xAsis = parseInt(this.setXAsixAdvance(yAxis));

            var advanceChart = App.util.d3Chart.generateAdvanceChart({container: container, type: type, chartWidth: $(window).width() - 60, xAsis: xAsis, yAxis: yAxis});
            this.chart = advanceChart;
            $(".advance-chart").show();
            this.setPositionD3();
            if ( !this.typeRC || this.typeRC === "setMonetary" ) {
                this.setDateText();
            }
        },
        getAdvanceChartD3Empty: function(container) {
            $("#graph-container, #advanceChart").html("");
            this.emptyData = "";
            this.showAdvanceChart(container);

            var type;
            if ( this.compareType ) {
                type = this.typeCompare;
            } else {
                type = this.type;
            }

            var yAxis = 7;
            var xAsis = parseInt(this.setXAsixAdvance(yAxis));

            var advanceChart = App.util.highchart.generateAdvanceChart({container: container, type: type, chartWidth: $(window).width() - 60,  xAsis: xAsis, yAxis: yAxis, empty: "empty"});
            this.chart = "";
            this.setPosition();
            if ( !this.typeRC || this.typeRC === "setMonetary" ) {
                this.setDateText();
            }
        },
        setXAsixAdvance: function(yAsix) {
            var h_window = $(window).width() - 60;
            var heightColumn = parseInt((520 / yAsix)) - 9;
            return h_window / heightColumn;
        },
        setPositionD3: function() {
            var pageSliderH = 70;
            var blockAverageH = 55;
            var marginTop = pageSliderH + blockAverageH;
            switch ( this.topMenuType ) {
                case "advance":
                    if ( !this.compareType ) {
                        $('#before-graph-container, #insert-graph-container').css({'margin-top' : marginTop + "px"});
                    }
                    break;
                case "recency":
                    if ( !this.compareType ) {
                        //$('#graph-container').css({'margin-top' : 20 + "px"});
                    }
                    break;
            };
        },
        setPosition: function() {
            $('#graph-container, .twentytwenty-container, .advance-chart').css({'margin-top' : ""});
            $('#before-graph-container, #insert-graph-container').css({'margin-top' : ""});
            var windowH = $(window).height();
            var topH = 50;
            var pageSliderH = 70;
            var bottomH = 40;
            var chartH = $(".highcharts-container").height();
            var marginTop = $('#graph-container').attr('style');
            if ( marginTop ) {
                marginTop = marginTop.split(":")[1];
                marginTop = marginTop.substr(0, marginTop.indexOf('px;'));
            }
            var posTopOutCompare = $('#graph-container').offset().top;
            // if ( this.topMenuType === "growth" ) {
            //     $('.subscribers-wrapper.out-compare').hide();
            // }

            switch ( this.topMenuType ) {
                case "advance":
                    if ( !this.compareType ) {
                        chartH = $('.advance-chart').height();
                    }
                    break;
            };
            var marginH = (windowH - topH - pageSliderH - bottomH - chartH)/2; 
            var h_blockAverage = $('.block-average').height();
            if ( this.compareType ) {
                var position = (marginH / 2 ) + 60;
                if ( position > 0 ) {
                    $('#before-graph-container, #insert-graph-container').css({'margin-top' : (marginH / 2 ) + (50 + h_blockAverage) + "px"});
                }
            } else {
                var position = marginH - 30;
                if ( position > 0 ) {
                    $('#graph-container').css({'margin-top' : marginH - 30 + "px"});
                    // if ( marginTop ) {
                    //     $('#graph-container').css({'margin-top' : marginTop + "px"});
                    //     $('.subscribers-wrapper.out-compare').css({'top' : + posTopOutCompare + marginTop/2 + 'px'});
                    // } else {
                    //     $('#graph-container').css({'margin-top' : marginH - 30 + "px"});
                    //     $('.subscribers-wrapper.out-compare').css({'top' : + posTopOutCompare + position/2 + 'px'});
                    // }
                } else {
                    // $('.subscribers-wrapper.out-compare').css({'top' : + posTopOutCompare -14 + 'px'});
                }
            }
        },
        showModalDateRange: function(e) {
            var _this = $(e.currentTarget);
            this.classBottom = "";
            if ( this.compareType ) {
                this.classBottom = _this.attr("class").split(" ")[0];
            }
            this.modalDateRangeItemView.showModalDateRange();
        },
        hideModalDateRange: function(e) {
            e.preventDefault();
            this.modalDateRangeItemView.hideModalDateRange();
            this.setActiveBottomLeft();
        },
        showModalSelectMonetary: function(e) {
            this.modalSelectMonetaryItemView.showModalMonetary();
        },
        hideModalSelectMonetary: function(e) {
            e.preventDefault();
            this.modalSelectMonetaryItemView.hideModalMonetary();
            this.setActiveBottomLeft();
        },
        setRangeChart: function(e) {
            e.preventDefault();
            this.emptyData = "";
            var fromDate = $("#txtdate1").val();
            var endDate = $("#txtdate2").val();
            this.validationModel.set({fromDate: fromDate, endDate: endDate},{validate:true});

            if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ){
                this.ui.bottomMF.removeClass("disable");
                this.setDateTextRange(fromDate, endDate);
                this.fromDate = App.util.date.formatDate( fromDate ,"YYYY-MM-DD");
                this.endDate = App.util.date.formatDate( endDate ,"YYYY-MM-DD");
                switch ( this.classBottom ) {
                    case "leftcol":
                        this.typeRC = "rangeLeft";
                        $("#compare_navbottom_left .listactbtn li").removeClass("active");
                        $("#compare_navbottom_left .listactbtn li:eq(3)").addClass("active");
                        $("#page_slider1 #calendar-btn").addClass("active");
                        break;
                    case "rightcol":
                        this.typeRC = "rangeRight";
                        $("#compare_navbottom_right .listactbtn li").removeClass("active");
                        $("#compare_navbottom_right .listactbtn li:eq(3)").addClass("active");
                        $("#page_slider2 #calendar-btn").addClass("active");
                        break;
                    default:
                        this.typeRC = "range";
                        $("#default_navbottom .listactbtn li").removeClass("active");
                        $("#default_navbottom .listactbtn li:eq(3)").addClass("active");
                        $("#page_slider #calendar-btn").addClass("active");
                        break;
                };
                this.modalDateRangeItemView.hideModalDateRange();
                this.fetchRangeDate();
            } else {
                this.validationModel.onErrorRangeDate( this.validationModel.validationError );
            }
        },
        setMonetaryChart: function(e) {
            e.preventDefault();
            var startMonetary = $("#txt-start-at").val();
            var endMonetary = $("#txt-increase").val();
            var priceSign = $("#sl-currency").val();
            this.validationModel.set({startMonetary: startMonetary, endMonetary: endMonetary},{validate:true});

            if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ){
                if (this.validationModel.checkSetMonetary(startMonetary, endMonetary)  === true ) {
                    this.typeRC = "setMonetary";
                    this.startMonetary = startMonetary;
                    this.endMonetary = endMonetary;
                    this.ui.bottomMF.removeClass("disable");
                    this.modalSelectMonetaryItemView.hideModalMonetary();
                    this.fetchDataGraphic();
                    // if ( parseInt(endMonetary) === 500 || parseInt(endMonetary) === 1000 ) {
                    //     this.fetchDataGraphic();
                    // } else {
                    //     this.typeRC = "monetaryEmpty";
                    //     this.setEmptyData();
                    // }
                }
            } else {
                this.validationModel.onErrorSetMonetary( this.validationModel.validationError );
            }
        },
        setActiveBottomLeft: function() {
            var container = "";
            if ( !this.typeRC || ( this.emptyData && this.compareType ) ) {
                switch ( this.classBottom ) {
                    case "leftcol":
                        container = "#compare_navbottom_left";
                        break;
                    case "rightcol":
                        container = "#compare_navbottom_right";
                        break;
                    default:
                        if ( this.compareType ) {
                            container = ".navbottom_compare";
                        } else {
                            container = "#default_navbottom";
                        }
                        break;
                };
                $(container + " li").removeClass("active");
                if ( this.typeRC ) {
                    $(container + " li:eq(3)").addClass("active");
                } else {
                    var typeDate;
                    if ( this.compareType ) {
                        typeDate = this.typeDateCompare;
                    } else {
                        typeDate = this.typeDate;
                    }
                    switch ( typeDate ) {
                        case "week":
                            $(container + " li:eq(0)").addClass("active");
                            break;
                        case "year":
                            $(container + " li:eq(2)").addClass("active");
                            break;
                        default:
                            $(container + " li:eq(1)").addClass("active");
                            break;
                    };
                }
            }
        },
        getMaxCount: function(maxCount, typeDate) {
            if ( maxCount == 0 ) {
                switch ( typeDate ) {
                    case "week":
                        switch ( this.topMenuType ) {
                            case "demoGraphics":
                                this.maxCount = 60;
                                break;
                        };
                        break;
                    case "month":
                        switch ( this.topMenuType ) {
                            case "demoGraphics":
                                this.maxCount = 600;
                                break;
                        };
                        break;
                    case "year":
                        switch ( this.topMenuType ) {
                            case "demoGraphics":
                                this.maxCount = 6000;
                                break;
                        };
                };
            }
        },
        setMaxY: function(typeDate) {
            var maxY = 600;
            var count;
            if ( !this.typeRC ) {
                switch ( typeDate ) {
                    case "week":
                        switch ( this.topMenuType ) {
                            case "demoGraphics":
                                maxY = 60;
                                if ( !this.compareType ) {
                                    count = maxY - this.maxCount;
                                    if ( count > 0 ) {
                                        if ( count <= 5 ) {
                                           maxY = maxY + count;
                                        } else {
                                            maxY = 60;
                                        }
                                    } else {
                                        maxY = this.maxCount;
                                    }
                                }
                                break;
                        };
                        break;
                    case "month":
                        switch ( this.topMenuType ) {
                            case "demoGraphics":
                                if ( !this.compareType ) {
                                    count = maxY - this.maxCount;
                                    if ( count > 0 ) {
                                        if ( count <= 50 ) {
                                           maxY = maxY + count;
                                        } else {
                                            maxY = 600;
                                        }
                                    } else {
                                        maxY = this.maxCount;
                                    }
                                    break;
                                }
                        };
                        break;
                    case "year":
                        switch ( this.topMenuType ) {
                            case "demoGraphics":
                                maxY = 6000;
                                if ( !this.compareType ) {
                                    count = maxY - this.maxCount;
                                    if ( count > 0 ) {
                                        if ( count <= 500 ) {
                                           maxY = maxY + count;
                                        } else {
                                            maxY = 6000;
                                        }
                                    } else {
                                        maxY = this.maxCount;
                                    }
                                }
                                break;
                        };
                        break;
                };
            }
            return maxY;
        },
        setMaxY1: function(typeDate) {
            var maxY = 600;
            switch ( typeDate ) {
                case "week":
                    switch ( this.topMenuType ) {
                        case "demoGraphics":
                        case "store":
                            maxY = 60;
                            break;
                        case "growth":
                            maxY = 70;
                            break;
                    };
                    break;
                case "month":
                    switch ( this.topMenuType ) {
                        case "demoGraphics":
                        case "store":
                            maxY = 600;
                            break;
                        case "growth":
                            maxY = 700;
                            break;
                    };
                    break;
                case "year":
                    switch ( this.topMenuType ) {
                        case "demoGraphics":
                        case "store":
                            maxY = 6000;
                            break;
                        case "growth":
                            maxY = 7000;
                            break;
                    };
                    break;
            };
            return maxY;
        },
        setDateText: function() {
            var typeDate;
            var dateText = "";
            var dateTextCompare1 = "";
            var dateTextCompare2 = "";
            $(".page_slider .pre_btn").show();
            $(".page_slider .next_btn").show();
            // this.ui.preButton.show();
            // this.ui.nextButton.show();
            this.ui.weekText.removeClass("show");
            if ( !this.date ) {
                this.date = new Date();
            }
            if ( this.compareType ) {
                typeDate = this.typeDateCompare;
            } else {
                typeDate = this.typeDate;
            }
            if ( this.compareType ) {
                $("#page_slider1 .next_btn").removeClass("disable");
                $("#page_slider2 .next_btn").removeClass("disable");
                if ( this.classBottom !== "leftcol" && this.classBottom !== "rightcol" ) {
                    this.dateCompare2 = this.date;
                    this.setDate(-1);
                }
                if ( App.util.date.isToday(this.dateCompare1) ) {
                    $("#page_slider1 .next_btn").addClass("disable");
                }
                if ( App.util.date.isToday(this.dateCompare2) ) {
                    $("#page_slider2 .next_btn").addClass("disable");
                }
            } else {
                if ( App.util.date.isToday(this.date) ) {
                    $("#page_slider .next_btn").addClass("disable");
                }
            }
            switch ( typeDate ) {
                case "month":
                case "week":
                    if ( this.compareType ) {
                        dateTextCompare1 = App.util.date.formatDate( this.dateCompare1 ,"MMM YYYY");
                        dateTextCompare2 = App.util.date.formatDate( this.dateCompare2 ,"MMM YYYY");
                        if ( typeDate === "week" ) {
                            var startWeek = App.util.date.getStartWeek(this.dateCompare1);
                            var endWeek = App.util.date.getEndWeek(this.dateCompare1);
                            var weekText = App.util.date.formatDate(startWeek, "Do")
                                         + " ~ " + App.util.date.formatDate(endWeek, "Do");
                            $("#page_slider1 .week-text").html(weekText);

                            startWeek = App.util.date.getStartWeek(this.dateCompare2);
                            endWeek = App.util.date.getEndWeek(this.dateCompare2);
                            weekText = App.util.date.formatDate(startWeek, "Do")
                                         + " ~ " + App.util.date.formatDate(endWeek, "Do");
                            $("#page_slider2 .week-text").html(weekText);

                            $("#page_slider1 .week-text").addClass("show");
                            $("#page_slider2 .week-text").addClass("show");
                        }
                    } else {
                        dateText = App.util.date.formatDate( this.date ,"MMM YYYY");
                        if ( typeDate === "week" ) {
                            var startWeek = App.util.date.getStartWeek(this.date);
                            var endWeek = App.util.date.getEndWeek(this.date);
                            var weekText = App.util.date.formatDate(startWeek, "Do")
                                         + " ~ " + App.util.date.formatDate(endWeek, "Do");
                            this.ui.weekText.html(weekText);
                            this.ui.weekText.addClass("show");
                        }
                    }
                    break;
                case "year":
                    if ( this.compareType ) {
                        dateTextCompare1 = App.util.date.formatDate( this.dateCompare1 ,"YYYY" );
                        dateTextCompare2 = App.util.date.formatDate( this.dateCompare2 ,"YYYY");
                    } else {
                        dateText = App.util.date.formatDate( this.date ,"YYYY" );
                    }
                    break;
            };
            if ( this.compareType ) {
                $("#page_slider1 #time_graph").html(dateTextCompare1);
                $("#page_slider2 #time_graph").html(dateTextCompare2);
            } else {
                this.ui.dateText.removeClass("date-range").html(dateText);
            }
        },
        setDateTextRange: function(fromDate, endDate) {
            this.ui.weekText.removeClass("show");
            if ( this.compareType ) {
                switch ( this.classBottom ) {
                    case "leftcol":
                        $("#page_slider1 #time_graph").addClass("font-caledar");
                        $("#page_slider1 .next_btn").hide();
                        $("#page_slider1 .pre_btn").hide();
                        $("#page_slider1 #time_graph").html(App.util.date.formatDate(fromDate, "Do MMM YYYY") + " ~ " + App.util.date.formatDate(endDate, "Do MMM YYYY"));
                        break;
                    case "rightcol":
                        $("#page_slider2 #time_graph").addClass("font-caledar");
                        $("#page_slider2 .next_btn").hide();
                        $("#page_slider2 .pre_btn").hide();
                        $("#page_slider2 #time_graph").html(App.util.date.formatDate(fromDate, "Do MMM YYYY") + " ~ " + App.util.date.formatDate(endDate, "Do MMM YYYY"));
                        break;
                    default:
                        $("#page_slider .next_btn").hide();
                        $("#page_slider .pre_btn").hide();
                        // this.ui.preButton.hide();
                        // this.ui.nextButton.hide();
                        this.ui.dateText.html(App.util.date.formatDate(fromDate, "Do MMM YYYY") + " ~ " + App.util.date.formatDate(endDate, "Do MMM YYYY"));
                        break;
                };
            } else {
                // this.ui.preButton.hide();
                // this.ui.nextButton.hide();
                $("#page_slider .next_btn").hide();
                $("#page_slider .pre_btn").hide();
                this.ui.dateText.addClass("date-range").html(App.util.date.formatDate(fromDate, "Do MMM YYYY") + " ~ " + App.util.date.formatDate(endDate, "Do MMM YYYY"));
            }
        },
        setEmptyData: function() {
            var container = "#default_navbottom";
            if ( this.maxCount <= 0 || this.typeRC ) {
                if ( this.topMenuType === "advance" && !this.compareType ) {
                    $("#advance-chart-region").html("<p class='empty-data'><i class='fa fa-thumbs-o-down' aria-hidden='true'></i>Sorry there is not data available</p>");
                } else {
                    if ( this.compareType ) {
                        switch ( this.classBottom ) {
                            case "leftcol":
                                container = "#compare_navbottom .leftcol";
                                switch ( this.topMenuType ) {
                                    case "growth":
                                        this.generateGrowthEmpty("before-graph-container");
                                        $('.subscribers-wrapper.in-compare.pos-left').hide();
                                        break;
                                    case "demoGraphics":
                                        this.generateDemoGraphicEmpty("before-graph-container");
                                        break;
                                    case "recency":
                                    case "frequency":
                                    case "monetary":
                                        $("#before-graph-container").html("<p class='empty-data'><i class='fa fa-thumbs-o-down' aria-hidden='true'></i>Sorry there is not data available</p>");
                                        break;
                                    case "advance":
                                        this.getAdvanceChartD3Empty("before-graph-container-inner");
                                        break;
                                    case "store":
                                        this.generateStoreEmpty("before-graph-container");
                                        $('.subscribers-wrapper.in-compare.pos-left').hide();
                                        break;
                                };
                                break;
                            case "rightcol":
                                container = "#compare_navbottom .rightcol";
                                switch ( this.topMenuType ) {
                                    case "growth":
                                        this.generateGrowthEmpty("insert-graph-container");
                                        $('.subscribers-wrapper.in-compare.pos-right').hide();
                                        break;
                                    case "demoGraphics":
                                        this.generateDemoGraphicEmpty("insert-graph-container");
                                        break;
                                    case "recency":
                                    case "frequency":
                                    case "monetary":
                                        $("#insert-graph-container").html("<p class='empty-data'><i class='fa fa-thumbs-o-down' aria-hidden='true'></i>Sorry there is not data available</p>");
                                        break;
                                    case "advance":
                                        this.getAdvanceChartD3Empty("insert-graph-container-inner");
                                        break;
                                    case "store":
                                        this.generateStoreEmpty("insert-graph-container");
                                        $('.subscribers-wrapper.in-compare.pos-right').hide();
                                        break;
                                };
                                break;
                            default:
                                switch ( this.topMenuType ) {
                                    case "growth":
                                        this.generateGrowthEmpty("before-graph-container");
                                        this.generateGrowthEmpty("insert-graph-container");
                                        $('.subscribers-wrapper.in-compare.pos-left').hide();
                                        $('.subscribers-wrapper.in-compare.pos-right').hide();
                                        if ( !this.typeRC ) {
                                            this.setActiveCompare();
                                        }
                                        break;
                                    case "store":
                                        this.generateStoreEmpty("before-graph-container");
                                        this.generateStoreEmpty("insert-graph-container");
                                        $('.subscribers-wrapper.in-compare.pos-left').hide();
                                        $('.subscribers-wrapper.in-compare.pos-right').hide();
                                        if ( !this.typeRC ) {
                                            this.setActiveCompare();
                                        }
                                        break;
                                };
                                break;
                        };
                    } else {
                        $("#graph-container").html("<p class='empty-data'><i class='fa fa-thumbs-o-down' aria-hidden='true'></i>Sorry there is not data available</p>");
                    }
                }
                $("#graph-container,#advance-chart-region").css({"margin-top": ""});
                $(container + " .graph_info li").addClass("disable");
                // $(".block-average").hide();
                // this.ui.bottomMF.addClass("disable");
                this.emptyData = "empty";
                this.chart = "";
                if ( !this.compareType ) {
                    $(".subscribers-wrapper.out-compare").hide();
                }
                if ( !this.typeRC || this.typeRC === "setMonetary" ) {
                    this.setDateText();
                }
            }
        },
        setDate: function(number) {
            var typeDate;
            if ( this.compareType ) {
                typeDate = this.typeDateCompare;
            } else {
                typeDate = this.typeDate;
            }
            switch ( typeDate ) {
                case "week":
                    if ( this.compareType ) {
                        switch ( this.compareType ) {
                            case "1":
                                if(this.classBottom){
                                    this.dateCompare1 = App.util.date.setDate(this.dateCompare1,"week", number)._d;
                                    this.fromDate = App.util.date.getStartWeek( this.dateCompare1, "YYYY-MM-DD" );
                                    this.endDate  = App.util.date.getEndWeek( this.dateCompare1, "YYYY-MM-DD" );
                                } else {
                                    this.dateCompare1 = App.util.date.setDate(this.dateCompare2,"week", number)._d;
                                }
                                break;
                            case "0":
                                this.dateCompare2 = App.util.date.setDate(this.dateCompare2,"week", number)._d;
                                this.fromDate = App.util.date.getStartWeek( this.dateCompare2, "YYYY-MM-DD" );
                                this.endDate  = App.util.date.getEndWeek( this.dateCompare2, "YYYY-MM-DD" );
                                break;
                        };
                    } else {
                        this.date = App.util.date.setDate(this.date,"week", number)._d;
                        this.fromDate = App.util.date.getStartWeek(this.date, "YYYY-MM-DD");
                        this.endDate = App.util.date.getEndWeek(this.date, "YYYY-MM-DD");
                    }
                    break;
                case "month":
                    if ( this.compareType ) { 
                        switch ( this.compareType ) {
                            case "1":
                                if(this.classBottom){
                                    this.dateCompare1 = App.util.date.setDate(this.dateCompare1,"month", number)._d;
                                    this.fromDate = App.util.date.getStartMonth( this.dateCompare1, "YYYY-MM-DD" );
                                    this.endDate  = App.util.date.getEndMonth( this.dateCompare1, "YYYY-MM-DD" );
                                } else {
                                    this.dateCompare1 = App.util.date.setDate(this.dateCompare2,"month", number)._d;
                                }
                                break;
                            case "0":
                                this.dateCompare2 = App.util.date.setDate(this.dateCompare2,"month", number)._d;
                                this.fromDate = App.util.date.getStartMonth( this.dateCompare2, "YYYY-MM-DD" );
                                this.endDate  = App.util.date.getEndMonth( this.dateCompare2, "YYYY-MM-DD" );
                                break;
                        };
                    } else {
                        this.date = App.util.date.setDate(this.date,"month", number)._d;
                        this.fromDate = App.util.date.getStartMonth( this.date, "YYYY-MM-DD" );
                        this.endDate  = App.util.date.getEndMonth( this.date, "YYYY-MM-DD" );
                    }
                    break;
                case "year":
                    if ( this.compareType ) {
                        switch ( this.compareType ) {
                            case "1":
                                if(this.classBottom){
                                    this.dateCompare1 = App.util.date.setDate(this.dateCompare1,"year", number)._d;
                                    this.fromDate = App.util.date.getStartYear( this.dateCompare1, "YYYY-MM-DD" );
                                    this.endDate  = App.util.date.getEndYear( this.dateCompare1, "YYYY-MM-DD" );
                                } else {
                                    this.dateCompare1 = App.util.date.setDate(this.dateCompare2,"year", number)._d;
                                }
                                break;
                            case "0":
                                this.dateCompare2 = App.util.date.setDate(this.dateCompare2,"year", number)._d;
                                this.fromDate = App.util.date.getStartYear( this.dateCompare2, "YYYY-MM-DD" );
                                this.endDate  = App.util.date.getEndYear( this.dateCompare2, "YYYY-MM-DD" );
                                break;
                        };
                    } else {
                        this.date = App.util.date.setDate(this.date,"year", number)._d;
                        this.fromDate = App.util.date.getStartYear( this.date, "YYYY-MM-DD" );
                        this.endDate  = App.util.date.getEndYear( this.date, "YYYY-MM-DD" );
                    }
                    break;
            };
        },
        fetchDataGraphic: function() {
            this.date = new Date();
            var typeDate;
            if ( this.compareType ) {
                typeDate = this.typeDateCompare;
                type = this.typeCompare;
            } else {
                typeDate = this.typeDate;
                type = this.type;
            }
            switch ( type ) {
                case "all":
                case "M":
                case "F":
                    switch ( this.topMenuType ) {
                        case "growth":
                            this.fetchEmptyData();
                            break;
                        case "demoGraphics":
                            if ( this.compareType === "1" ) {
                                this.fetchDemoGraphicCompareWeekAll();
                            } else {
                                this.fetchDemoGraphicWeekAll();
                            }
                            break;
                        case "store":
                            this.fetchEmptyData();
                            break;
                        case "recency":
                            this.analysisModel.fetchChartDetail({ typeParam: typeDate, chartIdParam: "Recency" });
                            break;
                        case "frequency":
                            this.analysisModel.fetchChartDetail({ typeParam: typeDate, chartIdParam: "Frequency" });
                            break;
                        case "monetary":
                            this.analysisModel.fetchChartDetail({ typeParam: typeDate, chartIdParam: "Monetary" });
                            break;
                    };    
                    break;
                case "M1":
                case "N":
                    this.fetchAdvanced();
                    break;
            };    
        },
        fetchRangeDate: function() {
            if ( this.compareType ) {
                switch ( this.classBottom ) {
                    case "leftcol":
                        this.compareType = "1";
                        break;
                    case "rightcol":
                        this.compareType = "0";
                        break;
                };
            }
             var typeDate;
            if ( this.compareType ) {
                typeDate = this.typeDateCompare;
            } else {
                typeDate = this.typeDate;
            }
            switch ( this.topMenuType ) {
                case "growth":
                    this.fetchEmptyData();
                    break;
                case "demoGraphics":
                    if ( this.compareType === "1" ) {
                        this.fetchDemoGraphicRangeDate1();
                    } else {
                        this.fetchDemoGraphicRangeDate();
                    }
                    break;
                case "store":
                    this.fetchEmptyData();
                    break;
                case "recency":
                   this.analysisModel.fetchChartDetail({ typeParam: typeDate, chartIdParam: "Recency", fromDate: this.fromDate, endDate: this.endDate  });
                    break;
                case "frequency":
                    this.analysisModel.fetchChartDetail({ typeParam: typeDate, chartIdParam: "Frequency", fromDate: this.fromDate, endDate: this.endDate  });
                    break;
                case "monetary":
                    this.analysisModel.fetchChartDetail({ typeParam: typeDate, chartIdParam: "Monetary", fromDate: this.fromDate, endDate: this.endDate  });
                    break;
                case "advance":
                    this.fetchDataGraphic();
                    // this.getAdvanceChartD3("advanceChart");
                    break;
            };
        },
        fetchAdvanced: function() {
            // this.analysisModel.fetchChartDetail({ typeParam: "month", chartIdParam: "Advance" });//example call API...
            var container = "";
            switch ( this.compareType ) {
                case "0":
                    $("insert-graph-container").html("");
                    $("#insert-graph-container").append("<div class='wrapper-chart'><div id='insert-graph-container-inner'></div><span class='add-xaxis'></span><span class='add-yaxis'></span></div>");
                    container = "insert-graph-container-inner";
                    break;
                case "1":
                    $("before-graph-container").html("");
                    $("#before-graph-container").append("<div class='wrapper-chart'><div id='before-graph-container-inner'></div><span class='add-xaxis'></span><span class='add-yaxis'></span></div>");
                    container = "before-graph-container-inner";
                    break;
                default:
                    container = "advanceChart";
                    break;
            };
            this.getAdvanceChartD3(container);
            if ( this.compareType === "0" && this.classBottom != "leftcol" && this.classBottom != "rightcol" ) {
                this.compareType = "1";
                this.fetchDataGraphic();
            } else if (  this.compareType === "1" && this.classBottom != "leftcol" && this.classBottom != "rightcol" ) {
                this.initCompare();
            }
        },
        toggleSlideMenu: function() {
            if ($("#slide-menu-area").hasClass('open')) {
                $("#slide-menu-area").removeClass('open');
                $("#demo_graphic").removeClass('push-left');
            } else {
                $("#slide-menu-area").addClass('open');
                $("#demo_graphic").addClass('push-left');
            }
        },
        execLogout: function(e){
            e.preventDefault();
            var _this = this;
            this.dialogueCommon.setType("logout");
            var logoutRequest = function(){
                return App.util.bindCommonErrorHandling( App.btApi.logout() );
            };
            App.util.execWithProgressScreen( logoutRequest )
            .done( function(data){
                $("#slide-menu-area").removeClass('open');
                $("#demo_graphic").removeClass('push-left');
                _this.dialogueCommon.showDialogue("", "ログアウトしました");
            });
        },
        hideModalStoreControll: function(e) {
            e.preventDefault();
            $('.modal-store-container').hide();
            $('.group-slt-controll li').removeClass('active');
        },
        modalStoreControllHome: function(e) {
            e.preventDefault();
            this.modalStoreControll(e);
        },
        modalStoreControllEdit: function(e) {
            e.preventDefault();
            this.modalStoreControll(e);
        },
        modalStoreControll: function(e) {
            var self = $(e.currentTarget);
            self = self.parent();

            if (self.hasClass('active')) {
                self.removeClass('active');
            } else {
                self.addClass('active');
            }
            self.children('.modal-store-container').toggle();

            var animationScrollModalStore = function(point) {
                if (point === 1) {
                    self.find('.inner-modal-store').animate({ scrollTop: $(document).height() });
                }
            }

            switch (self.data('store')) {
                case 'home':
                    switch (self.find('.modal-store-container').attr('id')) {
                        case 'modal-store-home-out-compare-region':
                            this.pointHomeOutCompare ++;
                            animationScrollModalStore(this.pointHomeOutCompare);
                            break;
                        case 'modal-store-home-in-compare-region1':
                            this.pointHomeInCompare1 ++;
                            animationScrollModalStore(this.pointHomeInCompare1);
                            break;
                        case 'modal-store-home-in-compare-region2':
                            this.pointHomeInCompare2 ++;
                            animationScrollModalStore(this.pointHomeInCompare2);
                            break;
                    }
                    break;
                case 'edit':
                    switch (self.find('.modal-store-container').attr('id')) {
                        case 'modal-store-edit-out-compare-region':
                            this.pointEditOutCompare ++;
                            animationScrollModalStore(this.pointEditOutCompare);
                            break;
                        case 'modal-store-edit-in-compare-region1':
                            this.pointEditInCompare1 ++;
                            animationScrollModalStore(this.pointEditInCompare1);
                            break;
                        case 'modal-store-edit-in-compare-region2':
                            this.pointEditInCompare2 ++;
                            animationScrollModalStore(this.pointEditInCompare2);
                            break;
                    }
                    break;
            }
        },
        generateCharttopMenuSRFM: function(e) {
            e.preventDefault();
            var _this = $(e.currentTarget);
            var index_li = _this.index();
            this.ui.topMenuSRFM.removeClass("active");
            $("#default_navbottom .listactbtn li").removeClass("active");
            this.ui.calendarButton.removeClass("active");
            $("#slide-menu-area").removeClass('open');
            $("#demo_graphic").removeClass('push-left');
            $('.group-slt-controll li').removeClass('active');
            this.clearAllChart();
            $(".subscribers-wrapper.out-compare").hide();
            $('.modal-store-container.edit').hide();
            $('.modal-store-container.home').hide();
            // this.closePartOfGrowth();
            _this.addClass("active");
            $(".advance-chart").hide();
            $("#default_navbottom .listactbtn li:eq(1)").addClass("active");
            this.date = new Date();
            this.type = "M1";
            this.typeDate = "month";
            this.typeRC = "";
            this.compareType = "";
            // $(".modal-store-container.home").css({"right": "20px"});
            switch ( index_li ) {
                case 0:
                    this.topMenuType = "advance";
                    $('.block-average').show();
                    this.fetchAdvanced();
                    break;
                case 1:
                    this.type = "M";
                    this.topMenuType = "recency";
                    $('.block-average').hide();
                    this.analysisModel.fetchChartDetail({ typeParam: this.typeDate, chartIdParam: "Recency" });
                    // $(".modal-store-container.home").css({"right": "70px"});
                    // $(".group-slt-controll li:eq(1)").show();
                    break;
                case 2:
                    this.type = "all";
                    this.topMenuType = "frequency";
                    $('.block-average').hide();
                    this.analysisModel.fetchChartDetail({ typeParam: this.typeDate, chartIdParam: "Frequency" });
                    // this.showPartOfDemoGraphic();
                    // $(".subscribers-wrapper.out-compare").show();
                    break;
                case 3:
                    this.type = "all";
                    this.topMenuType = "monetary";
                    $('.block-average').hide();
                    this.analysisModel.fetchChartDetail({ typeParam: this.typeDate, chartIdParam: "Monetary" });
                    // this.showPartOfDemoGraphic();
                    // $(".subscribers-wrapper.out-compare").show();
                    break;
            };
            this.showPartOfChart();
        },
        generateChartDefaultBottomMenuLeft: function(e) {
            e.preventDefault();
            var _this = $(e.currentTarget);
            var index_li = _this.index();
            $("#slide-menu-area").removeClass('open');
            $("#demo_graphic").removeClass('push-left');
            $("#default_navbottom .listactbtn li").removeClass("active");
            this.classBottom = "";
            _this.addClass("active");
            if ( index_li === 3 || index_li === 4 ) {
                if ( !this.typeRC ) {
                    this.typeRC = "";
                }
            } else {
                this.typeRC = "";
                this.ui.calendarButton.removeClass("active");
            }
            switch ( index_li ) {
                case 0:
                    this.typeDate = "week";
                    break;
                case 1:
                    this.typeDate = "month";
                    break;
                case 2:
                    this.typeDate = "year";
                    break;
                case 3:
                    this.modalDateRangeItemView.showModalDateRange();
                    break;
                case 4:
                    this.compareType = "compareChart";
                    if ( this.emptyData ) {
                        this.dialogueCommon.setType("emptyData");
                        this.dialogueCommon.showDialogue("データなし","データがないから、グラフを比較できません。");
                        this.typeDateCompare = this.typeDate;
                        this.setActiveBottomLeft();
                        this.compareType = "";
                    } else {
                        this.emptyData = "";
                        this.compareType = "0";
                        this.typeCompare = this.type;
                        this.typeDateCompare = this.typeDate;
                        this.typeRC = "";
                        if ( this.topMenuType === "advance" ) {
                            $("#advanceChart").html("");
                            $(".advance-chart").hide();
                            $('.block-average').addClass('pos-compare');
                        }
                        this.fetchDataGraphic();
                    }
                    break;
            };
            if ( index_li != 3 && index_li != 4 ) {
                this.fetchDataGraphic();
            }
            if ( !this.emptyData ) {
                this.showPartOfChart();
            }
        },
        generateChartCompareBottomMenuLeft: function(e) {
            e.preventDefault();
            this.generateChartCompareBottomMenu(e, "leftcol");
        },
        generateChartCompareBottomMenuRight: function(e) {
            e.preventDefault();
            this.generateChartCompareBottomMenu(e, "rightcol");
        },
        generateChartCompareBottomMenu: function(e, position) {
            var _this = $(e.currentTarget);
            var index_li = _this.index();
            $("#slide-menu-area").removeClass('open');
            $("#demo_graphic").removeClass('push-left');
            this.compareType = "0";
            this.classBottom = "";
            _this.addClass("active");
            if ( index_li === 3 ) {
                if ( !this.typeRC ) {
                    this.typeRC = "";
                }
            } else {
                this.typeRC = "";
                this.ui.calendarButton.removeClass("active");
            }
            if ( this.typeRC || index_li === 3 ) {
                this.classBottom = position;
            }
            switch ( index_li ) {
                case 0:
                    this.typeDateCompare = "week";
                    break;
                case 1:
                    this.typeDateCompare = "month";
                    break;
                case 2:
                    this.typeDateCompare = "year";
                    break;
                case 3:
                    this.modalDateRangeItemView.showModalDateRange();
                    break;
            };
            if ( index_li != 3 ) {
                this.fetchDataGraphic();
            }
            this.showPartOfChartCompare();
        },
        generateDefaultBottomMF: function(e) {
            e.preventDefault();
            var _this = $(e.currentTarget);
            var flg = "";
            var index_li = _this.index();
            if ( !this.typeRC ) {
                this.ui.calendarButton.removeClass("active");
            }
            var activeClass = "";
            if ( index_li === 0 ) {
                activeClass = $("#default_navbottom .graph_info li:eq(1)").hasClass("active");
                if ( _this.hasClass("active") ) {
                    if ( activeClass ) {
                        _this.removeClass("active");
                        this.type = "F";
                    } else {
                        flg = "0";
                    }
                } else {
                    _this.addClass("active");
                    if ( activeClass ) {
                        this.type = "all";
                    } else {
                        this.type = "M";
                    }
                }
            } else {
                activeClass = $("#default_navbottom .graph_info li:eq(0)").hasClass("active");
                if ( _this.hasClass("active") ) {
                    if ( activeClass ) {
                        _this.removeClass("active");
                        this.type = "M";
                    } else {
                        flg = "0";
                    }
                } else {
                    _this.addClass("active");
                    if ( activeClass ) {
                        this.type = "all";
                    } else {
                        this.type = "F";
                    }
                }
            }
            if ( !flg ) {
                if ( this.typeRC ) {
                    this.fetchRangeDate();
                } else {
                    this.fetchDataGraphic();
                }
            }
        },
        generateCompareBottomMF: function(e) {
            e.preventDefault();
            var _this = $(e.currentTarget);
            var flg = "";
            var index_li = _this.index();
            var container = "";
            if ( !this.typeRC ) {
                this.ui.calendarButton.removeClass("active");
            }
            switch ( this.typeRC ) {
                case "rangeLeft":
                case "rangeRight":
                    this.classBottom = _this.parent().attr("id");
                    if ( this.classBottom === "leftcol" ) {
                        container = "#compare_navbottom_left";
                    } else {
                        container = "#compare_navbottom_right";
                    }
                    break;
                default:
                    container = ".navbottom_compare";
                    this.classBottom = "";
                    this.compareType = "0";                    
                    break;
            };
            if ( index_li === 0 ) {
                activeClass = $(container + " .graph_info li:eq(1)").hasClass("active");
                if ( _this.hasClass("active") ) {
                    if ( activeClass ) {
                        _this.removeClass("active");
                        this.typeCompare = "F";
                    } else {
                        flg = "0";
                    }
                } else {
                    _this.addClass("active");
                    if ( activeClass ) {
                        this.typeCompare = "all";
                    } else {
                        this.typeCompare = "M";
                    }
                }
            } else {
                activeClass = $(container + " .graph_info li:eq(0)").hasClass("active");
                if ( _this.hasClass("active") ) {
                    if ( activeClass ) {
                        _this.removeClass("active");
                        this.typeCompare = "M";
                    } else {
                        flg = "0";
                    }
                } else {
                    _this.addClass("active");
                    if ( activeClass ) {
                        this.typeCompare = "all";
                    } else {
                        this.typeCompare = "F";
                    }
                }
            }
            this.type = this.typeCompare;
            if ( !flg ) {
                if ( this.typeRC ) {
                    this.fetchRangeDate();
                } else {
                    this.fetchDataGraphic();
                }
            }
        },
        changeAdvanceChart: function(e) {
            e.preventDefault();
            var _this = $(e.currentTarget);
            var className = _this.parent().parent().attr("class").split(" ")[1];
            if ( className === "monetary" ) {
                this.type = "M1";
            } else {
                this.type = "N";
            }
            this.fetchAdvanced();
        },
        handleDefaultPre: function(e) {
            e.preventDefault();
            var _this = $(e.currentTarget);
            $(".page_slider .next_btn").removeClass("disable");
            $(".page_slider .graph_info li").removeClass("disable");
            this.setDate(-1);
            this.ui.bottomMF.removeClass("disable");
            if ( this.typeRC === "monetaryEmpty" ) {
                this.fetchEmptyData();
            } else {
                this.fetchRangeDate();
            }
            this.setDateText();
            this.showPartOfChart();
        },
        handleDefaultNext: function(e) {
            e.preventDefault();
            var _this = $(e.currentTarget);
            $(".page_slider .next_btn").removeClass("disable");
            this.setDate(1);
            this.ui.bottomMF.removeClass("disable");
            if ( this.typeRC === "monetaryEmpty" ) {
                this.fetchEmptyData();
            } else {
                var typeDate;
                if ( this.compareType ) {
                    typeDate = this.typeDateCompare;
                } else {
                    typeDate = this.typeDate;
                }            
                if( (typeDate == "month" && App.util.date.isThisMonth(this.date)) || (typeDate == "week" && App.util.date.isThisWeek(this.date)) || (typeDate == "year" && App.util.date.isThisYear(this.date))){
                    this.fetchDataGraphic();
                } else {
                    this.fetchRangeDate();
                }
            }
            this.setDateText();
            this.showPartOfChart();
        },
        handlePreLeft: function(e) {
            e.preventDefault();
            this.classBottom = "leftcol";
            this.handlePreCompare("leftcol");
        },
        handleNextLeft: function(e) {
            e.preventDefault();
            this.classBottom = "leftcol";
            this.handleNextCompare("leftcol");
        },
        handlePreRight: function(e) {
            e.preventDefault();
            this.classBottom = "rightcol";
            this.handlePreCompare("rightcol");
        },
        handleNextRight: function(e) {
            e.preventDefault();
            this.classBottom = "rightcol";
            this.handleNextCompare("rightcol");
        },
        handlePreCompare: function(position) {
            var container = "";
            $(".page_slider .next_btn").removeClass("disable");
            $(".page_slider .graph_info li").removeClass("disable");
            this.ui.bottomMF.removeClass("disable");
            switch ( position ) {
                case "leftcol":
                    this.compareType = "1";
                    this.container = "#before-graph-container";
                    // this.date = this.dateCompare1;
                    break;
                case "rightcol":
                    this.compareType = "0";
                    this.container = "#insert-graph-container";
                    // this.date = this.dateCompare2;
                    break;
            };
            this.setDate(-1);
            this.fetchRangeDate();
            this.setDateText();
        },
        handleNextCompare: function(position) {
            var container = "";
            this.classBottom = position;
            $(".page_slider .next_btn").removeClass("disable");
            this.ui.bottomMF.removeClass("disable");
            switch ( position ) {
                case "leftcol":
                    this.compareType = "1";
                    this.container = "#before-graph-container";
                    // this.date = this.dateCompare1;
                    break;
                case "rightcol":
                    this.compareType = "0";
                    this.container = "#insert-graph-container";
                    // date = this.dateCompare2;
                    break;
            };
            this.setDate(1);
            this.fetchRangeDate();
            this.setDateText();
        },
        closePartOfGrowth: function() {
            $("#default_navbottom .graph_info").hide();
            $("#default_navbottom .block-subscribers .demo-box").hide();
            $("#default_navbottom .group-slt-controll li:eq(1)").hide();
        },
        showPartOfDemoGraphic: function() {
            $("#default_navbottom .graph_info").show();
            $("#default_navbottom .graph_info li").removeClass("active");
            $("#default_navbottom .block-subscribers .demo-box").show();
            $("#default_navbottom .group-slt-controll li:eq(1)").hide();
            switch ( this.type ) {
                case "all":
                    $("#default_navbottom .graph_info li").addClass("active");
                    break;
                case "M":
                    $("#default_navbottom .graph_info li:eq(0)").addClass("active");
                    break;
                case "F":
                    $("#default_navbottom .graph_info li:eq(1)").addClass("active");
                    break;
            };

        },
        setCountSubscribes: function(dataArrF, dataArrM, type, maxCount) {
            var countM = 0;
            var countF = 0;
            var totalCount = 0;
            for ( var i = 0; i < dataArrF.length; i++ ) {
                if ( this.topMenuType === "recency" || this.topMenuType === "frequency" || this.topMenuType === "monetary" ) {
                    countF += parseInt(App.util.text.parsePercentToNumber(dataArrF[i], maxCount));
                } else {
                    countF += parseInt(dataArrF[i]);
                }
            }

            for ( var i = 0; i < dataArrM.length; i++ ) {
                if ( this.topMenuType === "recency" || this.topMenuType === "frequency" || this.topMenuType === "monetary" ) {
                    countM += parseInt(App.util.text.parsePercentToNumber(dataArrM[i], maxCount));
                } else {
                    countM += parseInt(dataArrM[i]);
                }
            }

            switch ( type ) {
                case "all":
                    totalCount = countM + countF;
                    $(".subscribers-wrapper .block-subscribers .number.male").show();
                    $(".subscribers-wrapper .block-subscribers .number.female").show();
                    break;
                case "F":
                    totalCount = countF;
                    $(".subscribers-wrapper .block-subscribers .number.male").hide();
                    $(".subscribers-wrapper .block-subscribers .number.female").hide();
                    break;
                case "M":
                    totalCount = countM;
                    $(".subscribers-wrapper .block-subscribers .number.male").hide();
                    $(".subscribers-wrapper .block-subscribers .number.female").hide();
                    break;
            };
            if (this.compareType && this.compareType == 1 ) {
                $(".subscribers-wrapper.pos-left .block-subscribers .number.male").text(countM);
                $(".subscribers-wrapper.pos-left .block-subscribers .number.female").text(countF);
                $(".subscribers-wrapper.pos-left .block-subscribers .number.subscrib").text(totalCount);
            } else if(this.compareType && this.compareType == 0){
                $(".subscribers-wrapper.pos-right .block-subscribers .number.male").text(countM);
                $(".subscribers-wrapper.pos-right .block-subscribers .number.female").text(countF);
                $(".subscribers-wrapper.pos-right .block-subscribers .number.subscrib").text(totalCount);
            } else {
                $(".subscribers-wrapper .block-subscribers .number.male").text(countM);
                $(".subscribers-wrapper .block-subscribers .number.female").text(countF);
                $(".subscribers-wrapper .block-subscribers .number.subscrib").text(totalCount);
            }
        },
        showPartOfChart: function() {
            $(".modal-store-container.home").css({"right": "20px"});
            $(".subscribers-wrapper.out-compare").show();
            $(".subscribers-wrapper.out-compare .demo-box").hide();
            $("#default_navbottom .graph_info").hide();
            $("#default_navbottom .graph_info li").addClass("active");
            $("#default_navbottom .group-slt-controll li:eq(1)").hide();
            // $('.block-average').hide();
            // $(".group-slt-controll li:eq(1)").hide();
            switch ( this.topMenuType ) {
                case "growth":
                case "store":
                    this.closePartOfGrowth();
                    $(".subscribers-wrapper.out-compare").show();
                    break;
                case "advance":
                    this.closePartOfGrowth();
                    $(".subscribers-wrapper.out-compare").hide();
                    // $('.block-average').show();
                    break;
                case "demoGraphics":
                    this.showPartOfDemoGraphic();
                    $(".subscribers-wrapper.out-compare").show();
                    $("#default_navbottom .graph_info").show();
                    $(".subscribers-wrapper.out-compare .demo-box").show();
                    break;
                case "recency":
                    $(".modal-store-container.home").css({"right": "70px"});
                    $("#default_navbottom .group-slt-controll li:eq(1)").show();
                    break;
                case "frequency":
                case "monetary":
                    this.showPartOfDemoGraphic();
                    $(".subscribers-wrapper.out-compare").show();
                    $("#default_navbottom .graph_info").show();
                    $(".subscribers-wrapper.out-compare .demo-box").show();
                    break;
            };
        },
        showPartOfChartCompare: function() {
            // $(".modal-store-container.home").css({"right": "20px"});
            // $(".subscribers-wrapper.out-compare").show();
            // $(".group-slt-controll li:eq(1)").hide();
            $("#compare_navbottom_right .graph_info, #compare_navbottom_left .graph_info").hide();
            $("#compare_navbottom_right .group-slt-controll li:eq(1)").hide();
            $("#compare_navbottom_left .group-slt-controll li:eq(1)").hide();
            $(".subscribers-wrapper.out-compare").hide();
            $(".subscribers-wrapper.in-compare.pos-left").hide();
            $(".subscribers-wrapper.in-compare.pos-right").hide();
            // $('.block-average').hide();
            switch ( this.topMenuType ) {
                case "growth":
                case "store":
                    $(".subscribers-wrapper.in-compare.pos-left").show();
                    $(".subscribers-wrapper.in-compare.pos-right").show();
                    $(".subscribers-wrapper.in-compare.pos-left .demo-box").hide();
                    $(".subscribers-wrapper.in-compare.pos-right .demo-box").hide();
                    // this.closePartOfGrowth();
                    // $(".subscribers-wrapper.out-compare").show();
                    break;
                case "advance":
                    // $('.block-average').show();
                    // $("#compare_navbottom_right .group-slt-controll li:eq(1)").hide();
                    // $("#compare_navbottom_left .group-slt-controll li:eq(1)").hide();
                    // this.closePartOfGrowth();
                    // $(".subscribers-wrapper.out-compare").hide();
                    break;
                case "demoGraphics":
                    $("#compare_navbottom_right .graph_info, #compare_navbottom_left .graph_info").show();
                    $(".subscribers-wrapper.in-compare.pos-left").show();
                    $(".subscribers-wrapper.in-compare.pos-right").show();
                    $(".subscribers-wrapper.in-compare.pos-left .demo-box").show();
                    $(".subscribers-wrapper.in-compare.pos-right .demo-box").show();
                    // $("#compare_navbottom_right .group-slt-controll li:eq(1)").hide();
                    // $("#compare_navbottom_left .group-slt-controll li:eq(1)").hide();
                    // this.showPartOfDemoGraphic();
                    // $(".subscribers-wrapper.out-compare").show();
                    break;
                case "recency":
                    $(".subscribers-wrapper.in-compare.pos-left").show();
                    $(".subscribers-wrapper.in-compare.pos-right").show();
                    $(".subscribers-wrapper.in-compare.pos-left .demo-box").hide();
                    $(".subscribers-wrapper.in-compare.pos-right .demo-box").hide();
                    $("#compare_navbottom_right .group-slt-controll li:eq(1)").show();
                    $("#compare_navbottom_left .group-slt-controll li:eq(1)").show();
                    // $(".modal-store-container.home").css({"right": "70px"});
                    // $(".group-slt-controll li:eq(1)").show();
                    break;
                case "frequency":
                case "monetary":
                    $(".subscribers-wrapper.in-compare.pos-left").show();
                    $(".subscribers-wrapper.in-compare.pos-right").show();
                    $(".subscribers-wrapper.in-compare.pos-left .demo-box").show();
                    $(".subscribers-wrapper.in-compare.pos-right .demo-box").show();
                    $("#compare_navbottom_right .graph_info, #compare_navbottom_left .graph_info").show();
                    // this.showPartOfDemoGraphic();
                    // $(".subscribers-wrapper.out-compare").show();
                    break;
            };
        }
    });

    return MainNavView;

})();