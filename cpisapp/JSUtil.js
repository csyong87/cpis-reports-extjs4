// Generate a model dynamically, provide fields
function modelFactory(name, fields) {
    return Ext.define(name, {
        extend: 'Ext.data.Model',
        fields: fields
    });
}