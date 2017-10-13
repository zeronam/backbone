var Backbone = require('backbone');

var SelectTemplateCollection = require('./selectTemplate_collection.js');

var LayoutTemplateCollectionView = require('./layout_template/layoutTemplate_collection_view.js');
var LayoutTemplateCollection = require('./layout_template/layoutTemplate_collection.js');

var ListNameMyTemplateCollectionView = require('./list_name_my_template/listNameMyTemplate_collection_view.js');

// Layout preview
var LayoutTemplate01previewItemView = require('../message_content/layout_template_01/layoutTemplate01_preview_item_view.js');
var LayoutTemplate02previewItemView = require('../message_content/layout_template_02/layoutTemplate02_preview_item_view.js');
var LayoutTemplate03previewItemView = require('../message_content/layout_template_03/layoutTemplate03_preview_item_view.js');
var LayoutTemplate04previewItemView = require('../message_content/layout_template_04/layoutTemplate04_preview_item_view.js');
var LayoutTemplate05previewItemView = require('../message_content/layout_template_05/layoutTemplate05_preview_item_view.js');
var LayoutTemplate06previewItemView = require('../message_content/layout_template_06/layoutTemplate06_preview_item_view.js');
var LayoutTemplate07previewItemView = require('../message_content/layout_template_07/layoutTemplate07_preview_item_view.js');
var LayoutTemplate08previewItemView = require('../message_content/layout_template_08/layoutTemplate08_preview_item_view.js');
var LayoutTemplate09previewItemView = require('../message_content/layout_template_09/layoutTemplate09_preview_item_view.js');
var LayoutTemplate10previewItemView = require('../message_content/layout_template_10/layoutTemplate10_preview_item_view.js');
var LayoutTemplate11previewItemView = require('../message_content/layout_template_11/layoutTemplate11_preview_item_view.js');
var LayoutTemplate12previewItemView = require('../message_content/layout_template_12/layoutTemplate12_preview_item_view.js');

var DataModel = require('../../../models/data_model.js');

var ValidationModel = require('../../../models/validation_model.js');

var ContentModel = require('../message_content/messageContent_model.js');

var FooterItemView = require('../../../common/footer_item_view.js');

var DialogueItemView = require('../../dialogue/dialogue_item_view.js');

var TokenModel = require('../../../models/token_model.js');

require('../../../../../../lib/components/bootstrap/bootstrap.min.js');

