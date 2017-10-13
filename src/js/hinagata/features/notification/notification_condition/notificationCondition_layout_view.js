var Backbone = require('backbone');
var moment = require("moment");

var DataModel = require('../../../models/data_model.js');
var NotificationSettingModel = require('../notification_setting/notificationSetting_model.js');

var NotificationConditionItemView = require('./notificationCondition_item_view.js');
var NotificationPreviewItemView = require('../notification_content/notificationContent_preview_item_view.js');

var FooterItemView = require('../../../common/footer_item_view.js');

var ConditionListCollection = require('../../../models/condition_list_notification_collection.js');

var SegmentInfoModel = require('../../../models/segment_info_model.js');

var TokenModel = require('../../../models/token_model.js');

var ValidationModel = require('../../../models/validation_model.js');

module.exports = (function () {
  var NotificationConditionLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./notificationCondition_layout_template.html'),
    regions: {
      "notificationConditionRegion" : "#content-region-wrapper #notification-content-region",
      "notificationPreviewRegion" : "#content-region-wrapper #notification-preview-region",
      "footerRegion": "#content-region-wrapper #footer-region",
      "uploadRegion": "#upload-region",
      "imageListRegion": "#image-list-region #inner-image-list"
    },
    templateHelpers: {
      getTitle: function() {
        return App.appModel.getLanguageType().notification.common.title;
      },
      getBtnHome: function() {
        return App.appModel.getLanguageType().common.btnHome;
      },
      getBtnSave: function() {
        return App.appModel.getLanguageType().common.btnSave;
      },
      getPreview: function() {
        return App.appModel.getLanguageType().common.preview;
      }
    },
    ui: {
      "next": ".navi-controll .btn-next",
      "cancel": ".navi-controll .btn-cancel",
    },
    events: function() {
      return ( applican.config.device_os === "IOS" ) ?
      {
        "touchend @ui.next" : "next",
        "touchend @ui.cancel" : "cancel",
        "change #locationNotificationType" : "changeType",
        "touchend .btn-home": "backMain",
        "touchend .btn-save" : "saveNotificationCondition",
      }:
      {
        "click @ui.next" : "next",
        "click @ui.cancel" : "cancel",
        "change #locationNotificationType" : "changeType",
        "click .btn-home": "backMain",
        "click .btn-save" : "saveNotificationCondition",
      }
    },
    SidebarConf: {
      showSidebar: false
    },
    initialize: function(options) {
      this.type = options.type;
      this.notificationId = options.notificationId;
      this.imageType;
      this.dataModel = new DataModel( { id: AppConf.core.localStorageKey } );
      this.dataModel.safeFetch();

      this.notificationSettingModel = new NotificationSettingModel();
      this.tokenModel = new TokenModel();
      this.validationModel = new ValidationModel();

      this.conditionListCollection = new ConditionListCollection({pagination: true});
      App.util.bindProgressScreen(this, this.conditionListCollection);
      this.listenTo(this.conditionListCollection, 'sync', this._renderConditionList);

      this.segmentInfoModel = new SegmentInfoModel({pagination: true});
      App.util.bindProgressScreen(this, this.segmentInfoModel);
      // this.listenTo(this.segmentInfoModel, 'sync', this._renderNotificationCondition);      
      
      this.listenTo(App.dialogueCommon, "getSegmentInfoError", this.getSegmentInfoError);
      this.listenTo(App.dialogueCommon, 'backMainOK', this.backMainCommon);
      this.listenTo(App.dialogueCommon, 'saveDraftNotification', this.saveDraftNotification);

      this.listenTo(this, 'load:sync', this.onLoad);
      $(window).on('resize', _.bind(this.onResize, this));
    },
    onRender: function() {

      if (!AppConf.webConf.segmentId && !AppConf.webConf.segmentIdFromUrl) {
        this._renderNotificationCondition();
        this.conditionListCollection.fetchWithAuthInfo({
          on401: function() {
            _this.setTarget("", App.appModel.getLanguageType().notification.condition.conditionNone);
          }
        });
      } else {
        var _this = this;
        this.segmentInfoModel.fetchSegmentInfo({
          segmentId: AppConf.webConf.segmentId
        })
        .done(function(data) {
          _this.dataModel.set({ 
            segmentDetail: data 
          });
          _this._renderNotificationCondition();
        })
        .fail(function(err) {
          App.dialogueCommon.setType("getSegmentInfoError");
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.condition.dialogue.getSegmentTitleErr, App.appModel.getLanguageType().notification.condition.dialogue.getSegmentMsgErr);
        });
      }
    },
    onLoad: function() {
      var windowH = $(window).height();
      var wrapperH = $('#master-container').height();
      if(windowH > wrapperH) {
        $('#master-container, #condition-region-wrapper .container').css({'height': windowH + 'px'});
      }else{
        $('#condition-region-wrapper .container').css({'height': wrapperH + 'px'});
      }    

      $('.hasTimepicker').datetimepicker({
          format: 'HH:mm',
          ignoreReadonly: true,
          // useCurrent: true,
          sideBySide: true,
          toolbarPlacement: 'bottom',
          // debug:true
          widgetPositioning: {
            horizontal: 'right',
            vertical: 'top'
          }
      });

      if(this.type === "view") {
        this.disbaleElement();
      }     

    },
    disbaleElement: function(){
      $(".coupon-master .form-control").prop("disabled", true);
      $("#condition-region-wrapper #coverImageUpload").addClass("noEvent");
      $(".page-center .btn-save").hide();
      if(this.dataModel.get("locationNotificationType") == 0){
        $(".btn-next").hide();
      }
    },
    onResize: function(){
        var windowH = $(window).height();
        $('#master-container, #condition-region-wrapper .container').css('height', windowH);
    },
    _renderNotificationCondition: function() {
      if ( this.dataModel ) {
        this.notificationSettingModel.setContentData(this.dataModel);
      }
      this._renderFooter();
      this.notificationConditionRegion.show(new NotificationConditionItemView({ model: this.notificationSettingModel }));
      this.notificationPreviewRegion.show(new NotificationPreviewItemView({ model: this.notificationSettingModel })); 
      App.util.hideProgressScreen(); 
      this.onLoad();
    },
    _renderConditionList: function(){
      var _this = this;
      $("#target option").remove();
      this.setTarget("", App.appModel.getLanguageType().notification.condition.conditionNone);
      if ( this.conditionListCollection.length > 0 ) {
        this.conditionListCollection.each(function(model){
          _this.setTarget(model.get("id"), model.get("name"));
        });
        var scid = this.dataModel.get("scid");
        if ( scid ) {
          $('#target option[data-id = ' + scid + ']').prop("selected",true);
        }
      }
    },
    setTarget: function(id, value) {
      var target = document.getElementById('target');
      var opt = document.createElement('option');
      opt.innerHTML = value;
      opt.setAttribute('data-id' , id);
      target.appendChild(opt);
    },
    getSegmentInfoError: function() {
      location.hash = "notificationSetting/" + this.type + "?notificationId=" + this.notificationId;
    },
    _renderFooter: function() {
      this.notificationSettingModel.set("typeFooter", "notification");
      switch ( this.type ) {
        case "view":
        case "edit":
        case "duplicate":
          this.notificationSettingModel.set("action", this.type);
          this.notificationSettingModel.set("tabIdx", 2);
          break;
        default:
          this.notificationSettingModel.set("action", "create");   
          this.notificationSettingModel.set("tabIdx", 2);       
          break;
      };
      this.footerRegion.show( new FooterItemView({ model: this.notificationSettingModel }) );
    },
    changeType: function(e) {
      var field = $(e.currentTarget);
      var value = field.val();
      if(value == 1){
        $("#specifyTimeStart, #specifyTimeEnd, #specifyTimeLb").removeClass("hidden");
        $('.hasTimepicker').datetimepicker({
            format: 'HH:mm',
            ignoreReadonly: true,
            // useCurrent: true,
            sideBySide: true,
            toolbarPlacement: 'bottom',
            // debug:true
            widgetPositioning: {
              horizontal: 'right',
              vertical: 'top'
            }
        });
      } else {
        $("#specifyTimeStart, #specifyTimeEnd, #specifyTimeLb").addClass("hidden");
      }
    },
    next: function(e) {
      e.preventDefault();
      if ( this.type === "view" ) {
        location.hash = "notificationLocal/" + this.type + "?notificationId=" + this.notificationId;
      } else {
        if ( this.checkInput() === true ) {
          this.notificationSettingModel.setContentDataByObject2(this.objectData);
          this.dataModel.setNotificationDataTemp( this.notificationSettingModel );
          if(this.objectData.locationNotificationType == 1){
            location.hash = "notificationLocal/" + this.type + "?notificationId=" + this.notificationId;
          } else {
            location.hash = "notificationConfirm/" + this.type + "?notificationId=" + this.notificationId;
          }
        }
      }
    },
    cancel: function(e){
      e.preventDefault();
      if ( this.type !== "view" ) {        
        if ( this.checkInput() === true ) {        
          this.notificationSettingModel.setContentDataByObject2(this.objectData);
          this.dataModel.setNotificationDataTemp(this.notificationSettingModel);
          location.hash = "notificationContent/" + this.type + "?notificationId=" + this.notificationId;
        }
      } else {
        location.hash = "notificationContent/" + this.type + "?notificationId=" + this.notificationId;
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
      objectData.locationNotificationType = parseInt($("input[name=locationNotificationType]:checked").val());
      objectData.specifyTimeStart = $("#specifyTimeStart").val();
      objectData.specifyTimeEnd = $("#specifyTimeEnd").val();
      if(this.notificationSettingModel.get("customSegment") == true){
        objectData.scid =  this.notificationSettingModel.get("scid");
      } else {
        objectData.scid = $('#target').find(":selected").data("id");
        objectData.conditionName = $('#target option:selected').text();        
      }
      var checkInput = true;
      var dateStart = this.notificationSettingModel.get("distributionTime") ? this.notificationSettingModel.get("distributionTime") : this.notificationSettingModel.get("openTime");
      if(objectData.locationNotificationType == 1){
        var check = moment.duration(moment(objectData.specifyTimeStart, "HHmm").diff(moment(dateStart, "HHmm")));
        if(check._data.hours > 1 || (check._data.hours == 1 && check._data.minutes > 0)){
          this.objectData = objectData;
          this.resetBorder();
        } else{
          this.onError1(App.appModel.getLanguageType().notification.condition.dialogue.errorSpecifyTimeStart);
          checkInput = false;
          $("#distributionTimeEnd, #distributionTimeStart").addClass("error");
        }
      } else {
        this.objectData = objectData;
      }
      return checkInput;
    },
    resetBorder: function() {
      $(".form-control").removeClass("error");
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
      $("#specifyTimeStart").addClass("error");
      App.dialogueCommon.setType("inputError");
      App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.inputTitleError, msg);
    },
    saveNotificationCondition: function(e) {
      e.preventDefault();
      if ( this.checkInput() === true ) {
        App.dialogueCommon.setType("saveDraftNotification");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.draftTitle, App.appModel.getLanguageType().common.dialogue.draftMsg);
      }
    },
    saveDraftNotification: function() {
      this.notificationSettingModel.setContentDataByObject2(this.objectData);
      this.notificationSettingModel.setContentSaveAndExit();
      this.notificationSettingModel.setNotificationId( this.type, this.notificationId );
      this.fetchToken({notificationMaster: this.notificationSettingModel.getNotificationMaster(), type: "save"});
    },
    saveNotification: function(options) {
      var _this = this;
      var _options = options || {};
      App.btApi.sendNotification({
          notificationMaster: _options.notificationMaster,
          token: _options.token
      }).done(function(res) {
        App.dialogueCommon.setType( "saveNotificationSuccess" );
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.common.dialogueSuccess.saveNotificationTitleSuccess, App.appModel.getLanguageType().notification.common.dialogueSuccess.saveNotificationMsgSuccess);
        _this.dataModel.setStatusAction("saveNotificationSuccess");
        App.util.hideProgressScreen();
      }).fail(function(err) {
        App.dialogueCommon.setType( "saveNotificationError" );
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.common.dialogueError.saveNotificationTitleErr, App.appModel.getLanguageType().notification.common.dialogueError.saveNotificationMsgErr);
        App.util.hideProgressScreen();
      });
    },
    fetchToken: function(options) {
      var _this = this;
      var _options = options || {};
      var type = _options.type;
      App.util.showProgressScreen();
      App.dialogueCommon.setType("notificationConditionAction");
      this.tokenModel.fetchToken({})
      .done(function(data) {
        switch ( type ) {
          case "save":
            _this.saveNotification({notificationMaster: _options.notificationMaster, token: data.token});
            break;
        };
      })
      .fail(function(res) {
        switch ( type ) {
          case "save":
            App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.tokenTitleErr, App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
            break;
        };
        App.util.hideProgressScreen();
      });
    },
  });

  return NotificationConditionLayoutView;

})();