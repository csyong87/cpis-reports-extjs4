Ext.define('CPIS.view.adhocissuebycategory.SearchForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.adhocissuebycategorysearchform',
	frame:true,
	header: false,
	headerAsText : false,
	bodyStyle:'padding:5px 5px 0',
	width: 350,
	fieldDefaults: {
		msgTarget: 'side'
	},
	defaultType: 'textfield',
	items:[{
		xtype: 'datefield',
		anchor: '25%',
        fieldLabel: 'From',
        baseCls: 'fwd_floatLeft',
        name: 'from_date',
        labelWidth: 70,
        maxValue: new Date()
	}, {
		xtype: 'datefield',
        fieldLabel: 'To',
        anchor: '25%',
        baseCls: 'fwd_floatLeft',
        name: 'to_date',
        labelWidth: 70,
        maxValue: new Date()
	},{
		xtype: 'combobox',
		fieldLabel: 'Division',		
		name: 'division',
		store: 'Divisions',
		displayField: 'divisionName',
	    valueField: 'divisionCode',
	    queryMode: 'local',
	    baseCls: 'fwd_floatLeft',
		anchor: '25%',
		labelWidth: 70
	},{
		xtype: 'combobox',
		fieldLabel: 'GRC',		
		name: 'grc',
		store: 'Grcs',
		displayField: 'grcName',
	    valueField: 'grcCode',
	    queryMode: 'local',
	    baseCls: 'fwd_floatLeft',
		anchor: '25%',
		labelWidth: 70
	},{
		xtype: 'combobox',
		fieldLabel: 'Constituency',		
		name: 'constituency',
		store: 'Constituencies',
		displayField: 'consName',
	    valueField: 'consCode',
	    queryMode: 'local',	   
	    baseCls: 'fwd_floatLeft',
		anchor: '25%',
		labelWidth: 70
	},{
		xtype: 'combobox',
		fieldLabel: 'User',		
		name: 'user',
		store: 'Users',
		displayField: 'username',
	    valueField: 'userid',
	    queryMode: 'local',
	    baseCls: 'fwd_floatLeft',
		anchor: '25%',
		labelWidth: 70
	},{
		xtype: 'combobox',
		fieldLabel: 'Feedback Src',		
		name: 'feedback_source',
		store: 'FeedbackSources',
		displayField: 'name',
	    valueField: 'code',
	    queryMode: 'local',
	    baseCls: 'fwd_floatLeft',
		anchor: '%25',
		labelWidth: 80
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