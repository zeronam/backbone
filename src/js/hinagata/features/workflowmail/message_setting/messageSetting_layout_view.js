var Backbone = require('backbone');

var MessageSettingItemView = require('./messageSetting_item_view.js');
var MessageSettingModel = require('./messageSetting_model.js');

var DataModel = require('../../../models/data_model.js');

var ValidationModel = require('../../../models/validation_model.js');

var ConditionListCollection = require('../../../models/condition_list_collection.js');

var FooterItemView = require('../../../common/footer_item_view.js');

var TokenModel = require('../../../models/token_model.js');

require('../../../../../../lib/components/bootstrap/datetimepicker/datetimepicker.min.js');
var SegmentInfoModel = require('../../../models/segment_info_model.js');
var moment = require('moment');

module.exports = (function () {
  var MessageSettingLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./messageSetting_layout_template.html'),
    regions: {
      "messageSettingRegion": "#message-setting-region",
      "previewTemplateRegion": "#my-template",
      "footerRegion": "#message-setting-wrapper #footer-region"
    },
    SidebarConf: {
      showSidebar: false
    },
    events: function () {
      return (applican.config.device_os === "IOS") ? {
        "touchend .list li a": "selectDevice",
        "touchend .navi-controll .btn-next": "next",
        "touchend .navi-controll .btn-cancel": "cancel",
        "touchend .btn-home": "backMain",
        "touchend .btn-save": "saveMesageContents",
        "touchstart": "checkDatetimePicker"
      } : {
        "click .list li a": "selectDevice",
        "click .navi-controll .btn-next": "next",
        "click .navi-controll .btn-cancel": "cancel",
        "click .btn-home": "backMain",
        "click .btn-save": "saveMesageContents"
      }
    },
    templateHelpers: {
      getTitle: function () {
        return App.appModel.getLanguageType().mail.common.title;
      },
      getPreview: function () {
        return App.appModel.getLanguageType().common.preview;
      },
      getBtnHome: function () {
        return App.appModel.getLanguageType().common.btnHome;
      },
      getBtnSave: function () {
        return App.appModel.getLanguageType().common.btnSave;
      }
    },
    initialize: function (options) {
      this.type = options.type;
      this.id = options.id;
      App.dialogueCommon.setType("messageSetting");
      this.dataModel = new DataModel({
        id: AppConf.core.localStorageKey
      });
      this.dataModel.safeFetch();

      this.validationModel = new ValidationModel();

      this.tokenModel = new TokenModel();

      this.conditionListCollection = new ConditionListCollection();
      
      this.segmentInfoModel = new SegmentInfoModel({
        pagination: true
      });
      App.util.bindProgressScreen(this, this.segmentInfoModel);

      App.util.bindProgressScreen(this, this.conditionListCollection);
      this.listenTo(this.conditionListCollection, 'sync', this._renderConditionList);
      this.listenTo(this, 'load:sync', this.onLoad);
      this.listenTo(App.dialogueCommon, 'backMainOK', this.backMainCommon);
      this.listenTo(App.dialogueCommon, 'saveDraftMail', this.saveDraftMail);
      $(window).on('resize', _.bind(this.onResize, this));
    },
    onRender: function () {
      var _this = this;
      // AppConf.mail.segmentId = this.dataModel.get('segmentId');
      // AppConf.mail.customSegment = this.dataModel.get('customSegment');
      // AppConf.mail.scid = this.dataModel.get('scid');

      // AppConf.mail.sessionId = this.dataModel.get('sessionId');

      
      this._renderFooter();

      if (!AppConf.webConf.segmentId && !AppConf.webConf.segmentIdFromUrl) {
        _this._renderMessageSetting();
        this.conditionListCollection.fetchWithAuthInfo({
          on403: function () {
            $("#target option").remove();
            _this.setTarget("", App.appModel.getLanguageType().mail.setting.conditionNone);
          }
        });
      } else {
        var _this = this;
        this.segmentInfoModel.fetchSegmentInfo({
            segmentId: AppConf.webConf.segmentId || AppConf.webConf.segmentIdFromUrl
          })
          .done(function (data) {
            _this.dataModel.set({
              segmentDetail: data
            });
            _this.messageSettingModel = new MessageSettingModel(data);
            _this._renderMessageSetting();
          })
          .fail(function (err) {
            App.dialogueCommon.setType("getSegmentInfoError");
            App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.condition.dialogue.getSegmentTitleErr, App.appModel.getLanguageType().notification.condition.dialogue.getSegmentMsgErr);
          });
      }
    },
    _renderMessageSetting: function () {
      this.messageSettingRegion.show(new MessageSettingItemView({model: this.messageSettingModel}));
    },
    _renderConditionList: function () {
      var _this = this;
      $("#target option").remove();
      if (this.dataModel.get('segmentId')) {
        // this.setTarget("0", 'AppConf.mail.segmentName');
        this.$('#target').hide().prev('.drawer-title').hide();
      } else {
        this.setTarget("", App.appModel.getLanguageType().mail.setting.conditionNone);
        if (this.conditionListCollection.length > 0) {
          this.conditionListCollection.each(function (model) {
            _this.setTarget(model.get("id"), model.get("name"));
          });
          var settingInfor = this.dataModel.getSettingInfo();
          if (settingInfor) {
            var conditionId = settingInfor.conditionId;
            if (conditionId) {
              $('#target option[data-id = ' + settingInfor.conditionId + ']').prop("selected", true);
            }
          }
        }
      }
    },
    _renderFooter: function () {
      this.dataModel.set("typeFooter", "mail");
      switch (this.type) {
        case "view":
        case "edit":
        case "duplicate":
          this.dataModel.set("action", this.type);
          break;
        default:
          this.dataModel.set("action", "create");
          break;
      };
      this.footerRegion.show(new FooterItemView({
        model: this.dataModel
      }));
    },
    setTarget: function (id, value) {
      var target = document.getElementById('target');
      var opt = document.createElement('option');
      opt.innerHTML = value;
      opt.setAttribute('data-id', id);
      target.appendChild(opt);
    },
    onResize: function () {
      /*var windowH = $(window).height();
      $('#master-container, #message-setting-wrapper').css({'height': windowH +'px'});*/
    },
    onLoad: function () {
      /*var windowH = $(window).height();
      var wrapperH = $('#master-container').height();
      if(windowH > wrapperH) {
        $('#master-container, #message-setting-wrapper').css({'height': windowH +'px'});
      }else{
        $('#message-setting-wrapper').css({'height': wrapperH +'px'});
      }*/

      // picker day
      // var picker = new PickerDay(
      // {
      //   field: document.getElementById('datetimepicker'),
      //   firstDay: 1,
      //   format: 'DD/MM/YYYY HH:mm',
      //   minDate: new Date(2000, 0, 1),
      //   maxDate: new Date(2020, 12, 31),
      //   yearRange: [2000,2020],
      //   showTime: true,
      //   use24hour: true
      // });
      var _this = this;
      var tout = setTimeout(function () {
        $('#datetimepicker').datetimepicker({
          format: 'YYYY/MM/DD HH:mm',
          minDate: new Date(),
          ignoreReadonly: true,
          useCurrent: true,
          sideBySide: true,
          toolbarPlacement: 'bottom'
          // debug: true
        });
        
        if (_this.dataModel) {
          // load campainName
          var campainName = _this.dataModel.getCampainName();
          $("#campainName").val(campainName);

          // load preview
          var previewHtml = _this.dataModel.getPreViewSetting();
          $("#preview-template #my-template").html(previewHtml);
          if(_this.dataModel.get('template') === 'template11'){
            _this.setBodyContentIframe('bodyTextOne');
          }
          if(_this.dataModel.get('template') === 'template12'){
            _this.setBodyContentIframe('bodyTextOne');
            _this.setBodyContentIframe('bodyTextTwo');
          }
          // load setting
          var settingInfor = _this.dataModel.getSettingInfo();
          if (settingInfor) {
            $(".datetimepicker").val(settingInfor.startTime);
          }
          
        }

        if (_this.type === "view") {
          $("#target").prop("disabled", true);
          $(".datetimepicker").prop("disabled", true);
          $(".input-group-addon").addClass("noEvent");
          $("#message-setting-wrapper .btn-save").hide();
          $("#message-setting-wrapper .btn-next").hide();
        } else if (_this.type === "edit" || _this.type === "duplicate") {
          $("#message-setting-wrapper #campainName").prop("disabled", false);
        }

        $("#message-setting-wrapper #navi-control-bar li").removeClass();
        if (_this.type === "view" || _this.type === "edit" || _this.type === "duplicate") {
          $("#message-setting-wrapper #navi-control-bar li:eq(1)").addClass("active");
        } else {
          $("#message-setting-wrapper #navi-control-bar li:eq(2)").addClass("active");
        }
       clearTimeout(tout);
      }, 500);
    },
    setBodyContentIframe: function(body){
      var $contentBox = $("#iframe-" + body).contents().find("body");
      $contentBox.css({margin: '0'});
      $contentBox.html('<div id="root">' + this.dataModel.get(body) + '</div>');
      $("#iframe-" + body).css({height: $contentBox.find('#root').innerHeight()});
    },
    checkDatetimePicker: function () {
      if (!$(event.target).closest('.bootstrap-datetimepicker-widget').length && !$(event.target).closest('#datetimepicker').length) {
        $('#datetimepicker').data('DateTimePicker').hide();
      }
    },
    getInfo: function () {
      var conditionId = $('#target').find(":selected").data("id");
      var conditionValue = $('#target option:selected').text();
      var startTime = $(".datetimepicker").val();

      if (conditionValue === "条件なし" || conditionValue === "None") {
        conditionValue = "";
      }
      var settingInfo = {
        startTime: startTime,
        conditionId: conditionId,
        conditionValue: conditionValue
      };
      return settingInfo;
    },
    next: function (e) {
      e.preventDefault();
      var campainName = $("#campainName").val();
      this.dataModel.setCampainName(campainName);
      this.dataModel.setSettingInfo(this.getInfo());
      location.hash = "confirm/" + this.type + "?id=" + this.id;
    },
    cancel: function (e) {
      e.preventDefault();
      if (this.type === "edit" || this.type === "duplicate") {
        var campainName = $("#campainName").val();
        this.dataModel.setCampainName(campainName);
      }
      this.dataModel.setSettingInfo(this.getInfo());
      // location.hash = "messageContent/" + this.type + "?id=" + this.id;
      App.pageSlider.back();
    },
    backMain: function (e) {
      e.preventDefault();
      if (this.type === "view") {
        this.backMainCommon();
      } else {
        App.dialogueCommon.setType("backMain");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backHomeTitle, App.appModel.getLanguageType().common.dialogue.backHomeMsg);
      }
    },
    backMainCommon: function () {
      this.dataModel.destroy();
      this.dataModel.clear();
      App.pageSlider.main("workflow-mail");
      // location.hash = "workflow-mail";
    },
    saveMesageContents: function (e) {
      e.preventDefault();
      App.dialogueCommon.setType("saveDraftMail");
      App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.draftTitle, App.appModel.getLanguageType().common.dialogue.draftMsg);
    },
    saveDraftMail: function (e) {
      var campainName = $("#campainName").val();
      var subject = this.dataModel.getSubjectTitle();
      var body = this.dataModel.getBody();
      var targetId = null;
      if (AppConf.webConf.segmentId || AppConf.webConf.segmentIdFromUrl) {
        targetId = undefined;
      } else {
        targetId = $('#target').find(":selected").data("id");
      }
      var startTimeInput = $(".datetimepicker").val();
      var startTime = moment(startTimeInput, "YYYY/MM/DD HH:mm");
      startTime = moment(startTime).format("YYYYMMDDHHmm");
      this.fetchToken({
        name: campainName,
        subject: subject,
        body: body,
        startTime: startTime,
        scid: targetId,
        type: "save"
      });
    },
    fetchToken: function (options) {
      var _this = this;
      var _options = options || {};
      var type = _options.type;
      App.util.showProgressScreen();
      App.dialogueCommon.setType("messageSettingAction");
      this.tokenModel.fetchToken({})
        .done(function (data) {
          switch (type) {
            case "save":
              _this.saveMesage({
                name: _options.name,
                subject: _options.subject,
                body: _options.body,
                startTime: _options.startTime,
                scid: _options.scid,
                token: data.token
              });
              break;
          };
        })
        .fail(function (res) {
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.tokenTitleErr, App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
          App.util.hideProgressScreen();
        });
    },
    saveMesage: function (options) {
      var _this = this;
      var _options = options || {};
      var id = "";
      switch (this.type) {
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
        isSend: 0,
        scid: _options.scid,
        token: _options.token
      }).done(function (res) {
        App.dialogueCommon.setType("saveMesageSuccess");
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.messageContent.dialogueSuccess.saveMessageTitleSuccess, App.appModel.getLanguageType().mail.messageContent.dialogueSuccess.saveMessageMsgSuccess);
        _this.dataModel.setStatusAction("saveMessageSuccess");
        App.util.hideProgressScreen();
      }).fail(function (err) {
        App.dialogueCommon.setType("saveMesageError");
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.messageContent.dialogueError.saveMessageTitleErr, App.appModel.getLanguageType().mail.messageContent.dialogueError.saveMessageMsgErr);
        App.util.hideProgressScreen();
      });
    }
  });

  return MessageSettingLayoutView;

})();