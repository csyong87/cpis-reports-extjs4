Ext.define('CPIS.store.FeedbackSources', {
    extend: 'Ext.data.Store',
    requires: 'CPIS.model.FeedbackSource',
    model: 'CPIS.model.FeedbackSource',

    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'cpisapp/data/getfeedbackssources.json',
        reader: {
            type: 'json',
			root: 'feedbacksourcelist'
        }
    }
});