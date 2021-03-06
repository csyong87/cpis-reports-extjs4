/**
 * The table displaying the top 5 issue category data
 */
Ext.define('CPIS.view.top5category.ChartData', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.top5categorychartdata',
	store : 'IssueByCategory',
	width: 600,
	height: 150,
	align: 'center',
	header: false,
	headerAsText : false,
	style: {marginLeft: '100px'},
	columns: [
  		{
  			text: 'Category',
  			width: 400,
  			sortable: false,
  			hideable: false,
  			dataIndex: 'category'
  		},
  		{
  			text: 'Count',
  			width: 198,
  			dataIndex: 'count'
  		}
  	]
});