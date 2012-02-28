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