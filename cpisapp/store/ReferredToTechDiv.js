Ext.define('CPIS.store.ReferredToTechDiv', {
	extend: 'Ext.data.Store',
	model: 'CPIS.model.ReferredToTechDiv',
	requires: 'CPIS.model.ReferredToTechDiv',
	proxy: {
		type : 'ajax',
        url : 'cpisapp/data/referred-to-tech-div.json',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'divisions'
        }
	}
});