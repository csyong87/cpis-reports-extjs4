Ext.define('CPIS.model.AdhocIssueByCategory', {
	extend: 'Ext.data.Model',
	field: [{
		name: 'label',
		type: 'String'
	}, {
		name: 'count',
		type: 'int'
	}]
});