Ext.require('Ext.chart.*');
Ext.application({
    name: 'CPIS',
    appFolder: 'cpisapp',
    autoCreateViewport: false,
    controllers:  ['issuesource.IssueSource'],
    models: ['Division', 'Month', 'Year', 'IssueSource'],
    stores: ['Divisions', 'Months', 'Years', 'IssueSource'],
    launch: function() {
       Ext.create('CPIS.view.issuesource.Viewport');
    }
});