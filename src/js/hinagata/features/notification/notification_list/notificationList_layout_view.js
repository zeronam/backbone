var Backbone = require('backbone');
var NotificationCollection = require('./notificationList_collection.js');
var NotificationCollection1 = require('./notificationList_collection1.js');
var NotificationCollectionView = require('./notificationList_collection_view.js');

var DialogueItemView = require('../../dialogue/dialogue_item_view.js');

var DataModel = require('../../../models/data_model.js');
var TokenModel = require('../../../models/token_model.js');
var moment = require('moment');

module.exports = (function () {
  var PushNotificationView = Backbone.Marionette.LayoutView.extend({
    template: require('./notificationList_layout_template.html'),
    regions: {
      "navRegion": "#create_message #main-nav-region",
      "dialogueRegion": "#dialogue-region"
    },
    SidebarConf: {
          showSidebar: true
      },
    events: function() {
      return ( applican.config.device_os === "IOS" ) ?
      {
        "touchend #open_dialogue_active" : "action_dialogue_active",
        "touchend #open_dialogue_scheduled" : "action_dialogue_scheduled",
        "touchend #open_dialogue_draft" : "action_dialogue_draft",
        // "touchend #open_dialogue_cancel": "action_dialogue_cancel",
        "touchend #create_message .navbar-header span" : "filterMessage",
        "touchend #stop_action" : "showStopSend",
        "touchend #cancel_action" : "cancelNotificationSend",
        "touchend .cancelbtnact"  : "closeAll",
        "touchend .cancelbtn": "closeAll",
        "touchend .confirmbtn": "stopNotificationSend",
        "touchend #create_message #search-label" : "showSearchinput",
        "touchend #create_message .fa-times" : "turnOffSearch",
        "keyup #create_message #search-terms": "search",
        "touchend .listact .dialog-view": "viewMessage",
        "touchend .listact .dialog-edit": "editMessage",
        "touchend .listact .dialog-duplicate": "duplicateMessage",
        "touchend .listact .dialog-delete": "deleteNotificationDraft",
      }:
      {
        "click #open_dialogue_active" : "action_dialogue_active",
        "click #open_dialogue_scheduled" : "action_dialogue_scheduled",
        "click #open_dialogue_draft" : "action_dialogue_draft",
        // "click #open_dialogue_cancel": "action_dialogue_cancel",
        "click #create_message .navbar-header span" : "filterMessage",
        "click #stop_action" : "showStopSend",
        "click #cancel_action" : "cancelNotificationSend",
        "click .cancelbtnact" : "closeAll",
        "click .cancelbtn": "closeAll",
        "click .confirmbtn": "stopNotificationSend",
        "click #create_message #search-label" : "showSearchinput",
        "click #create_message .fa-times" : "turnOffSearch",
        "keyup #create_message #search-terms": "search",
        "click .listact .dialog-view": "viewMessage",
        "click .listact .dialog-edit": "editMessage",
        "click .listact .dialog-duplicate": "duplicateMessage",
        "click .listact .dialog-delete": "deleteNotificationDraft",
      }
    },
    templateHelpers: {
      getText: function(text) {
        return App.appModel.getLanguageType().notification.menu[text];
      }
    },
    initialize: function(options){
      this.notificationCollection = new NotificationCollection({
        pagination: true,
        orderColumn: AppConf.notification.orderColumn,
        orderType: AppConf.notification.orderType
      });
      this.dataModel = new DataModel( { id: AppConf.core.localStorageKey } );
      this.dataModel.safeFetch();

      AppConf.webConf.segmentId = undefined;

      if ( this.dataModel ) {
        var statusAction = this.dataModel.getStatusAction();
        if ( statusAction === "sendMessageSuccess" || statusAction === "saveMessageSuccess" ) {
          this.notificationCollection.setType(null);
          this.statusSearch = "";
        } else {
          this.notificationCollection.setType(null);
          this.statusSearch = "";
        }
      } else {
        this.notificationCollection.setType(null);
        this.statusSearch = "";
      }
      this.dataModel.destroy();

          this.tokenModel = new TokenModel();

      App.dialogueCommon.setType("notification");
      App.dialogueCommon.closeSideBar();
      
      App.util.bindProgressScreen(this, this.notificationCollection);
      this.listenTo(this.notificationCollection, 'page-info-has-been-set', this._renderListMessage);
      this.listenTo(App.vent, 'reach:bottom:notification', this._renderPageNationMessage);
      this.listenTo(App.dialogueCommon, "actionNotificationSuccess", this.actionNotificationSuccess);

      this.listenTo(this, 'load:sync', this.onLoad);
      $(window).on('resize', _.bind(this.onResize, this));    
    },
    onRender: function(){
      this.fetchMessage({remove:true});
      this.showRegion();
      this.$el.find('.list-message').on('scroll', this.checkScroll);
    },
    onLoad:function(){
      // var windowH = $(window).height();
      // var contentH = $('#master-container').height();
      // if ( windowH > contentH ) {
      //   $('.page-center #create_message, #master-container').css('height', windowH);    
      // } else {
      //   $('.page-center #create_message').css('height', contentH);
      // } 


      //set user name
      var loginName = App.appModel.getAuthInfo().loginName;
      if ( loginName ) {
        $("#loginName").text(loginName);
      } else {
        $("#loginName").text(App.appModel.getLanguageType().sidebar.loginName);
      }

      // set active nav-sidebar
      $(".nav-sidebar .navi_main li").removeClass("active");
      $(".nav-sidebar .navi_main li:eq(5)").addClass("active");

      // set active top menu
      if ( this.statusSearch === "" ) {
        $(".page-center #create_message .navbar-header li").removeClass("active");
        $(".page-center #create_message .navbar-header li:eq(0)").addClass("active");
      }
      this.checkScreen();
      // $(".page-center #create_message .list-message").css({"height": windowH - 53});
      // $(".page-center #create_message .message_board").css({"height": windowH - 53});

      // if (AppConf.chart.webFlag){
      //   $('.topbar').addClass('webChart').show();
      // } else {
      //   $('.topbar').show();
      // }

    },    
    checkScroll: function() {
      var triggerPoint = 20;
      if( this.scrollTop + this.clientHeight + triggerPoint > this.scrollHeight ) {
        if( $('.list-message').data('atbottom') == "0"){
          console.log($('.list-message').data('atbottom'));
          $('.list-message').data('atbottom', '1');
          console.log($('.list-message').data('atbottom'));
          App.vent.trigger("reach:bottom:notification");
        }
      }
      },
    _renderPageNationMessage: function() {
      if( this.notificationCollection.isAtLastPage() ) {
      } else {
        this.fetchMessage({remove: false});
      }
    },
    showRegion: function() {
      this.dialogueRegion.show( new DialogueItemView() );
    },
    fetchMessage: function(options) {
      var _this = this; 
      console.log($('.list-message').data('atbottom'));
      this.notificationCollection.fetchListMessage({
        on403: function() {
          _this.err = "mainErr";
          App.util.text.setTitleError(App.appModel.getLanguageType().notification.main.dialogueError.getMainTitleErr, App.appModel.getLanguageType().notification.main.dialogueError.getMainMsgErr, ".list-message #main-nav-region", "main-wrapper");
          $("#search-terms").prop("disabled", true);
        },
        remove: options.remove
      });
    },
    _renderListMessage: function() {
      this.err = "main";
      // set regisStatus
      this.setRegisStatus(this.notificationCollection, this.notificationCollection.getRegisStatus(), this.notificationCollection.getDelivStopRight());
      this.showListMessageByArray(this.notificationCollection);
      
      // this.navRegion.show( new NotificationCollectionView( { collection: notificationCollection1 } ) );
      var totalCount = this.notificationCollection.length;
      // this.setCount(totalCount, this.notificationCollection.length);

      //opent check event scroll to bottom
      $('.list-message').data('atbottom', "0");

      // disable/ enable input search
      if ( totalCount > 0 ) {
        $("#create_message #search-terms").prop("disabled", false);
      } else {
        $("#create_message #search-terms").prop("disabled", true);
      }   
    },
    setRegisStatus: function(collection, regisStatus, delivStop) {
      var _this = this;
      if ( collection.length > 0 ) {
        collection.each(function(model){
          model.set("regisStatus", regisStatus);
          model.set("delivStop", delivStop);
          model.set("statusSearch", _this.statusSearch);
        });
      }
    },
    showListMessageByArray: function(collection) {
      var objTmp = "";
      if ( collection.length > 0 ) {
        objTmp = _.groupBy(collection.models, function(model, index) {
                  if(model.get("openDate") != ""){
                    return moment(model.get("openDate")).format("YYYYMM")
                  } else {
                    var res = model.get("repeatCondition").split("<BR>～");
                    var dateTmp1 = res[0];
                    return moment(dateTmp1).format("YYYYMM")
                  }
                  // return App.util.date.convertDate(model.get("startTime"), "YYYYMM");
                });
      }

      var notificationCollection1 = new NotificationCollection1();
      if ( objTmp ) {
        notificationCollection1.add(objTmp);
      }
      this.navRegion.show( new NotificationCollectionView( { collection: notificationCollection1 } ) );

      // set width campaign title
      var w_content = $("#create_message .list-message").width();
      $("#create_message .tbl-main-list tbody tr td:nth-child(1) .campaign-title").css({"width": ( w_content * 50 ) / 100});
      $("#create_message .tbl-main-list tbody tr td:nth-child(2) .campaign-details").css({"width":  ( w_content * 12 ) / 100});
    },
    setCount: function(total, length, type) {
      if ( total === 0 ) {
        $("#create_message .box-total-list .total").text(App.appModel.getLanguageType().common.zeroRecord);
      } else if ( total === 1 ) {
        $("#create_message .box-total-list .total").text(App.appModel.getLanguageType().common.oneRecord);
      } else {
        if ( type ) {
          if ( App.appModel.getLanguage() === "en" ) {
            $("#create_message .box-total-list .total").text("Display " + length + " records of " + total + " records");
          } else if  ( App.appModel.getLanguage() === "ja" ) {
            $("#create_message .box-total-list .total").text(total + " 件中 " + length + " を表示");
          }
        } else {
          if ( App.appModel.getLanguage() === "en" ) {
            $("#create_message .box-total-list .total").text("Display 1 - " + length + " of " + total + " records");
            // $("#create_message .box-total-list .total").text(total + " 件中 1 - " + length + " を表示");
          } else if  ( App.appModel.getLanguage() === "ja" ) {
            $("#create_message .box-total-list .total").text(total + " 件中 1 - " + length + " を表示");
          }
        }
      }
    },
    onResize: function(){
      var windowH = $(window).height();
          $('#create_message, #master-container').css('height', windowH);
          this.checkScreen();
    },
    checkScreen: function(){
      if( !AppConf.webConf.webFlag ){
            if( $(window).width() > 1024 ){
              $('.main_screen').css({'padding-left': 60});
            } else {
              $('.main_screen').css({'padding-left': 0});
            }
      }
    },
    onClear:function(){
      $(".leftbar li").removeClass("active");
      $("#search-terms").val("");
      $(".list-message").scrollTop(0);
      App.dialogueCommon.closeDialogueMessage();
    },
    loadBg:function(activeElement) {
      App.dialogueCommon.closeDialogueMessage();
      $("#label").removeClass("active");
      $("#dialogue-region #greybg").addClass("show");
      $("#dialogue-region .title_mail, #dialogue-region .cancelbtnact").show();
      this.showDialogueAction(activeElement);
    },
    closeAll: function(e){
      e.preventDefault();
      var _this = $(e.currentTarget);
      var className = $(_this).attr("class");
      if ( !$(".page-center #create_message #confirm_box").is(':visible') || className === "cancelbtn" ) {
        $("#dialogue-region #greybg,#dialogue-region #confirm_box,#dialogue-region .popup").removeClass("show");
      }
      $("#dialogue-region .title_mail, #dialogue-region .cancelbtnact").hide();
    },
    action_dialogue_active: function(e){
      e.preventDefault();
      var _this = $(e.currentTarget);
      this.setInfoActionDialogue(_this, "active");
    },
    action_dialogue_scheduled: function(e){
      e.preventDefault();
      var _this = $(e.currentTarget);
      this.setInfoActionDialogue(_this, "scheduled");
    },
    action_dialogue_draft: function(e){
      e.preventDefault();
      var _this = $(e.currentTarget);
      this.setInfoActionDialogue(_this, "draft");
    },
    // action_dialogue_cancel: function(e){
    //   e.preventDefault();
    //   var _this = $(e.currentTarget);
    //   this.setInfoActionDialogue(_this, "cancel");
    // },    
    setInfoActionDialogue: function(element, activeElement) {
      var id = $(element).parent().attr("id");
      var name = $(element).parent().parent().find("td:eq(0) .campaign-title").text();
      $(".page-center #dialogue-region .title_mail").text(name);
      this.notificationCollection.setNotificationId(id);
      this.loadBg(activeElement);
    },
    showDialogueAction: function(activeElement) {
      switch ( activeElement ) {
        case "active":
          $("#dialogue-region #active_dialog_notify").addClass("show");
          break;
        case "scheduled":
          $("#dialogue-region #active_dialog_notify").addClass("show");
          break;
        case "draft":
          $("#dialogue-region #draft_dialog_notify").addClass("show");
          break;
        // case "cancel":
        //   $("#dialogue-region #cancel_dialog").addClass("show");
        //   break;
      };
    },
    showStopSend: function(e) {
      e.preventDefault();
      $("#dialogue-region .popup").removeClass("show");
      $("#dialogue-region .cancelbtnact").hide();
      $("#dialogue-region #confirm_box").addClass("show");
    },
    filterMessage: function(e){
      e.preventDefault();
      this.onClear();
      $(e.currentTarget).parent().addClass ("active");
      this.statusSearch = $(e.currentTarget).data("id");
      this.notificationCollection.setType($(e.currentTarget).data("id"));
      this.fetchMessage({ remove: true });
    },
    showSearchinput:function (e) {
      e.preventDefault();
    $("#create_message .topbar .rightbar").css({'opacity': 1, 'z-index': 2, 'visibility': 'visible'});
    $("#create_message .topbar .leftbar").css({'opacity': 0, 'z-index': 1, 'visibility': 'hidden'});
        $("#create_message #search-label").attr('class','fa fa-search fa-times');
        $("#create_message #search-terms").focus();
    },       
    turnOffSearch:function (e) {
      e.preventDefault();
      this.clearSearch();
      this.search();
    },
    clearSearch:function (){
      $('#create_message #search-terms').val('').blur();
      $("#create_message .topbar .rightbar").css({'opacity': 0, 'z-index': 1, 'visibility': 'hidden'});
      $("#create_message .topbar .leftbar").css({'opacity': 1, 'z-index': 2, 'visibility': 'visible'});
      $("#create_message #search-label").removeClass('fa-times');
    },
    search:function(e){
      // e.preventDefault();
      // var _this = $(e.currentTarget);
      var searchText = $('#search-terms').val();
      var filter;
      var notificationCollectionFilter = new NotificationCollection();
      // var totalCount = this.notificationCollection.getTotalCount();
        if ( searchText ) {
          filter = this.notificationCollection.searchListMessage(searchText);
          if ( filter.size() > 0 ) {
            filter.each(function(model) {
              notificationCollectionFilter.add(model);
            });
          }
          this.showListMessageByArray(notificationCollectionFilter);
          // this.navRegion.show( new NotificationCollectionView( { collection: notificationCollectionFilter } ) );
          // this.setCount(totalCount, notificationCollectionFilter.length, "search");
        } else {
          this.showListMessageByArray(this.notificationCollection);
          // this.navRegion.show( new NotificationCollectionView( { collection: this.notificationCollection } ) );
          // this.setCount( totalCount, this.notificationCollection.length );
        }
    },
    showListMessageByStatus: function(status) {
      if(status) {
        this.notificationCollection.setType(status);
      } else {
        this.notificationCollection.setType(null);
      }
      this.fetchMessage({remove:true});
    },
    viewMessage: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = this.notificationCollection.getNotificationId();
      location.hash = "notificationSetting/view?notificationId=" + id;
    },
    editMessage: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = this.notificationCollection.getNotificationId();
      location.hash = "notificationSetting/edit?notificationId=" + id;
    },
    duplicateMessage: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = this.notificationCollection.getNotificationId();
      location.hash = "notificationSetting/duplicate?notificationId=" + id;
    },
    deleteNotificationDraft: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = this.notificationCollection.getNotificationId();
      this.fetchToken({id: id, type: "delete"});
    },
    cancelNotificationSend: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = this.notificationCollection.getNotificationId();
      this.fetchToken({id: id, status: "cancel", comment: "", type: "cancelByCreator"});
    },
    stopNotificationSend: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = this.notificationCollection.getNotificationId();
      this.fetchToken({id: id, status: "stop", comment: "", type: "stopByCreator"});
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
          case "delete":
            _this.deleteNotification({id: _options.id, token: data.token});
            break;
          case "cancelByCreator":
            _this.cancelNotification({id: _options.id, status: _options.status, comment: _options.comment, token: data.token, type: type})
            break;
          case "stopByCreator":
            _this.cancelNotification({id: _options.id, status: _options.status, comment: _options.comment, token: data.token, type: type})
            break;
        }
      })
      .fail(function(res) {
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.tokenTitleErr, App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
        App.util.hideProgressScreen();
      });
    },
    deleteNotification: function(options) {
      var _this = this;
      var _options = options || {};
      App.btApi.deleteNotificationDraft({
        id: _options.id,
        token: _options.token
      }).done(function(res) {
        App.dialogueCommon.setType("deleteNotificationDraftSuccess");
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.main.dialogueSuccess.deleteNotificationTitleSuccess, App.appModel.getLanguageType().notification.main.dialogueSuccess.deleteNotificationMsgSuccess);
        App.util.hideProgressScreen();
      }).fail(function(err) {
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.main.dialogueError.deleteNotificationTitleErr, App.appModel.getLanguageType().notification.main.dialogueError.deleteNotificationMsgErr);
        App.util.hideProgressScreen();
      });
    },
    cancelNotification: function(options) {
      var _this = this;
      var _options = options || {};
      var type = _options.type;
      App.btApi.cancelNotification({
        id: _options.id,
        status: _options.status,
        comment: _options.comment,
        token: _options.token
      }).done(function(res) {
        if ( type === "cancelByCreator" ) {
          App.dialogueCommon.setType("cancelNotificationSuccess");
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.main.dialogueSuccess.cancelNotificationTitleSuccess, App.appModel.getLanguageType().notification.main.dialogueSuccess.cancelNotificationMsgSuccess);
        } else {
          App.dialogueCommon.setType("stopNotificationSuccess");
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.main.dialogueSuccess.stopNotificationTitleSuccess, App.appModel.getLanguageType().notification.main.dialogueSuccess.stopNotificationMsgSuccess);
        }
        App.util.hideProgressScreen();
      }).fail(function(err) {
        if ( type === "cancelByCreator" ) {
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.main.dialogueError.cancelNotificationTitleErr, App.appModel.getLanguageType().notification.main.dialogueError.cancelNotificationMsgErr);
        } else {
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().notification.main.dialogueError.stopNotificationTitleErr, App.appModel.getLanguageType().notification.main.dialogueError.stopNotificationMsgErr);
        }
        App.util.hideProgressScreen();
      });
    },
    actionNotificationSuccess: function() {
      App.dialogueCommon.closeDialogueMessage();
      this.showListMessageByStatus(this.statusSearch);
    }
  });
  
  return PushNotificationView;

})();