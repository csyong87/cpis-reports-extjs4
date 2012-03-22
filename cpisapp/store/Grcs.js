/**
 * This file represents a GRC store
 */
Ext.define('CPIS.store.Grcs', {
	extend: 'Ext.data.Store',
	model: 'CPIS.model.Grc',
	requires: 'CPIS.model.Grc',
	
	// Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'cpisapp/data/managed-grcs.json',
        reader: {
            type: 'json',
			root: 'grclist'
        }
    }
});