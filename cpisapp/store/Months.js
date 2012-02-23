/**
 * This class represents a gregorian calendar month
 */
Ext.define('CPIS.store.Months', {
    extend: 'Ext.data.Store',
    requires: 'CPIS.model.Month',
    model: 'CPIS.model.Month',

    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'cpisapp/data/months.json',
        reader: {
            type: 'json',
			root: 'monthlist'
        }
    }
});