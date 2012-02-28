Ext.define('CPIS.view.alldivisionkpi.AllDivisionKpiChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.alldivisionkpichart',
	animate : true,
	store : 'AllDivisionKpi',
	width : 400,
	height : 400,
	shadow : true,
	insetPadding : 60,
	style: 'background:#fff',
	axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['percentage'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: '% of Issues Closed',
        grid: true,
        minimum: 0,
        maximum: 100
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['label'],
        title: 'KPI for the Past 12 Months',
        label: {
            rotate: {
                degrees: -90
            }
        }
    }],
    series: [{
        type: 'column',
        axis: 'left',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 140,
          height: 28,
          renderer: function(storeItem, item) {
            this.setTitle(storeItem.get('label') + ': ' + storeItem.get('percentage') + '%');
          }
        },
        label: {
          display: 'insideEnd',
          'text-anchor': 'middle',
            field: 'percentage',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'vertical',
            color: '#333'
        },
        xField: 'label',
        yField: 'percentage',
    }]
});