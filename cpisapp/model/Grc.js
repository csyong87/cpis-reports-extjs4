/**
 * This model represents an instance of a GRC
 */
Ext.define('CPIS.model.Grc', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'grcName',
		type: 'String'
	}, {
		name: 'grcCode',
		type: 'String'
	}],
	associations: [{
		type : 'belongsTo',
		model : 'CPIS.model.Division'
	},{
		type : 'hasMany',
		model : 'CPIS.model.Constituency',
		name : 'constituencies'
	}]
});