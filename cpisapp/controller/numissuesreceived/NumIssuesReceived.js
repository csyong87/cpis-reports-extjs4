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
	stores : ['Divisions', 'IssuesReceived', 'Months', 'Years', 'StackedBarChartStore'],
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

	/**
	 * This method is bounded to the 'load' event of the IssueReceived store.
	 * Called whenever IssuesReceived store is refreshed.
	 * 
	 * Transforms the data from a nested model (IssuesReceived <- Division) to a
	 * flat model and
	 * 
	 * @param {}
	 *            store
	 * @param {}
	 *            records
	 * @param {}
	 *            options
	 */
	onIssueReceivedStoreLoad : function(store, records, options) {
		var fields = [];
		store.each(function(issuecategory) {
			var obj = {};
			obj['categoryname'] = issuecategory.data.categoryname;
			Ext.each(issuecategory.raw.divisions,
					function(data, index) {
						obj[data.divisionName] = data.issueCount;
					});
			fields.push(obj);
		});
		console.log(fields);
        //var stackedBarChartStore = this.getStackedBarChartStoreStore();
        //stackedBarChartStore.loadData(fields);
        Ext.data.StoreManager.lookup('StackedBarChartStore').loadRawData(fields);
        //console.log(stackedBarChartStore);
	}
});