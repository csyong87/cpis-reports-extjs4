/**
 * This store is responsible for retrieving the data for issues received chart
 */
Ext.define('CPIS.store.IssuesReceived', {
	extend : 'Ext.data.Store',
	requires : 'CPIS.model.IssuesReceived',
	model : 'CPIS.model.IssuesReceived',

	// Overriding the model's default proxy
	proxy : {
		type : 'ajax',
		url : 'cpisapp/data/issues-received.json',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'issuesreceived'
		}
	}
    //,
//	listeners : {
//		'load' : {
//			fn : function(store, records, options) {
//				store.each(function(obj){
//                    
//                });
//			},
//			scope: this
//		}
//	}
});