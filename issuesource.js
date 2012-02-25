Ext.require('Ext.chart.*');
Ext.application({
    name: 'CPIS',
    appFolder: 'cpisapp',
    autoCreateViewport: false,
    controllers:  ['issuesource.IssueSource'],
    models: ['Division','IssuesReceived', 'Month', 'Year'],
    stores: ['Divisions', 'Months', 'Years'],
    launch: function() {
       Ext.create('CPIS.view.issuesource.Viewport');
    }
});