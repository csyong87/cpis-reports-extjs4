Ext.define('CPIS.view.numissuesreceived.IssuesReceivedChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.issuesreceivedchart',
	animate : true,
	store : 'IssuesReceived',
	width : 400,
	height : 400,
	shadow : true,
	insetPadding : 60,
	legend: {
        position: 'right'
    },
    axes: [{
        type: 'Numeric',
        position: 'bottom',
        fields: ['Field1', 'Field2', 'Field3'],
        title: false,
        grid: true,
        label: {
            renderer: function(v) {
                return v;
            }
        },
        roundToDecimal: false
    }, {
        type: 'Category',
        position: 'left',
        fields: ['categoryname'],
        title: false
    }],
    series: [{
        type: 'bar',
        axis: 'bottom',
        gutter: 80,
        xField: 'categoryname',
        yField: ['sample'],
        stacked: true,
        tips: {
            trackMouse: true,
            width: 65,
            height: 28,
            renderer: function(storeItem, item) {
                this.setTitle(String(item.value[1] / 1000000) + 'M');
            }
        }
    }]
});