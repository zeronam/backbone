var Backbone = require('backbone');
var BaseCollection = require('../../models/base_collection.js');
var MessageContentModel = require('./messageContent_model.js');
module.exports = (function () {
  var MessageContentCollection = BaseCollection.extend({
    model: MessageContentModel,
    url: AppConf.url.appRoot + "/admin/workflow/mail/template_list",
    initialize: function(){
      // if(AppConf.mail.webFlag){
      //   this.url = AppConf.url.appRoot + "/admin/workflow/mail/web/template_list";
      // }

      if(AppConf.webConf.webFlag){
        this.url = AppConf.url.appRoot + "/admin/workflow/mail/web/template_list";
      }
    },
    // url: "stubapi/mailTemplate.json",
    parse: function(response) {
    	return response.templates;
    }
  });

  return MessageContentCollection;

})();