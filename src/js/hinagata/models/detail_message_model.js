var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function() {
    var DetailMessageModel = BaseModel.extend({
        idAttribute: "authMailId",
        url: AppConf.url.appRoot + "/admin/workflow/mail/detail",
        // url: "stubapi/detail.json",
        initialize: function(options) {
            this.id = options.id;
        },
        parse: function(response) {
            return response.authmail;
        },
        fetchDetailMessage: function(options) {
            // if (AppConf.mail.webFlag) {
            //     this.url = AppConf.url.appRoot + "/admin/workflow/mail/web/detail";
            // }

            if (AppConf.webConf.webFlag) {
                this.url = AppConf.url.appRoot + "/admin/workflow/mail/web/detail";
            }
            var _options = _.extend(options || {}, { url: this.url + "?id=" + this.get("authMailId") });
            return this.fetchWithAuthInfo(_options);
        }
    });

    return DetailMessageModel;

})();
