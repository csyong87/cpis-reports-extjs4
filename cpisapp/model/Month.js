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
 * This class represents a month.
 * 
 * This class has the following fields:
 * 
 * 1. monthIndex, int - represents the ordinal position of the month as
 * represented in the Gregorian Calendar. Ex. 1 for Jan, 2 for Feb ...
 * 
 * 2. monthShortName, String - The month's short name. I.e. Jan, Feb, Mar, Apr
 * 
 * 3. monthLongName, String - The months long name. I.e January, February, March
 */
Ext.define('CPIS.model.Month', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'monthIndex',
		type : 'int'
	}, {
		name : 'monthShortName',
		type : 'String'
	}, {
		name : 'monthLongName',
		type : 'String'
	} ]
});