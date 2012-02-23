Ext.define('CPIS.store.IssueByCategory', {
    extend: 'Ext.data.Store',
    requires: 'CPIS.model.IssueByCategory',
    model: 'CPIS.model.IssueByCategory',

    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'cpisapp/data/issue-by-category.json',
        actionMethods :{
            read   : 'POST'
        },
        reader: {
            type: 'json',
			root: 'chartdata'
        }
    }
});