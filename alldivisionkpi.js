Ext.require('Ext.chart.*');
Ext.application({
    name: 'CPIS',
    appFolder: 'cpisapp',
	autoCreateViewport: false,
	controllers:  ['alldivisionkpi.AllDivisionKpi'],
	models: ['Division','AllDivisionKpi', 'Month', 'Year'],
	stores: ['AllDivisionKpi', 'Divisions', 'Months', 'Years'],
	launch: function() {
       Ext.create('CPIS.view.alldivisionkpi.Viewport');
    }
});