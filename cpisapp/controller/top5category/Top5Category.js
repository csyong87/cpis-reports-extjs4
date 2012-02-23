/**
 * This controller handles events / interactions related to the Top5Category
 * Charts
 * 
 * @author Christian
 */
Ext.define('CPIS.controller.top5category.Top5Category', {
	extend : 'Ext.app.Controller',

	// ~ View References ==================================
	refs : [ {
		selector : 'top5categorysearchform',
		ref : 'top5categorysearchform'
	}, {
		selector : 'top5categorysearchform combobox[name=division]',
		ref : 'selDivision'
	}, {
		selector : 'top5categorysearchform combobox[name=month]',
		ref : 'selMonth'
	}, {
		selector : 'top5categorysearchform combobox[name=year]',
		ref : 'selYear'
	} ],

	// ~ Store Definitions =================================
	stores : [ 'Divisions', 'IssueByCategory', 'Months', 'Years' ],
	onLaunch : function() {
		var divisionsStore = this.getDivisionsStore();
		divisionsStore.load();

		var monthsStore = this.getMonthsStore();
		monthsStore.load();

		var yearsStore = this.getYearsStore();
		yearsStore.load();
		
		var issueByCategoryStore = this.getIssueByCategoryStore();
		issueByCategoryStore.load();
	},
	init : function() {
		this.control({
			'top5categorysearchform button[action=search]' : {
				click : this.onTop5CategorySearch
			},
			'top5categorysearchform button[action=export-to-xls]' : {
				click : function() {
					// post to export to xls url
					window.location = '/TSTS';
				}
			}
		});
	},

	onTop5CategorySearch : function(selModel, selection) {
		var isValid = true;

		// access view references
		var selDivision = this.getSelDivision();
		var selMonth = this.getSelMonth();
		var selYear = this.getSelYear();

		// validate search form fields
		var divisionErrors = selDivision.getErrors();
		if (divisionErrors.length > 0) {
			selDivision.markInvalid(divisionErrors);
			isValid = false;
		}

		var monthErrors = selMonth.getErrors();
		if (monthErrors.length) {
			selMonth.markInvalid(monthErrors);
			isValid = false;
		}

		var yearErrors = selYear.getErrors();
		if (yearErrors.length > 0) {
			selYear.markInvalid(yearErrors);
			isValid = false;
		}

		if (isValid) {
			var issueByCategoryStore = this.getIssueByCategoryStore();
			issueByCategoryStore.load({
				params : {
					division : selDivision.value,
					month : selMonth.value,
					year : selYear.value
				}
			});
		} else {
			Ext.MessageBox.show({
				title : 'Validation Error',
				msg : 'Please fill in required fields first.',
				buttons : Ext.MessageBox.OK,
				icon : 'Error'
			});
		}
	}
});