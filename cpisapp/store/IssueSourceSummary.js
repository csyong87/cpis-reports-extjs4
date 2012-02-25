/**
 * This store returns the break down of issues by sources by division.
 * Please refer to cpisapp/data/issue-source-summary.json for the json format 
 * used by this store
 */
Ext.define('CPIS.store.IssueSourceSummary', {
    extend: 'Ext.data.Store',
    model: 'CPIS.model.Division',
    requires: 'CPIS.model.Division',
     // Overriding the model's default proxy
    proxy : {
        type : 'ajax',
        url : 'cpisapp/data/issue-source-summary.json',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'divisions'
        }
    }
});