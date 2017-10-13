// データが存在しない場合に表示する共通のViewクラス
// See emptyView options of Marionette.CollectionView  
// https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.collectionview.md#collectionviews-emptyview
var Backbone = require('backbone');
module.exports = (function () {
	var CommonEmptyView = Backbone.Marionette.ItemView.extend({
		template: require("./common_empty_view_template.html"),
		className: "list-view-empty",
		initialize: function(options){
			// 指定のメッセージを表示
			var message_template = '<div class="list-view-empty"><div class="emptyView bgcolor1 ftcolor1"><%=message%></div></div>';
			if (!_.isUndefined(options) && !_.isUndefined(options.message)) {
				switch(options.message) {
					case "指定した条件に合致する画像はありません":
						this.options.message = App.appModel.getLanguageType().common.dialogue.uploadImage.imageListEmptyMsg;
						var message_template = '<div class="list-view-empty"><div class="emptyView bgcolor1 ftcolor1">' + this.options.message + '</div></div>';
						break;
					case "配信メールがありません":
						this.options.message = App.appModel.getLanguageType().mail.main.messageListEmptyMsg;
						var message_template = '<div class="list-view-empty"><div class="emptyView bgcolor1 ftcolor1">' + this.options.message + '</div></div>';
						break;
					case "承認履歴がありません":
						this.options.message = App.appModel.getLanguageType().mail.main.messageHistoryEmptyMsg;
						var message_template = '<div class="list-view-empty"><div class="emptyView bgcolor1 ftcolor1">' + this.options.message + '</div></div>';
						break;
					case "ダッシュボードのデータがありません":
						this.options.message = App.appModel.getLanguageType().dashboard.main.noRecord;
						var message_template = '<div class="error_chart"><p>' + this.options.message + '</p></div>';
						break;
				};
				var template = _.template(message_template);
				this.el = template(options);
			}
		},
	});
	return CommonEmptyView;
})();
