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