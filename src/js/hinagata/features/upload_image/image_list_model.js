var Backbone = require('backbone');
var BaseModel = require('../../models/base_model.js');
module.exports = (function () {
	var ImageListModel = BaseModel.extend({
		mutators: { // https://github.com/asciidisco/Backbone.Mutators
			getUrlImage: {
				get: function() {
					return this.getUrl();
				}
			}
		},
		getUrl: function() {
			var url = this.get("url");
			var lengthUrl = AppConf.url.appRoot.indexOf('/btapi');
			var imgUrl = AppConf.url.appRoot.substr(0, lengthUrl) + url;
			return imgUrl;
		}
	});

	return ImageListModel;
})();