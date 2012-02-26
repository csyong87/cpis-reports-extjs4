Ext.define('CPIS.view.referredtotechdiv.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'CPIS.view.referredtotechdiv.SearchForm'
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
                xtype: 'referredtotechdivsearchform'
            }]
        };
        
        this.callParent();
    }
});