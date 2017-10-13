var Backbone = require('backbone');
module.exports = (function() {
    var ModalStoreEditItemView = Backbone.Marionette.ItemView.extend({
        template: require('./modal_store_edit_template.html')
    });

    return ModalStoreEditItemView;

})();