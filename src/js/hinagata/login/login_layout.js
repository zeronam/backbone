var Backbone = require('backbone');
var LoginView = require('./login_view.js');
module.exports = (function () {

	var LoginLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./login_layout_template.html'),
		regions: {
			"loginMainRegion": "#login-main-region"
		},
		SidebarConf: {
      		showSidebar: false
    	},
		initialize: function(){
			App.dialogueCommon.setType("login");
			this.listenTo(this, "load:sync", this.setHeight);
			$(window).on('resize', _.bind(this.setHeight, this));
		},
		onRender: function(){
			this._renderLoginMain();
		},
		_renderLoginMain: function(){
			this.loginMainRegion.show( new LoginView() );
			// this.setHeight();
		},
		setHeight: function(){
			$('#master-container').css('height', $(window).height()+'px');
			// set active language
            $("#login-wrapper .multi_language li").removeClass("active");
            if ( App.appModel.getLanguage() === "en" ) {
            	$("#login-wrapper .multi_language li:eq(0)").addClass("active");
            	$("#login-wrapper .multi_language li:eq(0) .st2, #login-wrapper .multi_language li:eq(0) .st4").css({"stroke": "#D0202D"});
            } else if ( App.appModel.getLanguage() === "ja" ) {
            	$("#login-wrapper .multi_language li:eq(0) .st2, #login-wrapper .multi_language li:eq(0) .st4").css({"stroke": "#999"});
            	$("#login-wrapper .multi_language li:eq(1)").addClass("active");
            }
		}
	});

	return LoginLayout;
})();
