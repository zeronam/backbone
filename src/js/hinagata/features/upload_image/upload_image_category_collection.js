var Backbone = require('backbone');
var BaseCollection = require('../../models/base_collection.js');
module.exports = (function() {
  var UploadImageCategoryCollection = BaseCollection.extend({
    url: AppConf.url.appRoot + "/admin/workflow/image/category_list",
    parse: function(response) {
      return response.category;
    },
    initialize: function() {
      // if (AppConf.mail.webFlag || AppConf.coupon.webFlag || AppConf.notification.webFlag) {
      //   this.url = AppConf.url.appRoot + "/admin/workflow/image/web/category_list";
      // }
      if (AppConf.webConf.webFlag) {
        this.url = AppConf.url.appRoot + "/admin/workflow/image/web/category_list";
      }
    },
  });

  return UploadImageCategoryCollection;

})();
