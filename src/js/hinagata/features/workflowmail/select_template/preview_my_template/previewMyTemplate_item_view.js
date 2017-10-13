var Backbone = require('backbone');
module.exports = (function() {
	var PreviewMyTemplateItemView = Backbone.Marionette.ItemView.extend({
    	template: require('./previewMyTemplate_item_template.html')
  	});

  	return PreviewMyTemplateItemView;

})();