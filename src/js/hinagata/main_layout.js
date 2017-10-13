var Backbone = require('backbone');
var SidebarView = require('./sidebar/sidebar_item_view');
var DataModel = require('./models/data_model.js');
module.exports = (function() {

    var MainLayout = Backbone.Marionette.LayoutView.extend({
        template: require('./main_layout.html'),
        regions: {
            "sidebarRegion": "#sidebar-left",
            "dialogueCommonRegion": "#dialogue-common-region"
        },
        ui: {
            "masterContainer": "#master-container"
        },
        events: function() {
            return (applican.config.device_os === "IOS") ? {
                "touchend #sidebar-left .showPopupUser": "showPopupUser",
                "touchend #userAction li": "userAction",
                "touchend #sidebar-left #navi_main li": "selectMenu",
                "touchend #sidebar-left .showSideBar": "showSideBar"
            } : {
                "click #sidebar-left .showPopupUser": "showPopupUser",
                "click #userAction li": "userAction",
                "click #sidebar-left #navi_main li": "selectMenu",
                "click #sidebar-left .showSideBar": "showSideBar"
            }
        },
        initialize: function() {
            this.sidebarView = new SidebarView({
                sidebarModel: App.sidebarModel
            });
            this.listenTo(App.sidebarModel, "showSidebarModel", this.showSideBar);

            this.dataModel = new DataModel({ id: AppConf.core.localStorageKey });
            this.dataModel.safeFetch();
            this.dataModel.destroy();

            AppConf.webConf.sessionId = this.getUrlParameter('p');
			// AppConf.webConf.segmentId = this.getUrlParameter('segmentId');
            AppConf.webConf.segmentIdFromUrl = this.getUrlParameter('segmentId');

            // prevent F5 or reload window on popup
            if(AppConf.webConf.segmentIdFromUrl){
                $(document).on('keydown', function(event){
                    if (event.keyCode == 116) {
                        // key F5
                        event.preventDefault();
                        return false;
                    }
                    if (event.ctrlKey) {
                        if (event.keyCode == 82) {
                            // key R
                            event.preventDefault();
                            return false;
                        }
                    }
                });
            }
            AppConf.chart.sessionId = this.getUrlParameter('p');

            // AppConf.mail.sessionId = this.getUrlParameter('p');
            // AppConf.mail.segmentId = App.util.common.getUrlParameter('segmentId');
        },
        onRender: function() {            
            // App.btApi.getLanguage().done(function(res) {
            //     if(res.languageType == "en" || res.languageType == "ja"){
            //         App.appModel.setLanguage(res.languageType);  
            //         // App.appModel.setLanguage("en");   
            //     } else {
            //         App.appModel.setLanguage("ja");
            //     }
            // });

            // this.sidebarRegion.show(this.sidebarView);
            // this.dialogueCommonRegion.show(App.dialogueCommon);
        },
        renderSideBarAndDialogueCommon: function() {
            this.sidebarRegion.show(this.sidebarView);
            this.dialogueCommonRegion.show(App.dialogueCommon);
        },
        showPopupUser: function(e) {
            if ($('#sidebar-left .menu_user_log').is(':visible')) {
                $("#sidebar-left .menu_user_log").hide();
            } else {
                $("#sidebar-left .menu_user_log").show();
            }
        },
        userAction: function(e) {
            var _this = $(e.currentTarget);
            var index = $(_this).index();
            switch (index) {
                case 0:
                    App.dialogueCommon.execLogout();
                    break;
                case 1:
                    break;
            };
        },
        selectMenu: function(e) {
            e.preventDefault();
            var _this = $(e.currentTarget);
            var index = $(_this).index();
            $("#sidebar-left .navi_main li").removeClass("active");
            _this.addClass("active");
            $(".main_screen").removeClass("show");
            App.dialogueCommon.closeSideBar();
            var router;
            switch (index) {
                case 0:
                    router = "chartBoard";
                    break;
                case 1:
                    router = "workflow-mail";
                    break;
                case 2:
                    router = "workflow-coupon";
                    break;
                case 4:
                    router = "analysis";
                    break;
                case 5:
                    router = "notification";
                    break;
            };
            if (index !== 3) {
                location.hash = router;
            }
        },
        showSideBar: function(e) {
            // e.preventDefault();
            $("#sidebar-left").toggleClass("show");
            if ($("#sidebar-left").hasClass('show')) {
                $("#main_nav_bottom li:last-child i").attr("class", "fa fa-angle-double-left fa-lg showSideBar");
                $(".main_screen").addClass("show");
            } else {
                $("#main_nav_bottom li:last-child i").attr("class", "fa fa-angle-double-right fa-lg showSideBar");
                $(".main_screen").removeClass("show");
            }
        },
        getUrlParameter: function(name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    });

    return MainLayout;
})();
