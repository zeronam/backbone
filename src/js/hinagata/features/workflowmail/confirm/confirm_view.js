var Backbone = require('backbone');
var DataModel = require('../../../models/data_model.js');
var ConfirmModel = require('../../../models/count_subscribes_model.js');
var TokenModel = require('../../../models/token_model.js');
var FooterItemView = require('../../../common/footer_item_view.js');
var moment = require('moment');

module.exports = (function () {
  var ConfirmLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./confirm_layout_template.html'),
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
        "click .btn-home": "backMain",
        "click .btn-save": "saveMesageContents"
      }
    },
    SidebarConf: {
      showSidebar: false
    },
    templateHelpers: {
      getTitle: function() {        
        return App.appModel.getLanguageType().mail.common.title;
      },
      getPreview: function() {
        return App.appModel.getLanguageType().common.preview;
      },
      getBtnHome: function() {
        return App.appModel.getLanguageType().common.btnHome;
      },
      getBtnSave: function() {
        return App.appModel.getLanguageType().common.btnSave;
      },
      getConfirmTitle: function() {
        return App.appModel.getLanguageType().mail.confirm.confirmTitle;
      },
      getConfirmNote: function() {
        return App.appModel.getLanguageType().mail.confirm.note;
      },
      getBtnConfirm: function() {
        return App.appModel.getLanguageType().common.confirm;
      },
      getBtnBack: function() {
        return App.appModel.getLanguageType().common.btnBack;
      },
      getMessageSend: function() {
        return App.appModel.getLanguageType().mail.confirm.messageSend;
      }
    },
    initialize: function(options) {
      this.type = options.type;
      this.id = options.id;
      this.dataModel = new DataModel( { id: AppConf.core.localStorageKey } );
      this.dataModel.safeFetch();
      // AppConf.mail.segmentId = this.dataModel.get('segmentId');
      App.dialogueCommon.setType("confirm");
      App.dialogueCommon.setType("messageContent");
      this.confirmModel = new ConfirmModel();
      this.tokenModel = new TokenModel();
      App.util.bindProgressScreen(this, this.confirmModel);
      this.listenTo(this.confirmModel, 'sync', this._renderConfirm);
      this.confirmModel.setAppType(10);
      var settingInfor = this.dataModel.getSettingInfo();
      if ( settingInfor ) {
        var startTime = settingInfor.startTime;
        var conditionValue = settingInfor.conditionValue;
        this.dateSend = moment(startTime, "YYYY/MM/DD HH:mm");
        this.scid = settingInfor.conditionId;
        if ( App.appModel.getLanguage() === "en" ) {
          this.confirmModel.set("timestamp", moment(this.dateSend).format('ddd Do YYYY [at] HH:mm') );
        } else if ( App.appModel.getLanguage() === "ja" ) {
          this.confirmModel.set("timestamp", moment(this.dateSend).format('YYYY年MM月DD日 HH時mm分') );
        }
        this.confirmModel.setCoditionId(this.scid);
        this.confirmModel.setConditionName(conditionValue);
      } else {
        this.confirmModel.setCoditionId("");
        this.confirmModel.setConditionName("");
      }

      this.listenTo(App.dialogueCommon, "getCountSubscribesError", this.getCountSubscribesError);
      this.listenTo(this, 'load:sync', this.onLoad);
      this.listenTo(App.dialogueCommon, 'backMainOK', this.backMainCommon);
      $(window).on('resize', _.bind(this.onResize, this));
    },
    onRender: function() {
      var _this = this;
      // AppConf.mail.segmentId = this.dataModel.get('segmentId');
      // AppConf.mail.customSegment = this.dataModel.get('customSegment');
      // AppConf.mail.scid = this.dataModel.get('scid');

      // AppConf.mail.sessionId = this.dataModel.get('sessionId');
      this._renderFooter();
      this.confirmModel.fetchCountSubscribes({
        on403: function() {
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.confirm.dialogueError.getConditionTitleErr, App.appModel.getLanguageType().mail.confirm.dialogueError.getConditionMsgErr);
        }
      });
    },
    _renderFooter: function() {
      this.dataModel.set("typeFooter", "mail");
      switch ( this.type ) {
        case "view":
        case "edit":
        case "duplicate":
          this.dataModel.set("action", this.type);
          break;
        default:
          this.dataModel.set("action", "create");          
          break;
      };
      this.footerRegion.show( new FooterItemView({ model: this.dataModel }) );
    },
    confirm: function(e) {
      e.preventDefault();
      var campainName = this.dataModel.getCampainName();
      var subject = this.dataModel.getSubject();
      var body = this.dataModel.getBody();
      var startTime = moment(this.dateSend).format("YYYYMMDDHHmm");
      var scid = this.scid;
      this.fetchToken({name: campainName, startTime: startTime, subject: subject, body: body, scid: scid, type: "send"});
    },
    _renderConfirm: function() {
      var totals = this.confirmModel.get("totals");
      var startTime = this.confirmModel.get("timestamp");
      var conditionValue = this.confirmModel.getConditionName();

      $("#confirm-region .total-value").text(totals);
      $("#confirm-region .dateTime").text(startTime);
      if ( !conditionValue ) {
        conditionValue = App.appModel.getLanguageType().mail.confirm.conditionNone;
      }
      if(AppConf.webConf.segmentIdFromUrl || AppConf.webConf.segmentId){
        $("#confirm-region .segment_name").text(App.appModel.getLanguageType().mail.confirm.users);
      }else{
        $("#confirm-region .segment_name").text(conditionValue);
      }
      if(this.confirmModel.get("errorCode") == '0001'){
        App.dialogueCommon.setType(null);
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogue.countTitle, App.appModel.getLanguageType().common.dialogue.countMsg);
      }
    },
    onResize: function(){
      /*var windowH = $(window).height();
      $('#master-container').css('height', windowH);
      $('#confirm-region').css('height', windowH);*/
    },
    onLoad:function(){
      /*var windowH = $(window).height();
      var wrapperH = $('#master-container').height();
      if(windowH > wrapperH) {
        $('#confirm-region').css({'height':windowH+'px'});
        $('#master-container').css({'height':windowH+'px'});
      }else{
        $('#confirm-region').css({'height':wrapperH+'px'});
      }*/
      $("#confirm-region #navi-control-bar li").removeClass();
      if ( this.type === "view" || this.type === "edit" || this.type === "duplicate" ) {
        $("#confirm-region #navi-control-bar li:eq(2)").addClass("active");
      } else {
        $("#confirm-region #navi-control-bar li:eq(3)").addClass("active");
      }

      $("#confirm-region .btn-cancel").hide();
      $("#confirm-region .btn-next").hide();
    },
    back: function(e) {
      e.preventDefault();
      // location.hash = "messageSetting/" + this.type + "?id=" + this.id;
      App.pageSlider.back();
    },
    fetchToken: function(options) {
      var _this = this;
      var _options = options || {};
      var type = _options.type;
      App.util.showProgressScreen();
      App.dialogueCommon.setType("messageConfirmAction");
      this.tokenModel.fetchToken({})
      .done(function(data) {
        switch ( type ) {
          case "send":
            _this.sendMesage({name: _options.name, subject: _options.subject, body: _options.body, startTime: _options.startTime, scid: _options.scid, token: data.token});
            break;
        };
      })
      .fail(function(res) {
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.tokenTitleErr, App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
        App.util.hideProgressScreen();
      });
    },
    sendMesage: function(options) {
      var _this = this;
      var _options = options || {};
      var id = "";
      switch(this.type) {
        case "edit":
          id = this.id;
          break;
      };
      App.btApi.sendMessage({
          id: id,
          name: _options.name,
          type: "pc",
          htmlFlg: 2,
          startTime: _options.startTime,
          subject: _options.subject,
          body: _options.body,
          isSend: 1, 
          scid: _options.scid,
          token: _options.token
      }).done(function(res) {
        App.dialogueCommon.setType( "sendMesageSuccess" );
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.confirm.dialogueSuccess.sendMessageTitleSuccess, App.appModel.getLanguageType().mail.confirm.dialogueSuccess.sendMessageMsgSuccess);
        _this.dataModel.setStatusAction("sendMessageSuccess");
        App.util.hideProgressScreen();
      }).fail(function(err) {
        App.dialogueCommon.setType( "sendMesageError" );
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.confirm.dialogueError.sendMessageTitleErr, App.appModel.getLanguageType().mail.confirm.dialogueError.sendMessageMsgErr);
        App.util.hideProgressScreen();
      });
    },
    backMain: function(e) {
      e.preventDefault();
      App.dialogueCommon.setType("backMain");
      App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backHomeTitle, App.appModel.getLanguageType().common.dialogue.backHomeMsg);
    },
    backMainCommon: function() {
      if ( this.dataModel.getStatusAction() !== "sendMessageSuccess" ) {
        this.dataModel.destroy();
        this.dataModel.clear();
      }
      // location.hash = "workflow-mail";
      App.pageSlider.back("workflow-mail");
    },
    getCountSubscribesError: function() {
      // location.hash = "messageSetting/" + this.type + "?id=" + this.id;
      App.pageSlider.back();
    },
    saveMesageContents: function (e) {
      e.preventDefault();
      App.dialogueCommon.setType("saveDraftMail");
      App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.draftTitle, App.appModel.getLanguageType().common.dialogue.draftMsg);
    },
  });

  return ConfirmLayoutView;

})();