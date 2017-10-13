var Backbone = require('backbone');
var FooterItemView = require('../../../common/footer_item_view.js');
var FooterModel = require('../../../models/footer_model.js');
var DataModel = require('../../../models/data_model.js');
module.exports = (function () {
  var CouponTypeLayoutView = Backbone.Marionette.LayoutView.extend({
    template: require('./coupon_type_layout_template.html'),
    regions: {
      "footerRegion": "#type-region-wrapper #footer-region"
    },
    events: function() {
      return ( applican.config.device_os === "IOS" ) ?
      {
        "touchend .navi-controll .btn-cancel": "cancel",
        "touchend .list-coupon-type li": "next"
      }:
      {
        "click .navi-controll .btn-cancel": "cancel",
        "click .list-coupon-type li": "next"
      }
    },
    templateHelpers: {
      getTitle: function() {
        return App.appModel.getLanguageType().coupon.common.title;
      },
      getMembersOnlyCoupons: function() {
        return App.appModel.getLanguageType().coupon.common.membersOnlyCoupons;
      },
      getMembersCommonCoupon: function() {
        return App.appModel.getLanguageType().coupon.common.membersCommonCoupon;
      },
      getPublicCoupon: function() {
        return App.appModel.getLanguageType().coupon.common.publicCoupon;
      }
    },
    SidebarConf: {
      showSidebar: false
    },
    initialize: function(options) {
      this.footerModel = new FooterModel();
      this.dataModel = new DataModel( { id: AppConf.core.localStorageKey } );
      this.dataModel.safeFetch();

      this.listenTo(App.dialogueCommon, 'backMainOK', this.backMainCommon);
      this.listenTo(this, 'load:sync', this.onLoad);
      $(window).on('resize', _.bind(this.onResize, this));
    },
    onRender: function() {
      // AppConf.coupon.sessionId = this.dataModel.get('sessionId');
      this._renderFooter();
    },
    _renderFooter: function() {
      this.footerModel.set("typeFooter", "coupon");
      this.footerModel.set("tabIdx", 0);
      this.footerModel.set("action", "type");
      this.footerModel.set("memberOnly", "");
      this.footerRegion.show( new FooterItemView({ model: this.footerModel }) );
    },
    onLoad: function() {
      /*var windowH = $(window).height();
      var wrapperH = $('#master-container').height();
      if(windowH > wrapperH) {
        $('#master-container, #type-region-wrapper .container').css({'height': windowH + 'px'});
      }else{
        $('#type-region-wrapper .container').css({'height': wrapperH + 'px'});
      }*/

      if ( this.dataModel ) {
        var type = this.dataModel.getMemberOnly();
        switch ( type ) {
          case "0":
            $("#type-region-wrapper .list-coupon-type li:eq(0)").addClass("active");
            break;
          case "1":
            $("#type-region-wrapper .list-coupon-type li:eq(2)").addClass("active");
            break;
          case "2":
            $("#type-region-wrapper .list-coupon-type li:eq(1)").addClass("active");
            break;
        };
      }
    },
    onResize: function(){
        /*var windowH = $(window).height();
        $('#master-container, #type-region-wrapper .container').css('height', windowH);*/
    },
    cancel: function(e) {
      e.preventDefault();
      App.dialogueCommon.setType("backMain");
      App.dialogueCommon.showDialogue1(App.appModel.getLanguageType().common.dialogue.backHomeTitle, App.appModel.getLanguageType().common.dialogue.backHomeMsg);
      // this.dataModel.destroy();
      // location.hash = "coupon";
    },
    backMainCommon: function() {
      this.dataModel.destroy();
      App.pageSlider.back();
    },
    next: function(e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var index = $(_this).index();
      var type;
      switch ( index ) {
        case 0:
          type = "0";
          break;
        case 1:
          type = "2";
          break;
        case 2:
          type = "1";
          break;
      };
      this.dataModel.setMemberOnly(type);
      location.hash = "couponInformation/" + type;
    }
  });

  return CouponTypeLayoutView;

})();