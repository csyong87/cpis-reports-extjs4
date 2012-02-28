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
 * This is the main javascript file for Division KPI.
 */
Ext.require('Ext.chart.*');
Ext.application({
    name: 'CPIS',
    appFolder: 'cpisapp',
	autoCreateViewport: false,
	controllers:  ['alldivisionkpi.AllDivisionKpi'],
	models: ['Division', 'Kpi', 'Month', 'Year'],
	stores: ['AllDivisionKpi', 'DivisionKpi' ,'Divisions', 'Months', 'Years'],
	launch: function() {
       Ext.create('CPIS.view.alldivisionkpi.Viewport');
    }
});