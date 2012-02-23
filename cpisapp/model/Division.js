/**
 * This class represents a Division
 */
Ext.define('CPIS.model.Division', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'divisionCode',
		type : 'String'
	}, {
		name : 'divisionName',
		type : 'String'
	}, {
		name : 'issueCount',
		type : 'int'
	} ],
	associations : [ {
		type : 'belongsTo',
		model : 'CPIS.model.IssueCategory'
	}]

});