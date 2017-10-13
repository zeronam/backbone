var Backbone = require('backbone');

module.exports = (function(){
	var SidebarModel = Backbone.Model.extend({
		defaults: {
			showSidebar: false
		},
		applyViewSidebarConf: function( sidebarConf ){
			if( !sidebarConf ) return;

			// sidebarConf.customeBackAction = sidebarConf.customeBackAction || void(0);
			// sidebarConf.hideSidebar = sidebarConf.hideSidebar || false;
			this.set( sidebarConf );
		},
	});

	return SidebarModel;


})();