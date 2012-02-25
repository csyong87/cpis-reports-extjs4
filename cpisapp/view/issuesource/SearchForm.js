/**
 * 
 */
Ext.define('CPIS.view.issuesource.SearchForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.issuesourcesearchform',
	frame:true,
	header: false,
	headerAsText : false,
	bodyStyle:'padding:5px 5px 0',
	width: 350,
	fieldDefaults: {
		msgTarget: 'side'
	},
	defaultType: 'textfield',
	items: [{
		xtype: 'combobox',
		fieldLabel: 'Division',
		name: 'division',
		store: 'Divisions',
		displayField: 'divisionName',
	    valueField: 'divisionCode',
	    queryMode: 'local',
	    allowBlank: false,
	    baseCls: 'fwd_floatLeft',
		anchor: '25%',
		labelWidth: 70,
		validator: function(val){
			if(val == null) {
				return 'This field is required';
			}
			return true;
		}
	},{
		xtype: 'combobox',
		fieldLabel: 'Month',
		name: 'month',
		store: 'Months',
		displayField: 'monthLongName',
	    valueField: 'monthIndex',
	    queryMode: 'local',
	    allowBlank: false,
	    baseCls: 'fwd_floatLeft',
		anchor: '20%',
		labelWidth: 50,
		validator: function(val){
			if(val == null) {
				return 'This field is required';
			}
			return true;
		}
	},{
		xtype: 'combobox',
		fieldLabel: 'Year',
		name: 'year',
		store: 'Years',
		displayField: 'year',
	    valueField: 'year',
		baseCls: 'fwd_floatLeft',
		anchor: '20%',
		queryMode: 'local',
		allowBlank: false,
		labelWidth: 50,
		validator: function(val){
			if(val == null) {
				return 'This field is required';
			}
			return true;
		}
	},{
		xtype: 'button',
		action: 'search',
		text: 'Search'
	},{
		xtype: 'button',
		action: 'export-to-xls',
		style: {marginLeft: '5px'},
		text: 'Export to Excel'
	}]
});