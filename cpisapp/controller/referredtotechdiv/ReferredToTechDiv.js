Ext.define('CPIS.controller.referredtotechdiv.ReferredToTechDiv', {
	extend : 'Ext.app.Controller',
	// ~ View refs =====================================

	// ~ Store definitions ===================================
	stores : [ 'Divisions', 'ReferredToTechDiv', 'Months', 'Years' ],

	// ~ Initialization methods =========================================

	/**
	 * In this method are stores (remote) being initialized.
	 */
	onLaunch : function() {
		this.getDivisionsStore().load();
		this.getMonthsStore().load();
		this.getYearsStore().load();
		this.getReferredToTechDivStore().load();
	},

	/**
	 * Bind call back handlers to UI Views
	 */
	init : function() {
		this.control({
			'referredtotechdivsearchform button[action=search]' : {
				click : this.onReferredToTechDivSearch
			},
			'referredtotechdivsearchform button[action=export-to-xls]' : {
				click : function() {
					// post to export to xls url
					window.location = '/TSTS';
				}
			}
		});
	},
	
	onReferredToTechDivSearch: function(selModel, selection){
		
	}
});