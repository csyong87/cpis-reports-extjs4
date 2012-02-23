Ext.define('CPIS.view.top5category.Viewport', {
    extend: 'Ext.container.Viewport',
	requires: [
        'CPIS.view.top5category.SearchForm',
        'CPIS.view.top5category.Top5CategoryChart',
        'CPIS.view.top5category.ChartData'
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
                xtype: 'top5categorysearchform'
            },{
            	xtype: 'top5categorychart',
            	width: 800
            },{
            	xtype: 'top5categorychartdata',
            	width: 600
            }]
        };
		
		this.callParent();
	}
});