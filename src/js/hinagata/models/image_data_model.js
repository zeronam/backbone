var Backbone = require('backbone');
module.exports = (function () {
	var ImageDataModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("image-list"),
		idAttribute: "id",
		setImageUrl: function(imageName, base64) {
			this.set(imageName, base64);
			this.save();
		},
	    safeFetch: function(options){
			var _options = options || {};
			var _this = this;
			this.fetch( _options )
			.done(function(data){
				_this.trigger('ready', _this);
			})
			.fail(function(err){
				if( err !== "Record Not Found" ){ // Record Not Foundは無視してよい(初回起動を意味する)
					console.log( err ); // TODO: サーバにエラー通知が出来るしくみを確立したい
				}
				_this.trigger('ready', _this);
			});
	    }
	});

	return ImageDataModel;

})();
