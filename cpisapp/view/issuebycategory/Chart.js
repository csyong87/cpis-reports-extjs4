/**
 * The Issue Category Chart Definition. Displays a pie chart based on the
 * configured store.
 * 
 * @author Christian
 */
Ext.define('CPIS.view.issuebycategory.Chart', {
	extend : 'Ext.chart.Chart',
	alias : 'widget.issuebycategorychart',
	//id : 'chartCmp',
	animate : true,
	store : 'IssueByCategory',
	width : 400,
	height : 400,
	shadow : true,
	legend : {
		position : 'right'
	},
	insetPadding : 60,
	theme : 'Base:gradients',
	series : [ {
		type : 'pie',
		field : 'count',
		showInLegend : true,
		donut : false,
		tips : {
			trackMouse : true,
			width: 200,
            height: 50,
			renderer : function(storeItem, item) {
				// calculate percentage.
				var total = 0;
                
                var store = Ext.data.StoreManager.lookup('IssueByCategory');
				    store.each(function(rec) {
                    total += rec.get('count');
				});
				this.setTitle(storeItem.get('category') + ':'+ Math.round(storeItem.get('count') / total * 100) + '%');
			}
		},
		highlight : {
			segment : {
				margin : 20
			}
		},
		label : {
			field : 'category',
			display : 'rotate',
			contrast : true,
			font : '12px Arial'
		}
//        ,
//        listeners : {
//			itemmousedown : function(a, b, c, d, e) {
//				for ( var x in a) {
//					if (x == 'storeItem') {
//                        //alert(x);
//                        this.fireEvent('categoryselected', x);
//					}
//				}
//			}
//		}
	} ]
});