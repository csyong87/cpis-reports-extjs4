/**
 * This model represents a data for the all division kpi chart
 */
Ext.define('CPIS.model.AllDivisionKpi', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'label', //the label indicates the month - year, i.e. Jan-2012
		type: 'String'
	}, {
		name: 'percentage',
		type: 'float'
	}]
});