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
	},{
		selector : 'numissuesreceivedsearchform combobox[name=month]',
		ref : 'selMonth'
	}, {
		selector : 'numissuesreceivedsearchform combobox[name=year]',
		ref : 'selYear'
	}, {
		selector: 'viewport > panel',
		ref: 'viewPort'
	}],
    
    // ~ Store definitions ===================================
    
	stores : ['Divisions', 'IssuesReceived', 'Months', 'Years'],
    
    // ~ Initialization methods =========================================
    
	onLaunch : function() {
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
    
    // ~ Callback handler methods ===================================================
    
	onNumIssuesReceivedSearch : function(selModel, selection) {
		var issuesReceivedStore = this.getIssuesReceivedStore();
		issuesReceivedStore.load();
	},

	/**
	 * This method is bounded to the 'load' event of the IssueReceived store.
	 * Called whenever IssuesReceived store is refreshed.
	 * 
	 * Transforms the data from a nested model (IssuesReceived <- Division) to a
	 * flat model
	 * 
     * - Do i care to move the content of this method to a helper class? Lols
     * 
	 * @param {}
	 *            store
	 * @param {}
	 *            records
	 * @param {}
	 *            options
	 */
	onIssueReceivedStoreLoad : function(store, records, options) {
		var data = []; //Holds the chart's data
		var data_fields = []; //Since a javascript object property cannot have spaces, we need to mask it
        var legend = []; //Holds the chart's legend array
        
		var hasIdentifiedFields = false;
        var fieldAliasToDisplayName = new Object();
        
        // the array used to hold the field definitions for the dynamic model used by the issues received chart 
		var fields = [{name: 'categoryname', type: 'String'}];
        
        // the array used to hold the field definitions for the dynamic model used by the issues received summary
        var summary_fields = [{name: 'division', type: 'String'}, {name: 'issuesClosed', type: 'int'}];
        
        //
        //{division, total_1, total_2, total_3}
        //
        var summary_data = [];
		store.each(function(issuecategory, categoryIdx) {
			var obj = new Object();
			obj['categoryname'] = issuecategory.data.categoryname;
            
            var categoryIdxField = 'category_' + categoryIdx;
            summary_fields.push({name: categoryIdxField, type: 'String'});
            
           
			Ext.each(issuecategory.raw.divisions, function(data, index) {
                // define the field alias
                var fieldname = 'data_idx_' + index;
			    
                obj[fieldname] = data.issueCount;
                
                //check if we have an instance of the division
                var summaryDataFound = -1;
                for(var i = 0; i < summary_data.length; i++) {
                    if(summary_data[i].division == data.divisionName) {
                        summaryDataFound = i;
                        break;
                    }
                }                
                
                if(summaryDataFound > -1) {
                    //we have an instance of the division
                    //cool, we just have to pull up that record, add up the issues closed
                    //and create a new field for the new category and assign the issue count
                    var summaryObj = summary_data[i];
                    summaryObj['issuesClosed'] =  summaryObj['issuesClosed'] + data.issuesClosed;
                    summaryObj[categoryIdxField] = data.issueCount;
                   
                } else {
                    //we dont have an instance of the division yet; We have to create
                    var summaryObj = new Object();
                    summaryObj['division'] = data.divisionName;
                    summaryObj[categoryIdxField] = data.issueCount;
                    summaryObj['issuesClosed'] = data.issuesClosed;
                    summary_data.push(summaryObj);
                }
                
                if(!hasIdentifiedFields){
			    	fields.push({name : fieldname, type: 'String'});
                    legend.push(data.divisionName);
                    fieldAliasToDisplayName[fieldname] = data.divisionName;
			    }
                
			    var isNew = true;
			    for(var i = 0; i < data_fields.length; i++) {
			    	if(fieldname == data_fields[i]) {
			    		isNew = false;
                        break;
			    	}
			    }
			    
			    if(isNew){
			    	data_fields.push(fieldname);
			    }
                
                //issues received summary section
                
			});
			
			hasIdentifiedFields = true;
			
			data.push(obj);
		});
		
        console.log(summary_data);
        
        // ~ Dynamic model definitions ============================
        
		var model = Ext.define('DynamicModel', {
			extend : 'Ext.data.Model',
			fields: fields
		});
		
        var summaryModel = Ext.define('SummaryModel', {
            extend: 'Ext.data.Model', 
            fields: summary_fields
        });
        
        // ~ Dynamic store instances ==================================
        var dataWrapper = new Object();
        dataWrapper['data'] = data;
        
		var dynaStore = Ext.create('Ext.data.Store', {
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
		
      
        
        //Retrieve the reference of the chart and data grid
        var tableDataRef = Ext.getCmp('issuesreceivedtabledata');
        var issuesReceivedChartRef = Ext.getCmp('issuesreceivedchart')
        
        var viewPort = this.getViewPort();
        
        // ~ Dynamic component instances ==================================
        
        //check if we have a valid reference of the chart and data grid
        //if we have, unregister it from the component manager because
        //we want to create a new component of the same id
        if(tableDataRef && issuesReceivedChartRef){
            Ext.ComponentManager.unregister(tableDataRef);
            Ext.ComponentManager.unregister(issuesReceivedChartRef);
            viewPort.remove(tableDataRef);
            viewPort.remove(issuesReceivedChartRef);
        }
        
		var stackedBar = Ext.create('Ext.chart.Chart', {
			alias: 'widget.issuesreceivedchart',
            id: 'issuesreceivedchart',
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
		
        var columns = []; //Holds the dynamic table's columns
        
        //define the first column
        var category_column = {
            text: 'Issue Category',
            width: 298,
            sortable: false,
            hideable: false,
            dataIndex: 'categoryname'
        };
        
        //The rest of the columns
        var statistics_column = [];
        for (var field in fieldAliasToDisplayName){
            statistics_column.push({
                header: fieldAliasToDisplayName[field],
                width: 100,
                sortable: false,
                hideable: false,
                dataIndex: field,
                field: {
	                xtype: 'numberfield'
	            }
            });
        }
        
        columns.push([
            category_column,
            statistics_column
        ]);
            
        var tableData = Ext.create('Ext.grid.Panel', {
		    store: dynaStore,
            id: 'issuesreceivedtabledata',
		    width: '100%',
		    height: 200,
		    title: 'Issues Received by Division',
		    columns: columns
		});
        
      
		viewPort.add(stackedBar);
		viewPort.add(tableData);
		
	}
});