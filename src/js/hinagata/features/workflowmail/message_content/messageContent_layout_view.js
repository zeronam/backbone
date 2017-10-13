var Backbone = require('backbone');

var DataModel = require('../../../models/data_model.js');
var ContentModel = require('./messageContent_model.js');

var SelectTemplateCollection = require('../select_template/selectTemplate_collection.js');

// Layout content
var LayoutTemplate01ContentItemView = require('./layout_template_01/layoutTemplate01_content_item_view.js');
var LayoutTemplate02ContentItemView = require('./layout_template_02/layoutTemplate02_content_item_view.js');
var LayoutTemplate03ContentItemView = require('./layout_template_03/layoutTemplate03_content_item_view.js');
var LayoutTemplate04ContentItemView = require('./layout_template_04/layoutTemplate04_content_item_view.js');
var LayoutTemplate05ContentItemView = require('./layout_template_05/layoutTemplate05_content_item_view.js');
var LayoutTemplate06ContentItemView = require('./layout_template_06/layoutTemplate06_content_item_view.js');
var LayoutTemplate07ContentItemView = require('./layout_template_07/layoutTemplate07_content_item_view.js');
var LayoutTemplate08ContentItemView = require('./layout_template_08/layoutTemplate08_content_item_view.js');
var LayoutTemplate10ContentItemView = require('./layout_template_10/layoutTemplate10_content_item_view.js');
var LayoutTemplate09ContentItemView = require('./layout_template_09/layoutTemplate09_content_item_view.js');
var LayoutTemplate11ContentItemView = require('./layout_template_11/layoutTemplate11_content_item_view.js');
var LayoutTemplate12ContentItemView = require('./layout_template_12/layoutTemplate12_content_item_view.js');

// Layout preview
var LayoutTemplate01previewItemView = require('./layout_template_01/layoutTemplate01_preview_item_view.js');
var LayoutTemplate02previewItemView = require('./layout_template_02/layoutTemplate02_preview_item_view.js');
var LayoutTemplate03previewItemView = require('./layout_template_03/layoutTemplate03_preview_item_view.js');
var LayoutTemplate04previewItemView = require('./layout_template_04/layoutTemplate04_preview_item_view.js');
var LayoutTemplate05previewItemView = require('./layout_template_05/layoutTemplate05_preview_item_view.js');
var LayoutTemplate06previewItemView = require('./layout_template_06/layoutTemplate06_preview_item_view.js');
var LayoutTemplate07previewItemView = require('./layout_template_07/layoutTemplate07_preview_item_view.js');
var LayoutTemplate08previewItemView = require('./layout_template_08/layoutTemplate08_preview_item_view.js');
var LayoutTemplate10previewItemView = require('./layout_template_10/layoutTemplate10_preview_item_view.js');
var LayoutTemplate09previewItemView = require('./layout_template_09/layoutTemplate09_preview_item_view.js');
var LayoutTemplate11previewItemView = require('./layout_template_11/layoutTemplate11_preview_item_view.js');
var LayoutTemplate12previewItemView = require('./layout_template_12/layoutTemplate12_preview_item_view.js');

var DetailMessageModel = require('../../../models/detail_message_model.js');

var ValidationModel = require('../../../models/validation_model.js');

var UploadImageItemView = require('../../upload_image/upload_image_item_view.js');
var UploadImageCategoryCollection = require('../../upload_image/upload_image_category_collection.js');
var ImageListCollection = require('../../upload_image/image_list_collection.js');
var ImageListCollection1 = require('../../upload_image/image_list_collection1.js');
var ImageListCollectionView = require('../../upload_image/image_list_collection_view.js');

var SaveTemplateItemView = require('../save_template/save_template_item_view.js');

var FooterItemView = require('../../../common/footer_item_view.js');

var TokenModel = require('../../../models/token_model.js');

var moment = require('moment');

