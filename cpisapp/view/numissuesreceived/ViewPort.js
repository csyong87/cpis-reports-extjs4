Ext.define('CPIS.view.numissuesreceived.Viewport', {
    extend: 'Ext.container.Viewport',
	requires: [
        'CPIS.view.numissuesreceived.SearchForm',
        'CPIS.view.numissuesreceived.IssuesReceivedChart'
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
                xtype: 'numissuesreceivedsearchform'
            }]
        };
		
		this.callParent();
	}
});