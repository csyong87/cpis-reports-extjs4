/**
 * This class is the entry point for the issue by category chart
 */
Ext.require('Ext.chart.*');
Ext.application({
    name: 'CPIS',
    appFolder: 'cpisapp',
	autoCreateViewport: false,
	controllers:  ['SearchFormController'],
	models: ['Division','IssueByCategory', 'Month', 'Year'],
	stores: ['IssueByCategory', 'Divisions', 'Months', 'Years'],
	launch: function() {
       Ext.create('CPIS.view.issuebycategory.Viewport');
    }
});