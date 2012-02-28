Ext.define('CPIS.store.AllDivisionKpi', {
	extend: 'Ext.data.Store',
	model: 'CPIS.model.AllDivisionKpi',
	requires: 'CPIS.model.AllDivisionKpi',
	// Overriding the model's default proxy
    proxy : {
        type : 'ajax',
        url : 'cpisapp/data/all-division-kpi.json',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'divisionkpi'
        }
    }
});