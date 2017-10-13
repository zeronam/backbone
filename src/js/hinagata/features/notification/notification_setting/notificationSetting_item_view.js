var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {
  var CouponInformationItemView = Backbone.Marionette.ItemView.extend({
    template: require('./notificationSetting_item_template.html'),
    templateHelpers: {
      getNowDate: function(flg){
        var today = moment(new Date());
				var startDate = today.format("YYYY/MM/DD 00:00");
				var endDate = today.add(1, 'd').format("YYYY/MM/DD 00:00");
        if ( flg === "start" ) {
          return startDate;
        } else if ( "end" ) {
          return endDate;
        } else {
          return moment(new Date()).format("YYYY/MM/DD HH:mm");
        }
      },
      getStddatedivCdText: function( memberOnly ) {
        var text = this.getExpirationDate1();
        if ( memberOnly === "2" ) {
          text = this.getExpirationDate2();
        }
        return text;
      },
      convertDate: function( date ) {
        return App.util.date.convertDate(date, "YYYY/MM/DD HH:mm");
      },
      getRequired: function() {
        return App.appModel.getLanguageType().common.required;
      },
      getText: function(text) {
        return App.appModel.getLanguageType().notification.setting[text];
      }
    }
  });

  return CouponInformationItemView;

})();