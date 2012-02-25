/**
 * Retrieves the summary of issues by source for all divisions.
 */
Ext.define('CPIS.store.IssueSource', {
    extend: 'Ext.data.Store',
    model: 'CPIS.model.IssueSource',
    requires: 'CPIS.model.IssueSource',
    // Overriding the model's default proxy
    proxy : {
        type : 'ajax',
        url : 'cpisapp/data/issue-source.json',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'issuesource'
        }
    }
});