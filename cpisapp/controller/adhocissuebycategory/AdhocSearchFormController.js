Ext.define('CPIS.controller.adhocissuebycategory.AdhocSearchFormController', {
	extend: 'Ext.app.Controller',
	stores: ['Divisions', 'Grcs', 'Constituencies', 
	         'AdhocIssueByCategory', 'Users', 'FeedbackSources'],
	onLaunch: function(){
		//initialize all the stores here
	},
	init: function(){
		//bind all control call back functions here
	}
});