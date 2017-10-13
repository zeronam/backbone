var MainNavView = require('./main_nav/main_nav_view');
var LoginLayout = require('./login/login_layout');
// var MainNavCollection = require('./main_nav/main_nav_collection.js');

var Backbone = require('backbone');

module.exports = (function(){

	var Router = Backbone.Router.extend({

		routes:{
			"" : "showLogin",
			"login": "showLogin",
			"workflow-mail": "showMain",
			"clear" : "clearLoacalStorage",
		},

		showLogin: function(){
			var loginLayout = new LoginLayout();
			loginLayout.render();
			App.pageSlider.slidePage( loginLayout);
			App.sidebarModel.applyViewSidebarConf( loginLayout.SidebarConf );
			loginLayout.trigger("load:sync");
		},

		showMain: function(){
			// var collection = new MainNavCollection([
			// 	{ href: "#login", text: "ログイン"},
			// 	{ href: "#clear", text: "クリアStorage"},
			// ]);
			// var mainNavView = new MainNavView({ navCollection: collection });
			var mainNavView = new MainNavView();

			mainNavView.render();
			App.pageSlider.slidePage( mainNavView );
			App.sidebarModel.applyViewSidebarConf( mainNavView.SidebarConf );
			mainNavView.trigger('load:sync');
		},
		clearLoacalStorage: function(){
			localStorage.clear();
		}

	});

	return Router;


})();
