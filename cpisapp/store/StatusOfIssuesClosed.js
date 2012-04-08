Ext.define('CPIS.store.StatusOfIssuesClosed', {
    extend: 'Ext.data.Store',
    requires: 'CPIS.model.StatusOfIssuesClosed',
    model: 'CPIS.model.StatusOfIssuesClosed',

    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'cpisapp/data/statusofissuesclosed.json',
        reader: {
            type: 'json',
            root: 'datalist'
        }
    }
});