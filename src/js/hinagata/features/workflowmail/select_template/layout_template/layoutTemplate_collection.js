var Backbone = require('backbone');
var BaseCollection = require('../../../../models/base_collection.js');
var LayoutTemplateModel = require('./layoutTemplate_model.js');
module.exports = (function () {
  var LayoutTemplateCollection = BaseCollection.extend({
    model: LayoutTemplateModel
  });

  return LayoutTemplateCollection;
  
})();