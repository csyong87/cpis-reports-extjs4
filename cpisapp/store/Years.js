Ext.define('CPIS.store.Years', {
    extend: 'Ext.data.Store',
    requires: 'CPIS.model.Year',
    model: 'CPIS.model.Year',

    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'cpisapp/data/years.json',
        reader: {
            type: 'json',
			root: 'yearlist'
        }
    }
});