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
 * This model represents a data for the all division kpi chart
 */
Ext.define('CPIS.model.Kpi', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'label', //the label indicates the month - year, i.e. Jan-2012
		type: 'String'
	}, {
		name: 'percentage',
		type: 'float'
	}, {
		name: 'count',
		type: 'int'
	}],
	associations : [ {
		type : 'hasMany',
		model : 'CPIS.model.Divisions',
		name : 'divisions'
	}]
});