Ext.define('CPIS.controller.alldivisionkpi.AllDivisionKpi', {
	extend: 'Ext.app.Controller',
	stores: ['AllDivisionKpi'],
	onLaunch: function(){
		this.getAllDivisionKpiStore().load();
	},
	init: function(){
	}
});