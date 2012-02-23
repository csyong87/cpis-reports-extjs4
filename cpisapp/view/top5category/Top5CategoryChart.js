Ext.define('CPIS.view.top5category.Top5CategoryChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.top5categorychart',
	animate : true,
	store : 'IssueByCategory',
	width : 400,
	height : 400,
	shadow : true,
	insetPadding : 60,
	style: 'background:#fff',
	axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['count'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'Number of Issues',
        grid: true,
        minimum: 0
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['category'],
        title: 'Issue Categories'
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
            this.setTitle(storeItem.get('category') + ': ' + storeItem.get('count'));
          }
        },
        label: {
          display: 'insideEnd',
          'text-anchor': 'middle',
            field: 'count',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'vertical',
            color: '#333'
        },
        xField: 'category',
        yField: 'count'
    }]
});