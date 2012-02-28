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