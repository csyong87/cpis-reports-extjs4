/**
 * This class represents a CPIS Division. 
 * 
 * This file is part of the CPIS reporting module.
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
	}, {
        name: 'issuesClosed',
        type : 'int'
    }, {
    	name: 'percentage',
		type: 'float'
    }],
	associations : [ {
		type : 'belongsTo',
		model : 'CPIS.model.IssueCategory'
	}, {
        type : 'hasMany',
        model : 'CPIS.model.IssueSource',
        name : 'issuesourcelist'
    }, {
        type : 'hasMany',
        model : 'CPIS.model.ReferredToTechDivSummary',
        name : 'techdivlist'
    },{
    	type : 'belongsTo',
        model : 'CPIS.model.Kpi'
    }]
});