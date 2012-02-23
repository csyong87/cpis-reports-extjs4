Ext.define('CPIS.model.IssueByCategory', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'category', type: 'String'},
		{name: 'count', type: 'int'}
	]
});