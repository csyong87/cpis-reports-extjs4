Ext.define('CPIS.store.Divisions', {
    extend: 'Ext.data.Store',
    requires: 'CPIS.model.Division',
    model: 'CPIS.model.Division',

    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'cpisapp/data/managed-divisions.json',
        reader: {
            type: 'json',
			root: 'divisionlist'
        }
    }
});