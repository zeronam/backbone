var Backbone = require('backbone');
module.exports = (function () {
	var SaveTemplateItemView = Backbone.Marionette.ItemView.extend({
		template: require('./save_template_item.html'),
		templateHelpers: {
			getSaveTemplateTitle: function() {
        		return App.appModel.getLanguageType().mail.messageContent.saveTemplate.saveTemplateTitle;
      		},
      		getSaveTemplateNote: function() {
        		return App.appModel.getLanguageType().mail.messageContent.saveTemplate.saveTemplateNote;
      		},
      		getSaveTemplateName: function() {
        		return App.appModel.getLanguageType().mail.messageContent.saveTemplate.saveTemplateName;
      		},
      		getSaveTemplateSuccess: function() {
        		return App.appModel.getLanguageType().mail.messageContent.saveTemplate.saveTemplateSuccess;
      		},
      		getSaveTemplateBtn: function() {
      			return App.appModel.getLanguageType().mail.messageContent.saveTemplate.saveTemplateBtn;	
      		}
		}
	});
	return SaveTemplateItemView;
})();