var Backbone = require('backbone');
module.exports = (function () {
	var UploadImageItemView = Backbone.Marionette.ItemView.extend({
		template: require('./upload_image_item_template.html'),
		templateHelpers: {
			getTitle: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.title;
			},
			getTabInputSearch: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.tabInputSearch;
			},
			getTabUploadImage: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.tabUploadImage;
			},
			getTabOperation: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.tabOperation;
			},
			getTabSearchImage: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.tabSearchImage;
			},
			getCategoryTitle: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.categoryTitle;
			},
			getCategoryAll: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.categoryAll;
			},
			getCategoryNone: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.categoryNone;
			},
			getCategoryAll1: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.categoryAll1;
			},
			getSearchText: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.searchText;
			},
			getOrderTitle: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.orderTitle;
			},
			getOrderText1: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.orderText1;
			},
			getOrderText2: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.orderText2;
			},
			getPerPageTitle: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.perPageTitle;
			},
			getPerPage1: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.perPage1;
			},
			getPerPage2: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.perPage2;
			},
			getPerPage3: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.perPage3;
			},
			getImageTitle: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.imageTitle;
			},
			getPageTitle: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.pageTitle;	
			},
			getTotalRecordTitle: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.totalRecordTitle;
			},
			getListImageTitle: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.listImageTitle;
			},
			getBtnNext: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.btnNext;
			},
			getBtnSelectedImage: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.btnSelectedImage;
			},
			getBtnUpload: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.btnUpload;
			},
			getBtnSelectImage: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.btnSelectImage;
			},
			getNote: function() {
				return App.appModel.getLanguageType().common.dialogue.uploadImage.note;
			}
		}
	});
	return UploadImageItemView;
})();