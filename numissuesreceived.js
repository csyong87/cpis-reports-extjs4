Ext.require('Ext.chart.*');
Ext.application({
    name: 'CPIS',
    appFolder: 'cpisapp',
	autoCreateViewport: false,
	controllers:  ['numissuesreceived.NumIssuesReceived'],
	models: ['Division','IssuesReceived', 'Month', 'Year'],
	stores: ['IssuesReceived', 'Divisions', 'Months', 'Years'],
	launch: function() {
       Ext.create('CPIS.view.numissuesreceived.Viewport');
    }
});