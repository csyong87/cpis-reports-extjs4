Ext.define('CPIS.view.issuebycategory.Viewport', {
    extend: 'Ext.container.Viewport',
	requires: [
        'CPIS.view.issuebycategory.SearchForm',
        'CPIS.view.issuebycategory.Chart',
        'CPIS.view.issuebycategory.ChartData'
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
                xtype: 'issuebycategorysearchform'
            },{
				width: 800,
				xtype: 'issuebycategorychart'
			},{
				width: 600,
				xtype: 'issuecategorychartdata'
			}]
        };
		
		this.callParent();
	}
});