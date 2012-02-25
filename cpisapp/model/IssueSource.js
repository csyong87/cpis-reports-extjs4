Ext.define('CPIS.model.IssueSource', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'sourcecategory', type: 'String'}, 
        { name: 'count', type: 'int'}
    ],
    associations : [ {
        type : 'belongsTo',
        model : 'CPIS.model.Division'
    }]
    
});