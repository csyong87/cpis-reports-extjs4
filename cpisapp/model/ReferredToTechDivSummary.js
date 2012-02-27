Ext.define('CPIS.model.ReferredToTechDivSummary', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'techdiv', type: 'String'}, 
        { name: 'count', type: 'int'}
    ],
    associations : [ {
        type : 'belongsTo',
        model : 'CPIS.model.Division'
    }]
});