var Backbone = require('backbone');

var DataModel = require('../../../models/data_model.js');
var NotificationSettingModel = require('../notification_setting/notificationSetting_model.js');

var NotificationLocalSpotItemView = require('./notificationLocal_spot_item_view.js');

var FooterItemView = require('../../../common/footer_item_view.js');

var TokenModel = require('../../../models/token_model.js');

var ValidationModel = require('../../../models/validation_model.js');

var SpotModel = require('./notificationLocal_spot_model.js');
var SpotCollection = require('./notificationLocal_popup_collection.js');
var NotificationPopupCollectionView = require('./notificationLocal_popup_collection_view.js');

var ShopListCollection = require('../../../models/shop_collection.js');

module.exports = (function () {
  var NotificationLocalLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./notificationLocal_layout_template.html'),
    regions: {
      "notificationSpecifyLocalRegion" : "#notification-specify-local-region",
      "notificationPopupRegion" : "#notification-popup-region",
      "footerRegion": "#footer-region",
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
      },
      getText: function(text) {
        return App.appModel.getLanguageType().notification.local[text];
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
        "touchend .btn-home": "backMain",
        "touchend .btn-save" : "saveNotificationLocal",
        "touchend .shape-popup" : "togglePopup",
        "touchend #add-spot-mac" : "addSpotMac",
        "touchend #add-spot-map" : "addSpotMap",
        "touchend .view-spot" : "viewSpot",
        "touchend .edit-spot" : "editSpot",
        "touchend .cancel-edit" : "cancelEdit",
        "touchend #edit-spot-map" : "saveEditSpotMap",
        "touchend #edit-spot-mac" : "saveEditSpotMac",
        "touchend .delete-spot" : "deleteSpot",
        "keyup #longitude, #latitude, #scope" : "drawSpot",
      }:
      {
        "click @ui.next" : "next",
        "click @ui.cancel" : "cancel",
        "click .btn-home": "backMain",
        "click .btn-save" : "saveNotificationLocal",
        "click .shape-popup" : "togglePopup",
        "click #add-spot-mac" : "addSpotMac",
        "click #add-spot-map" : "addSpotMap",
        "click .view-spot" : "viewSpot",
        "click .edit-spot" : "editSpot",
        "click .cancel-edit" : "cancelEdit",
        "click #edit-spot-map" : "saveEditSpotMap",
        "click #edit-spot-mac" : "saveEditSpotMac",
        "click .delete-spot" : "deleteSpot",
        "keyup #longitude, #latitude, #scope" : "drawSpot",
      }
    },
    SidebarConf: {
      showSidebar: false
    },
    initialize: function(options) {
      this.type = options.type;
      this.notificationId = options.notificationId;
      this.imageType;
      this.notificationSettingModel = new NotificationSettingModel();
      this.dataModel = new DataModel( { id: AppConf.core.localStorageKey } );
      this.dataModel.safeFetch();

      if ( this.dataModel ) {
        this.notificationSettingModel.setContentData(this.dataModel);
      }
      this.spotCollection = new SpotCollection(this.notificationSettingModel.attributes.spots);      
      this.listenTo(this.spotCollection, 'change update add remove', this._renderPopupSpot);
      App.util.hideProgressScreen();

      App.dialogueCommon.setType("notification");

      this.spotModel = new SpotModel();
      this.tokenModel = new TokenModel();
      this.validationModel = new ValidationModel();

      this.shopListCollection = new ShopListCollection();
      App.util.bindProgressScreen(this, this.shopListCollection);
      this.listenTo(this.shopListCollection, 'sync', this._renderMap);

      this.listenTo(App.dialogueCommon, 'backMainOK', this.backMainCommon);
      this.listenTo(App.dialogueCommon, 'saveDraftNotification', this.saveDraftNotification);

      this.listenTo(this, 'load:sync', this.onLoad);
      $(window).on('resize', _.bind(this.onResize, this));
    },
    onRender: function() {
      var _this = this;
      this.shopListCollection.fetchWithAuthInfo();
    },
    onLoad: function() {
      var windowH = $(window).height();
      var wrapperH = $('#master-container').height();
      if(windowH > wrapperH) {
        $('#master-container, #content-region-wrapper .container').css({'height': windowH + 'px'});
      }else{
        $('#content-region-wrapper .container').css({'height': wrapperH + 'px'});
      }    

      $('#google-map-box').css({'height': windowH + 'px'});

      $('.hasTimepicker').datetimepicker({
          format: 'HH:mm',
          ignoreReadonly: true,
          // useCurrent: true,
          sideBySide: true,
          toolbarPlacement: 'bottom',
          // debug:true
      });

      this._renderFooter();
      this._renderPopupSpot();

      if(this.type === "view") {
        this.disbaleElement();
      }           
    },
    disbaleElement: function(){
      $(".coupon-master .form-control").prop("disabled", true);
      $("#local-region-wrapper #coverImageUpload").addClass("noEvent");
      $(".page-center .btn-save").hide();
      $(".btn-next").hide();
      $(".edit-spot, .delete-spot").hide();
    },
    onResize: function(){
        var windowH = $(window).height();
        $('#master-container, #local-region-wrapper .container').css('height', windowH);
    },
    togglePopup: function() {
      var el = $("#notification-popup");
      var wh = $(window).height();
      var h = (wh - el.height() - 50) + "px";

      if($(".shape-popup").hasClass("popup-close")){
        $(".shape-popup").removeClass("popup-close");
        el.css({"top": h});
      } else {
        $(".shape-popup").addClass("popup-close");
        el.css({"top": "100%"});
      }
    },
    _renderPopupSpot: function(){
      this.notificationSpecifyLocalRegion.show(new NotificationLocalSpotItemView({ model: this.spotModel }));
      var spotCollection = this.spotCollection.filter(function(model) { 
          return model.get("delete") != true;
      });
      spotCollection = new SpotCollection(spotCollection);
      this.notificationPopupRegion.show(new NotificationPopupCollectionView({ collection: spotCollection })); 
      this.updatePopup();      
      $("#spot-count").html(spotCollection.length);
    },
    updatePopup: function() {   
      if(!$(".shape-popup").hasClass("popup-close")){
        var el = $("#notification-popup");
        var wh = $(window).height();
        var h = (wh - el.height() - 50) + "px";
        el.css({"top": h});
        $("#notification-popup tbody").animate({ 
          scrollTop: $("#notification-popup tbody").get(0).scrollHeight 
        }, 300);
      }
    },
    _renderMap: function(){
      var _this = this;
      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBsQiU2h577fYZib0QkqNAX0pVUt2DXgnI&callback=initMap'
      script.id = "google-map-js";
      if(!document.getElementById('google-map-js')){
        document.head.appendChild(script);
      } else {
        this.initMap();
      }
      window.initMap = function(){
        _this.initMap();
      }
    },
    initMap: function(){
      var myLatlng = new google.maps.LatLng(35.6,139.5);
      var myOptions = {
          zoom: 10,
          center: myLatlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
      }
      this.map = new google.maps.Map(document.getElementById("google-map-box"), myOptions); 

      var listShop = this.shopListCollection.models;
      var infowindow = new google.maps.InfoWindow();
      for (var i = 0; i < listShop.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(listShop[i].attributes.latitude, listShop[i].attributes.longitude),
            map: this.map,
        });
        var html = listShop[i].attributes.name;
        this.bindInfoWindow(marker, this.map, infowindow, html); 
      }
    },
    viewSpot: function(e){
      var _this = this;
      var el = $(e.currentTarget);  
      var center = new google.maps.LatLng(el.data("lat"),el.data("long"));
      this.map.panTo(center);
      this.map.setZoom(13);
      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
          position: center,
          map: _this.map,
      });
      var html = el.data("name");
      this.bindInfoWindow(marker, this.map, infowindow, html); 
      this.drawCircle(center, el.data("scope"));
    },
    drawCircle: function(center, scope) {
       var _this = this;
      if(this.circle){
        this.circle.setMap(null);
      }
      this.circle = new google.maps.Circle({
        center: center,
        radius: scope * 1000,
        map: _this.map,
        strokeColor: '#2dabb6',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#2dabb6',
        fillOpacity: 0.5
      });
    },
    bindInfoWindow: function(marker, map, infowindow, html){
      var _this = this;
      google.maps.event.addListener(marker, 'click', function (event) {
          infowindow.setContent(html);
          infowindow.open(map, marker);

          var myLatLng = event.latLng;
          var lat = myLatLng.lat();
          var lng = myLatLng.lng();
          _this.spotModel.set({name: html, "location":{"latitude": lat, "longitude": lng}});
          _this.notificationSpecifyLocalRegion.show(new NotificationLocalSpotItemView({ model: _this.spotModel }));
          _this.spotModel.clear().set(_this.spotModel.defaults);
      });
    },
    drawSpot: function() {
      var _this = this;
      var spotName1 = $("#spotName1").val();
      var latitude = $("#latitude").val();
      var longitude = $("#longitude").val();
      var scope = $("#scope").val();
      if(latitude != "" && longitude != "" && scope != ""){
        var center = new google.maps.LatLng(latitude,longitude);
        this.map.panTo(center);
        this.map.setZoom(13);
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          position: center,
          map: _this.map,
        });
        var html = spotName1;
        this.bindInfoWindow(marker, this.map, infowindow, html); 
        this.drawCircle(center, scope);
      }
    },
    addSpotMap: function() {
      var spotName1 = $("#spotName1").val();
      var latitude = $("#latitude").val();
      var longitude = $("#longitude").val();
      var scope = $("#scope").val();
      var objectData = { spotName1: spotName1, latitude: latitude, longitude: longitude, scope: scope };

      this.validationModel.set(objectData, {validate:true});
      if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
        this.resetBorder();
        this.spotCollection.add([{"name": spotName1, locationType: 0 , "location":{"latitude": latitude, "longitude": longitude, "scope": scope}}])
        if($(".shape-popup").hasClass("popup-close")){
          this.togglePopup();
        }
      } else {
        this.onError( this.validationModel.validationError );
      }
    },
    addSpotMac: function() {
      var spotName2 = $("#spotName2").val();
      var ssid = $("#ssid").val();
      var bssid = $("#bssid").val();
      var rssiType = $("#rssiType").val();
      var objectData = { spotName2: spotName2, ssid: ssid, bssid: bssid, rssiType: rssiType };
      var regex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/;
      if(!regex.test(bssid)){
        $("#bssid").addClass("error");
        App.dialogueCommon.setType("inputError");
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.inputTitleError, App.appModel.getLanguageType().notification.local.dialogue.formatBSSID);
      } else { 
        this.validationModel.set(objectData, {validate:true});
        if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
          this.resetBorder();
          this.spotCollection.add([{"name": spotName2, locationType: 1 , "accessPoint":{"ssid": ssid, "bssid": bssid, "rssiType": rssiType}}])
          if($(".shape-popup").hasClass("popup-close")){
            this.togglePopup();
          }
        } else {
          this.onError( this.validationModel.validationError );
        }     
      } 
    },
    resetBorder: function() {
      $("#spot-id-map, #spotName1, #latitude, #longitude, #scope").removeClass("error");
      $("#spot-id-mac, #spotName2, #ssid, #bssid, #rssiType").removeClass("error");
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
    editSpot: function(e){    
      var el = $(e.currentTarget);  
      var spotId = el.data("id");
      if(spotId){
        var spotModel = this.spotCollection.where({spotId: spotId})[0];
      } else {
        var index = el.parent().parent().index();
        var spotModel = this.spotCollection.at(index);
        spotModel.set({tempSpotID: index});
      }
      this.notificationSpecifyLocalRegion.show(new NotificationLocalSpotItemView({ model: spotModel }));
    }, 
    cancelEdit: function(e){
      this.notificationSpecifyLocalRegion.show(new NotificationLocalSpotItemView({ model: this.spotModel }));
    },
    saveEditSpotMap: function(){
      var spotId = $("#spot-id-map").val();
      var tempSpotId = parseInt( $("#spot-id-temp-map").val());
      var spotName1 = $("#spotName1").val();
      var latitude = $("#latitude").val();
      var longitude = $("#longitude").val();
      var scope = $("#scope").val();
      var objectData = { spotName1: spotName1, latitude: latitude, longitude: longitude, scope: scope };

      this.validationModel.set(objectData, {validate:true});
      if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
        this.resetBorder();        
        if(spotId){
          this.spotCollection.find(function(model) { 
            if(model.get('spotId') == spotId){
              model.set({"name": spotName1, "location":{"latitude": latitude, "longitude": longitude, "scope": scope}});
              if(!model.hasChanged()){
                model.trigger('change', model);
              }
            }
          });
        } else {
          var spotModel = this.spotCollection.at(tempSpotId);
          spotModel.set({"name": spotName1, "location":{"latitude": latitude, "longitude": longitude, "scope": scope}});
        }
        if($(".shape-popup").hasClass("popup-close")){
          this.togglePopup();
        }
      } else {
        this.onError( this.validationModel.validationError );
      }
    },
    saveEditSpotMac: function(){
      var spotId = $("#spot-id-mac").val();
      var tempSpotId = parseInt( $("#spot-id-temp-map").val());
      var spotName2 = $("#spotName2").val();
      var ssid = $("#ssid").val();
      var bssid = $("#bssid").val();
      var rssiType = $("#rssiType").val();
      var objectData = { spotName2: spotName2, ssid: ssid, bssid: bssid, rssiType: rssiType };
      var regex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/;
      if(!regex.test(bssid)){
        $("#bssid").addClass("error");
        App.dialogueCommon.setType("inputError");
        App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.inputTitleError, App.appModel.getLanguageType().notification.local.dialogue.formatBSSID);
      } else {      
        this.validationModel.set(objectData, {validate:true});
        if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
          this.resetBorder();
          if(spotId){
            this.spotCollection.find(function(model) { 
              if(model.get('spotId') == spotId){
                model.set({"name": spotName2, "accessPoint":{"ssid": ssid, "bssid": bssid, "rssiType": rssiType}});
                if(!model.hasChanged()){
                  model.trigger('change', model);
                }
              }
            });
          } else {
            var spotModel = this.spotCollection.at(tempSpotId);
            spotModel.set({"name": spotName2, "accessPoint":{"ssid": ssid, "bssid": bssid, "rssiType": rssiType}});
          }
          if($(".shape-popup").hasClass("popup-close")){
            this.togglePopup();
          }
        } else {
          this.onError( this.validationModel.validationError );
        }    
      }
    },
    deleteSpot: function(e){
      var el = $(e.currentTarget);  
      var spotId = el.data("id");
      var index = el.parent().parent().index();
      if(spotId > 0){
        var m = this.spotCollection.where({spotId: spotId})[0];
        // this.spotCollection.remove(m);
        m.set({"delete" : true});
      } else {
        var m = this.spotCollection.at(index);
        this.spotCollection.remove(m);
      }
    },
    _renderFooter: function() {
      this.notificationSettingModel.set("typeFooter", "notification");
      switch ( this.type ) {
        case "view":
        case "edit":
        case "duplicate":
          this.notificationSettingModel.set("action", this.type);
          this.notificationSettingModel.set("tabIdx", 3);
          break;
        default:
          this.notificationSettingModel.set("action", "create");   
          this.notificationSettingModel.set("tabIdx", 3);       
          break;
      };
      this.footerRegion.show( new FooterItemView({ model: this.notificationSettingModel }) );
    },
    next: function(e) {
      e.preventDefault();
      if ( this.type === "view" ) {
        location.hash = "notificationConfirm/" + this.type + "?notificationId=" + this.notificationId;
      } else {
        if ( this.checkSpotCollection() === true ) {
          this.notificationSettingModel.setContentDataByObject3(this.spotCollection);
          this.dataModel.setNotificationDataTemp( this.notificationSettingModel );
          location.hash = "notificationConfirm/" + this.type + "?notificationId=" + this.notificationId;
        }
      }
    },
    cancel: function(e){
      e.preventDefault();
      if ( this.type !== "view" ) {
        this.setLocalSave();
      }
      location.hash = "notificationCondition/" + this.type + "?notificationId=" + this.notificationId;
    },   
    backMain: function(e) {
      e.preventDefault();
      if ( this.type === "edit" || this.type === "duplicate" ) {
        // var memberOnly1 = this.dataModel.get("memberOnly1");
        // if ( memberOnly1 ) {
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
      location.hash = "notification";
    },
    setLocalSave: function(flg) {
      this.notificationSettingModel.setContentDataByObject3(this.spotCollection);
      if ( !flg ) {
        this.dataModel.setNotificationDataTemp(this.notificationSettingModel);
      }
    },
    checkSpotCollection: function(){
      if(this.spotCollection.length > 0)
        return true;
      else 
        return false;
    },
    saveNotificationLocal: function(e) {
      e.preventDefault();
      // if ( this.checkSpotCollection() === true ) {
        App.dialogueCommon.setType("saveDraftNotification");
        App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.draftTitle, App.appModel.getLanguageType().common.dialogue.draftMsg);
      // }
    },
    saveDraftNotification: function() {
      this.setLocalSave("1");
      this.notificationSettingModel.setContentSaveAndExit();
      this.notificationSettingModel.setNotificationId( this.type, this.notificationId );
      this.fetchToken({actionType: 0, notificationMaster: this.notificationSettingModel.getNotificationMaster(), type: "save"});
    },
    saveNotification: function(options) {
      var _this = this;
      var _options = options || {};
      App.btApi.sendNotification({
          actionType: _options.actionType,
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
          // case "upload":
          //   _this.uploadImageApi({data: _options.data, token: data.token, image: _options.image});
          //   break;
          case "save":
            _this.saveNotification({actionType: _options.actionType, notificationMaster: _options.notificationMaster, token: data.token});
            break;
        };
      })
      .fail(function(res) {
        switch ( type ) {
          // case "upload":
          //   $(".msg_upload").text(App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
          //   $(".msg_upload").show();
          //   break;
          case "save":
            App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.tokenTitleErr, App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
            break;
        };
        App.util.hideProgressScreen();
      });
    },
  });

  return NotificationLocalLayoutView;

})();