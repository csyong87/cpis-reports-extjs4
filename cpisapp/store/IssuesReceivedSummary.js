Ext.define('CPIS.store.IssuesReceivedSummary', {
    extend: 'Ext.data.Store',
    requires: 'CPIS.model.IssuesReceivedSummary',
    model: 'CPIS.model.IssuesReceivedSummary',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'data'
        }
    }    
});