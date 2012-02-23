/**
 * 
 */
Ext.define('CPIS.store.StackedBarChartStore', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});