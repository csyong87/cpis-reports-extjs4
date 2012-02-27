Ext.define('CPIS.store.ReferredToTechDivSummary', {
	extend: 'Ext.data.Store',
	model: 'CPIS.model.ReferredToTechDivSummary',
	requires: 'CPIS.model.ReferredToTechDivSummary',
	proxy: {
		type : 'ajax',
        url : 'cpisapp/data/referred-to-tech-div-summary.json',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'divisions'
        }
	}
});