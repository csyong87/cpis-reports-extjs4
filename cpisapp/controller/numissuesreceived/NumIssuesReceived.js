/*
 * This file is part of the CPIS application.
 * 
 * Copyright (c) 2012 Mahindra Satyam
 * 
 * GNU General Public License Usage
 * This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.
 * 
 */
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
    
    /**
     * In this method are stores (remote) being called.
     */
	onLaunch : function() {
		var monthsStore = this.getMonthsStore();
		monthsStore.load();

		var yearsStore = this.getYearsStore();
		yearsStore.load();

		var issuesReceivedStore = this.getIssuesReceivedStore();
		issuesReceivedStore.on('load', this.onIssueReceivedStoreLoad, this);
		issuesReceivedStore.load();
	},
    
    /**
     * Bind call back handlers to UI Views
     */
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
     * TODO - Do i care to refactor this method? Lols
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
        var categoryIdxLabelMap = new Object();
        // the array used to hold the field definitions for the dynamic model used by the issues received chart 
		var chartFields = [{name: 'categoryname', type: 'String'}];
        
        // the array used to hold the field definitions for the dynamic model used by the issues received summary
        var summaryFields = [{name: 'division', type: 'String'}];
        
        // The object to hold the total of issues closed per category
        var issuesClosed = new Object({'division' : 'Total Issues Closed'});
        
        //{division, total_1, total_2, total_3}
        var summary_data = [];
		
        store.each(function(issuecategory, categoryIdx) {
			var obj = new Object();
			obj['categoryname'] = issuecategory.data.categoryname;
            
            var categoryIdxField = 'category_' + categoryIdx;
            summaryFields.push({name: categoryIdxField, type: 'String'});
            categoryIdxLabelMap[categoryIdxField] = issuecategory.data.categoryname;
            
            var totalIssuesClosed = 0;
			Ext.each(issuecategory.raw.divisions, function(data, index) {
                // define the field alias
                var fieldname = 'data_idx_' + index;
			    
                obj[fieldname] = data.issueCount;
                totalIssuesClosed += data.issuesClosed;
                
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
                    //summaryObj['issuesClosed'] =  summaryObj['issuesClosed'] + data.issuesClosed;
                    summaryObj[categoryIdxField] = data.issueCount;
                } else {
                    //we dont have an instance of the division yet; We have to create
                    var summaryObj = new Object();
                    summaryObj['division'] = data.divisionName;
                    summaryObj[categoryIdxField] = data.issueCount;
                    //summaryObj['issuesClosed'] = data.issuesClosed;
                    summary_data.push(summaryObj);
                }
                
                if(!hasIdentifiedFields){
			    	chartFields.push({name : fieldname, type: 'String'});
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
			});
			issuesClosed[categoryIdxField] = totalIssuesClosed;
            
            //All fields have been identified; Need not go through the routine to identify the fields anymore
			hasIdentifiedFields = true;
			data.push(obj);
		});
		
        // Summarize and add 3 rows to summary_data
        // the total issues, total closed, and percentage of issues closed
        var issueTotal = new Object({'division' : 'Total Issues Received'});
        
        //Calculate the percentage of issues closed for each issue category field
        Ext.each(summary_data, function(row_data, idx){
            for(var field in row_data){
                if(field != 'division'){
                   if(issueTotal[field] == undefined) {
                        issueTotal[field] = row_data[field];
                   } else {
                        issueTotal[field] = issueTotal[field] + row_data[field];
                   }
                }
            }
        });
        
        summary_data.push(issueTotal);
        summary_data.push(issuesClosed);
        
        var percentageOfIssuesClosed = new Object({'division' : '% of Issues Closed'});
        //console.log(summaryFields);
        
        Ext.each(summaryFields, function(field, fieldIdx){
            //console.log(field.name);
            if(field.name != 'division' || field.name == 'issuesClosed'){
                totalObj = summary_data[summary_data.length - 2];
                closedObj = summary_data[summary_data.length - 1];
                percentageOfIssuesClosed[field.name] = (closedObj[field.name]/ ( totalObj[field.name]) * 100); 
            }
        });
        summary_data.push(percentageOfIssuesClosed);
        
        //console.log(summary_data);
        
        // ~ Dynamic model definitions ============================
        
		var model = Ext.define('DynamicModel', {
			extend : 'Ext.data.Model',
			fields: chartFields
		});
		
        var summaryModel = Ext.define('SummaryModel', {
            extend: 'Ext.data.Model', 
            fields: summaryFields
        });
        
        // ~ Dynamic store instances ==================================
        
        //used by the charts
        var dataWrapper = new Object({'data' : data}); 
        
        //used by the table data
        var summaryDataWrapper = new Object({'data' : summary_data}); 
        
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
		
        var summaryStore = Ext.create('Ext.data.Store', {
            model: summaryModel,
            require: summaryModel,
            data: summaryDataWrapper, 
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
        var issuesReceivedChartRef = Ext.getCmp('issuesreceivedchart');
        
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
        var statistics_column = [{
            text: 'Divisions',
            width: 200,
            sortable: false,
            hideable: false,
            dataIndex: 'division'
        }];
        
        //The rest of the columns
        for (var field in categoryIdxLabelMap){
            statistics_column.push({
                header: categoryIdxLabelMap[field],
                width: 100,
                sortable: false,
                hideable: false,
                dataIndex: field,
                field: {
	                xtype: 'numberfield'
	            },
                renderer: function(value){
                    //format only if we have decimal values
                    if(value.indexOf('.') != -1) {
                        value = parseFloat(value).toFixed(2); //two decimal places only
                        return addSeparatorsNF(value, ',', '.', ',') + '%'; 
                    } else {
                        return value;
                    }
                }
            });
        }
        
        columns.push([
            statistics_column
        ]);
            
        var tableData = Ext.create('Ext.grid.Panel', {
		    store: summaryStore,
            id: 'issuesreceivedtabledata',
		    width: '100%',
		    height: 300,
		    title: 'Issues Received by Division',
		    columns: columns
		});
        
      
		viewPort.add(stackedBar);
		viewPort.add(tableData);
		
	}
});