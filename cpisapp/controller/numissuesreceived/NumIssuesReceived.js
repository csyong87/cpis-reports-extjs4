/**
 * This controller is responsible for handling events at number of issues
 * received chart
 */
Ext.define('CPIS.controller.numissuesreceived.NumIssuesReceived', {
	extend : 'Ext.app.Controller',
	// ~ View References ==================================
	refs : [{
		selector : 'numissuesreceivedsearchform',
		ref : 'numissuesreceivedsearchform'
	}, {
		selector : 'numissuesreceivedsearchform combobox[name=division]',
		ref : 'selDivision'
	}, {
		selector : 'numissuesreceivedsearchform combobox[name=month]',
		ref : 'selMonth'
	}, {
		selector : 'numissuesreceivedsearchform combobox[name=year]',
		ref : 'selYear'
	}, {
		selector: 'issuesreceivedchart',
		ref: 'stackedBarChart'
	}, {
		selector: 'viewport > panel',
		ref: 'viewPort'
	}],
	stores : ['Divisions', 'IssuesReceived', 'Months', 'Years', 'StackedBarChartStore'],
	onLaunch : function() {
		var divisionsStore = this.getDivisionsStore();
		divisionsStore.load();

		var monthsStore = this.getMonthsStore();
		monthsStore.load();

		var yearsStore = this.getYearsStore();
		yearsStore.load();

		var issuesReceivedStore = this.getIssuesReceivedStore();
		issuesReceivedStore.on('load', this.onIssueReceivedStoreLoad, this);
		issuesReceivedStore.load();
	},
	init : function() {
		this.control({
			'numissuesreceivedsearchform button[action=search]' : {
				click : this.onNumIssuesReceivedSearch
			},
			'numissuesreceivedsearchform button[action=export-to-xls]' : {
				click : function() {
					// post to export to xls url
					window.location = '/TSTS';
				}
			}
		});
	},
	onNumIssuesReceivedSearch : function(selModel, selection) {
		var issuesReceivedStore = this.getIssuesReceivedStore();
		issuesReceivedStore.load();
	},

	/**
	 * This method is bounded to the 'load' event of the IssueReceived store.
	 * Called whenever IssuesReceived store is refreshed.
	 * 
	 * Transforms the data from a nested model (IssuesReceived <- Division) to a
	 * flat model and
	 * 
	 * @param {}
	 *            store
	 * @param {}
	 *            records
	 * @param {}
	 *            options
	 */
	onIssueReceivedStoreLoad : function(store, records, options) {
		var fields = [];
		var data = [];
		var yAxisLabel = [];
		var data_fields = [];
		
		var hasIdentifiedFields = false;
		fields.push({name: 'categoryname', type: 'String'});
		store.each(function(issuecategory) {
			var obj = new Object();
			obj['categoryname'] = issuecategory.data.categoryname;
            var dispFields = [];
			var dataIdxFields = [];
			yAxisLabel = [];
			
			Ext.each(issuecategory.raw.divisions, function(data, index) {
			    obj['data_idx_' + index] = data.issueCount;
			    
			    if(!hasIdentifiedFields){
			    	fields.push({name : 'data_idx_' + index, type: 'String'});
			    }
			    var isNew = true;
			    for(i = 0; i < data_fields.length; i++) {
			    	if('data_idx_' + index == data_fields[i]) {
			    		isNew = false;
			    	}
			    }
			    
			    if(isNew){
			    	data_fields.push('data_idx_' + index);
			    }
			    
		        dispFields.push(data.divisionName);
		        yAxisLabel.push(data.divisionName);
				dataIdxFields.push('data_idx_' + index);
			});
			
			
//			 if(!hasIdentifiedFields){
//	            obj['displayfields'] = dispFields;
//	            fields.push({name:'displayfields', type: 'auto'});
//				obj['datafields'] = dataIdxFields;
//				fields.push({name : 'datafields', type: 'auto'});
//			 }
			 
			hasIdentifiedFields = true;
			
			data.push(obj);
			
		});
		console.log(data);
		console.log(fields);
		var model = Ext.define('DynamicModel', {
			extend : 'Ext.data.Model',
			fields: fields
		});
		
		var dataWrapper = new Object();
		dataWrapper['data'] = data;
		
		console.log(dataWrapper);
		
		//dynamic store
		var dynaStore = Ext.define('DynaStore', {
			extend: 'Ext.data.Store',
			model: model,
			require: model,
		    data: dataWrapper, 
		    proxy: {
		    	type: 'memory',
		    	reader: {
		            type: 'json',
					root: 'data'					
		        }
		    }
		});
		
		dynaStore = new dynaStore();
		console.log('dynastore: ' + dynaStore);
//		var dynaStore = Ext.create('CPIS.store.StackedBarChartStore');
//		dynaStore.data = dataWrapper;
		console.log(data_fields);
		var stackedBar = Ext.define('StackedBar', {
			extend: 'Ext.chart.Chart',
			alias: 'widget.issuesreceivedchart',
			animate : true,
			store : dynaStore,
			width : 800,
			height : 400,
			shadow : true,
			insetPadding : 60,
			legend: {
		        position: 'right'
		    },
		    axes: [{
		        type: 'Numeric',
		        position: 'bottom',
		        fields: data_fields,
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
		        yField: data_fields,
		        stacked: true,
		        orientation: 'vertical',
		        tips: {
		            trackMouse: true,
		            width: 65,
		            height: 28,
		            renderer: function(storeItem, item) {
		                this.setTitle(String(item.value[1]));
		            }
		        }
		    }]
		});
		
		var viewPort = this.getViewPort();
		viewPort.add(new stackedBar());
		
		
	}
});