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
 * This class is the entry point for the adhoc issue by category chart
 */
Ext.require('Ext.chart.*');
Ext.application({
    name: 'CPIS',
    appFolder: 'cpisapp',
	autoCreateViewport: false,
	controllers:  ['adhocissuebycategory.AdhocSearchFormController'],
	models: ['Division','Grc', 'Constituency'],
	stores: ['AdhocIssueByCategory', 'Divisions', 'Grcs', 'Constituencies'],
	launch: function() {
       Ext.create('CPIS.view.adhocissuebycategory.Viewport');
    }
});