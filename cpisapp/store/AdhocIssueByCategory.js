Ext.define('CPIS.store.AdhocIssueByCategory', {
	extend: 'Ext.data.Store',
	model: 'CPIS.model.AdhocIssueByCategory',
	requires: 'CPIS.model.AdhocIssueByCategory',
	// Overriding the model's default proxy
    proxy : {
        type : 'ajax',
        url : 'cpisapp/data/adhoc-issuebycategory-data.json',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'datalist'
        }
    }
});