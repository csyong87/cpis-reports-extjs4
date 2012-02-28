Ext.define('CPIS.view.alldivisionkpi.Viewport', {
    extend: 'Ext.container.Viewport',
	requires: [
        'CPIS.view.alldivisionkpi.AllDivisionKpiChart',
        'CPIS.view.alldivisionkpi.AllDivisionPanel'
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
                xtype: 'alldivisionkpipanel'
            }]
        };
		
		this.callParent();
	}
});