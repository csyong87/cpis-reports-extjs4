/**
 * This controller handles the events for the Issue by category search form
 * field
 * 
 * @author Christian
 */
Ext.define('CPIS.controller.SearchFormController', {
	extend : 'Ext.app.Controller',

	// ~ View References ==================================
	refs : [ {
		selector : 'issuebycategorysearchform',
		ref : 'issuebycategorysearchform'
	}, {
		selector : 'issuebycategorysearchform combobox[name=division]',
		ref : 'selDivision'
	}, {
		selector : 'issuebycategorysearchform combobox[name=month]',
		ref : 'selMonth'
	}, {
		selector : 'issuebycategorysearchform combobox[name=year]',
		ref : 'selYear'
	} ],

	// ~ Store Definitions =================================
	stores : [ 'Divisions', 'IssueByCategory', 'Months', 'Years' ],

	/**
	 * Called by the ExtJS Framework after the controllers, models and stores
	 * have been initialized
	 */
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
			'issuebycategorysearchform button[action=search]' : {
				click : this.onIssueByCategorySearch
			},
			'issuebycategorysearchform button[action=export-to-xls]' : {
				click : function() {
					// post to export to xls url
					window.location = '/TSTS';
				}
			}
		});

	},

	onIssueByCategorySearch : function(selModel, selection) {
		var isValid = true;
		
		//access view references
		var selDivision = this.getSelDivision();
		var selMonth = this.getSelMonth();
		var selYear = this.getSelYear();
		
		//validate search form fields
		var divisionErrors = selDivision.getErrors();
		if(divisionErrors.length > 0) {
			selDivision.markInvalid(divisionErrors);
			isValid = false;
		}
		
		var monthErrors = selMonth.getErrors();
		if(monthErrors.length) {
			selMonth.markInvalid(monthErrors);
			isValid = false;
		}
		
		var yearErrors = selYear.getErrors();
		if(yearErrors.length > 0) {
			selYear.markInvalid(yearErrors);
			isValid = false;
		}
		
		if(isValid) {
			var issueByCategoryStore = this.getIssueByCategoryStore();
			issueByCategoryStore.load({params:{
			     division: selDivision.value, 
				 month: selMonth.value, 
				 year: selYear.value
                }
            });
		} else {
			 Ext.MessageBox.show({
				title: 'Validation Error',
				msg: 'Please fill in required fields first.',
				buttons: Ext.MessageBox.OK,
				icon: 'Error'
			 });
		}
	}
});