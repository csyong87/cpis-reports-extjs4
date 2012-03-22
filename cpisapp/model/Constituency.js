Ext.define('CPIS.model.Constituency', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'consName',
		type: 'String'
	}, {
		name: 'consCode',
		type: 'String'
	}],
	associations:[{
		type : 'belongsTo',
        model : 'CPIS.model.Grc'
	}]
});