var Backbone = require('backbone');

var DataModel = require('../../../models/data_model.js');
var NotificationSettingModel = require('../notification_setting/notificationSetting_model.js');

var NotificationContentItemView = require('./notificationContent_item_view.js');
var NotificationPreviewItemView = require('./notificationContent_preview_item_view.js');

var FooterItemView = require('../../../common/footer_item_view.js');

var UploadImageItemView = require('../../upload_image/upload_image_item_view.js');
var UploadImageCategoryCollection = require('../../upload_image/upload_image_category_collection.js');
var ImageListCollection = require('../../upload_image/image_list_collection.js');
var ImageListCollection1 = require('../../upload_image/image_list_collection1.js');
var ImageListCollectionView = require('../../upload_image/image_list_collection_view.js');

var TokenModel = require('../../../models/token_model.js');

var ValidationModel = require('../../../models/validation_model.js');

module.exports = (function () {
  var NotificationContentLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./notificationContent_layout_template.html'),
    regions: {
      "couponContentRegion" : "#content-region-wrapper #notification-content-region",
      "couponPreviewRegion" : "#content-region-wrapper #notification-preview-region",
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
        "keyup #txtHeader" : "_changeField",
        "paste #txtHeader" : "actionPasteCut",
        "cut #txtHeader" : "actionPasteCut",
        "keyup #txtFooter" : "_changeField",
        "paste #txtFooter" : "actionPasteCut",
        "cut #txtFooter" : "actionPasteCut",
        "touchend .btn-home": "backMain",
        "touchend #coverImageUpload" : "showPopUpImage",
        "touchend .select_type_list li" : "selectOption",
        "touchend .select_pics_list li" : "selectPicsList",
        "touchend #upload-region #close_upload_image" : "hidePopupImage",
        // "change #pageImageList": "showImageListByPage",
        "touchend #searchImgList": "searchImageListBtn",
        "change #upload_img": "selectImage",
        "touchend #submitUpload": "submitUploadImage",
        "touchend #image-list-region .row_img": "selectRowImage",
        "touchend #select_image_btn": "selectedImageBtn",
        "touchend .btn-save" : "saveNotificationContent",
        "touchend .removeUpload" : "removeUpload",
      }:
      {
        "click @ui.next" : "next",
        "click @ui.cancel" : "cancel",
        "keyup #txtHeader" : "_changeField",
        "paste #txtHeader" : "actionPasteCut",
        "cut #txtHeader" : "actionPasteCut",
        "keyup #txtFooter" : "_changeField",
        "paste #txtFooter" : "actionPasteCut",
        "cut #txtFooter" : "actionPasteCut",
        "click .btn-home": "backMain",
        "click #coverImageUpload" : "showPopUpImage",
        "click .select_type_list li" : "selectOption",
        "click .select_pics_list li" : "selectPicsList",
        "click #upload-region #close_upload_image" : "hidePopupImage",
        // "change #pageImageList": "showImageListByPage",
        "click #searchImgList": "searchImageListBtn",
        "change #upload_img": "selectImage",
        "click #submitUpload": "submitUploadImage",
        "click #image-list-region .row_img": "selectRowImage",
        "click #select_image_btn": "selectedImageBtn",
        "click .btn-save" : "saveNotificationContent",
        "click .removeUpload" : "removeUpload",
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

      App.dialogueCommon.setType("notification");

      this.notificationSettingModel = new NotificationSettingModel();
      this.tokenModel = new TokenModel();
      this.validationModel = new ValidationModel();

      this.uploadImageCategoryCollection = new UploadImageCategoryCollection();
      this.imageListCollection = new ImageListCollection( { pagination: true } );

      App.util.bindProgressScreen(this, this.uploadImageCategoryCollection);
      this.listenTo(this.uploadImageCategoryCollection, 'sync', this._showUploadImage);
      App.util.bindProgressScreen(this, this.imageListCollection);
      this.listenTo(this.imageListCollection, 'page-info-has-been-set', this._renderImageList);
      this.listenTo(App.dialogueCommon, 'backMainOK', this.backMainCommon);
      this.listenTo(App.dialogueCommon, 'saveDraftNotification', this.saveDraftNotification);
      this.listenTo(App.vent, 'reach:bottom:image', this._renderPageNationImage);

      this.listenTo(this, 'load:sync', this.onLoad);
      $(window).on('resize', _.bind(this.onResize, this));
    },
    onRender: function() {
      var _this = this;
      this._renderNotificationContent();
      this._renderUploadImage();
    },
    onLoad: function() {
      var windowH = $(window).height();
      var wrapperH = $('#master-container').height();
      if(windowH > wrapperH) {
        $('#master-container, #content-region-wrapper .container').css({'height': windowH + 'px'});
      }else{
        $('#content-region-wrapper .container').css({'height': wrapperH + 'px'});
      }    

      if(this.type === "view") {
        this.disbaleElement();
      }     
    },
    onResize: function(){
        var windowH = $(window).height();
        $('#master-container, #content-region-wrapper .container').css('height', windowH);
    },
    _renderNotificationContent: function() {
      if ( this.dataModel ) {
        this.notificationSettingModel.setContentData(this.dataModel);
      }
      this._renderFooter();
      this.couponContentRegion.show(new NotificationContentItemView({ model: this.notificationSettingModel }));
      this.couponPreviewRegion.show(new NotificationPreviewItemView({ model: this.notificationSettingModel })); 
      App.util.hideProgressScreen(); 
    },
    checkScroll: function() {
      var triggerPoint = 20;
      if( this.scrollTop + this.clientHeight + triggerPoint > this.scrollHeight ) {
        App.vent.trigger("reach:bottom:image");
      }
    },
    _renderPageNationImage: function() {
      if( this.imageListCollection.isAtLastPage() ) {
      } else {
        this.fetchImage({remove: false});
      }
    },
    disbaleElement: function(){
      $(".coupon-master .form-control").prop("disabled", true);
      $("#content-region-wrapper #coverImageUpload").addClass("noEvent");
      $(".page-center .btn-save").hide();
    },
    _renderFooter: function() {
      this.notificationSettingModel.set("typeFooter", "notification");
      switch ( this.type ) {
        case "view":
        case "edit":
        case "duplicate":
          this.notificationSettingModel.set("action", this.type);
          this.notificationSettingModel.set("tabIdx", 1);
          break;
        default:
          this.notificationSettingModel.set("action", "create");   
          this.notificationSettingModel.set("tabIdx", 1);       
          break;
      };
      this.footerRegion.show( new FooterItemView({ model: this.notificationSettingModel }) );
    },
    _renderUploadImage: function() {
      this.uploadRegion.show( new UploadImageItemView() );
    },
    _renderImageList: function() {
      this.imageListRegion.show( new ImageListCollectionView( { collection: this.imageListCollection } ) );
      this.$el.find('#inner-image-list').on('scroll', this.checkScroll);
      var totalCount = this.imageListCollection.getTotalCount();
      this.setCount(totalCount, this.imageListCollection.length);
      if ( totalCount > 0 ) {
        $("#select-image-wrapper").show();
      } else {
        $("#select-image-wrapper").hide();
      }
    },
    setCount: function(total, length) {
      if ( total === 0 ) {
        $(".list_img_upload .total").text("0件");
      } else if ( total === 1 ) {
        $(".list_img_upload .total").text("1件");
      } else {
        if ( App.appModel.getLanguage() === "en" ) {
          $(".list_img_upload .total").text("Display 1 - " + length + " of " + total + " records");
        } else if  ( App.appModel.getLanguage() === "ja" ) {
          $(".list_img_upload .total").text(total + " 件中 1 - " + length + " を表示");
        }
      }
    },
    next: function(e) {
      e.preventDefault();
      if ( this.type !== "view" ) {        
        if ( this.checkInput() === true ) {        
          this.notificationSettingModel.setContentDataByObject1(this.objectData);
          this.dataModel.setNotificationDataTemp(this.notificationSettingModel);
          location.hash = "notificationCondition/" + this.type + "?notificationId=" + this.notificationId;
        }
      } else {
        location.hash = "notificationCondition/" + this.type + "?notificationId=" + this.notificationId;
      }
    },
    cancel: function(e){
      e.preventDefault();
      if ( this.type !== "view" ) {        
        if ( this.checkInput() === true ) {        
          this.notificationSettingModel.setContentDataByObject1(this.objectData);
          this.dataModel.setNotificationDataTemp(this.notificationSettingModel);
          location.hash = "notificationSetting/" + this.type + "?notificationId=" + this.notificationId;
        }
      } else {
        location.hash = "notificationSetting/" + this.type + "?notificationId=" + this.notificationId;
      }
    },
    _changeField: function(e) {
      var field = $(e.currentTarget);
      var id = field.attr('id');
      this.notificationSettingModel.attributes[id] = field.val();
      if ( id === "message" || id === "memo" ) {
        var textTmp = App.util.text.nl2br(this.notificationSettingModel.attributes[id]);
        textTmp = textTmp.split("<br />");
        if ( textTmp.length >= 2 ) {
          for ( var i = 0; i <= textTmp.length; i++ ) {
            if ( i === 0 ) {
              $("#preview-template #" + id).html("");
            }
            $("#preview-template #" + id).append(textTmp[i]);
            $("#preview-template #" + id).append("<br />");
          }
        } else {
          $("#preview-template #" + id).text(this.notificationSettingModel.attributes[id]);
        }
      } else {
        $("#preview-template #" + id).text(this.notificationSettingModel.attributes[id]);
      }
    },
    actionPasteCut: function(e) {
      var field = $(e.currentTarget);
      setTimeout(function() {
        $(field).trigger("keyup");
      }, 0);
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
      location.hash = "notification";
    },
    showPopUpImage: function(e) {
      e.preventDefault();
      var seft = $(e.currentTarget);
      var _this = this;
      $(".form-control").blur();
      this.uploadImageCategoryCollection.url = AppConf.url.appRoot + (AppConf.webConf.webFlag ? "/admin/notification/web/image_category_list" : "/admin/notification/image_category_list");
      this.uploadImageCategoryCollection.fetchWithAuthInfo({
        on403: function() {
          _this.addSelectDefault();
          $("#upload-region .greybg,.dialog_image_upload").show();
        }
      });
    },
    selectPicsList:function(e){
      var _this = $(e.currentTarget);
      $(".select_pics_list li").removeClass("active");
      _this.addClass("active");
      var liIndex = $('.select_pics_list li.active').index();
      switch(liIndex){
          case 0:
            $('.list_detail').show();
            $('.list_img_upload').hide();
            break;
        case 1:
          this.searchImageList();
          break;
      };
    },
    showImageListByPage: function(e) {
      e.preventDefault();
      this.imageType = "page";
      this.setOptionImageUpload("page");
    },
    _showUploadImage: function() {
      this.addSelectDefault();
      this.uploadImageCategoryCollection.each(function(model) {
        var categoryId = model.get("categoryId");
        var categoryName = model.get("categoryName");
        if ( model.get("categoryName") ) {
          var categoryList1 = document.getElementById('categoryList1');
          var categoryList2 = document.getElementById('categoryList2');
          var opt1 = document.createElement('option');
          var opt2 = document.createElement('option');
          opt1.innerHTML = categoryName;
          opt1.setAttribute('data-id' , categoryId);
          opt2.innerHTML = categoryName;
          opt2.setAttribute('data-id' , categoryId);
          categoryList1.appendChild(opt1);
          categoryList2.appendChild(opt2);
        }
      });
      $("#upload-region .greybg,.dialog_image_upload").show();
    },
    addSelectDefault: function() {
      $("#categoryList1 option").remove();
      $("#categoryList2 option").remove();
      var categoryList1 = document.getElementById('categoryList1');
      var categoryList2 = document.getElementById('categoryList2');
      // set categoryList1
      var opt1 = document.createElement('option');
      var opt2 = document.createElement('option');
      opt1.innerHTML = App.appModel.getLanguageType().common.dialogue.uploadImage.categoryAll;
      opt1.setAttribute('data-id' , "");
      opt2.innerHTML = App.appModel.getLanguageType().common.dialogue.uploadImage.categoryNone;
      opt2.setAttribute('data-id' , "0");
      categoryList1.appendChild(opt1);
      categoryList1.appendChild(opt2);
      // set categoryList2
      var opt3 = document.createElement('option');
      opt3.innerHTML = App.appModel.getLanguageType().common.dialogue.uploadImage.categoryAll1;
      opt3.setAttribute('data-id' , "");
      categoryList2.appendChild(opt3);
    },
    searchImageList: function() {
      $("#image-list-region #inner-image-list").html("");
      // $("#pageImageList").hide();
      $(".list_img_upload .total").text("検索中");
      $(".select_pics_list li").removeClass("active");
      $(".select_pics_list li:eq(1)").addClass("active");
      this.imageType = "";
      $('.list_detail').hide();
      $('.list_img_upload').show();
      $("#select-image-wrapper").hide();
      this.setOptionImageUpload();
    },
    setOptionImageUpload: function(type) {
      var categoryId = $('#categoryList1').find(":selected").data("id");
      var perPage = $('#perPageImageList').find(":selected").data("id");
      var orderBy = $('#orderByImageList').find(":selected").data("id");
      var keywordSearch = $("#keywordSearch").val();
      if ( !isNaN(categoryId) ) {
        this.imageListCollection.setCategoryId(categoryId);
      }
      this.imageListCollection.setPerPage(perPage);
      this.imageListCollection.setOrderColumn(orderBy);
      this.imageListCollection.setKeyword(keywordSearch);
      this.fetchImage({remove: true});
    },
    hidePopupImage: function(){
      $(".form-control").blur();
      $('#upload-region .greybg,#upload-region .dialog_image_upload').hide();
      $("#upload-region .show_img_upload .row_img").css({"border-color": "#fff"});
      $("#upload-region .show_img_upload .row_img p").css({"color": "#29235C"});
      $(".msg_upload").text("");
      $(".msg_upload").hide();
      var totalCount = this.imageListCollection.getTotalCount();
      if ( totalCount === 0 ) {
        $("#select-image-wrapper").hide();
      }
    },
    fetchImage: function(options) {
      this.imageListCollection.fetchImageList({
        url: AppConf.webConf.webFlag ? AppConf.url.appRoot + "/admin/notification/web/image_list" : AppConf.url.appRoot + "/admin/notification/image_list",
        on403: function(){
          App.util.text.setTitleImageError();
        },
        remove: options.remove
      });
    },
    selectOption:function(e){
      var _this = $(e.currentTarget);
      $(".select_type_list li").removeClass("active");
      _this.addClass("active");
        var liIndex = $('.select_type_list li.active').index();
        switch(liIndex){
          case 0:
            $('.select_from_list, .list_detail').show();
            $('.image_upload, .list_img_upload').hide();
            $(".select_pics_list li").removeClass("active");
            $(".select_pics_list li:first-child").addClass("active");
            break;
        case 1:
            $('.select_from_list, .list_detail').hide();
            $('.image_upload').show();
            break;
      };
    },
    searchImageListBtn: function(e) {
      e.preventDefault();
      this.searchImageList();
    },
    selectImage: function(e) {
      e.preventDefault();
      var seft = $(e.currentTarget);
      var e = e.originalEvent;
        target = e.dataTransfer || e.target,
        file = target && target.files && target.files[0]
        url = URL.createObjectURL(file);
      if ( App.appModel.getLanguage() === "en" ) {
        $(".upload_detail .filename").css({"left": "235px"});
      } else if ( App.appModel.getLanguage() === "ja" ) {
        $(".upload_detail .filename").css({"left": "200px"});
      }
      if ( file ) {
        $(".image_upload .filename").text(file.name);
      } else {
        $(".image_upload .filename").text("");
      }
    },
    checkExtension: function(ex){
      return ["PNG","BMP","ICO"].some(function(item) {
        return (item.toLowerCase() === ex);
      }); // isValid is true
    },
    submitUploadImage: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var categoryId = $('#categoryList2').find(":selected").data("id");;
      var image = $("#upload_img")[0].files[0];
      // Get extension
      if ( image ) {
        var imageExtension = image.name.split('.').pop().toLowerCase();
        if ( imageExtension === "jpeg" || imageExtension === "jpg" || imageExtension === "gif" || that.checkExtension(imageExtension)) {
          var data = new FormData();
          if(that.checkExtension(imageExtension)){
            App.util.common.convertImage(image, function(newImage){
              var name = image.name.substr(0, image.name.length - imageExtension.length) + 'jpg';
              data.append("image", newImage, name);
              if ( categoryId ) {
                data.append("categoryId", categoryId);
              }
              data.append("maxSize", AppConf.uploadImage.maxSize);
              that.fetchToken({data: data, type: "upload", image: newImage.name});
            });
          }else{
            data.append("image", image);
            if ( categoryId ) {
              data.append("categoryId", categoryId);
            }
            data.append("maxSize", AppConf.uploadImage.maxSize);
            this.fetchToken({data: data, type: "upload", image: image.name});
          }
        } else {
          if ( App.appModel.getLanguage() === "en" ) {
            this.showMsgUpload("Because type of " + image.name + " is not jpg・jpeg・gif、You can't upload");
          } else if ( App.appModel.getLanguage() === "ja" ) {
            this.showMsgUpload(image.name + "はファイルの種類がjpg・jpeg・gifではない為、アップできません");
          }
        }
      } else {
        this.showMsgUpload(App.appModel.getLanguageType().common.dialogue.uploadImage.noSelectImageMsg);
      }
    },
    uploadImageApi: function(options) {
      var _this = this;
      var _options = options || {};
      
      App.btApi.uploadImageNotification({
          data: _options.data,
          token: _options.token
      }).done(function(res) {
        _this.changeImageSelected(App.util.text.getFullImageUrl(res.url), res.imageName);
         // _this.showMsgUpload(_options.image + App.appModel.getLanguageType().common.dialogue.uploadImage.uploadImageSuccess);
        App.util.hideProgressScreen();
      }).fail(function(err) {
        _this.showMsgUpload(App.appModel.getLanguageType().common.dialogue.uploadImage.uploadImageErr);
        App.util.hideProgressScreen();
      });
    },
    showMsgUpload: function(msg) {
      $(".msg_upload").text(msg);
      $(".msg_upload").show();
    },
    selectRowImage: function(e) {
      e.preventDefault();
      var seft = $(e.currentTarget);
      var _this = this;
      $("#upload-region .show_img_upload .row_img").css({"border-color": "#fff"});
      $("#upload-region .show_img_upload .row_img p").css({"color": "#29235C"});
      $(seft).css({"border-color": "#2dabb6"});
      $(seft).children("p").css({"color": "#2dabb6"});
      $("#upload-region .show_img_upload .row_img").removeClass("active");
      $(seft).addClass("active");
    },
    selectedImageBtn: function(e) {
      e.preventDefault();
      var seft = $(e.currentTarget);
      var _this = this;
      var imageUrl = $("#upload-region .show_img_upload").find(".row_img.active").children().attr("src");
      var imageName = $("#upload-region .show_img_upload").find(".row_img.active p").text();
      if ( imageUrl && imageName ) {
        this.changeImageSelected(imageUrl, imageName);
      }
    },
    changeImageSelected: function(imageUrl, imageName) {
      var extension = imageUrl.split('.').pop().toLowerCase();
      var fullImageName = imageName + "." + extension;
      $("#imageName").val(fullImageName);
      $("#preview-template #contentImageUrl").attr("src", imageUrl);
      this.notificationSettingModel.attributes["imageName"] = fullImageName;
      this.notificationSettingModel.attributes["imageFileName"] = imageUrl;
      this.hidePopupImage();
    },
    removeUpload: function(e){
      $("#imageName").val("");
      $("#preview-template #contentImageUrl").attr("src", "");
    },
    checkInput: function() {
      objectData = {};
      objectData.header = $("#txtHeader").val();
      objectData.footer = $("#txtFooter").val();
      objectData.imageName = $("#imageName").val();
      contentImageUrl = $("#preview-template #contentImageUrl").attr("src");
      objectData.contentImageUrl = App.util.text.getImageUrl(contentImageUrl); 
      var checkInput = true;
      this.validationModel.set(objectData, {validate:true});
      if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
        this.resetBorder();
        this.objectData = objectData;
      } else {
        this.onError( this.validationModel.validationError );
        checkInput = false;
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
    saveNotificationContent: function(e) {
      e.preventDefault();
      if ( this.checkInput() === true ) {
        App.dialogueCommon.setType("saveDraftNotification");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.draftTitle, App.appModel.getLanguageType().common.dialogue.draftMsg);
      }
    },
    saveDraftNotification: function() {
      this.notificationSettingModel.setContentDataByObject1(this.objectData);
      this.notificationSettingModel.setContentSaveAndExit();
      this.notificationSettingModel.setNotificationId( this.type, this.notificationId );
      this.fetchToken({actionType: 0, notificationMaster: this.notificationSettingModel.getNotificationMaster(), type: "save"});
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
      App.dialogueCommon.setType("notification");
      this.tokenModel.fetchToken({})
      .done(function(data) {
        switch ( type ) {
          case "upload":
            _this.uploadImageApi({data: _options.data, token: data.token, image: _options.image});
            break;
          case "save":
            _this.saveNotification({notificationMaster: _options.notificationMaster, token: data.token});
            break;
        };
      })
      .fail(function(res) {
        switch ( type ) {
          case "upload":
            $(".msg_upload").text(App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
            $(".msg_upload").show();
            break;
          case "save":
            App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.tokenTitleErr, App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
            break;
        };
        App.util.hideProgressScreen();
      });
    },
  });

  return NotificationContentLayoutView;

})();