var Backbone = require('backbone');
var DataModel = require('../../../models/data_model.js');
var ConfirmModel = require('../../../models/count_subscribers_notify_model.js');
var TokenModel = require('../../../models/token_model.js');
var FooterItemView = require('../../../common/footer_item_view.js');

var NotificationSettingModel = require('../notification_setting/notificationSetting_model.js');

var moment = require('moment');

module.exports = (function () {
  var ConfirmNotificationLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./notificationConfirm_layout_template.html'),
    templateHelpers: {
      getTitle: function() {
        return App.appModel.getLanguageType().notification.common.title;
      },
      getBtnHome: function() {
        return App.appModel.getLanguageType().common.btnHome;
      },
      getText: function(text) {
        return App.appModel.getLanguageType().notification.confirm[text];
      },
      getBtnBack: function() {
        return App.appModel.getLanguageType().common.btnBack;
      },
      getBtnConfirm: function() {
        return App.appModel.getLanguageType().common.confirm;
      },
    },
    regions: {
      "confirmRegion" : "#confirm-region",
      "footerRegion": "#confirm-region #footer-region"
    },
    events: function() {
      return ( applican.config.device_os === "IOS" ) ?
      {
        "touchend .btn-confirm" : "confirm",
        "touchend .btn-back": "back",
        "touchend .btn-home": "backMain"
      }:
      {
        "click .btn-confirm" : "confirm",
        "click .btn-back": "back",
        "click .btn-home": "backMain"
      }
    },
    SidebarConf: {
      showSidebar: false
    },
    initialize: function(options) {
      this.type = options.type;
      this.notificationId = options.notificationId;
      this.dataModel = new DataModel( { id: AppConf.core.localStorageKey } );
      this.dataModel.safeFetch();

      App.dialogueCommon.setType("confirmNotification");
      
      this.confirmModel = new ConfirmModel();
      this.tokenModel = new TokenModel();
      this.notificationSettingModel = new NotificationSettingModel();
      App.util.bindProgressScreen(this, this.confirmModel);
      this.listenTo(this.confirmModel, 'sync', this._renderConfirm);

      if ( this.dataModel ) {
        this.scid = this.dataModel.get("scid");
        var setConditionName = this.dataModel.get("conditionName");
        if ( App.appModel.getLanguage() === "en" ) {
          format = "ddd Do YYYY [at] HH:mm";
        } else if  ( App.appModel.getLanguage() === "ja" ) {
          format = "YYYY年MM月DD日 HH時mm分";
        }

        if(this.dataModel.get("openDate") && this.dataModel.get("openTime")){
          this.confirmModel.set("timestamp", moment(this.dataModel.get("openDate") +" "+ this.dataModel.get("openTime")).format(format) );
        } else {
          this.confirmModel.set("timestamp", moment(this.dataModel.get("distributionTimeStart") +" "+ this.dataModel.get("distributionTime")).format(format) );
        }

        if ( this.scid ) {
          this.confirmModel.setCoditionId(this.scid);
          this.confirmModel.setConditionName(setConditionName);
        } else {
          this.confirmModel.setCoditionId("");
          this.confirmModel.setConditionName("");
        }

        if(this.dataModel.get("customSegment")){
          this.confirmModel.setCustomSegment(this.dataModel.get("customSegment"));
        } else {
          this.confirmModel.setCustomSegment("");
        }

       if(this.dataModel.get("segmentDetail")){
          this.confirmModel.setSegmentDetail(this.dataModel.get("segmentDetail"));
        } else {
          this.confirmModel.setSegmentDetail("");
        }

        this.notificationSettingModel.setContentData(this.dataModel);
      }

      this.listenTo(App.dialogueCommon, "getCountSubscribesError", this.getCountSubscribesError);
      this.listenTo(this, 'load:sync', this.onLoad);
      this.listenTo(App.dialogueCommon, 'backMainOK', this.backMainCommon);
      $(window).on('resize', _.bind(this.onResize, this));
    },
    onRender: function() {
      this._renderFooter();
      if(this.confirmModel.customSegment == "" && this.confirmModel.segmentDetail != "" ){
        this.confirmModel.fetchCountSubscribesCustom({
          on403: function() {
            App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.confirm.dialogueError.getConditionTitleErr, App.appModel.getLanguageType().notification.confirm.dialogueError.getConditionMsgErr);
          }
        });  
      } else {
        this.confirmModel.fetchCountSubscribes({
          on403: function() {
            App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.confirm.dialogueError.getConditionTitleErr, App.appModel.getLanguageType().notification.confirm.dialogueError.getConditionMsgErr);
          }
        });        
      }
    },
    _renderFooter: function() {
      this.confirmModel.set("typeFooter", "notification");
      var memberOnly = this.confirmModel.get("memberOnly");
      switch ( this.type ) {
        case "view":
        case "edit":
        case "duplicate":
          this.confirmModel.set("action", this.type);
          this.confirmModel.set("tabIdx", 4);
          break;
        default:
          this.confirmModel.set("action", "create");
          this.confirmModel.set("tabIdx", 4);
          break;
      };
      this.footerRegion.show( new FooterItemView({ model: this.confirmModel }) );
    },
    _renderConfirm: function() {
      var totals = this.confirmModel.get("deliveryCountDisp");
      var startTime = this.confirmModel.get("timestamp");
      var conditionValue = this.confirmModel.getConditionName();

      $("#confirm-region .total-value").text(totals);
      $("#confirm-region .dateTime").text(startTime);
      if ( !conditionValue ) {
        conditionValue = App.appModel.getLanguageType().notification.confirm.conditionNone;
      }
      if(AppConf.webConf.segmentIdFromUrl || AppConf.webConf.segmentId){
        $("#confirm-region .segment_name").text(App.appModel.getLanguageType().notification.confirm.users);
      }else{
        $("#confirm-region .segment_name").text(conditionValue);
      }
    },
    confirm: function(e) {
      e.preventDefault();
      this.notificationSettingModel.setDeliverNotification();
      this.notificationSettingModel.setNotificationId( this.type, this.notificationId );
      this.fetchToken({notificationMaster: this.notificationSettingModel.getNotificationMaster(), type: "send"});
    },
    back: function(e) {
      e.preventDefault();
      if(this.notificationSettingModel.get("locationNotificationType") === 1){
        location.hash = "notificationLocal/" + this.type + "?notificationId=" + this.notificationId;
      } else {
        location.hash = "notificationCondition/" + this.type + "?notificationId=" + this.notificationId;
      }
    },
    onResize: function(){
      var windowH = $(window).height();
      $('#master-container').css('height', windowH);
      $('#confirm-region').css('height', windowH);
    },
    onLoad:function(){
      var windowH = $(window).height();
      var wrapperH = $('#master-container').height();
      if(windowH > wrapperH) {
        $('#confirm-region').css({'height':windowH+'px'});
        $('#master-container').css({'height':windowH+'px'});
      }else{
        $('#confirm-region').css({'height':wrapperH+'px'});
      }

      $("#confirm-region .btn-cancel").hide();
      $("#confirm-region .btn-next").hide();
    },
    backMain: function(e) {
      e.preventDefault();
      App.dialogueCommon.setType("backMain");
      App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backHomeTitle, App.appModel.getLanguageType().common.dialogue.backHomeMsg);
    },
    backMainCommon: function() {
      this.dataModel.destroy();
      location.hash = "notification";
    },
    getCountSubscribesError: function() {
      location.hash = "notificationSetting/" + this.type + "?notificationId=" + this.notificationId;
    },
    fetchToken: function(options) {
      var _this = this;
      var _options = options || {};
      var type = _options.type;
      App.util.showProgressScreen();
      App.dialogueCommon.setType("notification");
      this.tokenModel.fetchToken({})
      .done(function(data) {
        switch ( type ) {
          case "send":
            _this.sendNotification({notificationMaster: _options.notificationMaster, token: data.token});
            break;
        };
      })
      .fail(function(res) {
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.tokenTitleErr, App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
        App.util.hideProgressScreen();
      });
    },
    sendNotification: function(options) {
      var _this = this;
      var _options = options || {};
      App.btApi.sendNotification({
          notificationMaster: _options.notificationMaster,
          token: _options.token
      }).done(function(res) {
        App.dialogueCommon.setType( "sendNotificationSuccess" );
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.confirm.dialogueSuccess.sendNotificationTitleSuccess, App.appModel.getLanguageType().notification.confirm.dialogueSuccess.sendNotificationMsgSuccess);
        _this.dataModel.setStatusAction("sendNotificationSuccess");
        App.util.hideProgressScreen();
      }).fail(function(err) {
        App.dialogueCommon.setType( "sendNotificationError" );
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.confirm.dialogueError.sendNotificationTitleFail , App.appModel.getLanguageType().notification.confirm.dialogueError.sendNotificationMsgFail);
        App.util.hideProgressScreen();
      });
    }
  });

  return ConfirmNotificationLayoutView;

})();