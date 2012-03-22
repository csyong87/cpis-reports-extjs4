Ext.define('CPIS.store.Users', {
    extend: 'Ext.data.Store',
    requires: 'CPIS.model.User',
    model: 'CPIS.model.User',

    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'cpisapp/data/users.json',
        reader: {
            type: 'json',
			root: 'userlist'
        }
    }
});