module.exports = (function() {
	var SelectTemplateLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./selectTemplate_layout_template.html'),
    ui: {
      "tabMenuTemplate" : ".tab-menu > li",
      "itemMyTemplate" : ".list-myTemplate > li > a",
      "itemLayoutTemplate" : ".list-layoutTemplate > li > a",
      "next": ".navi-controll .btn-next",
      "cancel": ".navi-controll .btn-cancel",
      "exit": ".btn-home"
    },
    SidebarConf: {
      showSidebar: false
    },
    events: function() {
      return ( applican.config.device_os === "IOS" ) ?
      {
        "touchend @ui.tabMenuTemplate" : "changeTabMenuTemplate",
        "touchend @ui.itemMyTemplate" : "changePreviewMyTemplate",
        "touchend @ui.itemLayoutTemplate" : "toggleClassLayoutTemplate",
        "touchend @ui.next" : "next",
        "touchend @ui.cancel" : "cancel",
        "touchend @ui.exit": "backMain",
        "touchend #list-name-my-template-region .box-points" : "showPopupOptions",
        "touchend #options_template_dialog .dialog-edit": "next",
        "touchend #options_template_dialog .dialog-delete": "showConfirmDelete",
        "touchend #dialogue-region .cancelbtnact"  : "closePopupOptions",
        "touchend #dialogue-region .close_dialogue_main" : "closeConfirmDelete",
        "touchend #dialogue-region #confirm_cancel_btn" : "confirmDelete"
      }:
      {
        "click @ui.tabMenuTemplate" : "changeTabMenuTemplate",
        "click @ui.itemMyTemplate" : "changePreviewMyTemplate",
        "click @ui.itemLayoutTemplate" : "toggleClassLayoutTemplate",
        "click @ui.next" : "next",
        "click @ui.cancel" : "cancel",
        "click @ui.exit": "backMain",
        "click #list-name-my-template-region .box-points" : "showPopupOptions",
        "click #options_template_dialog .dialog-edit": "next",
        "click #options_template_dialog .dialog-delete": "showConfirmDelete",
        "touchend #dialogue-region .cancelbtnact"  : "closePopupOptions",
        "click #dialogue-region .close_dialogue_main" : "closeConfirmDelete",
        "click #dialogue-region #confirm_cancel_btn" : "confirmDelete"
      }
    },
    regions: {
      "layoutTemplateRegion" : "#layout-template",
      "listNameMyTemplateRegion": '#list-name-my-template-region',
      "previewMyTemplateRegion": '#preview-my-template-region',
      "dialogueRegion": "#select-template-wrapper #dialogue-region",
      "footerRegion": "#select-template-wrapper #footer-region"
    },
    templateHelpers: {
      getTitle: function() {
        return App.appModel.getLanguageType().mail.common.title + " - " + App.appModel.getLanguageType().mail.common.create;
      },
      getlblTitle: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.lblTitle;
      },
      getSms: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.sms;
      },
      getTabMyTemplate: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.tabMyTemplate;
      },
      getTabLayoutTemplate: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.tabLayoutTemplate;
      },
      getLayoutTemplate1: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.layoutTemplate1;
      },
      getLayoutTemplate2: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.layoutTemplate2;
      },
      getLayoutTemplate3: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.layoutTemplate3;
      },
      getLayoutTemplate4: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.layoutTemplate4;
      },
      getLayoutTemplate5: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.layoutTemplate5;
      },
      getLayoutTemplate6: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.layoutTemplate6;
      },
      getLayoutTemplate7: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.layoutTemplate7;
      },
      getLayoutTemplate8: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.layoutTemplate8;
      },
      getLayoutTemplate9: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.layoutTemplate9;
      },
      getLayoutTemplate10: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.layoutTemplate10;
      },
      getLayoutTemplate11: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.layoutTemplate11;
      },
      getLayoutTemplate12: function() {
        return App.appModel.getLanguageType().mail.selectTemplate.layoutTemplate12;
      },
      getPreview: function() {
        return App.appModel.getLanguageType().common.preview;
      },
      getBtnHome: function() {
        return App.appModel.getLanguageType().common.btnHome;
      }
    },
    initialize: function(options) {
      this.myTemplateID;
      this.urlNext;
      this.previewMyTemplateModel = {};

      this.dataModel = new DataModel( { id: AppConf.core.localStorageKey } );
      // this.dataModel.safeFetch();
      // this.dataModel.destroy();
      // this.dataModel.clear();
      this.validationModel = new ValidationModel();

      this.contentModel = new ContentModel();

      this.tokenModel = new TokenModel();

      this.dialogueItemView = new DialogueItemView();

      App.dialogueCommon.setType("selectTemplate");

      this.selectTemplateCollection = new SelectTemplateCollection({ pagination: true, perPage1: 200 });
      // App.util.bindProgressScreen(this, this.selectTemplateCollection);
      // this.listenTo(this.selectTemplateCollection, 'sync', this._renderListNameMyTemplate);
      this.listenTo(this.selectTemplateCollection, 'page-info-has-been-set', this._fetchAll);
      this.listenTo(App.dialogueCommon, "selectTemplateError", this.selectTemplateError);
      this.listenTo(App.dialogueCommon, "deleteTemplateSuccess", this.deleteTemplateSuccess);

      $(window).on('resize', _.bind(this.onResize, this));
    },
    onRender: function() {
      // get segment
      // AppConf.mail.segmentId = App.util.common.getUrlParameter('segmentId');
      // if (AppConf.mail.segmentId) {
      //   this.dataModel.set('segmentId', AppConf.mail.segmentId);
      // }
      // get session p
      // AppConf.mail.sessionId = App.util.common.getUrlParameter('p');
      // if(this.dataModel.get('sessionId')){
      //   AppConf.mail.sessionId = this.dataModel.get('sessionId');
      // }else{
      //   this.dataModel.set('sessionId', AppConf.mail.sessionId);
      // }
      var _this = this;
      var a = [1];
      var layoutTemplateCollectionView = new LayoutTemplateCollectionView({ collection: new LayoutTemplateCollection(a) });
      this.layoutTemplateRegion.show(layoutTemplateCollectionView);
      this._renderFooter();
      this._renderDialogue();
      this.fetchTemplate({remove: true});
    },
    fetchTemplate: function(options) {
      this.selectTemplateCollection.fetchWithAuthInfo({
        on403: function() {
          App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.selectTemplate.dialogueError.getTemplateTitleErr, App.appModel.getLanguageType().mail.selectTemplate.dialogueError.getTemplateMsgErr);
          App.util.hideProgressScreen();
        },
        remove: options.remove
      });
    },
    _renderFooter: function() {
      this.dataModel.set("typeFooter", "mail");
      this.dataModel.set("action", "create");
      if(AppConf.webConf.segmentIdFromUrl){
        this.dataModel.set("hideBackBtn", true);
      }
      this.footerRegion.show( new FooterItemView({ model: this.dataModel }) );
    },
    _renderDialogue: function() {
      this.dialogueRegion.show( this.dialogueItemView );
    },
    onLoad: function() {
      /*var windowH = $(window).height();
      var wrapperH = $('#master-container').height();
      if(windowH > wrapperH) {
        $('#master-container, .container').css({'height': windowH + 'px'});
      } else {
        $('.container').css({'height': wrapperH + 'px'});
      }*/

      // Add class active for item of template when first load
      if ( this.dataModel ) {
        var type = this.dataModel.get("type");
        var templateID = this.dataModel.get("templateID");
        var campainName = this.dataModel.get("campainName");
        $("#campainName").val(campainName);
        $("#campainName").attr("placeholder", campainName);
        if ( type === "layoutTemplate" ) {
          var id = templateID.substr(8,templateID.length);
          this.urlNext = "messageContent/layoutTemplate?id=template" + id;

          // tab
          $(".list-layoutTemplate li").removeClass("active");
          $(".list-layoutTemplate .layoutTemplate" + id).addClass("active");
          $('.tab-menu li').removeClass('active');
          $('.tab-menu li:eq(1)').addClass('active');
          $('#select-template .tab-content .block-tab').removeClass('active in');
          $('#select-template .tab-content #tab2').addClass('active in');

          // preview
          $('#preview-template .tab-pane').removeClass('active in');
          $('#preview-template #tab2_else').addClass('active in');
          $('#layout-template .tab-pane').removeClass('active in');
          $('#layout-template #layoutTemplate' + id).addClass('active in');

          $(".list-myTemplate").find("li").first().addClass("active");
        } else if ( type === "myTemplate" ) {
          // preview
          $('#preview-template .tab-pane').removeClass('active in');
          $('#preview-template #tab1_else').addClass('active in');
          
          // url
          this.urlNext = "messageContent/myTemplate?id=" + templateID;
        } else {
          $(".list-myTemplate").find("li").first().addClass("active");
          $(".list-layoutTemplate").find("li").first().addClass("active");
        }
      } else {
        $(".list-myTemplate").find("li").first().addClass("active");
        $(".list-layoutTemplate").find("li").first().addClass("active");
      }

      $("#select-template-wrapper #navi-control-bar li").removeClass();
      $("#select-template-wrapper #navi-control-bar li:eq(0)").addClass("active");
    },
    onResize: function() {
      /*var windowH = $(window).height();
      $('#master-container, .container').css('height', windowH);*/
    },
    _fetchAll: function() {
      if ( this.selectTemplateCollection.isAtLastPage() ) {
        this._renderListNameMyTemplate();
      } else {
        this.fetchTemplate({remove: false});
      }
    },
    _renderListNameMyTemplate: function() {
      this.listNameMyTemplateRegion.show(new ListNameMyTemplateCollectionView({ collection: this.selectTemplateCollection }));
      if ( this.selectTemplateCollection.length > 0 ) {
        if ( this.dataModel ) {
          if ( this.dataModel.get("type") === "myTemplate" ) {
            this.myTemplateID = this.dataModel.get("templateID");
          } else {
            this.myTemplateID = this.selectTemplateCollection.models[0].get("id");
          }
        } else {
          this.myTemplateID = this.selectTemplateCollection.models[0].get("id");
        }
      }
      if ( this.myTemplateID ) {
        this.urlNext = "messageContent/myTemplate?id=" + this.myTemplateID;
      } else {
        this.urlNext = "";
      }

      // show preview template
      this._renderPreviewMyTemplate(this.myTemplateID);

      App.util.hideProgressScreen();

      $(window).bind('load', this.onLoad());
    },
    _renderPreviewMyTemplate: function() {
      var id = this.dataModel.get("id");

      if ( this.selectTemplateCollection.length > 0 ) {
        var a = this.selectTemplateCollection.where({id: this.myTemplateID});
        this.previewMyTemplateModel = a[0];
        this.showPreviewByLayout(this.previewMyTemplateModel);
      }
      if ( this.dataModel ) {
        for ( var i = 0; i < this.selectTemplateCollection.length; i++ ) {
          var idTmp = $(".list-myTemplate li:eq(" + i +") a").attr("href").split("=")[1];
          if ( this.dataModel.get("templateID") === idTmp ) {
            $(".list-myTemplate li").removeClass("active");
            $(".list-myTemplate li:eq(" + i + ")").addClass("active");
            i = this.selectTemplateCollection.length;
          }
        }
      }
    },
    showPreviewByLayout: function(model) {
      var str = model.attributes.body;
      str = App.util.text.relaceLtGt(str);

      var objContent = {
        subjectTitle: '',
        headlineOne: '',
        headlineTwo: '',
        imgBannerOne: '',
        imgBannerTwo: '',
        bodyTextOne: '',
        bodyTextTwo: '',
        nameBtnOne: '',
        urlLink0ne: '',
        nameBtnTwo: '',
        urlLinkTwo: ''
      };

      objContent.subjectTitle = model.attributes.subject;
      var template = str.indexOf('<!--templateID-->');
      var templateID;
      if ( template >= 0  ) {
        // Get templateID
        templateID = str.split('<!--templateID-->')[0].split('<!--')[1].split('-->')[0].trim();

        // Parse body
        if ( str.indexOf('<!--startHeaderLine01-->') >= 0 && str.indexOf('<!--endHeaderLine01-->') >= 0 ) {
          objContent.headlineOne = str.split('<!--endHeaderLine01-->')[0].split('<!--startHeaderLine01-->')[1].trim();
        }
        if ( str.indexOf('<!--startBodyText01-->') >= 0 && str.indexOf('<!--endBodyText01-->') >= 0 ) {
          objContent.bodyTextOne = str.split('<!--endBodyText01-->')[0].split('<!--startBodyText01-->')[1].trim();
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
        templateID = "template02";
      }

      this.contentModel.set('subjectTitle', objContent.subjectTitle);
      this.contentModel.set('subjectNote', objContent.subjectNote);
      this.contentModel.set('headlineOne', objContent.headlineOne);
      this.contentModel.set('bodyTextOne', objContent.bodyTextOne);
      this.contentModel.set('nameBtnOne', objContent.nameBtnOne);
      this.contentModel.set('urlLink0ne', objContent.urlLink0ne);

      switch ( templateID ) {
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
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('urlLinkTwo', objContent.urlLinkTwo);
          this.contentModel.set('nameBtnTwo', objContent.nameBtnTwo);

          this.previewMyTemplateRegion.show(new LayoutTemplate01previewItemView({ model: this.contentModel }));
          break;

        case 'template02':
          this.previewMyTemplateRegion.show(new LayoutTemplate02previewItemView({ model: this.contentModel }));
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
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('urlLinkTwo', objContent.urlLinkTwo);
          this.contentModel.set('nameBtnTwo', objContent.nameBtnTwo);

          this.previewMyTemplateRegion.show(new LayoutTemplate03previewItemView({ model: this.contentModel }));
          break;

        case 'template04':
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1].split('src="')[1].split('">')[0].trim();
          }
          if ( str.indexOf('<!--startImgBanner02-->') >= 0 && str.indexOf('<!--endImgBanner02-->') >= 0 ) {
            objContent.imgBannerTwo = str.split('<!--endImgBanner02-->')[0].split('<!--startImgBanner02-->')[1].split('src="')[1].split('">')[0].trim();
          }
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          objContent.imgBannerTwo = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerTwo).pathname);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('imgBannerTwo', objContent.imgBannerTwo);

          this.previewMyTemplateRegion.show(new LayoutTemplate04previewItemView({ model: this.contentModel }));
          break;

        case 'template05':
          if ( str.indexOf('<!--startHeaderLine02-->') >= 0 && str.indexOf('<!--endHeaderLine02-->') >= 0 ) {
            objContent.headlineTwo = str.split('<!--endHeaderLine02-->')[0].split('<!--startHeaderLine02-->')[1].trim();
          }
          if ( str.indexOf('<!--startBodyText02-->') >= 0 && str.indexOf('<!--endBodyText02-->') >= 0 ) {
            objContent.bodyTextTwo = str.split('<!--endBodyText02-->')[0].split('<!--startBodyText02-->')[1].trim();
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
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          objContent.imgBannerTwo = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerTwo).pathname);
          this.contentModel.set('headlineTwo', objContent.headlineTwo);
          this.contentModel.set('bodyTextTwo', objContent.bodyTextTwo);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('imgBannerTwo', objContent.imgBannerTwo);
          this.contentModel.set('urlLinkTwo', objContent.urlLinkTwo);
          this.contentModel.set('nameBtnTwo', objContent.nameBtnTwo);

          this.previewMyTemplateRegion.show(new LayoutTemplate05previewItemView({ model: this.contentModel }));
          break;
        case 'template06':
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1].split('src="')[1].split('">')[0].trim();
          }
          if ( str.indexOf('<!--startUrlLink02-->') >= 0 && str.indexOf('<!--endUrlLink02-->') >= 0 ) {
            objContent.urlLinkTwo = str.split('<!--endUrlLink02-->')[0].split('<!--startUrlLink02-->')[1].split('href="')[1].split("target")[0].split('"')[0].trim();
          }
          if ( str.indexOf('<!--startNameBtn02-->') >= 0 && str.indexOf('<!--endNameBtn02-->') >= 0 ) {
            objContent.nameBtnTwo = str.split('<!--endNameBtn02-->')[0].split('<!--startNameBtn02-->')[1].trim();
          }
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('urlLinkTwo', objContent.urlLinkTwo);
          this.contentModel.set('nameBtnTwo', objContent.nameBtnTwo);

          this.previewMyTemplateRegion.show(new LayoutTemplate06previewItemView({ model: this.contentModel }));
          break;
        case 'template07':
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1].split('src="')[1].split('">')[0].trim();
          }
          if ( str.indexOf('<!--startUrlLink02-->') >= 0 && str.indexOf('<!--endUrlLink02-->') >= 0 ) {
            objContent.urlLinkTwo = str.split('<!--endUrlLink02-->')[0].split('<!--startUrlLink02-->')[1].split('href="')[1].split("target")[0].split('"')[0].trim();
          }
          if ( str.indexOf('<!--startNameBtn02-->') >= 0 && str.indexOf('<!--endNameBtn02-->') >= 0 ) {
            objContent.nameBtnTwo = str.split('<!--endNameBtn02-->')[0].split('<!--startNameBtn02-->')[1].trim();
          }

          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('urlLinkTwo', objContent.urlLinkTwo);
          this.contentModel.set('nameBtnTwo', objContent.nameBtnTwo);

          this.previewMyTemplateRegion.show(new LayoutTemplate07previewItemView({ model: this.contentModel }));
          break;
        case 'template08':
          if ( str.indexOf('<!--startHeaderLine02-->') >= 0 && str.indexOf('<!--endHeaderLine02-->') >= 0 ) {
            objContent.headlineTwo = str.split('<!--endHeaderLine02-->')[0].split('<!--startHeaderLine02-->')[1].trim();
          }
          if ( str.indexOf('<!--startBodyText02-->') >= 0 && str.indexOf('<!--endBodyText02-->') >= 0 ) {
            objContent.bodyTextTwo = str.split('<!--endBodyText02-->')[0].split('<!--startBodyText02-->')[1].trim();
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
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          objContent.imgBannerTwo = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerTwo).pathname);
          this.contentModel.set('headlineTwo', objContent.headlineTwo);
          this.contentModel.set('bodyTextTwo', objContent.bodyTextTwo);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('imgBannerTwo', objContent.imgBannerTwo);
          this.contentModel.set('urlLinkTwo', objContent.urlLinkTwo);
          this.contentModel.set('nameBtnTwo', objContent.nameBtnTwo);

          this.previewMyTemplateRegion.show(new LayoutTemplate08previewItemView({ model: this.contentModel }));
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

          this.previewMyTemplateRegion.show(new LayoutTemplate10previewItemView({ model: this.contentModel }));
          break;
        case 'template09':
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = $(str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1]).attr('src');
          }
          if ( str.indexOf('<!--startUrlLink02-->') >= 0 && str.indexOf('<!--endUrlLink02-->') >= 0 ) {
            objContent.urlLinkTwo = str.split('<!--endUrlLink02-->')[0].split('<!--startUrlLink02-->')[1].split('href="')[1].split("target")[0].split('"')[0].trim();
          }
          if ( str.indexOf('<!--startNameBtn02-->') >= 0 && str.indexOf('<!--endNameBtn02-->') >= 0 ) {
            objContent.nameBtnTwo = str.split('<!--endNameBtn02-->')[0].split('<!--startNameBtn02-->')[1].trim();
          }
          objContent.imgBannerOne = App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname);
          this.contentModel.set('imgBannerOne', objContent.imgBannerOne);
          this.contentModel.set('urlLinkTwo', objContent.urlLinkTwo);
          this.contentModel.set('nameBtnTwo', objContent.nameBtnTwo);

          this.previewMyTemplateRegion.show(new LayoutTemplate09previewItemView({ model: this.contentModel }));
          break;
        case 'template11':
          this.previewMyTemplateRegion.show(new LayoutTemplate11previewItemView({ model: this.contentModel }));
          break;
        case 'template12':
          if ( str.indexOf('<!--startBodyText02-->') >= 0 && str.indexOf('<!--endBodyText02-->') >= 0 ) {
            objContent.bodyTextTwo = str.split('<!--endBodyText02-->')[0].split('<!--startBodyText02-->')[1].trim();
          }
          if ( str.indexOf('<!--startImgBanner01-->') >= 0 && str.indexOf('<!--endImgBanner01-->') >= 0 ) {
            objContent.imgBannerOne = str.split('<!--endImgBanner01-->')[0].split('<!--startImgBanner01-->')[1].split('src="')[1].split('">')[0].trim();
          }
          if ( str.indexOf('<!--startImgBanner02-->') >= 0 && str.indexOf('<!--endImgBanner02-->') >= 0 ) {
            objContent.imgBannerTwo = str.split('<!--endImgBanner02-->')[0].split('<!--startImgBanner02-->')[1].split('src="')[1].split('">')[0].trim();
          }
          if ( str.indexOf('<!--startImgBanner03-->') >= 0 && str.indexOf('<!--endImgBanner03-->') >= 0 ) {
            objContent.imgBannerThree = str.split('<!--endImgBanner03-->')[0].split('<!--startImgBanner03-->')[1].split('src="')[1].split('">')[0].trim();
          }
          this.contentModel.set('bodyTextTwo', objContent.bodyTextTwo);
          this.contentModel.set('imgBannerOne', App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerOne).pathname));
          this.contentModel.set('imgBannerTwo', App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerTwo).pathname));
          this.contentModel.set('imgBannerThree', App.util.text.getFullImageUrl(App.util.common.getLocation(objContent.imgBannerThree).pathname));
          this.previewMyTemplateRegion.show(new LayoutTemplate12previewItemView({ model: this.contentModel }));
          break;
      }
    },
    setActiveMyTemplate: function() {
      if ( this.dataModel ) {
        var type = this.dataModel.get("type");
      }
    },
    changeTabMenuTemplate: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget),
        index = _this.index(),
        tabID = _this.find('a').attr('href');

      $('.tab-menu li').removeClass('active');
      _this.addClass('active');

      $('#select-template .tab-content .block-tab').removeClass('active in');
      $('#select-template .tab-content ' + tabID).addClass('active in');

      $('#preview-template .tab-pane').removeClass('active in');
      $('#preview-template ' + tabID + '_else').addClass('active in');

      if (index === 0) {
        if ( this.selectTemplateCollection.length  > 0 ) {
          var id = $(".list-myTemplate").find("li.active a").attr("href").split("=")[1];
          this.urlNext = "messageContent/myTemplate?id=" + id;
          this.myTemplateID = id;
          this._renderPreviewMyTemplate();
        } else {
          this.urlNext = "";
        }
      } else {
        $('#layout-template .tab-pane').removeClass('active in');
        var activeIndex = $(".list-layoutTemplate").find("li.active").index();
        if ( activeIndex > 0 ) {
          var templateIndex = activeIndex + 1;
          this.urlNext = "messageContent/layoutTemplate?id=template0" + templateIndex;
          $('#layout-template #layoutTemplate0' + templateIndex).addClass('active in');
        } else {
          this.urlNext = "messageContent/layoutTemplate?id=template01";
          $('#layout-template .tab-pane').first().addClass('active in');
        }
      }
    },
    changePreviewMyTemplate: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var txtItem = _this.text();
      var attrItem = _this.attr("href").split("=")[1];

      $(".list-myTemplate li").removeClass("active");
      _this.parent("li").addClass("active");
      this.urlNext = "messageContent/myTemplate?id=" + attrItem;
      this.myTemplateID = attrItem;
      this.dataModel.setTemplateId(this.myTemplateID);
      this._renderPreviewMyTemplate();
    },
    toggleClassLayoutTemplate: function(e) {
      
      e.preventDefault();
      var _this = $(e.currentTarget);

      $(".list-layoutTemplate li").removeClass("active");
      _this.parent("li").addClass("active");

      // Change preview template
      var templateID = _this.parent("li").index() + 1;
      $('#layout-template .tab-pane').removeClass('active in');
      if(templateID < 10){
        $('#layout-template #layoutTemplate0' + templateID).addClass('active in');
        this.urlNext = "messageContent/layoutTemplate?id=template0" + templateID;
      } else {
        $('#layout-template #layoutTemplate' + templateID).addClass('active in');
        this.urlNext = "messageContent/layoutTemplate?id=template" + templateID;
      }
    },
    next:function(e) {
      e.preventDefault();
      var campainName = $("#campainName").val();
      this.validationModel.set({campainName: campainName, urlNext: this.urlNext},{validate:true});
      if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
        $("#campainName").css({"border-color": "#29235c"});
        this.dataModel.setCampainName(campainName);
        location.hash = this.urlNext;
      } else {
        this.onError( this.validationModel.validationError );
      }      
    },
    cancel: function(e) {
      e.preventDefault();
      App.pageSlider.back();
    },
    backMain: function(e) {
      e.preventDefault();
      this.backMainCommon();
    },
    selectTemplateError: function() {
      this.backMainCommon();
    },
    backMainCommon: function() {
      this.dataModel.destroy();
      this.dataModel.clear();
      App.pageSlider.main("workflow-mail");
      // location.hash = "workflow-mail";
    },
    showPopupOptions: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = $(_this).data("id");
      this.selectTemplateCollection.setTemplateId(id);
      $("#dialogue-region #greybg, #dialogue-region .options_template, #dialogue-region .cancelbtnact").addClass("show");
    },
    closePopupOptions: function(e) {
      $("#dialogue-region #greybg, #dialogue-region .options_template, #dialogue-region .cancelbtnact").removeClass("show");
    },
    showConfirmDelete: function(e) {
      this.closePopupOptions();
      e.preventDefault();
      var _this = $(e.currentTarget);
      var id = $(_this).data("id");
      this.selectTemplateCollection.setTemplateId(id);
      $("#dialogue-region #greybg, #dialogue-region .dialogue_main_delete, #dialogue-region #confirm_cancel").addClass("show");
    },
    closeConfirmDelete: function(e) {
      $("#dialogue-region #greybg, #dialogue-region .dialogue_main_delete, #dialogue-region #confirm_cancel").removeClass("show");
    },
    confirmDelete: function(e) {
      e.preventDefault();
      var id = this.selectTemplateCollection.getTemplateId();
      this.fetchToken({id: id, type: "deleteTemplate"});
    },
    onError: function(error) {
      App.dialogueCommon.setType("inputError");
      if ( error.campainName ) {
        $("#campainName").css({"border-color": "red"});
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.inputTitleError, error.campainName);
      } else if ( error.urlNext ) {
        $("#campainName").css({"border-color": "#29235c"});
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.selectTemplate.dialogueError.selectTemplateTitleErr, App.appModel.getLanguageType().mail.selectTemplate.dialogueError.selectTemplateMsgErr);
      }
    },
    fetchToken: function(options) {
      var _this = this;
      var _options = options || {};
      var type = _options.type;
      App.util.showProgressScreen();
      App.dialogueCommon.setType("deleteTemplate");
      this.tokenModel.fetchToken({})
      .done(function(data) {
        switch ( type ) {
          case "deleteTemplate":
            _this.deleteTemplateApi({id: _options.id, token: data.token});
            break;
        };
      })
      .fail(function(res) {
        switch ( type ) {
          case "deleteTemplate":
            App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.tokenTitleErr, App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
            break;
        };
        App.util.hideProgressScreen();
      });
    },
    deleteTemplateApi: function(options) {
      var _this = this;
      var _options = options || {};
      
      App.btApi.deleteTemplate({
          id: _options.id,
          token: _options.token
      }).done(function(res) {
        App.dialogueCommon.setType("deleteTemplateSuccess");
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.selectTemplate.dialogueSuccess.deleteTemplateTitleSuccess, App.appModel.getLanguageType().mail.selectTemplate.dialogueSuccess.deleteTemplateMsgSuccess);
        App.util.hideProgressScreen();
      }).fail(function(err) {
        App.dialogueCommon.setType("deleteTemplateError");
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.selectTemplate.dialogueError.deleteTemplateTitleErr, App.appModel.getLanguageType().mail.selectTemplate.dialogueError.deleteTemplateTitleMsgErr);
        App.util.hideProgressScreen();
      });
    },
    deleteTemplateSuccess: function() {
      App.util.showProgressScreen();
      this.fetchTemplate({remove: true});
    }
  });

  return SelectTemplateLayoutView;

})();