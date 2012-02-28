Ext.define('CPIS.store.DivisionKpi', {
	extend: 'Ext.data.Store',
	requires: 'CPIS.model.Kpi',
	model: 'CPIS.model.Kpi',
	proxy: {
		type: 'ajax',
        url: 'cpisapp/data/kpi-by-division.json',
        reader: {
            type: 'json',
			root: 'kpilist'
        }
	}
});