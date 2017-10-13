var Backbone = require('backbone');
module.exports = (function() {
	var ListNameMyTemplateItemView = Backbone.Marionette.ItemView.extend({
    	template: require('./listNameMyTemplate_item_template.html'),
        tagName: 'li'
  	});

  	return ListNameMyTemplateItemView;

})();