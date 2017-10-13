var Backbone = require('backbone');
require('../../../../../../lib/components/bootstrap/datetimepicker/datetimepicker.min.js');

var DataModel = require('../../../models/data_model.js');
var CouponInformationModel = require('./coupon_information_model.js');

var CouponInformationItemView = require('./coupon_information_item_view.js');
var DetailCouponModel = require('../../../models/detail_coupon_model.js');

var FooterItemView = require('../../../common/footer_item_view.js');

var ValidationModel = require('../../../models/validation_model.js');
var TokenModel = require('../../../models/token_model.js');
var moment = require('moment');
module.exports = (function () {
  var CouponInformationLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./coupon_information_layout_template.html'),
    regions: {
      "couponInformationRegion": "#information-region-wrapper #coupon-content-region",
      "footerRegion": "#information-region-wrapper #footer-region"
    },
    ui: {
      "next": ".navi-controll .btn-next",
      "cancel": ".navi-controll .btn-cancel"
    },
    events: function () {
      return (applican.config.device_os === "IOS") ? {
        "change #dateValidType0, #dateValidType1": "checkAvailability",
        "keyup #limitPersonVal": "_changeField",
        "keyup #limitNumberVal": "_changeField",
        "paste #limitPersonVal": "actionPasteCut",
        "cut #limitPersonVal": "actionPasteCut",
        "paste #limitNumberVal": "actionPasteCut",
        "cut #limitNumberVal": "actionPasteCut",
        "touchend @ui.next": "next",
        "touchend @ui.cancel": "cancel",
        "touchend .btn-home": "backMain",
        "touchstart": "checkDatetimePicker",
        "touchend .btn-save": "saveCouponContent"
      } : {
        "change #dateValidType0, #dateValidType1": "checkAvailability",
        "keyup #limitPersonVal": "_changeField",
        "keyup #limitNumberVal": "_changeField",
        "paste #limitPersonVal": "actionPasteCut",
        "cut #limitPersonVal": "actionPasteCut",
        "paste #limitNumberVal": "actionPasteCut",
        "cut #limitNumberVal": "actionPasteCut",
        "click @ui.next": "next",
        "click @ui.cancel": "cancel",
        "click .btn-home": "backMain",
        "click .btn-save": "saveCouponContent"
      }
    },
    templateHelpers: function () {
      var _this = this;
      return {
        getTitle: function () {
          return App.appModel.getLanguageType().coupon.common.title;
        },
        getBtnHome: function () {
          return App.appModel.getLanguageType().common.btnHome;
        },
        getBtnSave: function () {
          return App.appModel.getLanguageType().common.btnSave;
        },
        getType: function () {
          return _this.type;
        }
      };
    },
    SidebarConf: {
      showSidebar: false
    },
    initialize: function (options) {
      this.arrField = {};
      this.type = options.type;
      this.coupId = options.coupId;
      this.dataModel = new DataModel({
        id: AppConf.core.localStorageKey
      });
      this.dataModel.safeFetch();
      this.dataModel.destroy();
      this.validationModel = new ValidationModel();
      this.tokenModel = new TokenModel();
      App.dialogueCommon.setType("couponInformation");
      this.couponInformationModel = new CouponInformationModel();

      this.listenTo(App.dialogueCommon, 'backMainOK', this.backMainCommon);
      this.listenTo(App.dialogueCommon, 'backMainOK1', this.backToSelectType);

      this.listenTo(App.dialogueCommon, 'saveDraftCoupon', this.saveDraftCoupon);
      if (this.dataModel) {
        if (this.dataModel.get("memberOnly1") === this.dataModel.getMemberOnly() && this.dataModel.getMemberOnly()) {
          this.listenTo(this, 'load:sync', this.onLoad);
        } else {
          if (this.type !== "view" && this.type !== "edit" && this.type !== "duplicate") {
            this.listenTo(this, 'load:sync', this.onLoad);
          }
        }
      } else {
        if (this.type !== "view" && this.type !== "edit" && this.type !== "duplicate") {
          this.listenTo(this, 'load:sync', this.onLoad);
        }
      }
      $(window).on('resize', _.bind(this.onResize, this));
    },
    onRender: function () {
      // get segment
      // AppConf.coupon.segmentId = App.util.common.getUrlParameter('segmentId');
      // if (AppConf.coupon.segmentId) {
      //   this.dataModel.set('segmentId', AppConf.coupon.segmentId);
      // }
      // get session p
      // AppConf.coupon.sessionId = App.util.common.getUrlParameter('p');
      // if(this.dataModel.get('sessionId')){
      //   AppConf.coupon.sessionId = this.dataModel.get('sessionId');
      // }else{
      //   this.dataModel.set('sessionId', AppConf.coupon.sessionId);
      // }
      var _this = this;
      switch (this.type) {
        case "view":
        case "edit":
        case "duplicate":
          if (this.dataModel) {
            if (this.dataModel.get("memberOnly1") === this.dataModel.getMemberOnly() && this.dataModel.getMemberOnly()) {
              this.couponInformationModel.setContentData(this.dataModel);
              this._renderFooter();
              this.couponInformationRegion.show(new CouponInformationItemView({
                model: this.couponInformationModel
              }));
              App.util.hideProgressScreen();
            } else {
              this.fetchDetail();
            }
          } else {
            this.fetchDetail();
          }
          break;
        default:
          if (this.dataModel) {
            if (this.dataModel.get("memberOnly1") === this.dataModel.getMemberOnly() && this.dataModel.getMemberOnly()) {
              this.couponInformationModel.setContentData(this.dataModel);
            } else {
              this.couponInformationModel.setContentDataEmpty();
              var memberOnly = this.dataModel.getMemberOnly();
              if (AppConf.webConf.segmentIdFromUrl || AppConf.webConf.segmentId) {
                memberOnly = "0";
              }
              this.couponInformationModel.setMemberOnly(memberOnly);
            }
          }
          this._renderFooter();
          this.couponInformationRegion.show(new CouponInformationItemView({
            model: this.couponInformationModel
          }));
          App.util.hideProgressScreen();
          break;
      };
    },
    fetchDetail: function () {
      var _this = this;
      this.detailCouponModel = new DetailCouponModel({
        authCouponId: this.coupId
      });
      App.util.bindProgressScreen(this, this.detailCouponModel);
      this.listenTo(this.detailCouponModel, 'sync', this._renderCouponInformation);
      this.detailCouponModel.fetchDetailCoupon({
        on403: function () {
          _this.couponInformationModel.set("memberOnly", "");
          _this._renderFooter();
          App.dialogueCommon.setType("getDetailCouponError");
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().coupon.information.dialogueError.getDetailCouponTitleErr, App.appModel.getLanguageType().coupon.information.dialogueError.getDetailCouponMsgErr);
        }
      });
    },
    onLoad: function () {
      var _this = this;
      /*var windowH = $(window).height();
      var wrapperH = $('#master-container').height();
      if(windowH > wrapperH) {
        $('#master-container, #information-region-wrapper .container').css({'height': windowH + 'px'});
      }else{
        $('#information-region-wrapper .container').css({'height': wrapperH + 'px'});
      }*/
      var start = $('#dateTimeAvailabilityStart').datetimepicker({
        format: 'YYYY/MM/DD HH:mm',
        ignoreReadonly: true,
        // useCurrent: true,
        sideBySide: true,
        toolbarPlacement: 'bottom',
        // debug:true
        useCurrent: false,
      }).on('dp.change', function (e) {
        var endDate = e.date.add(1, 'd');
        end.data("DateTimePicker").minDate(endDate).date(endDate);
      });
      var minDate = false;
      if (start.val()) {
        minDate = moment(start.val(), 'YYYY/MM/DD HH:mm').add(1, 'd');
      }
      var end = $('#dateTimeAvailabilityEnd').datetimepicker({
        format: 'YYYY/MM/DD HH:mm',
        ignoreReadonly: true,
        // useCurrent: true,
        sideBySide: true,
        toolbarPlacement: 'bottom',
        // debug:true
        useCurrent: false,
        minDate: minDate
      });
      if (this.dataModel) {
        if (this.dataModel.get("memberOnly1") === this.dataModel.getMemberOnly() && this.dataModel.getMemberOnly()) {
          if (this.type === "view") {
            this.disbaleElement();
          }
        }
      }
    },
    getDate: function (element) {
      var date;
      try {
        date = $.datepicker.parseDate(dateFormat, element.value);
      } catch (error) {
        date = null;
      }

      return date;
    },
    checkDatetimePicker: function () {
      if (!$(event.target).closest('.bootstrap-datetimepicker-widget').length && !$(event.target).closest('.hasDatetimepicker').length) {
        $('#dateTimeAvailabilityStart').data('DateTimePicker').hide();
        $('#dateTimeAvailabilityEnd').data('DateTimePicker').hide();
      }
    },
    onResize: function () {
      /*var windowH = $(window).height();
      $('#master-container, #information-region-wrapper .container').css('height', windowH);*/
    },
    checkConditions: function (e) {
      if (e.currentTarget.checked) {
        $("#" + e.currentTarget.id + "Val").prop('disabled', false).focus();
      } else {
        $("#" + e.currentTarget.id + "Val").prop('disabled', true);
      }
    },
    checkAvailability: function (e) {
      $("#dateValidType0Val input, #dateValidType1Val input").prop('disabled', true);
      $("#dateValidType0Val select").prop('disabled', true);
      if (e.currentTarget.checked) {
        $("#" + e.currentTarget.id + "Val input, #" + e.currentTarget.id + "Val select").prop('disabled', false);
        // $("#"+e.currentTarget.id+"Val input").first().focus();
      }
    },
    _renderCouponInformation: function () {
      if (this.detailCouponModel && this.detailCouponModel.get('customSegment')) {
        AppConf.webConf.segmentId = this.detailCouponModel.get('segmentDetail').segmentId;
        AppConf.coupon.customSegment = this.detailCouponModel.get('customSegment');
        // AppConf.coupon.condId = this.detailCouponModel.get('conditionId');

        // this.dataModel.set('segmentId', AppConf.coupon.segmentId);
        // this.dataModel.set('customSegment', AppConf.coupon.customSegment);
        // this.dataModel.set('condId', AppConf.coupon.condId);
        // this.dataModel.save();
      }
      this.couponInformationModel.setContentData(this.detailCouponModel);
      this._renderFooter();
      this.couponInformationRegion.show(new CouponInformationItemView({
        model: this.couponInformationModel
      }));
      this.onLoad();
      if (this.type === "view") {
        this.disbaleElement();
      }
    },
    disbaleElement: function () {
      $(".coupon-master .form-control").prop("disabled", true);
      $(".page-center .btn-save").hide();
    },
    _renderFooter: function () {
      this.couponInformationModel.set("typeFooter", "coupon");
      switch (this.type) {
        case "view":
        case "edit":
        case "duplicate":
          this.couponInformationModel.set("action", this.type);
          this.couponInformationModel.set("tabIdx", 0);
          break;
        default:
          this.couponInformationModel.set("action", "create");
          this.couponInformationModel.set("tabIdx", 1);
          break;
      };
      if (AppConf.webConf.segmentIdFromUrl) {
        this.couponInformationModel.set("hideBackBtn", true);
      }
      this.footerRegion.show(new FooterItemView({
        model: this.couponInformationModel
      }));
    },
    _changeField: function (e) {
      var field = $(e.currentTarget);
      var id = field.attr('id');
      var value = field.val();
      var lengthId = id.length;
      var checkElement = id.substr(0, lengthId - 3);
      if (!value) {
        $("#" + checkElement).prop("checked", false);
      } else {
        if (!isNaN(value)) {
          if (value > 0) {
            $("#" + checkElement).prop("checked", true);
          } else {
            $("#" + checkElement).prop("checked", false);
          }
        } else {
          $("#" + checkElement).prop("checked", false);
        }
      }
    },
    actionPasteCut: function (e) {
      var field = $(e.currentTarget);
      setTimeout(function () {
        $(field).trigger("keyup");
      }, 0);
    },
    next: function (e) {
      e.preventDefault();
      if (this.type === "view") {
        this.couponInformationModel.setMemberOnly1(this.couponInformationModel.get("memberOnly"));
        this.dataModel.setCouponDataTemp(this.couponInformationModel);
        location.hash = "couponContent/" + this.type + "?coupId=" + this.coupId;
      } else {
        if (this.checkInput() === true) {
          this.setContentSave();
          this.dataModel.setCouponDataTemp(this.couponInformationModel);
          location.hash = "couponContent/" + this.type + "?coupId=" + this.coupId;
        }
      }
    },
    cancel: function (e) {
      e.preventDefault();
      if (this.type === "view") {
        // location.hash = "workflow-coupon";
        App.pageSlider.main('workflow-coupon');
      } else if (this.type === "edit" || this.type === "duplicate") {
        // var memberOnly1 = this.dataModel.get("memberOnly1");
        // if ( memberOnly1 ) {
        App.dialogueCommon.setType("backMain");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backHomeTitle, App.appModel.getLanguageType().common.dialogue.backHomeMsg);
        // } else {
        //   this.backMainCommon();
        // }
      } else {
        // this.setContentSave();
        // App.pageSlider.back();
        // location.hash = "couponType";
        App.dialogueCommon.setType("backMain1");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backCouponTitle, App.appModel.getLanguageType().common.dialogue.backCouponMsg);
      }
    },
    backToSelectType: function () {
      this.dataModel.destroy();
      App.pageSlider.back();
    },
    setContentSave: function () {
      var name = $("#name").val();
      var useType = $('#useType').find(":selected").data("id");
      var useLimit = ($("#limitPerson").is(":checked")) ? $("#limitPersonVal").val() : 0;
      var limitNumber = ($("#limitNumber").is(":checked")) ? $("#limitNumberVal").val() : 0;
      var useInterval = ($("#limitDay").is(":checked")) ? 1 : 0;
      var useStartDateTime = ($("#dateValidType0").is(":checked") ? $("#dateTimeAvailabilityStart").val() : "");
      if (useStartDateTime) {
        useStartDateTime = App.util.date.convertDate1(useStartDateTime, "YYYY/MM/DD HH:mm", "YYYYMMDDHHmm");
      }
      var useEndDateTime = ($("#dateValidType0").is(":checked") ? $("#dateTimeAvailabilityEnd").val() : "");
      if (useEndDateTime) {
        useEndDateTime = App.util.date.convertDate1(useEndDateTime, "YYYY/MM/DD HH:mm", "YYYYMMDDHHmm");
      }
      var validity = ($("#dateValidType1").is(":checked") ? $("#numOfDayValidSinceDist").val() : 0);
      var confirmationDisp = ($("#confirmationDisp").is(":checked") ? 1 : 0);
      var stddatedivCd = ($("#dateValidType0").is(":checked")) ? "0" : "1";
      var objectData = {
        name: name,
        memberOnly1: this.couponInformationModel.get("memberOnly"),
        useType: useType,
        useLimit: useLimit,
        thresLimitNumber: limitNumber,
        useInterval: useInterval,
        useStartDateTime: useStartDateTime,
        useEndDateTime: useEndDateTime,
        validity: validity,
        stddatedivCd: stddatedivCd,
        confirmationDisp: confirmationDisp
      };
      this.couponInformationModel.setContentDataByObject(objectData);
      this.dataModel.setCouponDataTemp(this.couponInformationModel);
    },
    backMain: function (e) {
      e.preventDefault();
      if (this.type === "edit" || this.type === "duplicate") {
        // var memberOnly1 = this.dataModel.get("memberOnly1");
        // if ( memberOnly1 ) {
        App.dialogueCommon.setType("backMain");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backHomeTitle, App.appModel.getLanguageType().common.dialogue.backHomeMsg);
        // } else {
        //   this.backMainCommon();
        // }
      } else if (this.type === "view") {
        this.backMainCommon();
      } else {
        App.dialogueCommon.setType("backMain");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backHomeTitle, App.appModel.getLanguageType().common.dialogue.backHomeMsg);
      }
    },
    backMainCommon: function () {
      this.dataModel.destroy();
      // location.hash = "workflow-coupon";
      App.pageSlider.main('workflow-coupon');
    },
    checkInput: function () {
      var name = $("#name").val();
      var useType = $('#useType').find(":selected").data("id");
      var useLimit = ($("#limitPerson").is(":checked")) ? $("#limitPersonVal").val() : 0;
      var limitNumber = ($("#limitNumber").is(":checked")) ? $("#limitNumberVal").val() : 0;
      var useStartDateTime = ($("#dateValidType0").is(":checked")) ? $("#dateTimeAvailabilityStart").val() : "";
      var useEndDateTime = ($("#dateValidType0").is(":checked")) ? $("#dateTimeAvailabilityEnd").val() : "";
      var validity = ($("#dateValidType1").is(":checked")) ? $("#numOfDayValidSinceDist").val() : 0;

      var optionCheck = {};
      optionCheck.name = name;
      if ($("#limitPerson").is(":checked")) {
        optionCheck.useLimit = useLimit;
      }

      if ($("#limitNumber").is(":checked")) {
        optionCheck.limitNumber = limitNumber;
      }

      if ($("#dateValidType0").is(":checked")) {
        optionCheck.useStartDateTime = useStartDateTime;
        optionCheck.useEndDateTime = useEndDateTime;
      }

      if ($("#dateValidType1").is(":checked")) {
        optionCheck.validity = validity;
      }

      var checkInput = true;
      this.validationModel.set(optionCheck, {
        validate: true
      });
      if (this.validationModel.validationError === null || this.validationModel.validationError === "") {
        if (optionCheck.useStartDateTime && optionCheck.useEndDateTime) {
          switch (this.validationModel.checkDate(useStartDateTime, useEndDateTime, "YYYYMMDDHHmm")) {
            case "0":
              this.onError1(App.appModel.getLanguageType().coupon.information.startCompletionDateErr1);
              checkInput = false;
              break;
            case "1":
              this.onError1(App.appModel.getLanguageType().coupon.information.startCompletionDateErr2);
              checkInput = false;
              break;
            case "2":
              this.resetBorder();
              break;
          }
        } else {
          this.resetBorder();
        }
      } else {
        this.onError(this.validationModel.validationError);
        checkInput = false;
      }
      return checkInput;
    },
    resetBorder: function () {
      $("#name").css({
        "border-color": "#29235c"
      });
      $("#limitPersonVal").css({
        "border-color": "#29235c"
      });
      $("#limitNumberVal").css({
        "border-color": "#29235c"
      });
      $("#dateTimeAvailabilityStart").css({
        "border-color": "#29235c"
      });
      $("#dateTimeAvailabilityEnd").css({
        "border-color": "#29235c"
      });
      $("#numOfDayValidSinceDist").css({
        "border-color": "#29235c"
      });
    },
    onError: function (error) {
      var msg;
      if (error.name) {
        msg = error.name;
        $("#name").css({
          "border-color": "red"
        });
      } else {
        $("#name").css({
          "border-color": "#29235c"
        });
      }
      if (error.useLimit) {
        if (!msg) {
          msg = error.useLimit[0];
        }
        $("#limitPersonVal").css({
          "border-color": "red"
        });
      } else {
        $("#limitPersonVal").css({
          "border-color": "#29235c"
        });
      }
      if (error.limitNumber) {
        if (!msg) {
          msg = error.limitNumber[0];
        }
        $("#limitNumberVal").css({
          "border-color": "red"
        });
      } else {
        $("#limitNumberVal").css({
          "border-color": "#29235c"
        });
      }
      if (error.useStartDateTime) {
        if (!msg) {
          msg = error.useStartDateTime;
        }
        $("#dateTimeAvailabilityStart").css({
          "border-color": "red"
        });
      } else {
        $("#dateTimeAvailabilityStart").css({
          "border-color": "#29235c"
        });
      }
      if (error.useEndDateTime) {
        if (!msg) {
          msg = error.useEndDateTime;
        }
        $("#dateTimeAvailabilityEnd").css({
          "border-color": "red"
        });
      } else {
        $("#dateTimeAvailabilityEnd").css({
          "border-color": "#29235c"
        });
      }
      if (error.validity) {
        if (!msg) {
          msg = error.validity[0];
        }
        $("#numOfDayValidSinceDist").css({
          "border-color": "red"
        });
      } else {
        $("#numOfDayValidSinceDist").css({
          "border-color": "#29235c"
        });
      }
      App.dialogueCommon.setType("inputError");
      App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.inputTitleError, msg);
    },
    onError1: function (msg) {
      $("#dateTimeAvailabilityStart").css({
        "border-color": "red"
      });
      $("#dateTimeAvailabilityEnd").css({
        "border-color": "red"
      });
      App.dialogueCommon.setType("inputError");
      App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.inputTitleError, msg);
    },
    saveCouponContent: function (e) {
      e.preventDefault();
      if (this.checkInput() === true) {
        App.dialogueCommon.setType("saveDraftCoupon");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.draftTitle, App.appModel.getLanguageType().common.dialogue.draftMsg);
      }
    },
    saveDraftCoupon: function () {
      this.setContentSave("1");
      this.couponInformationModel.setContentSaveAndExit();
      this.couponInformationModel.setCoupId(this.type, this.coupId);
      this.fetchToken({
        actionType: 0,
        couponMaster: this.couponInformationModel.getCouponMaster(),
        type: "save"
      });
    },
    fetchToken: function (options) {
      var _this = this;
      var _options = options || {};
      var type = _options.type;
      App.util.showProgressScreen();
      App.dialogueCommon.setType("couponContentAction");
      this.tokenModel.fetchToken({})
        .done(function (data) {
          _this.saveCoupon({
            actionType: _options.actionType,
            couponMaster: _options.couponMaster,
            token: data.token
          });
        })
        .fail(function (res) {
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.tokenTitleErr, App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
          App.util.hideProgressScreen();
        });
    },
    saveCoupon: function (options) {
      var _this = this;
      var _options = options || {};
      App.btApi.sendCoupon({
        actionType: _options.actionType,
        couponMaster: _options.couponMaster,
        token: _options.token
      }).done(function (res) {
        App.dialogueCommon.setType("saveCouponSuccess");
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().coupon.common.dialogueSuccess.saveCouponTitleSuccess, App.appModel.getLanguageType().coupon.common.dialogueSuccess.saveCouponMsgSuccess);
        _this.dataModel.setStatusAction("saveCouponSuccess");
        App.util.hideProgressScreen();
      }).fail(function (err) {
        App.dialogueCommon.setType("saveCouponError");
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().coupon.common.dialogueError.saveCouponTitleErr, App.appModel.getLanguageType().coupon.common.dialogueError.saveCouponMsgErr);
        App.util.hideProgressScreen();
      });
    }
  });

  return CouponInformationLayoutView;

})();