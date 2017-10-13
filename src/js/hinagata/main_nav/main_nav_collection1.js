var Backbone = require('backbone');
var BaseCollection = require('../models/base_collection.js');
var MainNavModel = require('./main_nav_model.js');
module.exports = (function () {
	var MainNavCollection = Backbone.Collection.extend({
		model: MainNavModel,
		initialize: function() {
			// this.onResetCallbacks = [];
			// this.on("reset", this.collectionReset, this);
			// this.on('add', function( user ){
			// 	console.log(user);
			// })
        },
		searchListMessage:function(keywordSearch){
	    	if (keywordSearch === "") {
	    		return this;
	    	}else {
	    		return _(this.filter(function(data){
	          var pattern = new RegExp(keywordSearch,"gi");
	    			return pattern.test(data.get("name"));
	    		}));
	    	}
    	},
  //   	onReset: function(callback){
  //   		console.log(callback);
		//     this.onResetCallbacks.push(callback);
		//     this.collectionLoaded && this.fireResetCallbacks();
  // 		},
		// collectionReset: function(){
		// 	if (!this.collectionLoaded) {
		// 		this.collectionLoaded = true
		// 	}
		// 	this.fireResetCallbacks();
		// },
		// fireResetCallbacks: function(){
		// 	console.log(this.onResetCallbacks);
		// 	var callback = this.onResetCallbacks.pop();
		// 	if (callback){
		// 		callback(this);
		// 		this.fireResetCallbacks();
		// 	}
		// }
	});

	return MainNavCollection;

})();
