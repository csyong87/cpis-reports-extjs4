/**
 * 
 */
Ext.define('CPIS.store.StackedBarChartStore', {
    extend: 'Ext.data.Store',
    requires: 'CPIS.model.DynamicField',
    model: 'CPIS.model.DynamicField',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});