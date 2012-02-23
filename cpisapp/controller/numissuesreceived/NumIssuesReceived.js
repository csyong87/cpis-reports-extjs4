/**
 * This controller is responsible for handling events at number of issues
 * received chart
 */
Ext.define('CPIS.controller.numissuesreceived.NumIssuesReceived', {
	extend : 'Ext.app.Controller',
	// ~ View References ==================================
	refs : [{
				selector : 'numissuesreceivedsearchform',
				ref : 'numissuesreceivedsearchform'
			}, {
				selector : 'numissuesreceivedsearchform combobox[name=division]',
				ref : 'selDivision'
			}, {
				selector : 'numissuesreceivedsearchform combobox[name=month]',
				ref : 'selMonth'
			}, {
				selector : 'numissuesreceivedsearchform combobox[name=year]',
				ref : 'selYear'
			}],
	stores : ['Divisions', 'IssuesReceived', 'Months', 'Years'],
	onLaunch : function() {
		var divisionsStore = this.getDivisionsStore();
		divisionsStore.load();

		var monthsStore = this.getMonthsStore();
		monthsStore.load();

		var yearsStore = this.getYearsStore();
		yearsStore.load();

		var issuesReceivedStore = this.getIssuesReceivedStore();
		issuesReceivedStore.on('load', this.onIssueReceivedStoreLoad, this);
		issuesReceivedStore.load();
	},
	init : function() {
		this.control({
					'numissuesreceivedsearchform button[action=search]' : {
						click : this.onNumIssuesReceivedSearch
					},
					'numissuesreceivedsearchform button[action=export-to-xls]' : {
						click : function() {
							// post to export to xls url
							window.location = '/TSTS';
						}
					}
				});
	},
	onNumIssuesReceivedSearch : function(selModel, selection) {
        var issuesReceivedStore = this.getIssuesReceivedStore();
        issuesReceivedStore.load();
	},
	onIssueReceivedStoreLoad : function(store, records, options) {
		var fields = [];
        store.each(function(issuecategory){
            var obj = {};
            obj['categoryname'] =  issuecategory.data.categoryname;
            Ext.each(issuecategory.raw.divisions, function(data, index){
                 obj[data.divisionName] = data.issueCount;
            });
            fields.push(obj);
        });
        console.log(fields);
        
        Ext.each(fields, function(field, index){
               console.log(field.categoryname);
        });
	}
});