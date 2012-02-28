Ext.define('CPIS.view.alldivisionkpi.Viewport', {
    extend: 'Ext.container.Viewport',
	requires: [
        'CPIS.view.alldivisionkpi.AllDivisionKpiChart'
    ],
	layout: 'fit',
	initComponent: function() {
		 this.items = {
            xtype: 'panel',
            
            layout: {
                type: 'vbox'//,
                //align: 'stretch'
            },
            items: [{
                width: 800,
                xtype: 'alldivisionkpichart'
            }]
        };
		
		this.callParent();
	}
});