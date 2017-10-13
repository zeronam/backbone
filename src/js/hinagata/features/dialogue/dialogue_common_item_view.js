var Backbone = require('backbone');
module.exports = (function () {
	var DialogueCommonItemView = Backbone.Marionette.ItemView.extend({
		template: require('./dialogue_common_item_template.html'),
        events: function() {
            return ( applican.config.device_os === "IOS" ) ?
            {
                "touchend .btn_confirm, .btn_confirm_home" : "closeDialogue",
                "touchend .btn_cancel_home" : "cancelHome"
            }:
            {
                "click .btn_confirm, .btn_confirm_home" : "closeDialogue",
                "click .btn_cancel_home" : "cancelHome"
            }
        },
        templateHelpers: {
            getBackHomeTitle: function() {
                return App.appModel.getLanguageType().common.dialogue.backHomeTitle;
            },
            getBackHomeMsg: function() {
                return App.appModel.getLanguageType().common.dialogue.backHomeMsg;
            },
            getBackHomeBtnCancel: function() {
                return App.appModel.getLanguageType().common.dialogue.backHomeBtnCancel;
            }
        },
        initialize: function(options) {
            this.type = options.type;
        },
        closeDialogue: function(e) {
            e.preventDefault();
            this.closeDialogueMessage();
            switch ( this.type ) {
                case "login":
                case "workflow-mail":
                case "saveMesageError":
                case "sendMesageError":
                case "messageContentAction":
                case "messageSettingAction":
                case "couponContentAction":
                case "settingCouponAction":
                case "inputError":
                case "coupon":
                case "saveCouponError":
                case "couponConfirmAction":
                case "sendCouponError":
                case "selectedImage":
                case "deleteTemplate":
                case "deleteTemplateError":
                case "changeLanguage":
                case "saveNotificationError":
                case "notification":
                    App.doNothing();
                    break;
                case "logout":
                    $("#sidebar-left .menu_user_log").hide();
                    App.appModel.saveAsLogout();
                    App.pageSlider.backAndRestartHistory();
                    break;
                case "updateStatusMailSuccess":
                    this.trigger("updateStatusSuccess");
                    break;
                case "selectTemplate":
                    this.trigger("selectTemplateError");
                    break;
                case "messageContent":
                    location.hash = "selectTemplate";
                    break;
                case "messageSetting":
                    this.trigger("saveMailError");
                    break;
                case "saveMesageSuccess":
                case "sendMesageSuccess":
                case "getDetailError":
                    this.closeSideBar();
                    if(AppConf.webConf.segmentIdFromUrl){
                        window.close();
                    }
                    // location.hash = "workflow-mail";
                    App.pageSlider.main("workflow-mail");
                    break;
                case "deleteMailDraftSuccess":
                case "cancelMailSuccess":
                case "stopMailSuccess":
                    this.trigger("actionMailSuccess");
                    break;
                case "confirm":
                case "confirmCoupon":
                case "confirmNotification":
                    this.trigger("getCountSubscribesError");
                    break;
                case "notLogin":                    
                    this.closeSideBar(); 
                    break;
                case "updateStatusCouponSuccess":
                    this.trigger("actionCouponSuccess");
                    break;
                case "backMain":
                    this.trigger("backMainOK");
                    break;
                case "backMain1":
                    this.trigger("backMainOK1");
                    break;
                case "saveDraftMail":
                    this.trigger("saveDraftMail");
                    break;
                case "getDetailCouponError":
                case "saveCouponSuccess":
                case "sendCouponSuccess":
                    this.closeSideBar();

                    if(AppConf.webConf.segmentIdFromUrl){
                        window.close();
                    }
                    // location.hash = "workflow-coupon";
                    App.pageSlider.main("workflow-coupon");
                    break;
                case "saveDraftCoupon":
                    this.trigger("saveDraftCoupon");
                    break;
                case "deleteTemplateSuccess":
                    this.trigger("deleteTemplateSuccess");
                    break;
                case "getDetailNotificationError":
                case "saveNotificationSuccess":
                case "sendNotificationSuccess":
                    this.closeSideBar();
                    if(AppConf.webConf.segmentIdFromUrl){
                        window.close();
                    }
                    // location.hash = "notification";
                    App.pageSlider.main("notification");
                    break;
                case "saveDraftNotification":
                    this.trigger("saveDraftNotification");
                    break;
                case "deleteNotificationDraftSuccess":
                case "cancelNotificationSuccess":
                case "stopNotificationSuccess":
                    this.trigger("actionNotificationSuccess");
                    break;
                case "getSegmentInfoError":
                    this.trigger("getSegmentInfoError");
                    break;
            };
        },
        cancelHome: function(e) {
            e.preventDefault();
            this.closeDialogueMessage();
        },
        setType: function( type ) {
            this.type = type;
        },
        showDialogue: function(title, msg) {
            this.closeDialogueMessage();
            $("#notice_dialogue .title_dialogue").html(title);
            $("#notice_dialogue .message").html(msg);
            $("#dialogue-common-region #greybg,#dialogue-common-region #notice_dialogue").addClass("show");
        },
        showDialogue1: function(title, msg) {
            this.closeDialogueMessage();
            $("#notice_dialogue_1 .title_dialogue").html(title);
            $("#notice_dialogue_1 .message").html(msg);
            $("#dialogue-common-region #greybg,#dialogue-common-region #notice_dialogue_1").addClass("show");
        },
        closeDialogueMessage: function() {
            $("#dialogue-common-region #greybg,#dialogue-common-region #notice_dialogue, #dialogue-common-region #notice_dialogue_1").removeClass("show");
            $("#dialogue-region #greybg, #dialogue-region #confirm_box, #dialogue-region .popup").removeClass("show");
            $("#dialogue-region #greybg, #dialogue-region .dialogue_main_delete, #dialogue-region #confirm_cancel").removeClass("show");
            $("#dialogue-region .title_mail, #dialogue-region .cancelbtnact").hide();
        },
        execLogout: function() {
            var _this = this;
            this.type = "logout";
            var logoutRequest = function(){
                return App.util.bindCommonErrorHandling( App.btApi.logout() );
            };
            App.util.execWithProgressScreen( logoutRequest )
            .done( function(data){
                _this.showDialogue("", App.appModel.getLanguageType().common.dialogue.logoutMsg);
            });
        },
        closeSideBar: function() {
            $("#sidebar-left").removeClass("show");
            $("#sidebar-left .menu_user_log").hide();
        }
	});
	return DialogueCommonItemView;
})();