module.exports = (function () {
  var MessageContentLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./messageContent_layout_template.html'),
    regions: {
      "messageContentRegion" : "#message-content-region",
      "myTemplateRegion": '#message-content #my-template',
      "uploadRegion": "#upload-region",
      "imageListRegion": "#image-list-region #inner-image-list",
      "footerRegion": "#message-content #footer-region",
      "saveTemplateRegion": "#message-content #save-template-region"
    },
    SidebarConf: {
      showSidebar: false
    },
    ui: {
      "next": ".navi-controll .btn-next",
      "cancel": ".navi-controll .btn-cancel"
    },
    events: function() {
      return ( applican.config.device_os === "IOS" ) ?
      {
        "keyup #subjectTitle"       : "_changeField",
        "keyup #subjectNote"       : "_changeField",
        "keyup #headlineOne"        : "_changeField",
        "keyup #headlineTwo"        : "_changeField",
        "keyup #headlineThree"      : "_changeField",
        "keyup #headlineFour"       : "_changeField",
        "keyup #bodyTextOne"        : "_changeField",
        "keyup #bodyTextTwo"        : "_changeField",
        "keyup #bodyTextThree"      : "_changeField",
        "keyup #bodyTextFour"       : "_changeField",
        "keyup #nameBtnOne"         : "_changeField",
        "keyup #urlLink0ne"         : "_changeField",
        "keyup #nameBtnTwo"         : "_changeField",
        "keyup #urlLinkTwo"         : "_changeField",
        "keyup #urlLinkThree"       : "_changeField",
        "keyup #urlLinkFour"        : "_changeField",
        "change #select_path_url1"  : "_changeSelect",
        "change #select_path_url2"  : "_changeSelect",
        "change #select_path_url3"  : "_changeSelect",
        "change #select_path_url4"  : "_changeSelect",
        "paste #subjectTitle"       : "actionPasteCut",
        "cut #subjectTitle"         : "actionPasteCut",
        "paste #headlineOne"        : "actionPasteCut",
        "cut #headlineOne"          : "actionPasteCut",
        "paste #headlineTwo"        : "actionPasteCut",
        "cut #headlineTwo"          : "actionPasteCut",
        "cut #headlineThree"        : "actionPasteCut",
        "paste #headlineThree"      : "actionPasteCut",
        "cut #headlineFour"         : "actionPasteCut",
        "paste #headlineFour"       : "actionPasteCut",
        "paste #bodyTextOne"        : "actionPasteCut",
        "cut #bodyTextOne"          : "actionPasteCut",
        "paste #bodyTextTwo"        : "actionPasteCut",
        "cut #bodyTextTwo"          : "actionPasteCut",
        "paste #bodyTextThree"      : "actionPasteCut",
        "cut #bodyTextFour"         : "actionPasteCut",
        "paste #nameBtnOne"         : "actionPasteCut",
        "cut #nameBtnOne"           : "actionPasteCut",
        "paste #nameBtnTwo"         : "actionPasteCut",
        "cut #nameBtnTwo"           : "actionPasteCut",
        "touchend .btn-save"           : "saveMesageContents",
        "touchend #coverImageUpload1, #coverImageUpload2, #coverImageUpload3, #coverImageUpload4" : "uploadImage",
        "touchend .select_type_list li" : "selectOption",
        "touchend .select_pics_list li" : "selectPicsList",
        "touchend #upload-region #close_upload_image" : "hidePopupImage",
        "touchend @ui.next" : "next",
        "touchend @ui.cancel" : "cancel",
        // "change #pageImageList": "showImageListByPage",
        "touchend #searchImgList": "searchImageListBtn",
        "change #upload_img": "selectImage",
        "touchend #submitUpload": "submitUploadImage",
        "touchend #image-list-region .row_img": "selectRowImage",
        "touchend #select_image_btn": "selectedImageBtn",
        "touchend .btn-home": "backMain",
        "touchend #delImage1, #delImage2, #delImage3, #delImage4": "_deleteImage",
        "touchend #message-content #check-save": "showSaveTemplate",
        "touchend #save-template-region #close_save_template" : "hidePopupTemplate",
        "touchend #save-template-region #saveTemplate": "saveTemplate"
      }:
      {
        "keyup #subjectTitle"       : "_changeField",
        "keyup #subjectNote"        : "_changeField",
        "keyup #headlineOne"        : "_changeField",
        "keyup #headlineTwo"        : "_changeField",
        "keyup #headlineThree"      : "_changeField",
        "keyup #headlineFour"       : "_changeField",
        "keyup #bodyTextOne"        : "_changeField",
        "keyup #bodyTextTwo"        : "_changeField",
        "keyup #bodyTextThree"      : "_changeField",
        "keyup #bodyTextFour"       : "_changeField",
        "keyup #nameBtnOne"         : "_changeField",
        "keyup #urlLink0ne"         : "_changeField",
        "keyup #nameBtnTwo"         : "_changeField",
        "keyup #urlLinkTwo"         : "_changeField",
        "keyup #urlLinkThree"       : "_changeField",
        "keyup #urlLinkFour"        : "_changeField",
        "change #select_path_url1"  : "_changeSelect",
        "change #select_path_url2"  : "_changeSelect",
        "change #select_path_url3"  : "_changeSelect",
        "change #select_path_url4"  : "_changeSelect",
        "paste #subjectTitle"       : "actionPasteCut",
        "cut #subjectTitle"         : "actionPasteCut",
        "paste #headlineOne"        : "actionPasteCut",
        "cut #headlineOne"          : "actionPasteCut",
        "paste #headlineTwo"        : "actionPasteCut",
        "cut #headlineTwo"          : "actionPasteCut",
        "paste #bodyTextOne"        : "actionPasteCut",
        "cut #bodyTextOne"          : "actionPasteCut",
        "paste #bodyTextTwo"        : "actionPasteCut",
        "cut #bodyTextTwo"          : "actionPasteCut",
        "paste #nameBtnOne"         : "actionPasteCut",
        "cut #nameBtnOne"           : "actionPasteCut",
        "paste #nameBtnTwo"         : "actionPasteCut",
        "cut #nameBtnTwo"           : "actionPasteCut",
        "click .btn-save"           : "saveMesageContents",
        "click #coverImageUpload1, #coverImageUpload2, #coverImageUpload3, #coverImageUpload4" : "uploadImage",
        "click .select_type_list li" : "selectOption",
        "click .select_pics_list li" : "selectPicsList",
        "click #upload-region #close_upload_image" : "hidePopupImage",
        "click @ui.next" : "next",
        "click @ui.cancel" : "cancel",
        // "change #pageImageList": "showImageListByPage",
        "click #searchImgList": "searchImageListBtn",
        "change #upload_img": "selectImage",
        "click #submitUpload": "submitUploadImage",
        "click #image-list-region .row_img": "selectRowImage",
        "click #select_image_btn": "selectedImageBtn",
        "click .btn-home": "backMain",
        "click #delImage1, #delImage2, #delImage3, #delImage4": "_deleteImage",
        "click #message-content #check-save": "showSaveTemplate",
        "click #save-template-region #close_save_template" : "hidePopupTemplate",
        "click #save-template-region #saveTemplate": "saveTemplate"
      }
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
      }
    },
    initialize: function(options) {
      var that = this;
      this.arrField = {};
      this.type = options.type;
      this.id = options.id;
      this.imageType;
      this.currentMessageContentModel = {};

      this.dataModel = new DataModel( { id: AppConf.core.localStorageKey } );
      this.dataModel.safeFetch();

      this.contentModel = new ContentModel();

      this.tokenModel = new TokenModel();

      this.validationModel = new ValidationModel();
      this.selectTemplateCollection = new SelectTemplateCollection();
      App.dialogueCommon.setType("messageContent");
      this.uploadImageCategoryCollection = new UploadImageCategoryCollection();
      this.imageListCollection = new ImageListCollection( { pagination: true } );

      App.util.bindProgressScreen(this, this.selectTemplateCollection);
      this.listenTo(this.selectTemplateCollection, 'sync', this._renderMessageContent);
      App.util.bindProgressScreen(this, this.uploadImageCategoryCollection);
      this.listenTo(this.uploadImageCategoryCollection, 'sync', this._showUploadImage);
      App.util.bindProgressScreen(this, this.imageListCollection);
      this.listenTo(this.imageListCollection, 'page-info-has-been-set', this._renderImageList);
      this.listenTo(App.dialogueCommon, 'backMainOK', this.backMainCommon);
      this.listenTo(App.dialogueCommon, 'backMainOK1', this.backMainCommon1);
      this.listenTo(App.dialogueCommon, 'saveDraftMail', this.saveDraftMail);
      this.listenTo(App.vent, 'reach:bottom:image', this._renderPageNationImage);

      this.listenTo(this, 'load:sync', this.onLoad);

      $(window).on('resize', _.bind(this.onResize, this));

      
    },
    onRender: function() {
      var _this = this;
      // AppConf.mail.segmentId = this.dataModel.get('segmentId');
      // AppConf.mail.sessionId = this.dataModel.get('sessionId');

      this._renderUploadImage();
      this._renderSaveTemplate();
      this._renderFooter();
      var preview = this.dataModel.getPreViewSetting();
      if ( preview ) {
        this._renderMessageContent();
        App.util.hideProgressScreen();
      } else {
        this.contentModel.set("templateID", this.id);
        switch( this.type ) {
          case "myTemplate":
            this.selectTemplateCollection.fetchWithAuthInfo({
              on403: function() {
                App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.selectTemplate.dialogueError.getTemplateTitleErr, App.appModel.getLanguageType().mail.selectTemplate.dialogueError.getTemplateMsgErr);
              }
            });
            this.contentModel.set("type", "myTemplate");
            break;
          case "layoutTemplate":
            this.contentModel.set("type", "layoutTemplate");
            this.contentModel.setLayoutDataEmpty();
            this.templateID = this.id;
            switch(this.id) {
              case 'template01':
                this.messageContentRegion.show(new LayoutTemplate01ContentItemView({ model: this.contentModel }));
                this.myTemplateRegion.show(new LayoutTemplate01previewItemView({ model: this.contentModel }));
                break;
              case 'template02':
                this.messageContentRegion.show(new LayoutTemplate02ContentItemView({ model: this.contentModel }));
                this.myTemplateRegion.show(new LayoutTemplate02previewItemView({ model: this.contentModel }));
                break;
              case 'template03':
                this.messageContentRegion.show(new LayoutTemplate03ContentItemView({ model: this.contentModel }));
                this.myTemplateRegion.show(new LayoutTemplate03previewItemView({ model: this.contentModel }));
                break;
              case 'template04':
                this.messageContentRegion.show(new LayoutTemplate04ContentItemView({ model: this.contentModel }));
                this.myTemplateRegion.show(new LayoutTemplate04previewItemView({ model: this.contentModel }));
                break;
              case 'template05':
                this.messageContentRegion.show(new LayoutTemplate05ContentItemView({ model: this.contentModel }));
                this.myTemplateRegion.show(new LayoutTemplate05previewItemView({ model: this.contentModel }));
                break;
              case 'template06':
                this.messageContentRegion.show(new LayoutTemplate06ContentItemView({ model: this.contentModel }));
                this.myTemplateRegion.show(new LayoutTemplate06previewItemView({ model: this.contentModel }));
                break;
              case 'template07':
                this.messageContentRegion.show(new LayoutTemplate07ContentItemView({ model: this.contentModel }));
                this.myTemplateRegion.show(new LayoutTemplate07previewItemView({ model: this.contentModel }));
                break;
              case 'template08':
                this.messageContentRegion.show(new LayoutTemplate08ContentItemView({ model: this.contentModel }));
                this.myTemplateRegion.show(new LayoutTemplate08previewItemView({ model: this.contentModel }));
                break;
              case 'template10':
                this.messageContentRegion.show(new LayoutTemplate10ContentItemView({ model: this.contentModel }));
                this.myTemplateRegion.show(new LayoutTemplate10previewItemView({ model: this.contentModel }));
                break;
              case 'template09':
                this.messageContentRegion.show(new LayoutTemplate09ContentItemView({ model: this.contentModel }));
                this.myTemplateRegion.show(new LayoutTemplate09previewItemView({ model: this.contentModel }));
                break;
              case 'template11':
                this.messageContentRegion.show(new LayoutTemplate11ContentItemView({ model: this.contentModel }));
                this.myTemplateRegion.show(new LayoutTemplate11previewItemView({ model: this.contentModel }));
              case 'template12':
                this.messageContentRegion.show(new LayoutTemplate12ContentItemView({
                  model: this.contentModel
                }));
                this.myTemplateRegion.show(new LayoutTemplate12previewItemView({
                  model: this.contentModel
                }));
                break;
            };
            this.arrField = this.contentModel;
            App.util.hideProgressScreen();
            break;
            case "view":
            case "edit":
            case "duplicate":
              this.detailMessageModel = new DetailMessageModel({ authMailId: this.id });
              App.util.bindProgressScreen(this, this.detailMessageModel);
              this.listenTo(this.detailMessageModel, 'sync', this._renderMessageContent);
              this.detailMessageModel.fetchDetailMessage({
                on403: function() {
                  App.dialogueCommon.setType("getDetailError");
                  App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.messageContent.dialogueError.getContentDetailTitleErr, App.appModel.getLanguageType().mail.messageContent.dialogueError.getContentDetailMsgErr);
                }
              });
            break;
        }
      }
      _this.checkTemplateToCreateEditor.bind(_this)();
      $('body').off('sync-end').on('sync-end', function () {
        _this.checkTemplateToCreateEditor.bind(_this)();
      });
    },
    checkTemplateToCreateEditor: function () {
      var _this = this;
      var tout = setTimeout(function () {
        if (_this.templateID === 'template11' || _this.id === 'template11') {
          _this.dataModel.set('template', 'template11');
          _this.dataModel.save();
          _this.createEditor();
          return;
        }
        if (_this.templateID === 'template12' || _this.id === 'template12') {
          _this.dataModel.set('template', 'template12');
          _this.dataModel.save();
          _this.createEditor();
          return;
        }
        _this.dataModel.set('template', '');
        _this.dataModel.save();
        clearTimeout(tout);
      }, 1000);
    },
    setBodyContentIframe: function (editor) {
      $('#' + editor.id).val(editor.getContent());
      var $contentBox = $("#iframe-" + editor.id).contents().find("body");
      $contentBox.html('<div id="root">'+editor.getContent()+'</div>');
      var tout = setTimeout(function () {
        $("#iframe-" + editor.id).css({
          height: $contentBox.find('#root').innerHeight()
        });
        clearTimeout(tout);
      }, 1000);
    },
    createEditor: function () {
      var _this = this;
      var toolbarExt = '';
      if (_this.templateID === 'template11' || _this.id === 'template11') {
        toolbarExt += 'chooseImage';
      }
      tinymce.execCommand('mceRemoveEditor', true, 'bodyTextOne');
      tinymce.init({
        selector: 'textarea',
        theme: 'modern',
        plugins: [
          /* 'advlist autolink lists link image preview hr pagebreak',
          'searchreplace wordcount visualblocks visualchars fullscreen',
          'insertdatetime nonbreaking save table contextmenu directionality',
          'paste textcolor colorpicker textpattern imagetools' */
          'advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons template paste textcolor colorpicker textpattern imagetools codesample'
        ],
        toolbar1: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link',
        toolbar2: 'charmap fontselect fontsizeselect | forecolor backcolor ' + toolbarExt,
        // height: 200,
        min_height: 200,
        width: '100% - 0px',
        branding: false,
        resize: true,
        language: App.appModel.getLanguage(),
        setup: function (ed) {
          ed.on('change', function (e) {
            _this.setBodyContentIframe(ed);
          });
          ed.addButton('chooseImage', {
            text: 'Choose image',
            icon: false,
            onclick: function (editor) {
              _this.uploadImageCategoryCollection.fetchWithAuthInfo({
                on403: function () {
                  $("#upload-region .greybg,.dialog_image_upload").show();
                }
              });
              $('body').off('upload-image-done').on('upload-image-done', function (e, url) {
                tinymce.activeEditor.insertContent('<img width="320" src="' + url + '"/>');
              });
            }
          });
        },
        automatic_uploads: false,
        file_picker_types: 'image',
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          _this.cb = cb;
          input.onchange = function () {
            var image = this.files[0];
            if (image) {
              var imageExtension = image.name.split('.').pop().toLowerCase();
              if (imageExtension === "jpeg" || imageExtension === "jpg" || imageExtension === "gif" || _this.checkExtension(imageExtension)) {
                var data = new FormData();
                if (_this.checkExtension(imageExtension)) {
                  App.util.common.convertImage(image, function (newImage) {
                    var name = image.name.substr(0, image.name.length - imageExtension.length) + 'jpg';
                    data.append("image", newImage, name);
                    data.append("maxSize", AppConf.uploadImage.maxSize);
                    App.btApi.uploadImage({
                      data: data,
                    }).done(function (res) {
                      cb(App.util.text.getFullImageUrl(res.url), {
                        title: image.name
                      });
                    });
                  });
                } else {
                  data.append("image", image);
                  data.append("maxSize", AppConf.uploadImage.maxSize);
                  App.btApi.uploadImage({
                    data: data,
                  }).done(function (res) {
                    cb(App.util.text.getFullImageUrl(res.url), {
                      title: image.name
                    });
                  });
                }
              }
            }
          };

          input.click();
        }
      });
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
    _renderFooter: function() {
      this.contentModel.set("typeFooter", "mail");
      switch ( this.type ) {
        case "view":
        case "edit":
        case "duplicate":
          this.contentModel.set("action", this.type);
          break;
        default:
          this.contentModel.set("action", "create");          
          break;
      };
      this.footerRegion.show( new FooterItemView({ model: this.contentModel }) );
    },
    _renderUploadImage: function() {
      this.uploadRegion.show( new UploadImageItemView() );
    },
    _renderSaveTemplate: function() {
      this.saveTemplateRegion.show( new SaveTemplateItemView() );
    },
    uploadImage: function(e) {
      e.preventDefault();
      var seft = $(e.currentTarget);
      this.contentModel.set("imageId", seft.attr("id"));
      var _this = this;
      $(".form-control, .form-control1, .form-control2").blur();
      this.uploadImageCategoryCollection.fetchWithAuthInfo({
        on403: function() {
          _this.addSelectDefault();
          $("#upload-region .greybg,.dialog_image_upload").show();
        }
      });
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
    _renderImageList: function() {
      // var imageListCollection1 = new ImageListCollection1();
      // imageListCollection1.add(this.imageListCollection.models[0].attributes.images);

      this.imageListRegion.show( new ImageListCollectionView( { collection: this.imageListCollection } ) );
      this.$el.find('#inner-image-list').on('scroll', this.checkScroll);
      var totalCount = this.imageListCollection.getTotalCount();
      // var maxPage = this.imageListCollection.models[0].attributes.maxPage;
      this.setCount(totalCount, this.imageListCollection.length);

      // display button select image
      if ( totalCount > 0 ) {
        $("#select-image-wrapper").show();
      } else {
        $("#select-image-wrapper").hide();
      }
    },
    setCount: function(total, length) {
      // $("#pageImageList").hide();
      if ( total === 0 ) {

        $(".list_img_upload .total").text(App.appModel.getLanguageType().common.zeroRecord);
        // $("#image-list-region .emptyView").html("指定した条件に合致する画像はありません");
      } else if ( total === 1 ) {
        $(".list_img_upload .total").text(App.appModel.getLanguageType().common.oneRecord);
      } else {
        // var page = this.imageListCollection.getPage();
        // var perPage = this.imageListCollection.getPerPage();
        // var startRecord = 1;
        // var endRecord;
        // if ( page > 1 ) {
        //   startRecord = ( page * perPage ) - ( perPage - 1 );
        //   var maxRecordPerPage = page * perPage;
        //   if ( maxRecordPerPage > total ) {
        //     endRecord = total;
        //   } else {
        //     endRecord = maxRecordPerPage - length;
        //   }
        //   if ( length === perPage ) {
        //     endRecord = maxRecordPerPage;
        //   }
        //   if ( endRecord > total ) {
        //     endRecord = total;
        //   }
        // } else {
        //   endRecord = length;
        // }
        // if ( App.appModel.getLanguage() === "en" ) {
        //   $(".list_img_upload .total").text("Display " + startRecord + " - " + endRecord + " of " + total + " records");
        // } else if ( App.appModel.getLanguage() === "ja" ) {
        //   $(".list_img_upload .total").text(total + " 件中 " + startRecord + " - " + endRecord + " を表示");
        // }
        // if ( maxPage > 0 ) {
        //   if ( maxPage > 1 ) {
        //     $("#pageImageList").show();
        //   }
        //   if ( !this.imageType && maxPage > 1 ) {
        //     $("#pageImageList option").remove();
        //     for ( var i = 1; i <= maxPage; i++ ) {
        //       var pageImageList = document.getElementById('pageImageList');
        //       var opt = document.createElement('option');
        //       if ( App.appModel.getLanguage() === "en" ) {
        //         opt.innerHTML = "Page " + i;
        //       } else if ( App.appModel.getLanguage() === "ja" ) {
        //         opt.innerHTML = i + "ページ";
        //       }
        //       opt.setAttribute('data-id' , i);
        //       pageImageList.appendChild(opt);
        //     }
        //   }
        // } else {
        //   $("#pageImageList").hide();
        // }
        if ( App.appModel.getLanguage() === "en" ) {
          $(".list_img_upload .total").text("Display 1 - " + length + " of " + total + " records");
        } else if  ( App.appModel.getLanguage() === "ja" ) {
          $(".list_img_upload .total").text(total + " 件中 1 - " + length + " を表示");
        }
      }
    },
    _renderMessageContent: function() {
      if(this.detailMessageModel && this.detailMessageModel.get('customSegment')){
        AppConf.webConf.segmentId = this.detailMessageModel.get('segmentDetail').segmentId;
        AppConf.mail.customSegment = this.detailMessageModel.get('customSegment');
        // AppConf.mail.scid = this.detailMessageModel.get('conditionId');
        
        // this.dataModel.set('segmentId', AppConf.mail.segmentId);
        // this.dataModel.set('customSegment', AppConf.mail.customSegment);
        // this.dataModel.set('scid', AppConf.mail.scid);
      }
      var preview = this.dataModel.getPreViewSetting();
      if ( preview ) {
        this.currentMessageContentModel = this.dataModel;
      } else {
        switch( this.type ) {
          case "view":
          case "edit":
          case "duplicate":
            this.dataModel.setCampainName(this.detailMessageModel.get("name"));
            this.currentMessageContentModel = this.detailMessageModel;
            break;
          default:
            var a = this.selectTemplateCollection.where({id: this.id});
            this.currentMessageContentModel = a[0];
            break;
        };
      }

      var str = this.currentMessageContentModel.attributes.body;
      str = App.util.text.relaceLtGt(str);

      var objContent = {
        subjectTitle : "",
        subjectNote : "",
        headlineOne : "",
        headlineTwo : "",
        headlineThree : "",
        headlineFour : "",
        imgBannerOne : "",
        imgBannerTwo : "",
        imgBannerThree : "",
        imgBannerFour : "",
        bodyTextOne : "",
        bodyTextTwo : "",
        bodyTextThree : "",
        bodyTextFour : "",
        nameBtnOne : "",
        urlLink0ne : "",
        nameBtnTwo : "",
        urlLinkTwo : "",
        nameBtnThree : "",
        urlLinkThree : "",
        nameBtnFour : "",
        urlLinkFour : ""
      };

      if ( preview ) {
        objContent.subjectTitle = this.currentMessageContentModel.attributes.subjectTitle;
      } else {
        objContent.subjectTitle = this.currentMessageContentModel.attributes.subject;
      }
      var template = str.indexOf('<!--templateID-->');
      if ( template >= 0  ) {
        // Get templateID
        this.templateID = str.split('<!--templateID-->')[0].split('<!--')[1].split('-->')[0].trim();

        // Parse body
        if ( str.indexOf('<!--startHeaderLine01-->') >= 0 && str.indexOf('<!--endHeaderLine01-->') >= 0 ) {
          objContent.headlineOne = str.split('<!--endHeaderLine01-->')[0].split('<!--startHeaderLine01-->')[1].trim();
        }
        if ( str.indexOf('<!--startBodyText01-->') >= 0 && str.indexOf('<!--endBodyText01-->') >= 0 ) {
          objContent.bodyTextOne = str.split('<!--endBodyText01-->')[0].split('<!--startBodyText01-->')[1].trim();
          objContent.bodyTextOne = App.util.text.brnl2(objContent.bodyTextOne);
        }
        if ( str.indexOf('<!--startUrlLink01-->') >= 0 && str.indexOf('<!--endUrlLink01-->') >= 0 ) {
          objContent.urlLink0ne = str.split('<!--endUrlLink01-->')[0].split('<!--startUrlLink01-->')[1].split('href="')[1].split("target")[0].split('"')[0].trim();
        }
        if ( str.indexOf('<!--startNameBtn01-->') >= 0 && str.indexOf('<!--endNameBtn01-->') >= 0 ) {
          objContent.nameBtnOne = str.split('<!--endNameBtn01-->')[0].split('<!--startNameBtn01-->')[1].trim();
        }
        if ( str.indexOf('<!--startsubjectNote-->') >= 0 && str.indexOf('<!--endsubjectNote-->') >= 0 ) {
          objContent.subjectNote = str.split('<!--endsubjectNote-->')[0].split('<!--startsubjectNote-->')[1].trim();
        }
      } else {
        this.templateID = "template11";
      }

      this.contentModel.set('subjectTitle', objContent.subjectTitle);
      this.contentModel.set('subjectNote', objContent.subjectNote);
      this.contentModel.set('headlineOne', objContent.headlineOne);
      this.contentModel.set('bodyTextOne', objContent.bodyTextOne);
      this.contentModel.set('nameBtnOne', objContent.nameBtnOne);
      this.contentModel.set('urlLink0ne', objContent.urlLink0ne);

      switch (this.templateID) {
        case 'template01':
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1].split('src="')[1].split('">')[0].trim();
          }
          if ( str.indexOf('<!--startUrlLink02-->') >= 0 && str.indexOf('<!--endUrlLink02-->') >= 0 ) {
            objContent.urlLinkTwo = str.split('<!--endUrlLink02-->')[0].split('<!--startUrlLink02-->')[1].split('href="')[1].split("target")[0].split('"')[0].trim();
          }
          if ( str.indexOf('<!--startNameBtn02-->') >= 0 && str.indexOf('<!--endNameBtn02-->') >= 0 ) {
            objContent.nameBtnTwo = str.split('<!--endNameBtn02-->')[0].split('<!--startNameBtn02-->')[1].trim();
          }
          // get full path of image
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('urlLinkTwo', objContent.urlLinkTwo);
          this.contentModel.set('nameBtnTwo', objContent.nameBtnTwo);

          this.messageContentRegion.show(new LayoutTemplate01ContentItemView({ model: this.contentModel }));
          this.myTemplateRegion.show(new LayoutTemplate01previewItemView({ model: this.contentModel }));
          break;

        case 'template02':
          this.messageContentRegion.show(new LayoutTemplate02ContentItemView({ model: this.contentModel }));
          this.myTemplateRegion.show(new LayoutTemplate02previewItemView({ model: this.contentModel }));
          break;

        case 'template03':
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1].split('src="')[1].split('">')[0].trim();
          }
          if ( str.indexOf('<!--startUrlLink02-->') >= 0 && str.indexOf('<!--endUrlLink02-->') >= 0 ) {
            objContent.urlLinkTwo = str.split('<!--endUrlLink02-->')[0].split('<!--startUrlLink02-->')[1].split('href="')[1].split("target")[0].split('"')[0].trim();
          }
          if ( str.indexOf('<!--startNameBtn02-->') >= 0 && str.indexOf('<!--endNameBtn02-->') >= 0 ) {
            objContent.nameBtnTwo = str.split('<!--endNameBtn02-->')[0].split('<!--startNameBtn02-->')[1].trim();
          }
          // get full path of image
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('urlLinkTwo', objContent.urlLinkTwo);
          this.contentModel.set('nameBtnTwo', objContent.nameBtnTwo);

          this.messageContentRegion.show(new LayoutTemplate03ContentItemView({ model: this.contentModel }));
          this.myTemplateRegion.show(new LayoutTemplate03previewItemView({ model: this.contentModel }));
          break;

        case 'template04':
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1].split('src="')[1].split('">')[0].trim();
          }
          if ( str.indexOf('<!--startImgBanner02-->') >= 0 && str.indexOf('<!--endImgBanner02-->') >= 0 ) {
            objContent.imgBannerTwo = str.split('<!--endImgBanner02-->')[0].split('<!--startImgBanner02-->')[1].split('src="')[1].split('">')[0].trim();
          }
          // get full path of image
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          objContent.imgBannerTwo = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerTwo).pathname);

          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('imgBannerTwo', objContent.imgBannerTwo);

          this.messageContentRegion.show(new LayoutTemplate04ContentItemView({ model: this.contentModel }));
          this.myTemplateRegion.show(new LayoutTemplate04previewItemView({ model: this.contentModel }));
          break;

        case 'template05':
          if ( str.indexOf('<!--startHeaderLine02-->') >= 0 && str.indexOf('<!--endHeaderLine02-->') >= 0 ) {
            objContent.headlineTwo = str.split('<!--endHeaderLine02-->')[0].split('<!--startHeaderLine02-->')[1].trim();
          }
          if ( str.indexOf('<!--startBodyText02-->') >= 0 && str.indexOf('<!--endBodyText02-->') >= 0 ) {
            objContent.bodyTextTwo = str.split('<!--endBodyText02-->')[0].split('<!--startBodyText02-->')[1].trim();
            objContent.bodyTextTwo = App.util.text.brnl2(objContent.bodyTextTwo);
          }
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1].split('src="')[1].split('">')[0].trim();
          }
          if ( str.indexOf('<!--startImgBanner02-->') >= 0 && str.indexOf('<!--endImgBanner02-->') >= 0 ) {
            objContent.imgBannerTwo = str.split('<!--endImgBanner02-->')[0].split('<!--startImgBanner02-->')[1].split('src="')[1].split('">')[0].trim();
          }
          if ( str.indexOf('<!--startUrlLink02-->') >= 0 && str.indexOf('<!--endUrlLink02-->') >= 0 ) {
            objContent.urlLinkTwo = str.split('<!--endUrlLink02-->')[0].split('<!--startUrlLink02-->')[1].split('href="')[1].split("target")[0].split('"')[0].trim();
          }
          if ( str.indexOf('<!--startNameBtn02-->') >= 0 && str.indexOf('<!--endNameBtn02-->') >= 0 ) {
            objContent.nameBtnTwo = str.split('<!--endNameBtn02-->')[0].split('<!--startNameBtn02-->')[1].trim();
          }

          // get full path of image
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          objContent.imgBannerTwo = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerTwo).pathname);

          this.contentModel.set('headlineTwo', objContent.headlineTwo);
          this.contentModel.set('bodyTextTwo', objContent.bodyTextTwo);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('imgBannerTwo', objContent.imgBannerTwo);
          this.contentModel.set('urlLinkTwo', objContent.urlLinkTwo);
          this.contentModel.set('nameBtnTwo', objContent.nameBtnTwo);

          this.messageContentRegion.show(new LayoutTemplate05ContentItemView({ model: this.contentModel }));
          this.myTemplateRegion.show(new LayoutTemplate05previewItemView({ model: this.contentModel }));
          break;
        case 'template06':
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1].split('src="')[1].split('">')[0].trim();
          }
          // get full path of image
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);

          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);

          this.messageContentRegion.show(new LayoutTemplate06ContentItemView({ model: this.contentModel }));
          this.myTemplateRegion.show(new LayoutTemplate06previewItemView({ model: this.contentModel }));
          break;
        case 'template07':
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1].split('src="')[1].split('">')[0].trim();
          }
          // get full path of image
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);

          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);

          this.messageContentRegion.show(new LayoutTemplate07ContentItemView({ model: this.contentModel }));
          this.myTemplateRegion.show(new LayoutTemplate07previewItemView({ model: this.contentModel }));
          break;
        case 'template08':
          if ( str.indexOf('<!--startHeaderLine02-->') >= 0 && str.indexOf('<!--endHeaderLine02-->') >= 0 ) {
            objContent.headlineTwo = str.split('<!--endHeaderLine02-->')[0].split('<!--startHeaderLine02-->')[1].trim();
          }
          if ( str.indexOf('<!--startBodyText02-->') >= 0 && str.indexOf('<!--endBodyText02-->') >= 0 ) {
            objContent.bodyTextTwo = str.split('<!--endBodyText02-->')[0].split('<!--startBodyText02-->')[1].trim();
            objContent.bodyTextTwo = App.util.text.brnl2(objContent.bodyTextTwo);
          }
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1].split('src="')[1].split('">')[0].trim();
          }
          if ( str.indexOf('<!--startImgBanner02-->') >= 0 && str.indexOf('<!--endImgBanner02-->') >= 0 ) {
            objContent.imgBannerTwo = str.split('<!--endImgBanner02-->')[0].split('<!--startImgBanner02-->')[1].split('src="')[1].split('">')[0].trim();
          }
          if ( str.indexOf('<!--startUrlLink02-->') >= 0 && str.indexOf('<!--endUrlLink02-->') >= 0 ) {
            objContent.urlLinkTwo = str.split('<!--endUrlLink02-->')[0].split('<!--startUrlLink02-->')[1].split('href="')[1].split("target")[0].split('"')[0].trim();
          }
          if ( str.indexOf('<!--startNameBtn02-->') >= 0 && str.indexOf('<!--endNameBtn02-->') >= 0 ) {
            objContent.nameBtnTwo = str.split('<!--endNameBtn02-->')[0].split('<!--startNameBtn02-->')[1].trim();
          }

          // get full path of image
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          objContent.imgBannerTwo = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerTwo).pathname);

          this.contentModel.set('headlineTwo', objContent.headlineTwo);
          this.contentModel.set('bodyTextTwo', objContent.bodyTextTwo);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('imgBannerTwo', objContent.imgBannerTwo);
          this.contentModel.set('urlLinkTwo', objContent.urlLinkTwo);
          this.contentModel.set('nameBtnTwo', objContent.nameBtnTwo);

          this.messageContentRegion.show(new LayoutTemplate08ContentItemView({ model: this.contentModel }));
          this.myTemplateRegion.show(new LayoutTemplate08previewItemView({ model: this.contentModel }));
          break;
        case 'template10':
          if ( str.indexOf('<!--startHeaderLine02-->') >= 0 && str.indexOf('<!--endHeaderLine02-->') >= 0 ) {
            objContent.headlineTwo = str.split('<!--endHeaderLine02-->')[0].split('<!--startHeaderLine02-->')[1].trim();
          }
          if ( str.indexOf('<!--startHeaderLine03-->') >= 0 && str.indexOf('<!--endHeaderLine03-->') >= 0 ) {
            objContent.headlineThree = str.split('<!--endHeaderLine03-->')[0].split('<!--startHeaderLine03-->')[1].trim();
          }
          if ( str.indexOf('<!--startHeaderLine04-->') >= 0 && str.indexOf('<!--endHeaderLine04-->') >= 0 ) {
            objContent.headlineFour = str.split('<!--endHeaderLine04-->')[0].split('<!--startHeaderLine04-->')[1].trim();
          }
          if ( str.indexOf('<!--startBodyText02-->') >= 0 && str.indexOf('<!--endBodyText02-->') >= 0 ) {
            objContent.bodyTextTwo = str.split('<!--endBodyText02-->')[0].split('<!--startBodyText02-->')[1].trim();
            objContent.bodyTextTwo = App.util.text.brnl2(objContent.bodyTextTwo);
          }
          if ( str.indexOf('<!--startBodyText03-->') >= 0 && str.indexOf('<!--endBodyText03-->') >= 0 ) {
            objContent.bodyTextThree = str.split('<!--endBodyText03-->')[0].split('<!--startBodyText03-->')[1].trim();
            objContent.bodyTextThree = App.util.text.brnl2(objContent.bodyTextTwo);
          }
          if ( str.indexOf('<!--startBodyText04-->') >= 0 && str.indexOf('<!--endBodyText04-->') >= 0 ) {
            objContent.bodyTextFour = str.split('<!--endBodyText04-->')[0].split('<!--startBodyText04-->')[1].trim();
            objContent.bodyTextFour = App.util.text.brnl2(objContent.bodyTextFour);
          }
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1].split('url(')[1].split(')')[0].trim();
          }
          if ( str.indexOf('<!--startImgBanner02-->') >= 0 && str.indexOf('<!--endImgBanner02-->') >= 0 ) {
            objContent.imgBannerTwo = str.split('<!--endImgBanner02-->')[0].split('<!--startImgBanner02-->')[1].split('url(')[1].split(')')[0].trim();
          }
          if ( str.indexOf('<!--startImgBanner03-->') >= 0 && str.indexOf('<!--endImgBanner03-->') >= 0 ) {
            objContent.imgBannerThree = str.split('<!--endImgBanner03-->')[0].split('<!--startImgBanner03-->')[1].split('url(')[1].split(')')[0].trim();
          }
          if ( str.indexOf('<!--startImgBanner04-->') >= 0 && str.indexOf('<!--endImgBanner04-->') >= 0 ) {
            objContent.imgBannerFour = str.split('<!--endImgBanner04-->')[0].split('<!--startImgBanner04-->')[1].split('url(')[1].split(')')[0].trim();
          }
          if ( str.indexOf('<!--startUrlLink02-->') >= 0 && str.indexOf('<!--endUrlLink02-->') >= 0 ) {
            objContent.urlLinkTwo = str.split('<!--endUrlLink02-->')[0].split('<!--startUrlLink02-->')[1].split('href="')[1].split("target")[0].split('"')[0].trim();
          }
          if ( str.indexOf('<!--startUrlLink03-->') >= 0 && str.indexOf('<!--endUrlLink03-->') >= 0 ) {
            objContent.urlLinkThree = str.split('<!--endUrlLink03-->')[0].split('<!--startUrlLink03-->')[1].split('href="')[1].split("target")[0].split('"')[0].trim();
          }
          if ( str.indexOf('<!--startUrlLink04-->') >= 0 && str.indexOf('<!--endUrlLink04-->') >= 0 ) {
            objContent.urlLinkFour = str.split('<!--endUrlLink04-->')[0].split('<!--startUrlLink04-->')[1].split('href="')[1].split("target")[0].split('"')[0].trim();
          }
          if ( str.indexOf('<!--startNameBtn02-->') >= 0 && str.indexOf('<!--endNameBtn02-->') >= 0 ) {
            objContent.nameBtnTwo = str.split('<!--endNameBtn02-->')[0].split('<!--startNameBtn02-->')[1].trim();
          }

          // get full path of image
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          objContent.imgBannerTwo = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerTwo).pathname);
          objContent.imgBannerThree = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerThree).pathname);
          objContent.imgBannerFour = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerFour).pathname);

          this.contentModel.set('headlineTwo', objContent.headlineTwo);
          this.contentModel.set('bodyTextTwo', objContent.bodyTextTwo);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('imgBannerTwo', objContent.imgBannerTwo);
          this.contentModel.set('urlLinkTwo', objContent.urlLinkTwo);
          this.contentModel.set('nameBtnTwo', objContent.nameBtnTwo);

          this.contentModel.set('headlineThree', objContent.headlineThree);
          this.contentModel.set('bodyTextThree', objContent.bodyTextThree);
          this.contentModel.set('imgBannerThree', objContent.imgBannerThree);
          this.contentModel.set('urlLinkThree', objContent.urlLinkThree);
          this.contentModel.set('nameBtnThree', objContent.nameBtnThree);

          this.contentModel.set('headlineFour', objContent.headlineFour);
          this.contentModel.set('bodyTextFour', objContent.bodyTextFour);
          this.contentModel.set('imgBannerFour', objContent.imgBannerFour);
          this.contentModel.set('urlLinkFour', objContent.urlLinkFour);
          this.contentModel.set('nameBtnFour', objContent.nameBtnFour);

          this.messageContentRegion.show(new LayoutTemplate10ContentItemView({ model: this.contentModel }));
          this.myTemplateRegion.show(new LayoutTemplate10previewItemView({ model: this.contentModel }));
          break;
        case 'template09':
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = $(str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1]).attr('src');
          }
          // get full path of image
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);

          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);

          this.messageContentRegion.show(new LayoutTemplate09ContentItemView({ model: this.contentModel }));
          this.myTemplateRegion.show(new LayoutTemplate09previewItemView({ model: this.contentModel }));
          break;
        case 'template11':
          this.messageContentRegion.show(new LayoutTemplate11ContentItemView({ model: this.contentModel }));
          this.myTemplateRegion.show(new LayoutTemplate11previewItemView({ model: this.contentModel }));
          break;
        case 'template12':
          if (str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0) {
            objContent.imgBannerOne = $(str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1]).attr('src');
          }
          if (str.indexOf('<!--startImgBanner02-->') >= 0 && str.indexOf('<!--endImgBanner02-->') >= 0) {
            objContent.imgBannerTwo = $(str.split('<!--endImgBanner02-->')[0].split('<!--startImgBanner02-->')[1]).attr('src');
          }
          if (str.indexOf('<!--startImgBanner03-->') >= 0 && str.indexOf('<!--endImgBanner03-->') >= 0) {
            objContent.imgBannerThree = $(str.split('<!--endImgBanner03-->')[0].split('<!--startImgBanner03-->')[1]).attr('src');
          }
          // get full path of image
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          objContent.imgBannerTwo = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerTwo).pathname);
          objContent.imgBannerThree = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerThree).pathname);

          if (str.indexOf('<!--startBodyText02-->') >= 0 && str.indexOf('<!--endBodyText02-->') >= 0) {
            objContent.bodyTextTwo = str.split('<!--endBodyText02-->')[0].split('<!--startBodyText02-->')[1].trim();
            objContent.bodyTextTwo = App.util.text.brnl2(objContent.bodyTextTwo);
          }

          this.contentModel.set('bodyTextTwo', objContent.bodyTextTwo);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('imgBannerTwo', objContent.imgBannerTwo);
          this.contentModel.set('bodyTextThree', objContent.bodyTextThree);
          this.contentModel.set('imgBannerThree', objContent.imgBannerThree);

          this.messageContentRegion.show(new LayoutTemplate12ContentItemView({
            model: this.contentModel
          }));
          this.myTemplateRegion.show(new LayoutTemplate12previewItemView({
            model: this.contentModel
          }));
          break;
      }

      this.arrField = this.contentModel;

      this.setSelectUrl(this.arrField.attributes["urlLink0ne"], "1");
      this.setSelectUrl(this.arrField.attributes["urlLinkTwo"], "2");
      this.setSelectUrl(this.arrField.attributes["urlLinkThree"], "3");
      this.setSelectUrl(this.arrField.attributes["urlLinkFour"], "4");

      if ( this.type === "view" ) {
        this.disbaleElement();
      }
    },
    setSelectUrl: function(url, idx) {
      var urlTmp1 = url;
      if ( url ) {
        if ( urlTmp1.indexOf("://") > 0 ) {
          var tmp1 = urlTmp1.split("://")[0];
          var selection = "#select_path_url" + idx;
          if ( tmp1 === "http" ) {
            $(selection + ' option[data-id = 0]').prop("selected",true);
          } else {
            $(selection + ' option[data-id = 1]').prop("selected",true);
          }
        }
      }
    },
    disbaleElement: function() {
      $("#message-content #subjectTitle").prop("disabled", true);
      $("#message-content #headlineOne").prop("disabled", true);
      $("#message-content #headlineTwo").prop("disabled", true);
      $("#message-content #delImage1").addClass("noEvent");
      $("#message-content #delImage2").addClass("noEvent");
      $("#message-content #coverImageUpload1").addClass("noEvent");
      $("#message-content #coverImageUpload2").addClass("noEvent");
      $("#message-content #bodyTextOne").prop("disabled", true);
      $("#message-content #bodyTextTwo").prop("disabled", true);
      $("#message-content #nameBtnOne").prop("disabled", true);
      $("#message-content #urlLink0ne").prop("disabled", true);
      $("#message-content #nameBtnTwo").prop("disabled", true);
      $("#message-content #urlLinkTwo").prop("disabled", true);
      $("#message-content #select_path_url1").prop("disabled", true);
      $("#message-content #select_path_url2").prop("disabled", true);
      $("#message-content #check-save").prop("disabled", true);
      $("#message-content .btn-save").hide();
    },
    actionPasteCut: function(e) {
      var field = $(e.currentTarget);
      setTimeout(function() {
        $(field).trigger("keyup");
      }, 0);
    },
    _changeField: function(e) {
      var field = $(e.currentTarget);
      var id = field.attr('id');
      if( field.val() ) {
        this.arrField.attributes[id] = field.val();
      } else {
        this.arrField.attributes[id] = field.attr("placeholder");
      }

      if ( id === "urlLink0ne" || id === "urlLinkTwo" ) {
        var url1Index = $('#select_path_url1').find(":selected").data("id");
        var url2Index = $('#select_path_url2').find(":selected").data("id");
        var url1 = $('#select_path_url1').find(":selected").val();
        var url2 = $('#select_path_url2').find(":selected").val();
        var urlTmp;
        if ( this.arrField.attributes[id] ) {
          if ( id === "urlLink0ne" ) {
            urlTmp = this.setUrl(this.arrField.attributes[id], url1, url1Index);
          } else {
            urlTmp = this.setUrl(this.arrField.attributes[id], url2, url2Index);
          }
        } else {
          urlTmp = this.arrField.attributes[id];
        }
        $("#preview-template #" + id).attr( "href" ,urlTmp);
      } else {
        if ( id === "bodyTextOne" || id === "bodyTextTwo" || id === "bodyTextThree" || id === "bodyTextFour" ) {
          var bodyTmp = App.util.text.nl2br(this.arrField.attributes[id]);
          bodyTmp = bodyTmp.split("<br />");
          if ( bodyTmp.length >= 2 ) {
            for ( var i = 0; i <= bodyTmp.length; i++ ) {
              if ( i === 0 ) {
                $("#preview-template #" + id).html("");
              }
              $("#preview-template #" + id).append(bodyTmp[i]);
              $("#preview-template #" + id).append("<br />");
            }
          } else {
            $("#preview-template #" + id).text(this.arrField.attributes[id]);
          }
        } else {
          $("#preview-template #" + id).text(this.arrField.attributes[id]);
        }
      }
    },
    _changeSelect: function(e) {
      var field = $(e.currentTarget);
      var index = $(field).find("option:selected").data("id");
      var url = $(field).val();
      var urlTmp;
      var id = field.attr('id').replace("select_path_url","");      
      var arrNumberWords = ['','0ne','Two','Three','Four'];
      var urlLink = $("#urlLink" + arrNumberWords[id]).val();

      urlTmp = this.setUrl(urlLink, url, index);
      $("#preview-template #urlLink" + arrNumberWords[id]).attr( "href" ,urlTmp);
      this.arrField.attributes["urlLink" + arrNumberWords[id]] = urlTmp;
    },
    showPreviewLayout: function(templateId, model) {
      switch( templateId ) {
        case "template01":
          this.myTemplateRegion.show(new LayoutTemplate01previewItemView({ model: model }));
          break;
        case "template02":
          this.myTemplateRegion.show(new LayoutTemplate02previewItemView({ model: model }));
          break;
        case "template03":
          this.myTemplateRegion.show(new LayoutTemplate03previewItemView({ model: model }));
          break;
        case "template04":
          this.myTemplateRegion.show(new LayoutTemplate04previewItemView({ model: model }));
          break;
        case "template05":
          this.myTemplateRegion.show(new LayoutTemplate05previewItemView({ model: model }));
          break;
        case "template06":
          this.myTemplateRegion.show(new LayoutTemplate06previewItemView({ model: model }));
          break;
        case "template07":
          this.myTemplateRegion.show(new LayoutTemplate07previewItemView({ model: model }));
          break;
        case "template08":
          this.myTemplateRegion.show(new LayoutTemplate08previewItemView({ model: model }));
          break;
        case "template09":
          this.myTemplateRegion.show(new LayoutTemplate09previewItemView({ model: model }));
          break;
      };
    },
    _deleteImage: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = $(_this).attr("id").replace("delImage", "");
      var arrNumberWords = ['','One','Two','Three','Four'];
      var imageUrl = "./image/main/noImage.png";

      $("#coverImageUpload"+id).parent().show();
      $("#message-content-region #imgBanner" + arrNumberWords[id]).attr("src", "");
      $("#preview-template #imgBanner" + arrNumberWords[id]).attr("src", imageUrl);
      this.arrField.attributes["imgBanner" + arrNumberWords[id]] = "";
      $("#message-content-region #image-holder-"+ id).hide();
    },
    onLoad: function() {
     /* var windowH = $(window).height();
      var wrapperH = $('#master-container').height();
      if(windowH > wrapperH) {
        $('#master-container, #message-content .container').css({'height': windowH + 'px'});
      }else{
        $('#message-content .container').css({'height': wrapperH + 'px'});
      }*/
      var preview = this.dataModel.getPreViewSetting();
      if ( preview ) {
        if ( this.type === "view" ) {
          this.disbaleElement();
        }
      }
      $("#message-content #navi-control-bar li").removeClass();
      if ( this.type === "view" || this.type === "edit" || this.type === "duplicate" ) {
        $("#message-content #navi-control-bar li:eq(0)").addClass("active");
      } else {
        $("#message-content #navi-control-bar li:eq(1)").addClass("active");
        if ( this.type === "layoutTemplate" ) {
          this.setSelectUrl(this.arrField.attributes["urlLink0ne"], "1");
          this.setSelectUrl(this.arrField.attributes["urlLinkTwo"], "2");
        }
      }
    },
    onResize: function(){
        /*var windowH = $(window).height();
        $('#master-container, #message-content .container').css('height', windowH);*/
    },
    saveMesageContents: function(e) {
      e.preventDefault();
      if ( this.checkInput() === true ) {
        App.dialogueCommon.setType("saveDraftMail");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.draftTitle, App.appModel.getLanguageType().common.dialogue.draftMsg);
      }
    },
    saveDraftMail: function() {
      var campainName = this.dataModel.getCampainName();
      var subject = $("#subjectTitle").val();
      var body = this.setBodyContent();
      this.fetchToken({name: campainName, subject: subject, body: body, type: "save"});
    },
    setBodyContent: function(options) {
      var body;
      var _options = options || {};
      var subject = $("#subjectTitle").val();
      var subjectNote = $("#subjectNote").val();
      var headlineOne = $("#headlineOne").val();
      var headlineTwo = $("#headlineTwo").val();
      var headlineThree = $("#headlineThree").val();
      var headlineFour = $("#headlineFour").val();
      var imgBannerOne = App.util.common.getLocation($("#imgBannerOne").attr("src")).pathname;
      var imgBannerTwo = App.util.common.getLocation($("#imgBannerTwo").attr("src")).pathname;
      var imgBannerThree = App.util.common.getLocation($("#imgBannerThree").attr("src")).pathname;
      var imgBannerFour = App.util.common.getLocation($("#imgBannerFour").attr("src")).pathname;
      var bodyTextOne = App.util.text.nl2br($("#bodyTextOne").val());
      if (this.templateID == 'template11') {
        bodyTextOne = tinyMCE.get('bodyTextOne').getContent();
      }
      var bodyTextTwo = $("#bodyTextTwo").val();
      bodyTextTwo = App.util.text.nl2br(bodyTextTwo);
      if (this.templateID == 'template12') {
        bodyTextOne = tinyMCE.get('bodyTextOne').getContent();
        bodyTextTwo = tinyMCE.get('bodyTextTwo').getContent();
      }
      var bodyTextThree = $("#bodyTextThree").val();
      bodyTextThree = App.util.text.nl2br(bodyTextThree);
      var bodyTextFour = $("#bodyTextFour").val();
      bodyTextFour = App.util.text.nl2br(bodyTextFour);
      var nameBtnOne = $("#nameBtnOne").val();
      var nameBtnTwo = $("#nameBtnTwo").val();
      var urlLinkOne = $("#urlLink0ne").val();
      var urlLinkTwo = $("#urlLinkTwo").val();
      var urlLinkThree = $("#urlLinkThree").val();
      var urlLinkFour = $("#urlLinkFour").val();
      var url1Index = $('#select_path_url1').find(":selected").data("id");
      var url2Index = $('#select_path_url2').find(":selected").data("id");
      var url3Index = $('#select_path_url3').find(":selected").data("id");
      var url4Index = $('#select_path_url3').find(":selected").data("id");
      var url1 = $('#select_path_url1').find(":selected").val();
      var url2 = $('#select_path_url2').find(":selected").val();
      var url3 = $('#select_path_url3').find(":selected").val();
      var url4 = $('#select_path_url4').find(":selected").val();
      var urlLinkOneTmp;
      var urlLinkTwoTmp;
      var urlLinkThreeTmp;
      var urlLinkFourTmp;
      if ( urlLinkOne !== "" && urlLinkOne ) {
        urlLinkOneTmp = this.setUrl(urlLinkOne, url1, url1Index); 
      }
      if ( urlLinkTwo !== "" && urlLinkTwo ) {
        urlLinkTwoTmp = this.setUrl(urlLinkTwo, url2, url2Index);
      }
      if ( urlLinkThree !== "" && urlLinkThree ) {
        urlLinkThreeTmp = this.setUrl(urlLinkThree, url3, url3Index);
      }
      if ( urlLinkFour !== "" && urlLinkFour ) {
        urlLinkFourTmp = this.setUrl(urlLinkFour, url4, url4Index);
      }
      switch( this.templateID ) {
        case "template01":
          // set template
          // body = '<body style="color: #29235C;font-family: "ＭＳ ゴシック"><!--template01--><!--templateID--><div style="position: relative; margin: 0 auto; background-color: #fff; color: #29235C; text-align: center; font-size: 14px;">';
          body = '<div><!--template01--><!--templateID--><div style="position: relative; margin: 0 auto; background-color: #fff; color: #29235C; text-align: center; font-size: 14px;">';
          // set head line 1
          body += '<h2 style="color: #383636; font-size: 18px; margin: 0px 0px 5px; padding: 25px 10px 10px;"><!--startHeaderLine01-->' + headlineOne + "<!--endHeaderLine01--></h2>";
          // set image 1
          body += '<div style="border: 2px solid #a3a3a3; width: 100%; overflow: hidden; position: relative; margin: 0; padding: 0;"><!--startImgBanner01--><img style="width: 100%; display: block; padding: 0; margin: 0; border: 0;" src="' + imgBannerOne + '"><!--endImgBanner01--></div>';
          // set body 1
          body += '<div style="padding: 10px; font-size: 13px; color: #383636; text-align: justify;"><p style="margin: 0 0 10px;"><!--startBodyText01-->' + bodyTextOne + "<!--endBodyText01--></p>";
          //set link url 1
          body += '<div style="text-align: center; margin: 20px 0px;"><!--startUrlLink01--><a style="width: 92px; font-family: Arial; color: #29235C; border: 1px solid #29235C; text-decoration: none; text-align: center; text-transform: capitalize; display: inline-block; vertical-align: top; zoom: 1; border-radius: 12px; font-size: 14px; margin: 0px 10px; padding: 7px 0;" href="' + urlLinkOneTmp + '" target="_blank" role="button"><!--endUrlLink01-->';
          // set label url 1
          body += "<!--startNameBtn01-->" + nameBtnOne + "<!--endNameBtn01--></a>";
          //set link url 2
          body += '<!--startUrlLink02--><a style="width: 92px; font-family: Arial; color: #29235C; border: 1px solid #29235C; text-decoration: none; text-align: center; text-transform: capitalize; display: inline-block; vertical-align: top; zoom: 1; border-radius: 12px; font-size: 14px; margin: 0px 10px; padding: 7px 0;" href="' + urlLinkTwoTmp + '" target="_blank" role="button"><!--endUrlLink02-->';
          // set label url 2
          body += "<!--startNameBtn02-->" + nameBtnTwo + "<!--endNameBtn02--></a></div></div></div></div>";
          break;
        case "template02":
          // set template
          body = '<div><!--template02--><!--templateID--><div style="position: relative; margin: 0 auto; background-color: #fff; color: #29235C; text-align: center; font-size: 14px;">';
          // set subject
          body += '<h3 style="text-align: left; font-weight: normal; text-transform: uppercase; margin: 0; padding: 15px 10px; border-bottom: 1px solid #a3a3a3;">' + subject + "</h3>";
          // set head line 1
          body += '<h4 style="text-align: left; font-weight: bold; text-transform: capitalize; background-color: rgba(31, 152, 141, 0.5); padding: 25px 10px 20px; margin: 10px 0;"><!--startHeaderLine01-->' + headlineOne + "<!--endHeaderLine01--></h4>";
          // set body 1
          body += '<div style="text-align: center; border-top: 1px solid #a3a3a3; width: 100%; min-height: 200px; display: table;"><div style="display: table-cell; vertical-align: middle;"><p style="margin: 0;"><!--startBodyText01-->' + bodyTextOne + "<!--endBodyText01--></p></div></div>";
          //set link url 1
          body += '<div style="text-align: center; padding: 20px 0px 10px; border-top: 1px solid #a3a3a3;"><!--startUrlLink01--><a href="' + urlLinkOneTmp + '" target="_blank" style="width: 92px; font-family: Arial; color: #29235C; border: 1px solid #29235C; text-decoration: none; text-align: center; text-transform: capitalize; display: inline-block; vertical-align: top; zoom: 1; border-radius: 12px; margin: 0px 10px; padding: 7px 0;"><!--endUrlLink01-->';
          // set label url 1
          body += "<!--startNameBtn01-->" + nameBtnOne + "<!--endNameBtn01--></a></div></div></div>";
          break;
        case "template03":
          // set template
          body = '<div><!--template03--><!--templateID--><div style="position: relative; margin: 0 auto; background-color: #fff; color: #29235C; text-align: center; font-size: 14px;">';
          // set subject
          body += '<h3 style="text-align: left; font-weight: normal; text-transform: uppercase; margin: 0; padding: 15px 10px; border-bottom: 1px solid #a3a3a3;">' + subject + "</h3>";
          // set image 1
          body += '<div style="min-height: 120px; position: relative; background-color: #c5c5c5;"><!--startImgBanner01--><img style="width: 100%; display: block; padding: 0; margin: 0; border: 0;" src="' + imgBannerOne + '"><!--endImgBanner01-->';
          // set head line 1
          body += '<h4 style="width: 90%; position: absolute; left: 2%; bottom: 10px; padding: 5px 10px; text-align: left; font-weight: bold; text-transform: capitalize; background-color: rgba(31, 152, 141, 0.5); margin: 10px auto;"><!--startHeaderLine01-->' + headlineOne + '<!--endHeaderLine01--></h4></div>';
          // set body 1
          body += '<div style="text-align: center; border-top: 1px solid #a3a3a3; width: 100%; min-height: 200px; display: table;"><div style="display: table-cell; vertical-align: middle;"><p style="margin: 0;"><!--startBodyText01-->' + bodyTextOne + '<!--endBodyText01--></p></div></div>';
          //set link url 1
          body += '<div style="text-align: center; padding: 20px 0px 10px; border-top: 1px solid #a3a3a3;"><!--startUrlLink01--><a href="' + urlLinkOneTmp + '" target="_blank" style="width: 92px; font-family: Arial; color: #29235C; border: 1px solid #29235C; text-decoration: none; text-align: center; text-transform: capitalize; display: inline-block; vertical-align: top; zoom: 1; border-radius: 12px; margin: 0px 10px; padding: 7px 0;"><!--endUrlLink01-->';
          // set label url 1
          body += '<!--startNameBtn01-->' + nameBtnOne + '<!--endNameBtn01--></a>';
          //set link url 2
          body += '<!--startUrlLink02--><a href="' + urlLinkTwoTmp + '" target="_blank" style="width: 92px; font-family: Arial; color: #29235C; border: 1px solid #29235C; text-decoration: none; text-align: center; text-transform: capitalize; display: inline-block; vertical-align: top; zoom: 1; border-radius: 12px;  margin: 0px 10px; padding: 7px 0;"><!--endUrlLink02-->';
          // set label url 2
          body += '<!--startNameBtn02-->' + nameBtnTwo + '<!--endNameBtn02--></a></div></div></div>';
          break;
        case "template04":
          // set template
          body = '<div><!--template04--><!--templateID--><div style="position: relative; margin: 0 auto; background-color: #fff; color: #29235C; text-align: center; font-size: 14px;">';
          // set subject
          body += '<h3 style="text-align: left; font-weight: normal; text-transform: uppercase; margin: 0; padding: 15px 10px; border-bottom: 1px solid #a3a3a3;">' + subject + "</h3>";
          // set image 1
          body += '<div style="height: auto; position: relative; background-color: #c5c5c5; padding: 10px 5px;"><ul style="padding: 0px 0px 10px;"><li style="width: 48%; display: inline-block; vertical-align: top; zoom: 1;"><!--startImgBanner01--><img style="width: 100%; vertical-align: middle; display: block; padding: 0; margin: 0; border: 0;" src="' + imgBannerOne + '"><!--endImgBanner01--></li>';
          // set image 2
          body += '<li style="width: 48%; display: inline-block; vertical-align: top; zoom: 1;"><!--startImgBanner02--><img style="width: 100%; vertical-align: middle; display: block; padding: 0; margin: 0; border: 0;" src="' + imgBannerTwo + '"><!--endImgBanner02--></li></ul>';
          // set head line 1
          body += '<h4 style="width: 90%; padding: 5px 10px; text-align: left; font-weight: bold; text-transform: capitalize; background-color: rgba(31, 152, 141, 0.5); margin: 10px auto;"><!--startHeaderLine01-->' + headlineOne + "<!--endHeaderLine01--></h4></div>";
          // set body 1
          body += '<div style="text-align: center; border-top: 1px solid #a3a3a3; width: 100%; min-height: 200px; display: table;"><div style="display: table-cell; vertical-align: middle;"><p style="margin: 0;"><!--startBodyText01-->' + bodyTextOne + "<!--endBodyText01--></p></div></div>";
          //set link url 1
          body += '<div style="text-align: center; padding: 20px 0px 10px; border-top: 1px solid #a3a3a3;"><!--startUrlLink01--><a href="' + urlLinkOneTmp + '" target="_blank" style="width: 92px; font-family: Arial; color: #29235C; border: 1px solid #29235C; text-decoration: none; text-align: center; text-transform: capitalize; display: inline-block; vertical-align: top; zoom: 1; border-radius: 12px; font-size: 14px; margin: 0px 10px; padding: 7px 0;"><!--endUrlLink01-->';
          // set label url 1
          body += "<!--startNameBtn01-->" + nameBtnOne + "<!--endNameBtn01--></a></div></div></div>";
          break;
        case "template05":
          // set template
          body = '<div><!--template05--><!--templateID--><div style="position: relative; margin: 0 auto; background-color: #fff; color: #29235C; text-align: center; font-size: 14px;">';
          // set subject
          body += '<h3 style="text-align: left; font-weight: normal; text-transform: uppercase; margin: 0; padding: 15px 10px; border-bottom: 1px solid #a3a3a3;">' + subject + "</h3>";
          // set image 1
          body += '<div style="height: auto; position: relative; background-color: #c5c5c5; padding: 10px 5px;"><ul style="padding: 0px 0px 10px;"><li style="width: 48%; display: inline-block; vertical-align: top; zoom: 1;"><!--startImgBanner01--><img style="width: 100%; vertical-align: middle; display: block; padding: 0; margin: 0; border: 0;" src="' + imgBannerOne + '"><!--endImgBanner01--></li>';
          // set image 2
          body += '<li style="width: 48%; display: inline-block; vertical-align: top; zoom: 1;"><!--startImgBanner02--><img style="width: 100%; vertical-align: middle; display: block; padding: 0; margin: 0; border: 0;" src="' + imgBannerTwo + '"><!--endImgBanner02--></li></ul>';
          // set head line 1
          body += '<h4 style="width: 90%; padding: 5px 10px; text-align: left; font-weight: bold; text-transform: capitalize; background-color: rgba(31, 152, 141, 0.5); margin: 10px auto;"><!--startHeaderLine01-->' + headlineOne + "<!--endHeaderLine01--></h4></div>";
          // set body 1
          body += '<div style="text-align: center; border-top: 1px solid #a3a3a3; width: 100%; min-height: 60px; display: table;"><div style="display: table-cell; vertical-align: middle;"><p style="margin: 0;"><!--startBodyText01-->' + bodyTextOne + "<!--endBodyText01--></p></div></div>";
          // set head line 2
          body += '<div style="height: auto; position: relative; background-color: #c5c5c5; padding: 10px 5px;"><h4 style="width: 90%; padding: 5px 10px; text-align: left; font-weight: bold; text-transform: capitalize; background-color: rgba(31, 152, 141, 0.5); margin: 10px auto;"><!--startHeaderLine02-->' + headlineTwo + "<!--endHeaderLine02--></h4></div>";
          // set body 2
          body += '<div style="text-align: center; border-top: 1px solid #a3a3a3; width: 100%; min-height: 60px; display: table;"><div style="display: table-cell; vertical-align: middle;"><p style="margin: 0;"><!--startBodyText02-->' + bodyTextTwo + "<!--endBodyText02--></p></div></div>";
          //set link url 1
          body += '<div style="text-align: center; padding: 20px 0px 10px; border-top: 1px solid #a3a3a3;"><!--startUrlLink01--><a href="' + urlLinkOneTmp + '" target="_blank" style="width: 92px; font-family: Arial; color: #29235C; border: 1px solid #29235C; text-decoration: none; text-align: center; text-transform: capitalize; display: inline-block; vertical-align: top; zoom: 1; border-radius: 12px; font-size: 14px; margin: 0px 10px; padding: 7px 0;"><!--endUrlLink01-->';
          // set label url 1
          body += "<!--startNameBtn01-->" + nameBtnOne + "<!--endNameBtn01--></a>";
          //set link url 2
          body += '<!--startUrlLink02--><a href="' + urlLinkTwoTmp + '" target="_blank" style="width: 92px; font-family: Arial; color: #29235C; border: 1px solid #29235C; text-decoration: none; text-align: center; text-transform: capitalize; display: inline-block; vertical-align: top; zoom: 1; border-radius: 12px; font-size: 14px; margin: 0px 10px; padding: 7px 0;"><!--endUrlLink02-->';
          // set label url 2
          body += "<!--startNameBtn02-->" + nameBtnTwo + "<!--endNameBtn02--></a></div></div></div>";
          break;
        case "template06":
          body = '<div><!--template06--><!--templateID--><div>';
          // set image 1
          body += '<div style="width: 100%;overflow: hidden;position: relative;margin: 0;padding: 0;"><!--startImgBanner01--><img style="width: 100%; display: block; padding: 0; margin: 0; border: 0;" src="' + imgBannerOne + '"><!--endImgBanner01--></div>';
          // set head line 1
          body += '<h2 style="font-size: 18px;border-radius: 5px 5px 0 0;text-align: center;padding: 5px;margin-bottom: 2px;background-color: #1f998e;color: #ffffff;margin: 15px 10px 2px;"> <!--startHeaderLine01-->'+headlineOne+'<!--endHeaderLine01--> </h2>';
          // set body 1
          body += '<div style="padding: 0 10px;font-size: 13px;text-align: left;">             <p style="margin: 0 0 10px;border-radius: 0 0 5px 5px;font-size: 12px;padding: 15px 10px;text-align: left;background-color: #1f998e;color: #ffffff;"><!--startBodyText01-->' + bodyTextOne +'<!--endBodyText01--></p>';
          //set link url 1
          body += '<div style="margin: 15px 0px;"><!--startUrlLink01--><a style="font-family: Arial;text-decoration: none;text-transform: capitalize;zoom: 1;border-radius: 5px;display: block;padding: 7px 10px;font-size: 12px;position: relative;background-color: #1f998e;color: #ffffff;" href="' + urlLinkOneTmp + '" target="_blank" role="button"><!--endUrlLink01-->';
          // set label url 1
          body += '<!--startNameBtn01-->'+ nameBtnOne +'<!--endNameBtn01--><span style="position: absolute;right: 0px; top: 50%; transform: translateY(-50%); height: 20px; width: 20px; "><span style=" display: inline-block; background-color: transparent; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 10px solid #ffffff; position: relative; "></span> <span style="display: inline-block;background-color: transparent;border-top: 10px solid transparent;border-bottom: 10px solid transparent;border-left: 10px solid #1f998e; position: absolute;right: 12px;"></span> </span> </a></div></div></div></div>';
          break;
        case "template07":
          body = '<div><!--template07--><!--templateID--><div>';
          // set head line 1
          body += '<h2 style="font-size: 18px;text-align: center;padding: 5px;background-color: #1f998e;color: #ffffff;margin: 0;"><!--startHeaderLine01-->' + headlineOne + '<!--endHeaderLine01--></h2>';
          // set body line 1
          body += '<p style="margin: 0;border-radius: 0 0 5px 5px;font-size: 12px;padding: 15px 10px;text-align: left;background-color: #ffffff;color: #1f998e;"><!--startBodyText01-->'+bodyTextOne+'<!--endBodyText01--></p>';
          // set image 1
          body += '<div style="width: 100%;overflow: hidden;position: relative;margin: 0;padding: 0;"><!--startImgBanner01--><img style="width: 100%; display: block; padding: 0; margin: 0; border: 0;" src="'+imgBannerOne+'"><!--endImgBanner01--></div>';

          //set link url 1
          body += '<div style="padding: 0 10px;font-size: 13px;text-align: left;"><div style="margin: 15px 0px;"><!--startUrlLink01--><a style="font-family: Arial;text-decoration: none;text-transform: capitalize;zoom: 1;border-radius: 5px;display: block;padding: 7px 10px;font-size: 12px;position: relative;background-color: #ffffff;color: #1f998e;border: solid 1px #1f998e;" href="' + urlLinkOneTmp + '" target="_blank" role="button"><!--endUrlLink01-->';
          // set label url 1
          body += '<!--startNameBtn01-->'+ nameBtnOne +'<!--endNameBtn01--><span style="position: absolute;right: 0px; top: 50%; transform: translateY(-50%); height: 20px; width: 20px; "><span style="display: inline-block;background-color: transparent;border-top: 10px solid transparent;border-bottom: 10px solid transparent;border-left: 10px solid #1f998e;position: relative;"></span><span style="display: inline-block;background-color: transparent;border-top: 10px solid transparent;border-bottom: 10px solid transparent;border-left: 10px solid #ffffff;position: absolute;right: 12px;"></span></span></a></div></div></div></div>';
          break;
        case "template08":
          // set template
          body = '<div><!--template08--><!--templateID--><div>';
          // set subject
          body += '<h2 style="font-size: 20px;text-align: center;padding: 5px;background-color: #1f998e;color: #ffffff;margin: 0;">'+subject+'</h2>';
          // set image 1
          body += '<div style="padding: 10px;font-size: 13px;text-align: left;padding-bottom: 0;"><div style="width: 100%;overflow: hidden;position: relative;margin: 0;padding: 0;"><!--startImgBanner01--><img style="width: 100%; display: block; padding: 0; margin: 0; border: 0;" src="'+imgBannerOne+'">  <!--endImgBanner01--></div>';
          // set head line 1
          body += '<h4 style="font-size: 18px;padding-top: 15px;color: #1f998e;margin: 0;"><!--startHeaderLine01-->'+headlineOne+'<!--endHeaderLine01--></h4>';
          // set body 1
          body += '<p style="margin: 0;font-size: 13px;padding: 10px 0;background-color: #ffffff;color: #1f998e;"><!--startBodyText01-->'+bodyTextOne+'<!--endBodyText01--> </p>';
          //set link url 1
          body += '<div style="text-align: left;margin: 0;"> <!--startUrlLink01--><a style="font-family: Arial;text-decoration: none;text-transform: capitalize;zoom: 1;border-radius: 5px;display: block;padding: 7px 10px;font-size: 12px;position: relative;background-color: #ffffff;color: #1f998e;border: solid 1px #1f998e;" href="'+urlLinkOneTmp+'" target="_blank" role="button"><!--endUrlLink01--><!--startNameBtn01-->'+nameBtnOne+'<!--endNameBtn01--><span style="position: absolute;right: 0px;top: 50%;transform: translateY(-50%);height: 20px;width: 20px;"><span style="display: inline-block;background-color: transparent;border-top: 10px solid transparent;border-bottom: 10px solid transparent;border-left: 10px solid #1f998e;position: relative;"></span> <span style="display: inline-block;background-color: transparent;border-top: 10px solid transparent;border-bottom: 10px solid transparent;border-left: 10px solid #ffffff;position: absolute;right: 12px;"></span> </span> </a> </div> </div>';
          // set image 2
          body += '<div style="padding: 10px;font-size: 13px;text-align: left;padding-bottom: 0;"><div style="width: 100%;overflow: hidden;position: relative;margin: 0;padding: 0;"><!--startImgBanner02--><img style="width: 100%; display: block; padding: 0; margin: 0; border: 0;" src="'+imgBannerTwo+'">  <!--endImgBanner02--></div>';
          // set head line 2
          body += '<h4 style="font-size: 18px;padding-top: 15px;color: #1f998e;margin: 0;"><!--startHeaderLine02-->'+headlineTwo+'<!--endHeaderLine02--></h4>';
          // set body 2
          body += '<p style="margin: 0;font-size: 13px;padding: 10px 0;background-color: #ffffff;color: #1f998e;"><!--startBodyText02-->'+bodyTextTwo+'<!--endBodyText02--> </p>';
          //set link url 2
          body += '<div style="text-align: left;margin: 0;"> <!--startUrlLink02--><a style="font-family: Arial;text-decoration: none;text-transform: capitalize;zoom: 1;border-radius: 5px;display: block;padding: 7px 10px;font-size: 12px;position: relative;background-color: #ffffff;color: #1f998e;border: solid 1px #1f998e;" href="'+urlLinkTwoTmp+'" target="_blank" role="button"><!--endUrlLink02--><!--startNameBtn02-->'+nameBtnTwo+'<!--endNameBtn02--><span style="position: absolute;right: 0px;top: 50%;transform: translateY(-50%);height: 20px;width: 20px;"><span style="display: inline-block;background-color: transparent;border-top: 10px solid transparent;border-bottom: 10px solid transparent;border-left: 10px solid #1f998e;position: relative;"></span> <span style="display: inline-block;background-color: transparent;border-top: 10px solid transparent;border-bottom: 10px solid transparent;border-left: 10px solid #ffffff;position: absolute;right: 12px;"></span> </span> </a> </div> </div>';
          body += '</div></div>';
          break;
        case "template10":
          // set template
          body = '<div><!--template10--><!--templateID--><div>';
          body += '<div style="max-width: 600px; margin: 0 auto;font-family: arial;">';
          body += '    <h3 style="margin: 0; color: #0073aa; font-size: 18px; display: block; text-align: center; margin-top: 10px; font-weight: bold;">'+subject+'</h3>';
          body += '    <p style="margin: 0; color: #0073aa; font-size: 14px; opacity: 0.7; display: block; text-align: center; margin-bottom: 5px;"><!--startsubjectNote-->'+subjectNote+'<!--endsubjectNote--></p>';
          body += '    <div style="box-sizing: border-box;clear: both; display: table; width: 100%; padding: 5px 10px;">';
          body += '        <div style="display: table-cell; vertical-align: middle; width: 40%; padding-right: 20px;">';
          body += '            <div>';
          body += '               <!--startImgBanner01--><p style="min-height: 0;width: 100%;padding-top: 100%;border-radius: 50%;border: 4px solid #99ccff;position: relative;overflow: hidden;box-shadow: 0px 0px 5px #999;background-size: cover;background-position: center;background-repeat: no-repeat;background-image: url(' + imgBannerOne + ');"></p><!--endImgBanner01-->';
          body += '            </div>';
          body += '        </div>';
          body += '        <div style="padding-right: 0;display: table-cell; vertical-align: middle; width: 60%; text-align: left;">';
          body += '            <!--startUrlLink01--><a style="word-break: break-word;font-weight: bold; font-size: 13px; color: #666666;text-decoration: none; font-weight: bold; font-size: 12px; color: #666666;" href="' + urlLinkOneTmp + '"><!--endUrlLink01--><!--startHeaderLine01-->'+headlineOne+'<!--endHeaderLine01--></a>';
          body += '            <p style="word-break: break-word;color: #666; font-size: 13px;margin: 0;"><!--startBodyText01-->'+bodyTextOne+'<!--endBodyText01--></p>';
          body += '        </div>';
          body += '    </div>';
          // end item 1
          body += '    <div style="box-sizing: border-box;clear: both; display: table; width: 100%; padding: 5px 10px;">';
          body += '        <div style="display: table-cell; vertical-align: middle; width: 40%; padding-right: 20px;">';
          body += '            <div>';
          body += '               <!--startImgBanner02--><p style="min-height: 0;width: 100%;padding-top: 100%;border-radius: 50%;border: 4px solid #99ccff;position: relative;overflow: hidden;box-shadow: 0px 0px 5px #999;background-size: cover;background-position: center;background-repeat: no-repeat;background-image: url(' + imgBannerTwo + ');"></p><!--endImgBanner02-->';
          body += '            </div>';
          body += '        </div>';
          body += '        <div style="padding-right: 0;display: table-cell; vertical-align: middle; width: 60%; text-align: left;">';
          body += '            <!--startUrlLink02--><a style="word-break: break-word;font-weight: bold; font-size: 13px; color: #666666;text-decoration: none; font-weight: bold; font-size: 12px; color: #666666;" href="' + urlLinkTwoTmp + '"><!--endUrlLink02--><!--startHeaderLine02-->'+headlineTwo+'<!--endHeaderLine02--></a>';
          body += '            <p style="word-break: break-word;color: #666; font-size: 13px;margin: 0;"><!--startBodyText02-->'+bodyTextTwo+'<!--endBodyText02--></p>';
          body += '        </div>';
          body += '    </div>';
          // end item 2
          body += '    <div style="box-sizing: border-box;clear: both; display: table; width: 100%; padding: 5px 10px;">';
          body += '        <div style="display: table-cell; vertical-align: middle; width: 40%; padding-right: 20px;">';
          body += '            <div>';
          body += '               <!--startImgBanner03--><p style="min-height: 0;width: 100%;padding-top: 100%;border-radius: 50%;border: 4px solid #99ccff;position: relative;overflow: hidden;box-shadow: 0px 0px 5px #999;background-size: cover;background-position: center;background-repeat: no-repeat;background-image: url(' + imgBannerThree+ ');"></p><!--endImgBanner03-->';
          body += '            </div>';
          body += '        </div>';
          body += '        <div style="padding-right: 0;display: table-cell; vertical-align: middle; width: 60%; text-align: left;">';
          body += '            <!--startUrlLink03--><a style="word-break: break-word;font-weight: bold; font-size: 13px; color: #666666;text-decoration: none; font-weight: bold; font-size: 12px; color: #666666;" href="' + urlLinkThreeTmp + '"><!--endUrlLink03--><!--startHeaderLine03-->'+headlineThree+'<!--endHeaderLine03--></a>';
          body += '            <p style="word-break: break-word;color: #666; font-size: 13px;margin: 0;"><!--startBodyText03-->'+bodyTextThree+'<!--endBodyText03--></p>';
          body += '        </div>';
          body += '    </div>';
          // end item 3
          body += '    <div style="box-sizing: border-box;clear: both; display: table; width: 100%; padding: 5px 10px;">';
          body += '        <div style="display: table-cell; vertical-align: middle; width: 40%; padding-right: 20px;">';
          body += '            <div>';
          body += '               <!--startImgBanner04--><p style="min-height: 0;width: 100%;padding-top: 100%;border-radius: 50%;border: 4px solid #99ccff;position: relative;overflow: hidden;box-shadow: 0px 0px 5px #999;background-size: cover;background-position: center;background-repeat: no-repeat;background-image: url(' + imgBannerFour + ');"></p><!--endImgBanner04-->';
          body += '            </div>';
          body += '        </div>';
          body += '        <div style="padding-right: 0;display: table-cell; vertical-align: middle; width: 60%; text-align: left;">';
          body += '            <!--startUrlLink04--><a style="word-break: break-word;font-weight: bold; font-size: 13px; color: #666666;text-decoration: none; font-weight: bold; font-size: 12px; color: #666666;" href="' + urlLinkFourTmp + '"><!--endUrlLink04--><!--startHeaderLine04-->'+headlineFour+'<!--endHeaderLine04--></a>';
          body += '            <p style="word-break: break-word;color: #666; font-size: 13px;margin: 0;"><!--startBodyText04-->'+bodyTextFour+'<!--endBodyText04--></p>';
          body += '        </div>';
          body += '    </div>';
          // end item 4
          body += '</div>';
          body += '</div></div>';
          break;
        case "template09":
          body = '<div><!--template09--><!--templateID--><div><div>';
          // set image 1
          body += '<div style=" padding: 10px; width: 200px; height: 200px; background-color: #f8ab91; border-radius: 50%; box-shadow: 0px 0px 5px #999; margin: 20px auto 15px; box-sizing: border-box;"><!--startImgBanner01--><p src="' + imgBannerOne + '" style="background-image:url('+ imgBannerOne +'); width: 180px; height: 180px; border-radius: 50%; margin: 0 auto; position: relative; overflow: hidden; background-size: cover; background-position: center; background-repeat: no-repeat;"></p><!--endImgBanner01--></div></div>';
          // set subject
          body += '<h2 style="color: #fb6509; text-align: center; text-transform: uppercase; font-size: 27px; margin: 0px;">'+subject+'</h2>';
          // set head line 1
          body += '<h2 style=" text-align: center; padding: 5px; margin-bottom: 2px; font-size: 16px; color: #fd8f43; margin: 0px;"><!--startHeaderLine01-->'+headlineOne+'<!--endHeaderLine01--></h2>';
          // set body 1
          body += '<div><p style="margin: 0;   font-size: 12px; padding: 15px 10px; text-align: left; color: #70716c;"><!--startBodyText01-->' + bodyTextOne +'<!--endBodyText01--></p>';
          //set link url 1
          body += '<div style="margin: 15px 0; text-align: center;"><!--startUrlLink01--><a style=" color: #fb6509; border: 2px solid #fb6509; display: inline-block; border-radius: 0; padding: 7px 10px; font-size: 12px; position: relative; min-width:85px; text-decoration: none;" href="' + urlLinkOneTmp + '" target="_blank" role="button"><!--endUrlLink01-->';
          // set label url 1
          body += '<!--startNameBtn01-->'+ nameBtnOne +'<!--endNameBtn01--></a></div></div></div></div>';
          break;
        case "template11":
          body = '<div style="margin: 8px;"><!--template11--><!--templateID--><div>';//<h2 style="color:#979797;text-align:center;text-transform:uppercase;font-size:27px;padding-top:10px;">'+subject+'</h2>';
          // set body 1
          body += '<div><p style="margin:0;font-size:12px;padding:15px10px;text-align:left;color:#70716c;"><!--startBodyText01-->' + bodyTextOne +'<!--endBodyText01--></p></div></div></div>';
          break;
        case "template12":
          body = '<div style="padding: 10px;"><!--template12--><!--templateID--><div>';

          // set image 1
          body += '<div style="text-align: center;"><!--startImgBanner01--><img style="max-width: 85%;margin-top: 5px;" src="' + imgBannerOne + '">  <!--endImgBanner01--></div>';
          // set body 1
          body += '<div><!--startBodyText01-->' + bodyTextOne + '<!--endBodyText01--></div>';
          // set image 1
          body += '<div><!--startImgBanner02--><img style="max-width: 100%; margin-top: 10px;" src="' + imgBannerTwo + '">  <!--endImgBanner02--></div>';
          // set body 1
          body += '<div><!--startBodyText02-->' + bodyTextTwo + '<!--endBodyText02--></div>';
          // set image 1
          body += '<div><!--startImgBanner03--><img style="max-width: 100%; margin-top: 10px;" src="' + imgBannerThree + '">  <!--endImgBanner03--></div>';

          body += '</div></div>';
          break;
      };
      return body;
    },
    onError: function(error) {
      console.log(error);
      var msg;
      if ( error.subject ) {
        msg = error.subject;
        $("#subjectTitle").css({"border-color": "red"}).addClass('errorMsg');
      } else {
        $("#subjectTitle").css({"border-color": "#29235c"});
      }
      if ( error.subjectNote ) {
        msg = error.subjectNote;
        $("#subjectNote").css({"border-color": "red"}).addClass('errorMsg');
      } else {
        $("#subjectNote").css({"border-color": "#29235c"});
      }
      if ( error.headlineOne ) {
        if ( !msg ) {
          msg = error.headlineOne;
        }
        $("#headlineOne").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#headlineOne").css({"border-color": "#29235c"});
      }
      if ( error.headlineTwo ) {
        if ( !msg ) {
          msg = error.headlineTwo;
        }
        $("#headlineTwo").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#headlineTwo").css({"border-color": "#29235c"});
      }
      if ( error.headlineThree ) {
        if ( !msg ) {
          msg = error.headlineThree;
        }
        $("#headlineThree").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#headlineThree").css({"border-color": "#29235c"});
      }
      if ( error.headlineFour ) {
        if ( !msg ) {
          msg = error.headlineFour;
        }
        $("#headlineFour").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#headlineFour").css({"border-color": "#29235c"});
      }
      if ( error.imgBannerOne ) {
        if ( !msg ) {
          msg = error.imgBannerOne;
        }
        $("#add-image-1 a").css({"border": "1px solid red"}).addClass('errorMsg');
      } else {
        $("#add-image-1 a").css({"border": 0});
      }
      if ( error.imgBannerTwo ) {
        if ( !msg ) {
          msg = error.imgBannerTwo;
        }
        $("#add-image-2 a").css({"border": "1px solid red"}).addClass('errorMsg');
      } else {
        $("#add-image-2 a").css({"border": 0});
      }
      if ( error.imgBannerThree ) {
        if ( !msg ) {
          msg = error.imgBannerThree;
        }
        $("#add-image-3 a").css({"border": "1px solid red"}).addClass('errorMsg');
      } else {
        $("#add-image-3 a").css({"border": 0});
      }
      if ( error.imgBannerFour ) {
        if ( !msg ) {
          msg = error.imgBannerFour;
        }
        $("#add-image-4 a").css({"border": "1px solid red"}).addClass('errorMsg');
      } else {
        $("#add-image-4 a").css({"border": 0});
      }
      if ( error.bodyTextOne ) {
        if ( !msg ) {
          msg = error.bodyTextOne;
        }
        $("#bodyTextOne").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#bodyTextOne").css({"border-color": "#29235c"}); 
      }
      if ( error.bodyTextTwo ) {
        if ( !msg ) {
          msg = error.bodyTextTwo;
        }        
        $("#bodyTextTwo").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#bodyTextTwo").css({"border-color": "#29235c"}); 
      }
      if ( error.bodyTextThree ) {
        if ( !msg ) {
          msg = error.bodyTextThree;
        }        
        $("#bodyTextThree").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#bodyTextThree").css({"border-color": "#29235c"}); 
      }
      if ( error.bodyTextFour ) {
        if ( !msg ) {
          msg = error.bodyTextFour;
        }        
        $("#bodyTextFour").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#bodyTextFour").css({"border-color": "#29235c"}); 
      }
      if ( error.nameBtnOne ) {
        if ( !msg ) {
          msg = error.nameBtnOne;
        }
        $("#nameBtnOne").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#nameBtnOne").css({"border-color": "#29235c"}); 
      }
      if ( error.urlLink0ne ) {
        if ( !msg ) {
          msg = error.urlLink0ne;
        }
        $("#urlLink0ne").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#urlLink0ne").css({"border-color": "#29235c"}); 
      }
      if ( error.nameBtnTwo ) {
        if ( !msg ) {
          msg = error.nameBtnTwo;
        }
        $("#nameBtnTwo").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#nameBtnTwo").css({"border-color": "#29235c"}); 
      }
      if ( error.urlLinkTwo ) {
        if ( !msg ) {
          msg = error.urlLinkTwo;
        }
        $("#urlLinkTwo").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#urlLinkTwo").css({"border-color": "#29235c"}); 
      }
      if ( error.urlLinkThree ) {
        if ( !msg ) {
          msg = error.urlLinkThree;
        }
        $("#urlLinkThree").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#urlLinkThree").css({"border-color": "#29235c"}); 
      }
      if ( error.urlLinkFour ) {
        if ( !msg ) {
          msg = error.urlLinkFour;
        }
        $("#urlLinkFour").css({"border-color": "red"}).addClass('errorMsg'); 
      } else {
        $("#urlLinkFour").css({"border-color": "#29235c"}); 
      }
      App.dialogueCommon.setType("inputError");
      App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.inputTitleError, msg);
      var $container = $("#mainMessageContents");
      var $scrollTo = $('.errorMsg:eq(0)');
      $container.animate({scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop(), scrollLeft: 0},500);
    },
    resetBorder: function() {
      $("#subjectTitle, #subjectNote").css({"border-color": "#29235c"});
      $("#headlineOne, #headlineTwo, #headlineThree, #headlineFour").css({"border-color": "#29235c"});
      $("#add-image-1 a, #add-image-2 a, #add-image-3 a, #add-image-4 a").css({"border": 0});
      $("#bodyTextOne, #bodyTextTwo, #bodyTextThree, #bodyTextFour ").css({"border-color": "#29235c"});
      $("#nameBtnOne, #nameBtnTwo").css({"border-color": "#29235c"});
      $("#urlLink0ne, #urlLinkTwo, #urlLinkThree, #urlLinkFour").css({"border-color": "#29235c"});
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
    searchImageListBtn: function(e) {
      e.preventDefault();
      this.searchImageList();
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
      // this.imageListCollection.setPage(1);
      // if ( type ) {
      //   var page = $('#pageImageList').find(":selected").data("id");
      //   this.imageListCollection.setPage(page);
      // } else {
      //   this.imageListCollection.setPage(1);
      // }
      this.imageListCollection.setKeyword(keywordSearch);
      this.fetchImage({remove: true});
    },
    fetchImage: function(options) {
      this.imageListCollection.fetchImageList({
        on403: function(){
          App.util.text.setTitleImageError();
        },
        remove: options.remove
      });
    },
    hidePopupImage: function(){
      $(".form-control, .form-control1, .form-control2").blur();
      $('#upload-region .greybg,#upload-region .dialog_image_upload').hide();
      $("#upload-region .show_img_upload .row_img").css({"border-color": "#fff"});
      $("#upload-region .show_img_upload .row_img p").css({"color": "#29235C"});
      $(".msg_upload").text("");
      $(".msg_upload").hide();
      if ( this.arrField.attributes["imgBannerOne"] ) {
        $("#add-image-1 a").css({"border": 0});
      }
      if ( this.arrField.attributes["imgBannerTwo"] ) {
        $("#add-image-2 a").css({"border": 0});
      }
      // var totalCount = this.imageListCollection.models[0].attributes.totalCount;
      var totalCount = this.imageListCollection.getTotalCount();
      if ( totalCount === 0 ) {
        $("#select-image-wrapper").hide();
      }
    },
    next: function(e) {
      e.preventDefault();
      if ( this.type === "view" ) {
        var previewHtml = $("#preview-template #my-template").html();
        var bodyContent = this.setBodyContent();
        this.setSettingInfo();
        this.dataModel.setPreViewSetting(previewHtml);
        this.dataModel.setDataTemp( this.arrField );
        this.dataModel.setBody(bodyContent);
        location.hash = "messageSetting/" + this.type + "?id=" + this.id;
      } else {
        if ( this.checkInput() === true ) {
          var previewHtml = $("#preview-template #my-template").html();
          var bodyContent = this.setBodyContent();
          if ( this.type === "edit" || this.type === "duplicate" ) {
            this.setSettingInfo();
          }
          this.dataModel.setPreViewSetting(previewHtml);
          this.dataModel.setDataTemp( this.arrField );
          this.dataModel.setBody(bodyContent);
          if(this.templateID == 'template11'){
            this.dataModel.set('bodyTextOne', tinyMCE.get('bodyTextOne').getContent());
            this.dataModel.save();
          }
          if (this.templateID == 'template12') {
            this.dataModel.set('bodyTextOne', tinyMCE.get('bodyTextOne').getContent());
            this.dataModel.set('bodyTextTwo', tinyMCE.get('bodyTextTwo').getContent());
            this.dataModel.save();
          }
          location.hash = "messageSetting/" + this.type + "?id=" + this.id;
        }
      }
    },
    setSettingInfo: function() {
      var startTime;
      var startTimeTmp;
      var conditionId;
      var conditionValue;
      var preview = this.dataModel.getPreViewSetting();
      // var date;
      // var time;
      if ( preview ) {
        var settingInfor = this.dataModel.getSettingInfo();
        startTimeTmp = settingInfor.startTime;
        // date = settingInfor.date;
        // time = settingInfor.time;
        conditionId = settingInfor.conditionId;
        conditionValue = settingInfor.conditionValue
      } else {
        startTime = this.detailMessageModel.get("startTime");
        startTime = moment(startTime, "YYYYMMDDHHmm");
        startTimeTmp = moment(startTime).format("YYYY/MM/DD HH:mm");
        // date = moment(startTime).format("DD/MM/YYYY");
        // time = moment(startTime).format("HH:mm");
        conditionId = this.detailMessageModel.get("conditionId");
        conditionValue = this.detailMessageModel.get("conditionName");
        // conditionValue = this.detailMessageModel.get("common_condition");
      }
      var settingInfo = {
        "startTime": startTimeTmp,
        // "date": date,
        // "time": time,
        "conditionId": conditionId,
        "conditionValue": conditionValue
      };
      this.dataModel.setSettingInfo(settingInfo);
    },
    checkInput: function() {
      var subject = $("#subjectTitle").val();
      var subjectNote = $("#subjectNote").val();
      var headlineOne = $("#headlineOne").val();
      var headlineTwo = $("#headlineTwo").val();
      var headlineThree = $("#headlineThree").val();
      var headlineFour = $("#headlineFour").val();
      var imgBannerOne = $("#imgBannerOne").attr("src");
      var imgBannerTwo = $("#imgBannerTwo").attr("src");
      var imgBannerThree = $("#imgBannerThree").attr("src");
      var imgBannerFour = $("#imgBannerFour").attr("src");
      var bodyTextOne = $("#bodyTextOne").val();
      var bodyTextTwo = $("#bodyTextTwo").val();
      var bodyTextThree = $("#bodyTextThree").val();
      var bodyTextFour = $("#bodyTextFour").val();
      var nameBtnOne = $("#nameBtnOne").val();
      var nameBtnTwo = $("#nameBtnTwo").val();
      var urlLinkOne = $("#urlLink0ne").val();
      var urlLinkTwo = $("#urlLinkTwo").val();
      var urlLinkThree = $("#urlLinkThree").val();
      var urlLinkFour = $("#urlLinkFour").val();
      var url1Index = $('#select_path_url1').find(":selected").data("id");
      var url2Index = $('#select_path_url2').find(":selected").data("id");
      var url3Index = $('#select_path_url3').find(":selected").data("id");
      var url4Index = $('#select_path_url4').find(":selected").data("id");
      var url1 = $('#select_path_url1').find(":selected").val();
      var url2 = $('#select_path_url2').find(":selected").val();
      var url3 = $('#select_path_url3').find(":selected").val();
      var url4 = $('#select_path_url4').find(":selected").val();
      var urlLinkOneTmp;
      var urlLinkTwoTmp;
      var urlLinkThreeTmp;
      var urlLinkFourTmp;
      if ( urlLinkOne !== "" && urlLinkOne ) {
        urlLinkOneTmp = this.setUrl(urlLinkOne, url1, url1Index); 
      }
      if ( urlLinkTwo !== "" && urlLinkTwo ) {
        urlLinkTwoTmp = this.setUrl(urlLinkTwo, url2, url2Index);
      }
      if ( urlLinkThree !== "" && urlLinkThree ) {
        urlLinkThreeTmp = this.setUrl(urlLinkThree, url3, url3Index);
      }
      if ( urlLinkFour !== "" && urlLinkFour ) {
        urlLinkFourTmp = this.setUrl(urlLinkFour, url4, url4Index);
      }
      var checkInput = true;
      switch( this.templateID ) {
        case "template01":
          this.validationModel.set({subject: subject, headlineOne: headlineOne, imgBannerOne: imgBannerOne, bodyTextOne: bodyTextOne, nameBtnOne: nameBtnOne, urlLink0ne: urlLinkOneTmp, nameBtnTwo: nameBtnTwo, urlLinkTwo: urlLinkTwoTmp},{validate:true});
          if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
            this.resetBorder();
          } else {
            this.onError( this.validationModel.validationError );
            checkInput = false;
          }
          break;
        case "template02":
          this.validationModel.set({subject: subject, headlineOne: headlineOne, bodyTextOne: bodyTextOne, nameBtnOne: nameBtnOne, urlLink0ne: urlLinkOneTmp},{validate:true});
          if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
            this.resetBorder();
          } else {
            this.onError( this.validationModel.validationError );
            checkInput = false;
          }
          break;
        case "template03":
          this.validationModel.set({subject: subject, imgBannerOne: imgBannerOne, headlineOne: headlineOne, bodyTextOne: bodyTextOne, nameBtnOne: nameBtnOne, urlLink0ne: urlLinkOneTmp, nameBtnTwo: nameBtnTwo, urlLinkTwo: urlLinkTwoTmp},{validate:true});
          if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
            this.resetBorder();
          } else {
            this.onError( this.validationModel.validationError );
            checkInput = false;
          }
          break;
        case "template04":
          this.validationModel.set({subject: subject, imgBannerOne: imgBannerOne, imgBannerTwo: imgBannerTwo, headlineOne: headlineOne, bodyTextOne: bodyTextOne, nameBtnOne: nameBtnOne, urlLink0ne: urlLinkOneTmp},{validate:true});
          if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
            this.resetBorder();
          } else {
            this.onError( this.validationModel.validationError );
            checkInput = false;
          }
          break;
        case "template05":
          this.validationModel.set({subject: subject, imgBannerOne: imgBannerOne, imgBannerTwo: imgBannerTwo, headlineOne: headlineOne, bodyTextOne: bodyTextOne, headlineTwo: headlineTwo, bodyTextTwo: bodyTextTwo, nameBtnOne: nameBtnOne, urlLink0ne: urlLinkOneTmp, nameBtnTwo: nameBtnTwo, urlLinkTwo: urlLinkTwoTmp},{validate:true});
          if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
            this.resetBorder();
          } else {
            this.onError( this.validationModel.validationError );
            checkInput = false;
          }
          break;
        case "template06":
          this.validationModel.set({subject: subject, headlineOne: headlineOne, imgBannerOne: imgBannerOne, bodyTextOne: bodyTextOne, nameBtnOne: nameBtnOne, urlLink0ne: urlLinkOneTmp},{validate:true});
          if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
            this.resetBorder();
          } else {
            this.onError( this.validationModel.validationError );
            checkInput = false;
          }
          break;
        case "template07":
          this.validationModel.set({subject: subject, headlineOne: headlineOne, imgBannerOne: imgBannerOne, bodyTextOne: bodyTextOne, nameBtnOne: nameBtnOne, urlLink0ne: urlLinkOneTmp},{validate:true});
          if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
            this.resetBorder();
          } else {
            this.onError( this.validationModel.validationError );
            checkInput = false;
          }
          break;
        case "template08":
          this.validationModel.set({subject: subject, imgBannerOne: imgBannerOne, imgBannerTwo: imgBannerTwo, headlineOne: headlineOne, bodyTextOne: bodyTextOne, headlineTwo: headlineTwo, bodyTextTwo: bodyTextTwo, nameBtnOne: nameBtnOne, urlLink0ne: urlLinkOneTmp, nameBtnTwo: nameBtnTwo, urlLinkTwo: urlLinkTwoTmp},{validate:true});
          if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
            this.resetBorder();
          } else {
            this.onError( this.validationModel.validationError );
            checkInput = false;
          }
          break;
        case "template10":
          this.validationModel.set({subject: subject, subjectNote: subjectNote, imgBannerOne: imgBannerOne, imgBannerTwo: imgBannerTwo, imgBannerThree: imgBannerThree, imgBannerFour: imgBannerFour, headlineOne: headlineOne, bodyTextOne: bodyTextOne, headlineTwo: headlineTwo, bodyTextTwo: bodyTextTwo, headlineThree: headlineThree, bodyTextThree: bodyTextThree, headlineFour: headlineFour, bodyTextFour: bodyTextFour, urlLink0ne: urlLinkOneTmp, urlLinkTwo: urlLinkTwoTmp, urlLinkThree: urlLinkThreeTmp, urlLinkFour: urlLinkFourTmp},{validate:true});
          if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
            this.resetBorder();
          } else {
            this.onError( this.validationModel.validationError );
            checkInput = false;
          }
          break;
        case "template09":
          this.validationModel.set({subject: subject, headlineOne: headlineOne, imgBannerOne: imgBannerOne, bodyTextOne: bodyTextOne, nameBtnOne: nameBtnOne, urlLink0ne: urlLinkOneTmp},{validate:true});
          if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
            this.resetBorder();
          } else {
            this.onError( this.validationModel.validationError );
            checkInput = false;
          }
          break;
        case "template11":
          this.validationModel.set({subject: subject, bodyTextOne: bodyTextOne},{validate:true});
          if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
            this.resetBorder();
            this.$('.mce-tinymce').css({'border-color': '#cacaca'});
          } else {
            this.onError( this.validationModel.validationError );
            checkInput = false;
            if(!bodyTextOne){
              this.$('.mce-tinymce').css({'border-color': 'red'});
            }
          }
          break;
        case "template12":
          this.validationModel.set({
            subject: subject,
            bodyTextOne: bodyTextOne,
            bodyTextTwo: bodyTextTwo,
            imgBannerOne: imgBannerOne,
            imgBannerTwo: imgBannerTwo,
            imgBannerThree: imgBannerThree
          }, {
            validate: true
          });
          if (this.validationModel.validationError === null || this.validationModel.validationError === "") {
            this.resetBorder();
            this.$('.mce-tinymce').css({
              'border-color': '#cacaca'
            });
          } else {
            this.onError(this.validationModel.validationError);
            checkInput = false;
            if (!bodyTextOne) {
              this.$('#bodyTextOne').siblings('.mce-tinymce').css({
                'border-color': 'red'
              });
            }
            if (!bodyTextTwo) {
              this.$('#bodyTextTwo').siblings('.mce-tinymce').css({
                'border-color': 'red'
              });
            }
          }
          break;
      };
      return checkInput;
    },
    setUrl: function(urlLink, url, urlIndex) {
      var urlLinkTmp;
      if ( urlLink.indexOf("://") === 4 || urlLink.indexOf("://") === 5 ) {
        urlLinkTmp = urlLink;
      } else {
        switch ( urlIndex ) {
          case 0:
          case 1:
            urlLinkTmp = url;
            urlLinkTmp += urlLink;
            break;
          case 2:
            urlLinkTmp = "http://";
            if ( urlLink.indexOf("www.") > 0 ) {
              urlLinkTmp += urlLink;
            } else {
              if ( urlLink.indexOf(".") === 0 ) {
                urlLinkTmp += url;
                urlLinkTmp += urlLink;
              } else {
                urlLinkTmp += url;
                urlLinkTmp += ".";
                urlLinkTmp += urlLink;
              }
            }
            break;
        };
      }
      return urlLinkTmp;
    },
    cancel: function(e) {
      e.preventDefault();
      if ( this.type === "view" ) {
        App.pageSlider.main("workflow-mail");
        // location.hash = "workflow-mail";

      // } else if ( this.type === "edit" || this.type === "duplicate" ) {

      } else {
        App.dialogueCommon.setType("backMain1");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backHomeTitle, App.appModel.getLanguageType().common.dialogue.backHomeMsg);
        // this.dataModel.setContentsNull();
        // this.dataModel.setTemplateId(this.contentModel.get("templateID"));
        // this.dataModel.setType(this.contentModel.get("type"));
        // location.hash = "selectTemplate";
      }
    },
    checkExtension: function(ex){
      return ["PNG","BMP","ICO"].some(function(item) {
        return (item.toLowerCase() === ex);
      }); // isValid is true
    },
    submitUploadImage: function(e) {
      e.preventDefault();
      var that = this;
      var _this = $(e.currentTarget);
      var categoryId = $('#categoryList2').find(":selected").data("id");
      var image = $("#upload_img")[0].files[0];
      if ( image ) {
        // Get extension
        var imageExtension = image.name.split('.').pop().toLowerCase();
        if ( imageExtension === "jpeg" || imageExtension === "jpg" || imageExtension === "gif" ||  that.checkExtension(imageExtension)) {
          var data = new FormData();
          if(that.checkExtension(imageExtension)){
            App.util.common.convertImage(image, function(newImage){
              var name = image.name.substr(0, image.name.length - imageExtension.length) + 'jpg';
              data.append("image", newImage, name);
              if ( categoryId ) {
                data.append("categoryId", categoryId);
              }
              data.append("maxSize", AppConf.uploadImage.maxSize);
              that.fetchToken({
                data: data,
                type: "upload",
                image: newImage.name
              });
            });
          } else {
            data.append("image", image);
            if (categoryId) {
              data.append("categoryId", categoryId);
            }
            data.append("maxSize", AppConf.uploadImage.maxSize);
            this.fetchToken({
              data: data,
              type: "upload",
              image: image.name
            });
          }
        } else {
          if ( App.appModel.getLanguage() === "en" ) {
            this.showMsgUpload("Because type of " + image.name + " is not jpg・jpeg・gif・png・bmp・ico、You can't upload");
          } else if ( App.appModel.getLanguage() === "ja" ) {
            this.showMsgUpload(image.name + "はファイルの種類がjpg・jpeg・gif・png・bmp・icoではない為、アップできません");
          }
        }
      } else {
        this.showMsgUpload(App.appModel.getLanguageType().common.dialogue.uploadImage.noSelectImageMsg);
      }
    },
    fetchToken: function(options) {
      var _this = this;
      var _options = options || {};
      var type = _options.type;
      App.util.showProgressScreen();
      App.dialogueCommon.setType("messageContentAction");
      this.tokenModel.fetchToken({})
      .done(function(data) {
        switch ( type ) {
          case "save":
            _this.saveMesage({name: _options.name, subject: _options.subject, body: _options.body, token: data.token});
            break;
          case "upload":
            _this.uploadImageApi({data: _options.data, token: data.token, image: _options.image});
            break;
          case "saveTemplate":
            _this.saveTemplateApi({name: _options.name, subject: _options.subject, body: _options.body, token: data.token});
            break;
        };
      })
      .fail(function(res) {
        switch ( type ) {
          case "save":
            App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.tokenTitleErr, App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
            break;
          case "upload":
            $(".msg_upload").text(App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
            $(".msg_upload").show();
            break;
          case "saveTemplate":
            $("#save-template-region .error-msg").text(App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
            break;
        };
        App.util.hideProgressScreen();
      });
    },
    saveMesage: function(options) {
      var _this = this;
      var _options = options || {};
      var id = "";
      var startTime = moment(new Date()).format("YYYYMMDDHHmm");
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
          startTime: startTime,
          subject: _options.subject,
          body: _options.body,
          isSend: 0,
          token: _options.token
      }).done(function(res) {
        App.dialogueCommon.setType( "saveMesageSuccess" );
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.messageContent.dialogueSuccess.saveMessageTitleSuccess, App.appModel.getLanguageType().mail.messageContent.dialogueSuccess.saveMessageMsgSuccess);
        _this.dataModel.setStatusAction("saveMessageSuccess");
        App.util.hideProgressScreen();
      }).fail(function(err) {
        App.dialogueCommon.setType( "saveMesageError" );
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.messageContent.dialogueError.saveMessageTitleErr, App.appModel.getLanguageType().mail.messageContent.dialogueError.saveMessageMsgErr);
        App.util.hideProgressScreen();
      });
    },
    uploadImageApi: function(options) {
      var _this = this;
      var _options = options || {};
      
      App.btApi.uploadImage({
          data: _options.data,
          token: _options.token
      }).done(function(res) {
        App.util.hideProgressScreen();
        if(_this.templateID == 'template11'){
          _this.hidePopupImage();
          $('body').trigger('upload-image-done', App.util.text.getFullImageUrl(res.url));
          return;
        }
        _this.changeImageSelected(App.util.text.getFullImageUrl(res.url));
        // _this.showMsgUpload(_options.image + App.appModel.getLanguageType().common.dialogue.uploadImage.uploadImageSuccess);
      }).fail(function(err) {
        _this.showMsgUpload(App.appModel.getLanguageType().common.dialogue.uploadImage.uploadImageErr);
        App.util.hideProgressScreen();
      });
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
      // var imageName = $("#upload-region .show_img_upload").find(".row_img.active p").text();
      if ( imageUrl ) {
        if(_this.templateID == 'template11'){
          _this.hidePopupImage();
          $('body').trigger('upload-image-done', imageUrl);
          return;
        }
        this.changeImageSelected(imageUrl);
      }
      // var imageId = this.contentModel.get("imageId");
      // if ( imageId === "coverImageUpload1" ) {
      //   $("#message-content-region #imgBannerOne").attr("src", imageUrl);
      //   $("#preview-template #imgBannerOne").attr("src", imageUrl);
      //   this.arrField.attributes["imgBannerOne"] = imageUrl;
      //   $("#message-content-region #image-holder-1").show();
      //   $("#add-image-1 a").css({"border": 0});
      // } else {
      //   $("#message-content-region #imgBannerTwo").attr("src", imageUrl);
      //   $("#preview-template #imgBannerTwo").attr("src", imageUrl);
      //   this.arrField.attributes["imgBannerTwo"] = imageUrl;
      //   $("#message-content-region #image-holder-2").show();
      //   $("#add-image-2 a").css({"border": 0});
      // }
      // this.hidePopupImage();
      // App.dialogueCommon.setType("selectedImage");
      // App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogue.uploadImage.selectedImageTitle, imageName + App.appModel.getLanguageType().common.dialogue.uploadImage.selectedImageMsg);
    },
    changeImageSelected: function(imageUrl) {
      var imageId = this.contentModel.get("imageId");
      $("#"+imageId).parent().hide();
      if ( imageId === "coverImageUpload1" ) {
        $("#message-content-region #imgBannerOne").attr("src", imageUrl);
        $("#preview-template #imgBannerOne").attr("src", imageUrl).css('background-image', 'url(' + imageUrl + ')');
        this.arrField.attributes["imgBannerOne"] = imageUrl;
        $("#message-content-region #image-holder-1").show();
        $("#add-image-1 a").css({"border": 0});
      } else if ( imageId === "coverImageUpload2" ) {
        $("#message-content-region #imgBannerTwo").attr("src", imageUrl);
        $("#preview-template #imgBannerTwo").attr("src", imageUrl).css('background-image', 'url(' + imageUrl + ')');
        this.arrField.attributes["imgBannerTwo"] = imageUrl;
        $("#message-content-region #image-holder-2").show();
        $("#add-image-2 a").css({"border": 0});
      }else if ( imageId === "coverImageUpload3" ) {
        $("#message-content-region #imgBannerThree").attr("src", imageUrl);
        $("#preview-template #imgBannerThree").attr("src", imageUrl).css('background-image', 'url(' + imageUrl + ')');
        this.arrField.attributes["imgBannerThree"] = imageUrl;
        $("#message-content-region #image-holder-3").show();
        $("#add-image-3 a").css({"border": 0});
      }else if ( imageId === "coverImageUpload4" ) {
        $("#message-content-region #imgBannerFour").attr("src", imageUrl);
        $("#preview-template #imgBannerFour").attr("src", imageUrl).css('background-image', 'url(' + imageUrl + ')');
        this.arrField.attributes["imgBannerFour"] = imageUrl;
        $("#message-content-region #image-holder-4").show();
        $("#add-image-4 a").css({"border": 0});
      }
      this.hidePopupImage();
    },
    showMsgUpload: function(msg) {
      $(".msg_upload").text(msg);
      $(".msg_upload").show();
    },
    backMain: function(e) {
      e.preventDefault();
      if ( this.type === "edit" || this.type === "duplicate" ) {
        // var preview = this.dataModel.getPreViewSetting();
        // if ( preview ) {
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
      this.dataModel.clear();
      App.pageSlider.main("workflow-mail");
      // location.hash = "workflow-mail";
    },
    backMainCommon1: function() {
      if ( this.type === "edit" || this.type === "duplicate" ) {
        App.pageSlider.main("workflow-mail");
        // location.hash = "workflow-mail";
      } else {
        this.dataModel.setContentsNull();
        this.dataModel.setTemplateId(this.contentModel.get("templateID"));
        this.dataModel.setType(this.contentModel.get("type"));
        // location.hash = "selectTemplate";
        App.pageSlider.back();
      }
    },
    showSaveTemplate: function(e) {
      var seft = $(e.currentTarget);
      if ( this.checkInput() === true ) {
        var campainName = this.dataModel.getCampainName();
        $("#save-template-region #templateName").val(campainName);
        $("#save-template-region .greybg, .dialog_template").show();
      } else {
        $("#message-content #check-save").prop('checked' , false);
      }
    },
    hidePopupTemplate: function(e) {
      $("#save-template-region .error-msg").text("");
      $("#save-template-region .input-template-save").show();
      $("#save-template-region .success-save-template").hide();
      $("#save-template-region .greybg, .dialog_template").hide();
      $("#message-content #check-save").prop('checked' , false);
      $("#templateName").css({"border-color": "#29235c"});
    },
    saveTemplate: function(e) {
      var _this = this;
      var templateName = $("#templateName").val();
      var subject = $("#subjectTitle").val();
      var bodyContent = this.setBodyContent();
      this.validationModel.set({templateName: templateName},{validate:true});
      if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
        $("#templateName").css({"border-color": "#29235c"});
        this.fetchToken({name: templateName, subject: subject, body: bodyContent, type: "saveTemplate"});
      } else {
        this.onErrorSaveTemplate( this.validationModel.validationError.templateName );
      }
    },
    saveTemplateApi: function(options) {
      var _this = this;
      var _options = options || {};
      
      App.btApi.saveTemplate({
          name: _options.name,
          htmlFlg: 2,
          mailType: 0,
          subject: _options.subject,
          body: _options.body,
          token: _options.token
      }).done(function(res) {
        $("#save-template-region .input-template-save").hide();
        $("#save-template-region .success-save-template").show();
        App.util.hideProgressScreen();
      }).fail(function(err) {
        if ( App.appModel.getLanguage() === "en" ) {
          $("#save-template-region .error-msg").text("Failed to save this " + _options.name);
        } else if ( App.appModel.getLanguage() === "ja" ) {
          $("#save-template-region .error-msg").text(_options.name + "のテンプレート保存に失敗しました");
        }
        App.util.hideProgressScreen();
      });
    },
    onErrorSaveTemplate: function(msg) {
      if ( msg ) {
        $("#templateName").css({"border-color": "red"});
        $("#save-template-region .error-msg").text(msg);
      }
    }
  });

  return MessageContentLayoutView;

})();