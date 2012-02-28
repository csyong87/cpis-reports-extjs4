Ext.require('Ext.chart.*');
Ext.application({
    name: 'CPIS',
    appFolder: 'cpisapp',
	autoCreateViewport: false,
	controllers:  ['top5category.Top5Category'],
	models: ['Division','IssueByCategory', 'Month', 'Year'],
	stores: ['IssueByCategory', 'Divisions', 'Months', 'Years'],
	launch: function() {
       Ext.create('CPIS.view.top5category.Viewport');
    }
});