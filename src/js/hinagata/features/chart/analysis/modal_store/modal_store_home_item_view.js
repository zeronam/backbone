var Backbone = require('backbone');
module.exports = (function() {
    var ModalStoreHomeItemView = Backbone.Marionette.ItemView.extend({
        template: require('./modal_store_home_template.html')
    });

    return ModalStoreHomeItemView;

})();