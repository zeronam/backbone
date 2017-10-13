var Backbone = require('backbone');
var BaseCollection = require('../../../models/base_collection.js');
var selectTemplateModel = require('./selectTemplate_model.js');
module.exports = (function() {
  var SelectTemplateCollection = BaseCollection.extend({
    model: selectTemplateModel,
    url: AppConf.url.appRoot + "/admin/workflow/mail/template_list",
    initialize: function(){
      // if(AppConf.mail.webFlag){
      //   this.url = AppConf.url.appRoot + "/admin/workflow/mail/web/template_list";
      // }

      if(AppConf.webConf.webFlag){
        this.url = AppConf.url.appRoot + "/admin/workflow/mail/web/template_list";
      }
    },
    parse: function(response) {
        return response.templates || response;
    },
    setTemplateId: function(id) {
    	this.templateId = id;
    },
    getTemplateId: function() {
    	return this.templateId;
    }
  });

  return SelectTemplateCollection;

})();