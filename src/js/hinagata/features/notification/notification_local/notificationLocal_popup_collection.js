var Backbone = require('backbone');

var SpotModel = require('./notificationLocal_spot_model.js');

module.exports = (function () {
	var spotCollection = Backbone.Collection.extend({
		model: SpotModel
  	});

  	return spotCollection;
  
})();