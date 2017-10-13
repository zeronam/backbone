var Backbone = require('backbone');
require('../../../../../../lib/components/bootstrap/datetimepicker/datetimepicker.min.js');

var DataModel = require('../../../models/data_model.js');
var NotificationSettingModel = require('./notificationSetting_model.js');

var NotificationSettingItemView = require('./notificationSetting_item_view.js');
var DetailNotificationModel = require('../../../models/detail_notification_model.js');

var FooterItemView = require('../../../common/footer_item_view.js');

var ValidationModel = require('../../../models/validation_model.js');

module.exports = (function () {
  var NotificationSettingLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./notificationSetting_layout_template.html'),
    regions: {
      "notificationSettingRegion" : "#information-region-wrapper #coupon-content-region",
      "footerRegion": "#information-region-wrapper #footer-region"
    },
    ui: {
      "next": ".navi-controll .btn-next",
      "cancel": ".navi-controll .btn-cancel"
    },
    events: function() {
      return ( applican.config.device_os === "IOS" ) ?
      {
        "change #repeatFlg0, #repeatFlg1" : "checkAvailability",
        "touchend @ui.next" : "next",
        "touchend @ui.cancel" : "cancel",
        "touchend .btn-home": "backMain",
        "touchstart" : "checkDatetimePicker",
        "change .repeatType" : "checkRepeatType"
      }:
      {
        "change #repeatFlg0, #repeatFlg1" : "checkAvailability",
        "click @ui.next" : "next",
        "click @ui.cancel" : "cancel",
        "click .btn-home": "backMain",
        "change .repeatType" : "checkRepeatType"
      }
    },
    templateHelpers: {
      getTitle: function() {
        return App.appModel.getLanguageType().notification.common.title;
      },
      getBtnHome: function() {
        return App.appModel.getLanguageType().common.btnHome;
      }
    },
    SidebarConf: {
      showSidebar: false
    },
    initialize: function(options) {
      this.arrField = {};
      if(options){        
        this.type = options.type;
        this.notificationId = options.notificationId;
        // this.segmentId = options.segmentId;
      }
      this.dataModel = new DataModel( { id: AppConf.core.localStorageKey } );
      this.dataModel.safeFetch();
      this.dataModel.destroy();

      this.validationModel = new ValidationModel();

      App.dialogueCommon.setType("notificationSetting");
      this.notificationSettingModel = new NotificationSettingModel();

      this.listenTo(App.dialogueCommon, 'backMainOK', this.backMainCommon);
      
      // if ( this.type !== "view" && this.type !== "edit" && this.type !== "duplicate" ) {
        this.listenTo(this, 'load:sync', this.onLoad);
      // }
      $(window).on('resize', _.bind(this.onResize, this));
    },
    onRender: function() {      
      var _this = this;
      switch( this.type ) {
        case "view":
        case "edit":
        case "duplicate":
          if ( this.dataModel.get("title") ) {
            this.notificationSettingModel.setContentData(this.dataModel);
            this._renderFooter();
            this.notificationSettingRegion.show(new NotificationSettingItemView({ model: this.notificationSettingModel }));
            App.util.hideProgressScreen();
          } else {
            this.fetchDetail();
          }          
          break;
        default:
          if ( this.dataModel ) {
            if ( this.dataModel.get("title") ) {
              this.notificationSettingModel.setContentData(this.dataModel);
            } else {
              this.notificationSettingModel.setContentDataEmpty();
            }
          }
          this._renderFooter();
          this.notificationSettingRegion.show(new NotificationSettingItemView({ model: this.notificationSettingModel }));
          App.util.hideProgressScreen();
          break;
      };
    },
    onLoad: function() {
      var windowH = $(window).height();
      var wrapperH = $('#master-container').height();
      if(windowH > wrapperH) {
        $('#master-container, #information-region-wrapper .container').css({'height': windowH + 'px'});
      }else{
        $('#information-region-wrapper .container').css({'height': wrapperH + 'px'});
      }
      $('.hasDatepicker').datetimepicker({
          format: 'YYYY/MM/DD',
          ignoreReadonly: true,
          // useCurrent: true,
          sideBySide: true,
          toolbarPlacement: 'bottom',
          // debug:true
      });
      $('.hasTimepicker').datetimepicker({
          format: 'HH:mm',
          ignoreReadonly: true,
          // useCurrent: true,
          sideBySide: true,
          toolbarPlacement: 'bottom',
          // debug:true
      });
      
      if ( this.type === "view" ) {
        this.disbaleElement();
      }
    },
    fetchDetail: function() {
      var _this = this;
      this.detailNotificationModel = new DetailNotificationModel({ notificationId: this.notificationId });
      App.util.bindProgressScreen(this, this.detailNotificationModel);
      this.listenTo(this.detailNotificationModel, 'sync', this._renderNotificationSetting);
      this.detailNotificationModel.fetchDetailNotification({
        on403: function() {
          _this._renderFooter();
          App.dialogueCommon.setType("getDetailNotificationError");
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.setting.dialogueError.getDetailNotificationTitleErr, App.appModel.getLanguageType().notification.setting.dialogueError.getDetailNotificationMsgErr);
        }
      });
    },
    _renderNotificationSetting: function() {
      if(this.detailNotificationModel && this.detailNotificationModel.get('customSegment')){
        AppConf.webConf.segmentId = this.detailNotificationModel.get('segmentDetail').segmentId;
        AppConf.webConf.customSegment = this.detailNotificationModel.get('customSegment');
      }
      this.notificationSettingModel.setContentData(this.detailNotificationModel);
      this._renderFooter();
      this.notificationSettingRegion.show(new NotificationSettingItemView({ model: this.notificationSettingModel }));
      this.onLoad();
    },
    checkDatetimePicker: function(){
      if (!$(event.target).closest('.bootstrap-datetimepicker-widget').length && !$(event.target).closest('.hasDatetimepicker').length) {
        $('#openDate, #openTime, #distributionTimeStart, #distributionTimeEnd').data('DateTimePicker').hide();
      }
    },
    onResize: function(){
        var windowH = $(window).height();
        $('#master-container, #information-region-wrapper .container').css('height', windowH);
    },
    checkConditions: function(e){
      if(e.currentTarget.checked){
        $("#"+e.currentTarget.id+"Val").prop('disabled', false).focus();
      } else{
        $("#"+e.currentTarget.id+"Val").prop('disabled', true);
      }
    },
    checkAvailability: function(e){
      $("#repeatFlg0Val input, #repeatFlg1Val input, #repeatFlg1Val select").prop('disabled', true);
      $("#repeatFlg1Val label").addClass('disabled');
      if(e.currentTarget.checked){
        $("#"+e.currentTarget.id+"Val input, #"+e.currentTarget.id+"Val select").prop('disabled', false);
        $("#"+e.currentTarget.id+"Val label").removeClass('disabled');
        // $("#"+e.currentTarget.id+"Val input").first().focus();
      }
    },
    checkRepeatType:function(e){
      $(".repeatTypeLb").removeClass('active');
      $(e.currentTarget).parent().addClass('active');
      if(e.currentTarget.checked){
        if($("#selectValue" + e.currentTarget.id).length){
          $(".repeatTypeVal").prop('disabled', true).addClass("hidden");
          $("#selectValue" + e.currentTarget.id).prop('disabled', false).removeClass("hidden");          
        } else {
           $(".repeatTypeVal").prop('disabled', true);
        }
      }
    },
    disbaleElement: function() {
      $(".coupon-master .form-control").prop("disabled", true);
      $(".lbRadio-tap").addClass('disabled');
      $(".page-center .btn-save").hide();
    },
    _renderFooter: function() {
      this.dataModel.set("typeFooter", "notification");
      if(AppConf.webConf.segmentIdFromUrl){
        this.dataModel.set("hideBackBtn", true);
      }
      switch ( this.type ) {
        case "view":
        case "edit":
        case "duplicate":
          this.dataModel.set("action", this.type);
          this.dataModel.set("tabIdx", 0);
          break;
        default:
          this.dataModel.set("action", "create");
          this.dataModel.set("tabIdx", 0);
          break;
      };
      this.footerRegion.show( new FooterItemView({ model: this.dataModel }) );
    },
    _changeField: function(e) {
      var field = $(e.currentTarget);
      var id = field.attr('id');
      var value = field.val();
      var lengthId = id.length;
      var checkElement = id.substr(0, lengthId - 3);
      if ( !value ) {
        $("#" + checkElement).prop("checked", false);
      } else {
        if ( !isNaN(value) ) {
          if ( value > 0 ) {
            $("#" + checkElement).prop("checked", true);
          } else {
            $("#" + checkElement).prop("checked", false);
          }
        } else {
          $("#" + checkElement).prop("checked", false);
        }
      }
    },
    actionPasteCut: function(e) {
      var field = $(e.currentTarget);
      setTimeout(function() {
        $(field).trigger("keyup");
      }, 0);
    },
    next: function(e) {
      e.preventDefault();
      if ( this.type === "view" ) {
        this.dataModel.setNotificationDataTemp( this.notificationSettingModel );
        location.hash = "notificationContent/" + this.type + "?notificationId=" + this.notificationId;
      } else {
        if ( this.checkInput() === true ) {
          this.notificationSettingModel.setContentDataByObject(this.objectData);
          this.dataModel.setNotificationDataTemp( this.notificationSettingModel );
          location.hash = "notificationContent/" + this.type + "?notificationId=" + this.notificationId;
        }
      }
    },
    cancel: function(e){
      e.preventDefault();
      if ( this.type === "view" ) {
        location.hash = "notification";
      } else {
        App.dialogueCommon.setType("backMain");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backHomeTitle, App.appModel.getLanguageType().common.dialogue.backHomeMsg);
      }
    },
    backMain: function(e) {
      e.preventDefault();
      if ( this.type === "edit" || this.type === "duplicate" ) {
        // var memberOnly1 = this.dataModel.get("memberOnly1");
        // if ( memberOnly1 ) {
        App.dialogueCommon.setType("backMain");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backHomeTitle, App.appModel.getLanguageType().common.dialogue.backHomeMsg);
        // } else {
        //   this.backMainCommon();
        // }
      } else if ( this.type === "view" ) {
        this.backMainCommon();
      } else {
        App.dialogueCommon.setType("backMain");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backHomeTitle, App.appModel.getLanguageType().common.dialogue.backHomeMsg);
      }
    },
    backMainCommon: function() {
      this.dataModel.destroy();
      location.hash = "notification";
    },
    checkInput: function() {
      objectData = {};
      objectData.title = $("#title").val();
      objectData.contentText = $('#contentText').val();
      objectData.repeatFlg = parseInt($('input[name=repeatFlg]:checked').val());

      if ( objectData.repeatFlg == 0 ) {
        objectData.openDate = $('#openDate').val();
        objectData.openTime = $('#openTime').val();
      } else if ( objectData.repeatFlg == 1 ) {
        objectData.distributionTimeStart = $('#distributionTimeStart').val();
        objectData.distributionTimeEnd = $('#distributionTimeEnd').val();
        objectData.distributionTime = $('#distributionTime').val();
        objectData.repeatType = parseInt($('input[name=repeatType]:checked').val());
        if ( objectData.repeatType == 3 ) {
          objectData.selectValueEverymonth = parseInt($('#selectValueEverymonth').val());
        } else if ( objectData.repeatType == 2 ) {
          objectData.selectValueEveryweek = parseInt($('#selectValueEveryweek').val());
        }
      }

      objectData.nonPushFlg = parseInt($('input[name=nonPushFlg]:checked').val());
      objectData.dispTimeType = parseInt($('#dispTimeType').val());

      var checkInput = true;
      this.validationModel.set(objectData, {validate:true});
      if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
        if ( objectData.repeatFlg == 1 ) {
          switch ( this.validationModel.checkDate( objectData.distributionTimeStart, objectData.distributionTimeEnd, "YYYYMMDDHHmm" ) ) {
            case "0":
              this.onError1(App.appModel.getLanguageType().notification.setting.dialogue.startCompletionDateErr1);
              checkInput = false;
              $("#distributionTimeEnd").addClass("error");
              break;
            case "1":
              this.onError1(App.appModel.getLanguageType().notification.setting.dialogue.startCompletionDateErr2);
              checkInput = false;
              $("#distributionTimeEnd, #distributionTimeStart").addClass("error");
              break;
            case "2":
              this.resetBorder();
              this.objectData = objectData;
              break;
          }
        } else if(objectData.repeatFlg == 0){
          if(!this.validationModel.checkDateSystem(objectData.openDate + " " + objectData.openTime)){
            this.onError1(App.appModel.getLanguageType().notification.setting.dialogue.startCompletionDateErr1);            
            checkInput = false;
            $("#openDate, #openTime").addClass("error");
          } else {
              this.resetBorder();
              this.objectData = objectData;
          }
        }        
      } else {
        this.onError( this.validationModel.validationError );
        checkInput = false;
      }
      return checkInput;
    },
    resetBorder: function() {
      $("#title, #contentText, #distributionTimeStart, #distributionTimeEnd, #openDate, #openTime").removeClass("error");
    },
    onError: function(error) {
      var msg = "";
      $(".form-control").removeClass("error");
      $.each(error, function(index, value) {
        for (var i = 0; i < value.length; i++) {
          msg += value[i] + " <br> ";
        }
        $("#"+index).addClass("error");
      }); 
      App.dialogueCommon.setType("inputError");
      App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.inputTitleError, msg);
    },
    onError1: function(msg) {
      $("#dateTimeAvailabilityStart").css({"border-color": "red"});
      $("#dateTimeAvailabilityEnd").css({"border-color": "red"});
      App.dialogueCommon.setType("inputError");
      App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.inputTitleError, msg);
    }
  });

  return NotificationSettingLayoutView;

})();