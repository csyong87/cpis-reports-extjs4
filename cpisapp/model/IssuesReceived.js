/**
 * This class represents an issue category.
 */
Ext.define('CPIS.model.IssuesReceived', {
	extend : 'Ext.data.Model',
	fields : [ 'categoryname' ],
	associations : [ {
		type : 'hasMany',
		model : 'CPIS.model.Divisions',
		name : 'divisions'
	} ]
});