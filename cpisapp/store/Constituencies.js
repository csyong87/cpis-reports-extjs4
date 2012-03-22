Ext.define('CPIS.store.Constituencies', {
	extend: 'Ext.data.Store',
	model: 'CPIS.model.Constituency',
	requires: 'CPIS.model.Constituency',
	
	// Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'cpisapp/data/managed-constituencies.json',
        reader: {
            type: 'json',
			root: 'constituencies'
        }
    }
});