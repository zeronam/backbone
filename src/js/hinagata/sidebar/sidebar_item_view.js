var Backbone = require('backbone');
module.exports = (function () {
	var SidebarView = Backbone.Marionette.ItemView.extend({
		template: require('./sidebar_item_view.html'),
		className: 'nav-sidebar',
		templateHelpers: {
			getCompanyName: function() {
				return App.appModel.getLanguageType().sidebar.companyName;
			},
			getMail: function() {
				return App.appModel.getLanguageType().sidebar.mail;
			},
			getCoupon: function() {
				return App.appModel.getLanguageType().sidebar.coupon;
			},
			getPoint: function() {
				return App.appModel.getLanguageType().sidebar.point;
			},
			getSubscribes: function() {
				return App.appModel.getLanguageType().sidebar.subscribers;
			},
			getReport: function() {
				return App.appModel.getLanguageType().sidebar.report;
			},
			getNotification: function() {
				return App.appModel.getLanguageType().sidebar.notification;
			},
			getInformation: function() {
				return App.appModel.getLanguageType().sidebar.information;
			},
			getConfig: function() {
				return App.appModel.getLanguageType().sidebar.config;
			},
			getLogout: function() {
				return App.appModel.getLanguageType().sidebar.logout;
			},
			getProfile: function() {
				return App.appModel.getLanguageType().sidebar.profile;
			}
		},
		initialize: function( options ){
			this.sidebarModel = options.sidebarModel;
			this.listenTo( this.sidebarModel, 'change', this.refresh );
		},
		onRender: function(){
			this.refresh();
		},
		refresh: function(){
			// 左メニューの表示/非表示
			if( this.sidebarModel.get( 'showSidebar' ) ) {
				$("#sidebar-left").removeClass( 'HIDE' );
			}else{
				$("#sidebar-left").addClass( 'HIDE' );
			}
		}
	});
	return SidebarView;
})();
