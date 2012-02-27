Ext.require('Ext.chart.*');
Ext.application({
    name: 'CPIS',
    appFolder: 'cpisapp',
    autoCreateViewport: false,
    controllers:  ['referredtotechdiv.ReferredToTechDiv'],
    models: ['Division', 'Month', 'Year', 'ReferredToTechDiv'],
    stores: ['Divisions', 'Months', 'Years', 'ReferredToTechDiv'],
    launch: function() {
       Ext.create('CPIS.view.referredtotechdiv.Viewport');
    }
});