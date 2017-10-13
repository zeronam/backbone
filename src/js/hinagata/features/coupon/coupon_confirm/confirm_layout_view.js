var Backbone = require('backbone');
var DataModel = require('../../../models/data_model.js');
var ConfirmModel = require('../../../models/count_subscribes_model.js');
var TokenModel = require('../../../models/token_model.js');
var FooterItemView = require('../../../common/footer_item_view.js');

var CouponInformationModel = require('../coupon_information/coupon_information_model.js');

var moment = require('moment');

module.exports = (function () {
  var ConfirmCouponLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./confirm_layout_template.html'),
    templateHelpers: {
      getTitle: function() {
        return App.appModel.getLanguageType().coupon.common.title;
      },
      getBtnHome: function() {
        return App.appModel.getLanguageType().common.btnHome;
      },
      getMailDeliveryConfirmation: function() {
        return App.appModel.getLanguageType().coupon.confirm.mailDeliveryConfirmation;
      },
      getThisCouponToTheDestination: function() {
        return App.appModel.getLanguageType().coupon.confirm.thisCouponToTheDestination;
      },
      getAndToBeDeliveredTo: function() {
        return App.appModel.getLanguageType().coupon.confirm.andToBeDeliveredTo;
      },
      getStopInfo: function() {
        return App.appModel.getLanguageType().coupon.confirm.stopInfo;
      },
      getBtnBack: function() {
        return App.appModel.getLanguageType().common.btnBack;
      },
      getBtnConfirm: function() {
        return App.appModel.getLanguageType().common.confirm;
      },
      getCouponSend: function() {
        return App.appModel.getLanguageType().coupon.confirm.couponSend;
      }
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
      this.coupId = options.coupId;
      this.dataModel = new DataModel( { id: AppConf.core.localStorageKey } );
      this.dataModel.safeFetch();

      App.dialogueCommon.setType("confirmCoupon");
      
      this.confirmModel = new ConfirmModel();
      this.tokenModel = new TokenModel();
      this.couponInformationModel = new CouponInformationModel();
      // App.util.bindProgressScreen(this, this.confirmModel);
      // this.listenTo(this.confirmModel, 'sync', this._renderConfirm);
      this.confirmModel.setAppType(11);
      if ( this.dataModel ) {
        this.scid = this.dataModel.get("conditionId");
        var setConditionName = this.dataModel.get("conditionName");
        if ( App.appModel.getLanguage() === "en" ) {
          this.confirmModel.set("timestamp", moment(this.dateSend).format('ddd Do YYYY [at] HH:mm') );
        } else if  ( App.appModel.getLanguage() === "ja" ) {
          this.confirmModel.set("timestamp", moment(this.dateSend).format('YYYY年MM月DD日 HH時mm分') );
        }
        if ( this.scid ) {
          this.confirmModel.setCoditionId(this.scid);
          this.confirmModel.setConditionName(setConditionName);
        } else {
          this.confirmModel.setCoditionId("");
          this.confirmModel.setConditionName("");
        }
        this.confirmModel.set("memberOnly", this.dataModel.get("memberOnly"));
        this.couponInformationModel.setContentData(this.dataModel);
      }

      this.listenTo(App.dialogueCommon, "getCountSubscribesError", this.getCountSubscribesError);
      this.listenTo(this, 'load:sync', this.onLoad);
      this.listenTo(App.dialogueCommon, 'backMainOK', this.backMainCommon);
      $(window).on('resize', _.bind(this.onResize, this));
    },
    onRender: function() {
      // AppConf.coupon.segmentId = this.dataModel.get('segmentId');
      // AppConf.coupon.customSegment = this.dataModel.get('customSegment');
      // AppConf.coupon.condId = this.dataModel.get('condId');

      // AppConf.coupon.sessionId = this.dataModel.get('sessionId');
      this._renderFooter();
       /* this.confirmModel.fetchCountSubscribes({
        on403: function() {
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().coupon.confirm.dialogueError.getConditionTitleErr, App.appModel.getLanguageType().coupon.confirm.dialogueError.getConditionMsgErr);
        }
      });  */
      App.util.hideProgressScreen();
    },
    _renderFooter: function() {
      this.confirmModel.set("typeFooter", "coupon");
      var memberOnly = this.confirmModel.get("memberOnly");
      switch ( this.type ) {
        case "view":
        case "edit":
        case "duplicate":
          this.confirmModel.set("action", this.type);
          if ( memberOnly === "1" ) {
            this.confirmModel.set("tabIdx", 2);
          } else {
            this.confirmModel.set("tabIdx", 3);
          }
          break;
        default:
          this.confirmModel.set("action", "create");
          if ( memberOnly === "1" ) {
            this.confirmModel.set("tabIdx", 3);
          } else {
            this.confirmModel.set("tabIdx", 4);
          }
          break;
      };
      this.footerRegion.show( new FooterItemView({ model: this.confirmModel }) );
    },
    _renderConfirm: function() {
      if(this.confirmModel.get("memberOnly") != 0){
        $("#confirm-region .info-confirm").html(App.appModel.getLanguageType().coupon.confirm.couponSend2);
      }
      var totals = this.confirmModel.get("totals");
      var startTime = this.confirmModel.get("timestamp");
      var conditionValue = this.confirmModel.getConditionName();

      $("#confirm-region .total-value").text(totals);
      $("#confirm-region .dateTime").text(startTime);
      if ( !conditionValue ) {
        conditionValue = App.appModel.getLanguageType().coupon.confirm.conditionNone;
      }
      if(AppConf.webConf.segmentIdFromUrl || AppConf.webConf.segmentId){
        $("#confirm-region .segment_name").text(App.appModel.getLanguageType().coupon.confirm.users);
      }else{
        $("#confirm-region .segment_name").text(conditionValue);
      }
    },
    confirm: function(e) {
      e.preventDefault();
      this.couponInformationModel.setCoupId( this.type, this.coupId );
      this.fetchToken({actionType: 1, couponMaster: this.couponInformationModel.getCouponMaster(), type: "send"});
    },
    back: function(e) {
      e.preventDefault();
      /* var memberOnly = this.confirmModel.get("memberOnly");
      if ( memberOnly === "1" || memberOnly === "2" ) {
        location.hash = "couponContent/" + this.type + "?coupId=" + this.coupId;
      } else {
        location.hash = "couponSetting/" + this.type + "?coupId=" + this.coupId;
      } */
      App.pageSlider.back();
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
      // location.hash = "workflow-coupon";
      App.pageSlider.main('workflow-coupon');
    },
    getCountSubscribesError: function() {
      location.hash = "couponSetting/" + this.type + "?coupId=" + this.coupId;
    },
    fetchToken: function(options) {
      var _this = this;
      var _options = options || {};
      var type = _options.type;
      App.util.showProgressScreen();
      App.dialogueCommon.setType("couponConfirmAction");
      this.tokenModel.fetchToken({})
      .done(function(data) {
        switch ( type ) {
          case "send":
            _this.sendCoupon({actionType: _options.actionType, couponMaster: _options.couponMaster, token: data.token});
            break;
        };
      })
      .fail(function(res) {
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.tokenTitleErr, App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
        App.util.hideProgressScreen();
      });
    },
    sendCoupon: function(options) {
      var _this = this;
      var _options = options || {};
      App.btApi.sendCoupon({
          actionType: _options.actionType,
          couponMaster: _options.couponMaster,
          token: _options.token
      }).done(function(res) {
        App.dialogueCommon.setType( "sendCouponSuccess" );
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().coupon.confirm.dialogueSuccess.sendCouponTitleSuccess, App.appModel.getLanguageType().coupon.confirm.dialogueSuccess.sendCouponMsgSuccess);
        _this.dataModel.setStatusAction("sendCouponSuccess");
        App.util.hideProgressScreen();
      }).fail(function(err) {
        App.dialogueCommon.setType( "sendCouponError" );
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().coupon.confirm.dialogueError.sendCouponTitleFail , App.appModel.getLanguageType().coupon.confirm.dialogueError.sendCouponMsgFail);
        App.util.hideProgressScreen();
      });
    }
  });

  return ConfirmCouponLayoutView;

})();