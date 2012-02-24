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
	stores : ['Divisions', 'IssuesReceived', 'Months', 'Years'],
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
		var data_fields = [];
        var legend = [];
		var hasIdentifiedFields = false;
		fields.push({name: 'categoryname', type: 'String'});
		store.each(function(issuecategory) {
			var obj = new Object();
			obj['categoryname'] = issuecategory.data.categoryname;
           
			var dataIdxFields = [];
			
			Ext.each(issuecategory.raw.divisions, function(data, index) {
			    obj['data_idx_' + index] = data.issueCount;
			    
			    if(!hasIdentifiedFields){
			    	fields.push({name : 'data_idx_' + index, type: 'String'});
                    legend.push(data.divisionName);
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
			    
		       
		        
				dataIdxFields.push('data_idx_' + index);
			});
			
			hasIdentifiedFields = true;
			
			data.push(obj);
			
		});
		
		var model = Ext.define('DynamicModel', {
			extend : 'Ext.data.Model',
			fields: fields
		});
		
		var dataWrapper = new Object();
		dataWrapper['data'] = data;
		
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
		        position: 'left',
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
		        position: 'bottom',
		        fields: ['categoryname'],
		        title: false
		    }],
		    series: [{
		        type: 'column',
		        axis: 'bottom',
		        gutter: 80,
		        xField: 'categoryname',
		        yField: data_fields,
                title: legend,
		        stacked: true,
		        tips: {
		            trackMouse: true,
		            width: 80,
		            height: 28,
		            renderer: function(storeItem, item) {
		                this.setTitle(String(item.value[1]) + ' issues');
		            }
		        }
		    }]
		});
		
		var viewPort = this.getViewPort();
        viewPort.remove(this.getStackedBarChart());
		viewPort.add(new stackedBar());
		
		
	}
});