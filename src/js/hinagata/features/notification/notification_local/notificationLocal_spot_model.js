var Backbone = require('backbone');
module.exports = (function() {
	var SpotModel = Backbone.Model.extend({
		defaults: {
			spotId: "",
			name: "",
			locationType: "",
			location: "",
			accessPoint: "",
			tempSpotID: ""
		}
  	});

	return SpotModel;
  	
})();