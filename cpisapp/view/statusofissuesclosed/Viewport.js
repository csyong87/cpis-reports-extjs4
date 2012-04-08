Ext.define('CPIS.view.statusofissuesclosed.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'CPIS.view.statusofissuesclosed.SearchForm'
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
                xtype: 'statusofissuesclosedsearchform'
            }]
        };
        
        this.callParent();
    }
});