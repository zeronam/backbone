var Backbone = require('backbone');
var Datetimepicker = require('../../../../../../lib/components/bootstrap/datetimepicker/datetimepicker.min.js');

var DataModel = require('../../../models/data_model.js');
var CouponInformationModel = require('../coupon_information/coupon_information_model.js');

var CouponSettingItemView = require('./coupon_setting_content_item_view.js');
var CouponPreviewItemView = require('../coupon_content/coupon_content_preview_item_view.js');

var FooterItemView = require('../../../common/footer_item_view.js');

var ConditionListCollection = require('../../../models/condition_list_collection.js');

var TokenModel = require('../../../models/token_model.js');

var ValidationModel = require('../../../models/validation_model.js');
var SegmentInfoModel = require('../../../models/segment_info_model.js');
module.exports = (function () {
  var CouponSettingLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./coupon_setting_layout_template.html'),    
    templateHelpers: {
      getTitle: function() {
        return App.appModel.getLanguageType().coupon.common.title;
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
    regions: {
      "CouponContentRegion" : "#setting-region-wrapper #coupon-content-region",
      "CouponPreviewRegion" : "#setting-region-wrapper #coupon-preview-region",
      "footerRegion": "#setting-region-wrapper #footer-region"
    },
    ui: {
      "next": ".navi-controll .btn-next",
      "cancel": ".navi-controll .btn-cancel",
    },
    events: function() {
      return ( applican.config.device_os === "IOS" ) ?
      {
        "change #repeatNon, #repeatCheck" : "checkDistribution",
        "touchend @ui.next" : "next",
        "touchend @ui.cancel" : "cancel",
        "touchend .btn-home" : "backMain",
        "touchend .btn-save" : "saveCouponContent"
      }:
      {
        "change #repeatNon, #repeatCheck" : "checkDistribution",
        "click @ui.next" : "next",
        "click @ui.cancel" : "cancel",
        "click .btn-home" : "backMain",
        "click .btn-save" : "saveCouponContent"
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

      this.couponInformationModel = new CouponInformationModel();

      this.tokenModel = new TokenModel();
      this.validationModel = new ValidationModel();

      this.segmentInfoModel = new SegmentInfoModel({
        pagination: true
      });
      App.util.bindProgressScreen(this, this.segmentInfoModel);

      this.conditionListCollection = new ConditionListCollection();
      App.util.bindProgressScreen(this, this.conditionListCollection);
      this.listenTo(this.conditionListCollection, 'sync', this._renderConditionList);
      this.listenTo(App.dialogueCommon, 'backMainOK', this.backMainCommon);
      this.listenTo(App.dialogueCommon, 'saveDraftCoupon', this.saveDraftCoupon);

      this.listenTo(this, 'load:sync', this.onLoad);
      $(window).on('resize', _.bind(this.onResize, this));
    },
    onRender: function() {
      var _this = this;
      // AppConf.coupon.segmentId = this.dataModel.get('segmentId');
      // AppConf.coupon.customSegment = this.dataModel.get('customSegment');
      // AppConf.coupon.condId = this.dataModel.get('condId');

      // AppConf.coupon.sessionId = this.dataModel.get('sessionId');
      
      
      if (!AppConf.webConf.segmentId && !AppConf.webConf.segmentIdFromUrl) {
        _this._renderCouponSetting();
        if ( this.couponInformationModel.get("memberOnly") !== "1" ) {
          this.conditionListCollection.fetchWithAuthInfo({
            on401: function() {
              _this.setTarget("", App.appModel.getLanguageType().coupon.setting.conditionNone);
            }
          });
        } else {
          App.util.hideProgressScreen();
        }
      } else {
        var _this = this;
        this.segmentInfoModel.fetchSegmentInfo({
            segmentId: AppConf.coupon.segmentId || AppConf.coupon.segmentIdFromUrl
          })
          .done(function (data) {
            _this.dataModel.set({
              segmentDetail: data
            });
            _this._renderCouponSetting();
          })
          .fail(function (err) {
            App.dialogueCommon.setType("getSegmentInfoError");
            App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.condition.dialogue.getSegmentTitleErr, App.appModel.getLanguageType().notification.condition.dialogue.getSegmentMsgErr);
          });
      }
    },
    onLoad: function() {
      /*var windowH = $(window).height();
      var wrapperH = $('#master-container').height();
      if(windowH > wrapperH) {
        $('#master-container, #setting-region-wrapper .container').css({'height': windowH + 'px'});
      }else{
        $('#setting-region-wrapper .container').css({'height': wrapperH + 'px'});
      }*/

      var useStartDateTime = this.dataModel.get("useStartDateTime");
      useStartDateTime = App.util.date.convertDate(useStartDateTime, "YYYY/MM/DD");
      var useEndDateTime = this.dataModel.get("useEndDateTime");
      useEndDateTime = App.util.date.convertDate(useEndDateTime, "YYYY/MM/DD");
      var startDatetime = this.dataModel.get("startDatetime");
      startDatetime = App.util.date.convertDate(startDatetime, "YYYY/MM/DD");
      var endDatetime = this.dataModel.get("endDatetime");
      endDatetime = App.util.date.convertDate(endDatetime, "YYYY/MM/DD");
      var today = App.util.date.convertDate(new Date(), "YYYY/MM/DD");
      var dateStartTmp;
      var dateEndTmp;
      if ( this.dataModel.get("delivType") === "1" ) {
        dateStartTmp = startDatetime;
        dateEndTmp = endDatetime;
      } else {
        if ( useStartDateTime && useEndDateTime ) {
          dateStartTmp = useStartDateTime;
          dateEndTmp = useEndDateTime;
        } else {
          dateStartTmp = today;
          dateEndTmp = today;
        }
      }
      
      var optionDate1 = {
        useCurrent: false
      };
      optionDate1.format = "YYYY/MM/DD";
      optionDate1.ignoreReadonly = true;
      optionDate1.sideBySide = true;
      optionDate1.toolbarPlacement = "bottom";
      optionDate1.defaultDate = dateStartTmp;

      var optionDate2 = {
        useCurrent: false
      };
      optionDate2.format = "YYYY/MM/DD";
      optionDate2.ignoreReadonly = true;
      optionDate2.sideBySide = true;
      optionDate2.toolbarPlacement = "bottom";
      optionDate2.defaultDate = dateEndTmp;
      if ( useStartDateTime && useEndDateTime ) {
        optionDate1.maxDate = useEndDateTime;
        optionDate2.minDate = useStartDateTime;
      }

      $('#setting-region-wrapper #dateDistStart').datetimepicker(optionDate1);

      $('#setting-region-wrapper #dateDistEnd').datetimepicker(optionDate2);

      if ( this.type === "view" ) {
        this.disbaleElement();
      }   
    },
    onResize: function(){
        /*var windowH = $(window).height();
        $('#master-container, #setting-region-wrapper .container').css('height', windowH);*/
    },
    checkDistribution: function(e){
      $("#repeatCheckVal input").prop('disabled', true);
      $("#giveMultiple2").prop('disabled', false);
      $("#giveMultiple1, #giveMultiple0").prop('disabled', true);
      if(e.currentTarget.checked) {
        $("#"+e.currentTarget.id+"Val input").prop('disabled', false);
        if(e.currentTarget.id == "repeatCheck"){
          $("#giveMultiple1, #giveMultiple0").prop('disabled', false);
        }
      }
    },
    _renderCouponSetting: function() {
      if ( this.dataModel ) {
        this.couponInformationModel.setContentData(this.dataModel);
      }
      this._renderFooter();
      this.CouponContentRegion.show(new CouponSettingItemView({ model: this.couponInformationModel }));  
      this.CouponPreviewRegion.show(new CouponPreviewItemView({ model: this.couponInformationModel })); 
    },
    disbaleElement: function(){
      $(".coupon-master .form-control").prop("disabled", true);
      $(".btn-next").hide();
      $(".page-center .btn-save").hide();
    },
    _renderConditionList: function(){
      var _this = this;
      $("#target option").remove();
      if(AppConf.webConf.segmentIdFromUrl || AppConf.webConf.segmentId){
        this.$('#target').hide().prev('.title-lbl').hide();
      }else{
        this.setTarget("", App.appModel.getLanguageType().coupon.setting.conditionNone);
        if ( this.conditionListCollection.length > 0 ) {
          this.conditionListCollection.each(function(model){
            _this.setTarget(model.get("id"), model.get("name"));
          });
          var scid = this.dataModel.getScid();
          if ( scid ) {
            $('#target option[data-id = ' + scid + ']').prop("selected",true);
          }
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
    _renderFooter: function() {
      this.couponInformationModel.set("typeFooter", "coupon");
      switch ( this.type ) {
        case "view":
        case "edit":
        case "duplicate":
          this.couponInformationModel.set("action", this.type);
          this.couponInformationModel.set("tabIdx", 2);
          break;
        default:
          this.couponInformationModel.set("action", "create");  
          this.couponInformationModel.set("tabIdx", 3);        
          break;
      };
      this.footerRegion.show( new FooterItemView({ model: this.couponInformationModel }) );
    },
    next: function(e) {
      e.preventDefault();
      if ( this.checkInput() === true ) {
        this.setContentSave();
        location.hash = "counponConfirm/" + this.type + "?coupId=" + this.coupId;
      }
    },
    cancel: function(e){
      e.preventDefault();
      if ( this.type !== "view" ) {
        this.setContentSave();
        
      }
      // location.hash = "couponContent/" + this.type + "?coupId=" + this.coupId;
      App.pageSlider.back();
    },
    backMain: function(e) {
      e.preventDefault();
      if ( this.type === "edit" || this.type === "duplicate" ) {
        App.dialogueCommon.setType("backMain");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backHomeTitle, App.appModel.getLanguageType().common.dialogue.backHomeMsg);
      } else if ( this.type === "view" ) {
        this.backMainCommon();
      } else {
        App.dialogueCommon.setType("backMain");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backHomeTitle, App.appModel.getLanguageType().common.dialogue.backHomeMsg);
      }
    },
    backMainCommon: function() {
      this.dataModel.destroy();
      // location.hash = "workflow-coupon";
      App.pageSlider.main("workflow-coupon");
    },
    checkInput: function() {
      var repeatCheck = $("#repeatCheck").is(":checked");
      var startDate = $("#dateDistStart").val();
      startDate += " 00:00";
      var endDate = $("#dateDistEnd").val();
      endDate += " 23:59";
      var useStartDateTime = this.couponInformationModel.get("useStartDateTime");
      var useEndDateTime = this.couponInformationModel.get("useEndDateTime");
      var checkInput = true;
      if ( repeatCheck ) {
        this.validationModel.set({startDateSend: startDate, endDateSend: endDate}, {validate:true});
        if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
          switch ( this.validationModel.checkDate1( startDate, endDate, useStartDateTime, useEndDateTime, "YYYYMMDD" ) ) {
            case "0":
              useStartDateTime = App.util.date.convertDate1(useStartDateTime, "YYYYMMDDHHmm", "YYYY/MM/DD");
              if ( App.appModel.getLanguage() === "en" ) {
                this.onError1("Distribution start date is greater than than the use start date(" + useStartDateTime + ")");
              } else if  ( App.appModel.getLanguage() === "ja" ) {
                this.onError1("配布開始日は利用開始日(" + useStartDateTime + ")より大なりです");
              }
              checkInput = false;
              break;
            case "1":
              useEndDateTime = App.util.date.convertDate1(useEndDateTime, "YYYYMMDDHHmm", "YYYY/MM/DD");
              if ( App.appModel.getLanguage() === "en" ) {
                this.onError1("Delivery end date is greater than than use end date (" + useEndDateTime + ")");
              } else if  ( App.appModel.getLanguage() === "ja" ) {
                this.onError1("配信終了日は利用終了日(" + useEndDateTime + ")より大なりです");
              }
              checkInput = false;
              break;
            case "2":
              this.onError1(App.appModel.getLanguageType().coupon.setting.deliveryEndDateErr1);
              checkInput = false;
              break;
            case "3":
              this.onError1(App.appModel.getLanguageType().coupon.setting.deliveryEndDateErr2);
              checkInput = false;
              break;
            case "4":
              this.resetBorder();
              break;
          };
        } else {
          this.onError( this.validationModel.validationError );
          checkInput = false;
        }
      }
      return checkInput;
    },
    resetBorder: function() {
      $("#dateDistStart").css({"border-color": "#29235c"});
      $("#dateDistEnd").css({"border-color": "#29235c"});
    },
    onError: function(error) {
      var msg;
      if ( error.startDateSend ) {
        msg = error.startDateSend;
        $("#dateDistStart").css({"border-color": "red"});
      } else {
        $("#dateDistStart").css({"border-color": "#29235c"});
      }
      if ( error.endDateSend ) {
        if ( !msg ) {
          msg = error.endDateSend;
        }
        $("#dateDistEnd").css({"border-color": "red"}); 
      } else {
        $("#dateDistEnd").css({"border-color": "#29235c"});
      }
      App.dialogueCommon.setType("inputError");
      App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.inputTitleError, msg);
    },
    onError1: function(msg) {
      $("#dateDistStart").css({"border-color": "red"});
      $("#dateDistEnd").css({"border-color": "red"});
      App.dialogueCommon.setType("inputError");
      App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.inputTitleError, msg);
    },
    setContentSave: function(flg) {
      var conditionId = $('#target').find(":selected").data("id");
      var conditionName = $('#target option:selected').text();
      var delivType;
      var startDate = "";
      var endDate = "";
      var giveMultiple;
      if ( $("#repeatNon").is(":checked") ) {
        delivType = "0";
      } else if ( $("#repeatCheck").is(":checked") ) {
        delivType = "1";
      }
      if ( $("#giveMultiple0").is(":checked") ) {
        giveMultiple = "0";
      } else if ( $("#giveMultiple1").is(":checked") ) {
        giveMultiple = "1";
      } else if ( $("#giveMultiple2").is(":checked") ) {
        giveMultiple = "2";
      }
      if ( delivType === "1" ) {
        startDate = $("#dateDistStart").val();
        startDate += " 00:00";
        endDate = $("#dateDistEnd").val();
        endDate += " 23:59";
        startDate = App.util.date.convertDate1(startDate, "YYYY/MM/DD HH:mm", "YYYYMMDDHHmm");
        endDate = App.util.date.convertDate1(endDate, "YYYY/MM/DD HH:mm", "YYYYMMDDHHmm");
      }
      if(AppConf.coupon.segmentId || AppConf.coupon.segmentIdFromUrl){
        conditionId = undefined;
      }
      var objectData = {
        // scid: scid,
        conditionId: conditionId,
        conditionName: conditionName,
        delivType: delivType,
        startDatetime: startDate,
        endDatetime: endDate,
        giveMultiple: giveMultiple
      };
      this.couponInformationModel.setContentDataByObject2(objectData);
      if ( !flg ) {
        this.dataModel.setCouponDataTemp(this.couponInformationModel);
      }
    },
    saveCouponContent: function(e) {
      e.preventDefault();
      if ( this.checkInput() === true ) {
        App.dialogueCommon.setType("saveDraftCoupon");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.draftTitle, App.appModel.getLanguageType().common.dialogue.draftMsg);
      }
    },
    saveDraftCoupon: function() {
      this.setContentSave("1");
      this.couponInformationModel.setCoupId( this.type, this.coupId );
      this.fetchToken({actionType: 0, couponMaster: this.couponInformationModel.getCouponMaster(), type: "save"});
    },
    fetchToken: function(options) {
      var _this = this;
      var _options = options || {};
      var type = _options.type;
      App.util.showProgressScreen();
      App.dialogueCommon.setType("settingCouponAction");
      this.tokenModel.fetchToken({})
      .done(function(data) {
        switch ( type ) {
          case "save":
            _this.saveCoupon({actionType: _options.actionType, couponMaster: _options.couponMaster, token: data.token});
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
    saveCoupon: function(options) {
      var _this = this;
      var _options = options || {};
      App.btApi.sendCoupon({
          actionType: _options.actionType,
          couponMaster: _options.couponMaster,
          token: _options.token
      }).done(function(res) {
        App.dialogueCommon.setType( "saveCouponSuccess" );
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().coupon.common.dialogueSuccess.saveCouponTitleSuccess, App.appModel.getLanguageType().coupon.common.dialogueSuccess.saveCouponMsgSuccess);
        _this.dataModel.setStatusAction("saveCouponSuccess");
        App.util.hideProgressScreen();
      }).fail(function(err) {
        App.dialogueCommon.setType( "saveCouponError" );
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().coupon.common.dialogueError.saveCouponTitleErr, App.appModel.getLanguageType().coupon.common.dialogueError.saveCouponMsgErr);
        App.util.hideProgressScreen();
      });
    }
  });

  return CouponSettingLayoutView;

})();