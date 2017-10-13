var Backbone = require('backbone');

var CouponListCollectionView = require('./coupon_list_collection_view.js');
var CouponListCollection = require('./coupon_list_collection.js');
var CouponListCollection1 = require('./coupon_list_collection1.js');

var DialogueItemView = require('../../dialogue/dialogue_item_view.js');

var DataModel = require('../../../models/data_model.js');
var TokenModel = require('../../../models/token_model.js');
var ImageDataModel = require('../../../models/image_data_model.js');

module.exports = (function() {
  var CouponInformationLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./coupon_list_layout_template.html'),
    regions: {
      "couponMainRegion": "#sidebar_master #coupon-main-region",
      "dialogueRegion": "#dialogue-region"
    },
    events: function() {
      return (applican.config.device_os === "IOS") ? {
        "touchend #sidebar_master #open_all": "all_message",
        "touchend #sidebar_master #open_active": "message_active",
        "touchend #sidebar_master #open_scheduled": "message_scheduled",
        "touchend #sidebar_master #open_draft": "message_draft",
        "touchend #sidebar_master #open_confirm_wait": "message_wait_approve",
        "touchend #open_dialogue_active": "action_dialogue_active",
        "touchend #open_dialogue_draft": "action_dialogue_draft",
        "touchend #open_dialogue_delete": "action_dialogue_delete",
        "touchend .cancelbtnact": "closeAll",
        "touchend .cancelbtn": "closeAll",
        "touchend #open_stop": "showStopSend",
        "touchend .confirmbtn": "stopCoupon",
        "touchend .listact .dialog-delete": "deleteCoupon",
        "touchend .listact .dialog-view": "viewCoupon",
        "touchend .listact .dialog-edit": "editCoupon",
        "touchend .listact .dialog-duplicate": "duplicateCoupon",
        "touchend #sidebar_master #search-label": "showSearchinput",
        "touchend #sidebar_master .fa-times": "turnOffSearch",
        "keyup #sidebar_master #search-terms": "search",
        // "touchend #sidebar_master #sidebar_master #search-close" : "turnOffSearch",
        "touchend #sidebar_master .multi_language li": "changeLanguage",
        "touchend #sidebar_master .create_message_button": "createMessage"
      } : {
        "click #sidebar_master #open_all": "all_message",
        "click #sidebar_master #open_active": "message_active",
        "click #sidebar_master #open_scheduled": "message_scheduled",
        "click #sidebar_master #open_draft": "message_draft",
        "click #sidebar_master #open_confirm_wait": "message_wait_approve",
        "click #open_dialogue_active": "action_dialogue_active",
        "click #open_dialogue_draft": "action_dialogue_draft",
        "click #open_dialogue_delete": "action_dialogue_delete",
        "click .cancelbtnact": "closeAll",
        "click .cancelbtn": "closeAll",
        "click #open_stop": "showStopSend",
        "click .confirmbtn": "stopCoupon",
        "click .listact .dialog-delete": "deleteCoupon",
        "click .listact .dialog-view": "viewCoupon",
        "click .listact .dialog-edit": "editCoupon",
        "click .listact .dialog-duplicate": "duplicateCoupon",
        "click #sidebar_master #search-label": "showSearchinput",
        "click #sidebar_master .fa-times": "turnOffSearch",
        "keyup #sidebar_master #search-terms": "search",
        // "click #sidebar_master #sidebar_master #search-close" : "turnOffSearch",
        "click #sidebar_master .multi_language li": "changeLanguage",
        "click #sidebar_master .create_message_button": "createMessage"
      }
    },
    templateHelpers: {
      getTitle: function() {
        return App.appModel.getLanguageType().coupon.menu.titleCoupon;
      },
      getMenuAll: function() {
        return App.appModel.getLanguageType().coupon.menu.menuTopCoupon.all;
      },
      getMenuActive: function() {
        return App.appModel.getLanguageType().coupon.menu.menuTopCoupon.active;
      },
      getMenuScheduled: function() {
        return App.appModel.getLanguageType().coupon.menu.menuTopCoupon.scheduled;
      },
      getMenuDraft: function() {
        return App.appModel.getLanguageType().coupon.menu.menuTopCoupon.draft;
      },
      getMenuWaitApprove: function() {
        return App.appModel.getLanguageType().coupon.menu.menuTopCoupon.waitApprove;
      },
      getMenuSent: function() {
        return App.appModel.getLanguageType().coupon.menu.menuTopCoupon.sent;
      },
      getSearchPlaceholder: function() {
        return App.appModel.getLanguageType().coupon.menu.menuTopCoupon.searchPlaceholder;
      }
    },
    SidebarConf: {
      showSidebar: true
    },
    initialize: function(options) {
      this.couponListCollection = new CouponListCollection({
        pagination: true,
        orderColumn: AppConf.coupon.orderColumn,
        orderType: AppConf.coupon.orderType
      });
      this.dataModel = new DataModel({ id: AppConf.core.localStorageKey });
      this.dataModel.safeFetch();

      AppConf.webConf.segmentId = undefined;

      /* if (AppConf.coupon.webFlag) {
        if (!App.util.common.getUrlParameter('p') && AppConf.coupon.sessionId) {
          location.hash += '?p=' + AppConf.coupon.sessionId;
        }
      } */
      if (this.dataModel) {
        var statusAction = this.dataModel.getStatusAction();
        if (statusAction === "sendCouponSuccess" || statusAction === "saveCouponSuccess") {
          this.couponListCollection.setType("");
          this.statusSearch = "all";
        } else {
          this.couponListCollection.setType("");
          this.statusSearch = "all";
        }
      } else {
        this.couponListCollection.setType("");
        this.statusSearch = "all";
      }

      this.dataModel.destroy();

      this.indexLoadImage = 1;
      // this.imageModel = new ImageDataModel( { id: AppConf.core.localStorageKey } );
      // this.imageModel.safeFetch();

      this.tokenModel = new TokenModel();

      App.dialogueCommon.setType("coupon");
      App.dialogueCommon.closeSideBar();

      App.util.bindProgressScreen(this, this.couponListCollection);
      this.listenTo(this.couponListCollection, 'page-info-has-been-set', this._renderListCoupon);
      this.listenTo(App.vent, 'reach:bottom:coupon', this._renderPageNationCoupon);
      this.listenTo(App.dialogueCommon, "actionCouponSuccess", this.actionCouponSuccess);


      this.listenTo(this, 'load:sync', this.onLoad);
      $(window).on('resize', _.bind(this.onResize, this));
    },
    onRender: function() {
      /* AppConf.coupon.sessionId = App.util.common.getUrlParameter('p');
      if (AppConf.coupon.webFlag && AppConf.coupon.sessionId) {
        this.dataModel.set('sessionId', AppConf.coupon.sessionId);
        this.dataModel.save();
      } */
      this.fetchListCoupon({ remove: true });
      this.showRegion();
      this.$el.find('.list-coupon').on('scroll', _.debounce(this.checkScroll, 500));
    },
    createMessage:function(){
      location.hash = "couponType";
    },
    showRegion: function() {
      this.dialogueRegion.show(new DialogueItemView());
    },
    checkScroll: function() {
      var triggerPoint = 20;
      if (this.scrollTop + this.clientHeight + triggerPoint > this.scrollHeight) {
        App.vent.trigger("reach:bottom:coupon");
      }
    },
    _renderPageNationCoupon: function() {
      if (!this.couponListCollection.isAtLastPage()) {
        this.fetchListCoupon({ remove: false });
      }
    },
    fetchListCoupon: function(options) {
      var _this = this;
      this.couponListCollection.fetchListCoupon({
        on403: function() {
          _this.err = "mainErr";
          App.util.text.setTitleError(App.appModel.getLanguageType().coupon.list.dialogue.getListTitleErr, App.appModel.getLanguageType().coupon.list.dialogue.getListMsgErr, ".list-coupon #coupon-main-region", "coupon-wrapper");
          $("#search-terms").prop("disabled", true);
        },
        remove: options.remove
      });
    },
    _renderListCoupon: function() {
      this.err = "main";
      // this.cacheImage(this.couponListCollection);
      this.showListCouponByArray(this.couponListCollection);
      var totalCount = this.couponListCollection.getTotalCount();

      // disable/ enable input search
      if (totalCount > 0) {
        $("#search-terms").prop("disabled", false);
      } else {
        $("#search-terms").prop("disabled", true);
      }
      if (this.indexCache === 0) {
        App.util.hideProgressScreen();
      }
    },
    showListCouponByArray: function(collection) {
      var objTmp = "";
      if (collection.length > 0) {
        objTmp = _.groupBy(collection.models, function(model, index) {
          return App.util.date.convertDate(model.get("updateAt"), "YYYYMM");
        });
      }

      var couponListCollection1 = new CouponListCollection1();
      if (objTmp) {
        couponListCollection1.add(objTmp);
      }
      this.couponMainRegion.show(new CouponListCollectionView({ collection: couponListCollection1, emptyViewOptions: { message: App.appModel.getLanguageType().coupon.list.dialogue.emptyListMsgErr } }));

      // set width campaign title
      var w_content = $("#sidebar_master .tbl-coupon-list td:nth-child(2)").width();
      $("#sidebar_master .tbl-coupon-list tbody tr td:nth-child(2) .campaign-title").css({ "width": w_content - 10, 'display': 'block' });
    },
    cacheImage: function(collection) {
      var _this = this;
      _this.indexCache = 0;
      if (collection.length > 0) {
        collection.each(function(modelCouponCollection) {
          // var imageModel = new ImageDataModel( { id: AppConf.core.localStorageKey } );
          // imageModel.safeFetch();

          var imageFileName = modelCouponCollection.get("imageFileName");
          // var imageModel = new ImageDataModel( { id: imageFileName } );
          // imageModel.safeFetch();
          var imageName = App.util.text.getImageName(imageFileName);
          // var imageCache = imageModel.get(imageName);
          var getSimpleStorage_success = function(result) {
            if (!result) {
              _this.indexCache++;
              _this.imgBase64(imageFileName);
            } else {
              modelCouponCollection.set("imageFileName", imageCache);
            }
          };
          applican.simpleStorage.get(imageName, getSimpleStorage_success);
          // if ( !imageCache ) {
          //   _this.indexCache++;
          //   // _this.imageModel.setIndexCache(_this.indexCache);
          //   // _this.imageModel.safeFetch();
          //   _this.imgBase64(imageFileName);
          // } else {
          //   modelCouponCollection.set("imageFileName", imageCache);
          // }
        });
        // console.log(this.indexCache);
      }
    },
    imgBase64: function(src) {
      var _this = this;
      // _this.indexLoadImage = 1;
      var canvas = document.createElement("canvas");
      var lengthUrl = AppConf.url.appRoot.indexOf('/btapi');
      var img = AppConf.url.appRoot.substr(0, lengthUrl) + src;
      var imageName = App.util.text.getImageName(src);
      if (!canvas || !canvas.getContext || !canvas.getContext('2d')) {
        return;
      }
      var image = new Image();
      image.setAttribute('crossOrigin', 'anonymous');

      image.src = img;
      // var obj = {};
      image.onload = function() {
        // 画像をbase64にするためにCanvasを利用するので、
        // クロスドメインの画像は無理かも。。
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext('2d').drawImage(image, 0, 0);
        var base64 = canvas.toDataURL();
        var setSimpleStorage_success = function() {};
        applican.simpleStorage.set(imageName.substr(11, 5), base64, setSimpleStorage_success);
        // var imageModel = new ImageDataModel( { id: imageName } );
        // imageModel.safeFetch();
        // _this = new ImageDataModel( { id: AppConf.core.localStorageKey } );
        // _this.safeFetch();
        // var lengthCache = _this.get("indexCache");
        // imageModel.setImageUrl(imageName, base64);
        // _this.imageModel.safeFetch();
        // _this.safeFetch();
        // console.log(_this.indexCache);        
        // console.log(_this.indexLoadImage);
        if (_this.indexLoadImage >= _this.indexCache || _this.indexCache === 1) {
          // App.util.hideProgressScreen();
          _this.indexLoadImage = 1;
        } else {
          _this.indexLoadImage++;
        }
      }
    },
    setCount: function(total, length, type) {
      if (total === 0) {
        $("#sidebar_master .box-total-list .total").text(App.appModel.getLanguageType().common.zeroRecord);
        // $("#sidebar_master .emptyView").text(App.appModel.getLanguageType().coupon.list.dialogueError.emptyListMsgErr);
      } else if (total === 1) {
        $("#sidebar_master .box-total-list .total").text(App.appModel.getLanguageType().common.oneRecord);
      } else {
        if (type) {
          if (App.appModel.getLanguage() === "en") {
            $("#sidebar_master .box-total-list .total").text("Display " + length + " records of " + total + " records");
          } else if (App.appModel.getLanguage() === "ja") {
            $("#sidebar_master .box-total-list .total").text(total + " 件中 " + length + " を表示");
          }
        } else {
          if (App.appModel.getLanguage() === "en") {
            $("#sidebar_master .box-total-list .total").text("Display 1 - " + length + " of " + total + " records");
          } else if (App.appModel.getLanguage() === "ja") {
            $("#sidebar_master .box-total-list .total").text(total + " 件中 1 - " + length + " を表示");
          }
        }
      }
    },
    onResize: function() {
      // var windowH = $(window).height();
      // $('#coupon_list, #master-container').css('height', windowH);
      this.checkScreen();
    },
    onLoad: function() {
      /*var windowH = $(window).height();
      var contentH = $('#master-container').height();
      if ( windowH > contentH ) {
        $('#sidebar_master, #master-container').css('height', windowH);    
      } else {
        $('#sidebar_master').css('height', contentH);
      }      
      $("#sidebar_master .list-coupon").css({"height": windowH - 53});
      $("#sidebar_master .coupon_board").css({"height": windowH - 53});*/
      var loginName = App.appModel.getAuthInfo().loginName;
      if (loginName) {
        $("#loginName").text(loginName);
      } else {
        $("#loginName").text(App.appModel.getLanguageType().sidebar.loginName);
      }


      // set active nav-sidebar
      $(".nav-sidebar .navi_main li").removeClass("active");
      $(".nav-sidebar .navi_main li:eq(2)").addClass("active");

      // set message confirm-box
      $("#sidebar_master .title-confirm-box").text(App.appModel.getLanguageType().coupon.list.confirmStop);

      // set active top menu
      if (this.statusSearch === "all") {
        $("#sidebar_master .navbar-header li").removeClass("active");
        $("#sidebar_master .navbar-header li:eq(0)").addClass("active");
      }

      // set active language
      // $("#sidebar_master .multi_language li").removeClass("active");
      // if ( App.appModel.getLanguage() === "en" ) {
      //   $("#sidebar_master .multi_language li:eq(0)").addClass("active");
      //   $("#sidebar_master .multi_language li:eq(0) .st2, #sidebar_master .multi_language li:eq(0) .st4").css({"stroke": "#D0202D"});
      // } else if ( App.appModel.getLanguage() === "ja" ) {
      //   $("#sidebar_master .multi_language li:eq(0) .st2, #sidebar_master .multi_language li:eq(0) .st4").css({"stroke": "#999"});
      //   $("#sidebar_master .multi_language li:eq(1)").addClass("active");
      // }
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
    message_active: function(e) {
      e.preventDefault();
      // App.util.showProgressScreen();
      this.onClear();
      $(".leftbar li:eq(3)").addClass("active");
      this.statusSearch = "active";
      this.couponListCollection.setType(1);
      this.fetchListCoupon({ remove: true });
    },
    message_scheduled: function(e) {
      e.preventDefault();
      // App.util.showProgressScreen();
      this.onClear();
      $(".leftbar li:eq(2)").addClass("active");
      this.statusSearch = "scheduled";
      this.couponListCollection.setType(2);
      this.fetchListCoupon({ remove: true });
    },
    message_draft: function(e) {
      e.preventDefault();
      // App.util.showProgressScreen();
      this.onClear();
      $(".leftbar li:eq(1)").addClass("active");
      this.statusSearch = "draft";
      this.couponListCollection.setType(0);
      this.fetchListCoupon({ remove: true });
    },
    message_wait_approve: function(e) {
      e.preventDefault();
      // App.util.showProgressScreen();
      this.onClear();
      $(".leftbar li:eq(2)").addClass("active");
      this.statusSearch = "waitApprove";
      this.couponListCollection.setType(3);
      this.fetchListCoupon({ remove: true });
    },
    all_message: function(e) {
      e.preventDefault();
      // App.util.showProgressScreen();
      this.onClear();
      $(".leftbar li:eq(0)").addClass("active");
      this.statusSearch = "all";
      this.couponListCollection.setType("");
      this.fetchListCoupon({ remove: true });
    },
    action_dialogue_active: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      this.setInfoActionDialogue(_this);
      $("#dialogue-region #active_dialog_coupon").addClass("show");
    },
    action_dialogue_draft: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      this.setInfoActionDialogue(_this);
      $("#dialogue-region #draft_dialog_coupon").addClass("show");
    },
    action_dialogue_delete: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      this.setInfoActionDialogue(_this);
      $("#dialogue-region #delete_dialog").addClass("show");
    },
    setInfoActionDialogue: function(element) {
      var id = $(element).parent().attr("id");
      var name = $(element).parent().parent().find("td:eq(1) .campaign-title").text();
      $("#dialogue-region .title_mail").text(name);
      this.couponListCollection.setCoupId(id);
      this.loadBg();
    },
    onClear: function() {
      $(".leftbar li").removeClass("active");
      $("#search-terms").val("");
      $(".list-coupon").scrollTop(0);
    },
    loadBg: function() {
      $("#dialogue-region #greybg").addClass("show");
      $("#dialogue-region .title_mail, #dialogue-region .cancelbtnact").show();
      $("#label").removeClass("active");
    },
    closeAll: function(e) {
      var _this = $(e.currentTarget);
      var className = $(_this).attr("class");
      if (!$("#sidebar_master #confirm_box").is(':visible') || className === "cancelbtn") {
        $("#dialogue-region #greybg,#dialogue-region #confirm_box,#dialogue-region .popup").removeClass("show");
      }
      $("#dialogue-region .title_mail, #dialogue-region .cancelbtnact").hide();
    },
    showStopSend: function(e) {
      e.preventDefault();
      $("#dialogue-region .popup").removeClass("show");
      $("#dialogue-region .cancelbtnact").hide();
      $("#dialogue-region #confirm_box").addClass("show");
    },
    showSearchinput: function(e) {
      e.preventDefault();
      $("#sidebar_master .topbar .rightbar").css({ 'opacity': 1, 'z-index': 2, 'visibility': 'visible' });
      $("#sidebar_master .topbar .leftbar").css({ 'opacity': 0, 'z-index': 1, 'visibility': 'hidden' });
      $("#sidebar_master #search-label").attr('class', 'fa fa-search fa-times');
      $("#sidebar_master #search-terms").focus();
    },
    turnOffSearch: function(e) {
      e.preventDefault();
      this.clearSearch();
      this.search();
    },
    clearSearch: function() {
      $('#sidebar_master #search-terms').val('').blur();
      $("#sidebar_master .topbar .rightbar").css({ 'opacity': 0, 'z-index': 1, 'visibility': 'hidden' });
      $("#sidebar_master .topbar .leftbar").css({ 'opacity': 1, 'z-index': 2, 'visibility': 'visible' });
      $("#sidebar_master #search-label").removeClass('fa-times');
    },
    search: function(e) {
      // e.preventDefault();
      // var _this = $(e.currentTarget);
      var searchText = $('#search-terms').val();
      var totalCount = this.couponListCollection.getTotalCount();
      if (searchText) {
        var couponCollectionFilter = new CouponListCollection();
        var filter = this.couponListCollection.searchListCoupon(searchText);
        if (filter.size() > 0) {
          filter.each(function(model) {
            couponCollectionFilter.add(model);
          });
        }
        this.showListCouponByArray(couponCollectionFilter);
      } else {
        this.showListCouponByArray(this.couponListCollection);
      }
    },
    viewCoupon: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = this.couponListCollection.getCoupId();
      location.hash = "couponInformation/view?coupId=" + id;
    },
    editCoupon: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = this.couponListCollection.getCoupId();
      location.hash = "couponInformation/edit?coupId=" + id;
    },
    duplicateCoupon: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = this.couponListCollection.getCoupId();
      location.hash = "couponInformation/duplicate?coupId=" + id;
    },
    stopCoupon: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = this.couponListCollection.getCoupId();
      this.fetchToken({ id: id, cmd: "stop", type: "stopByCreator" });
    },
    deleteCoupon: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = this.couponListCollection.getCoupId();
      this.fetchToken({ id: id, cmd: "delete", type: "deleteByCreator" });
    },
    fetchToken: function(options) {
      var _this = this;
      var _options = options || {};
      App.util.showProgressScreen();
      App.dialogueCommon.setType("coupon");
      this.tokenModel.fetchToken({})
        .done(function(data) {
          _this.updateStatusCoupon({ id: _options.id, cmd: _options.cmd, token: data.token, type: _options.type });
        })
        .fail(function(res) {
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.tokenTitleErr, App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
          App.util.hideProgressScreen();
        });
    },
    updateStatusCoupon: function(options) {
      var _this = this;
      var _options = options || {};
      var type = _options.type;
      App.btApi.updateStatusCoupon({
        id: _options.id,
        cmd: _options.cmd,
        token: _options.token
      }).done(function(res) {
        App.dialogueCommon.setType("updateStatusCouponSuccess");
        if (type === "stopByCreator") {
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().coupon.list.dialogue.couponStopSuccess, App.appModel.getLanguageType().coupon.list.dialogue.msgCouponStopSuccess);
        } else {
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().coupon.list.dialogue.couponDeleteSuccess, App.appModel.getLanguageType().coupon.list.dialogue.msgCouponDeleteSuccess);
        }
        App.util.hideProgressScreen();
      }).fail(function(err) {
        if (type === "stopByCreator") {
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().coupon.list.dialogue.couponStopFail, App.appModel.getLanguageType().coupon.list.dialogue.msgCouponStopFail);
        } else {
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().coupon.list.dialogue.couponDeleteFail, App.appModel.getLanguageType().coupon.list.dialogue.msgCouponDeleteFail);
        }
        App.util.hideProgressScreen();
      });
    },
    actionCouponSuccess: function() {
      App.dialogueCommon.closeDialogueMessage();
      this.showListCouponByStatus(this.statusSearch);
    },
    showListCouponByStatus: function(status) {
      switch (status) {
        case "all":
          this.couponListCollection.setType("");
          break;
        case "active":
          this.couponListCollection.setType(1);
          break;
        case "scheduled":
          this.couponListCollection.setType(2);
          break;
        case "draft":
          this.couponListCollection.setType(0);
          break;
        case "waitApprove":
          this.couponListCollection.setType(3);
          break;
      };
      this.fetchListCoupon({ remove: true });
    }
  });

  return CouponInformationLayoutView;

})();
