/*
 * This file is part of the CPIS application.
 * 
 * Copyright (c) 2012 Mahindra Satyam
 * 
 * GNU General Public License Usage
 * This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.
 * 
 */
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