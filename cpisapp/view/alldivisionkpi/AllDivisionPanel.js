Ext.define('CPIS.view.alldivisionkpi.AllDivisionPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'alldivisionkpipanel',
	title: 'CPN Divisions KPI for the Past 12 Months',
	width: 800,	
	tbar: [{
		xtype: 'button',
		id: 'exportToXlsButton',
        text: 'Export To Excel',
        handler: function() {
        }
    }],
    items: [
	{
        xtype: 'alldivisionkpichart'
    }
	]
});