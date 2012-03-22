Ext.define('CPIS.view.adhocissuebycategory.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
       'CPIS.view.adhocissuebycategory.SearchForm',
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
                xtype: 'adhocissuebycategorysearchform'
            }]
        };
		
		this.callParent();
	}
});