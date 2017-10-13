var Backbone = require('backbone');
var BaseCollection = require('../../models/base_collection.js');
var ImageListModel = require('./image_list_model.js');
module.exports = (function () {
	var ImageListCollection1 = BaseCollection.extend({
		model: ImageListModel
  	});

  	return ImageListCollection1;
  
})();