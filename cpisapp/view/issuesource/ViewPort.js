Ext.define('CPIS.view.issuesource.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'CPIS.view.issuesource.SearchForm',
        'CPIS.view.issuesource.IssueSourceChart'
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
                xtype: 'issuesourcesearchform'
            }, {
                width: 800,
                xtype: 'issuesourcechart'
            }]
        };
        
        this.callParent();
    }
});