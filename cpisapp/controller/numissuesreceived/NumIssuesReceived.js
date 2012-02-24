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
		selector: 'issuesreceivedchart',
		ref: 'stackedBarChart'
	}, {
		selector: 'viewport > panel',
		ref: 'viewPort'
	}, {
        selector: '#issuesreceivedtabledata',
        ref: 'tableData'
    }],
	stores : ['Divisions', 'IssuesReceived', 'Months', 'Years'],
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
		var fields = []; //used to configure the fields of the dynamic model
		var data = []; //Holds the chart's data
		var data_fields = []; //Since a javascript object property cannot have spaces, we need to mask it
        var legend = []; //Holds the chart's legend array
       
		var hasIdentifiedFields = false;
        var fieldAliasToDisplayName = new Object();
        
		fields.push({name: 'categoryname', type: 'String'});
		store.each(function(issuecategory) {
			var obj = new Object();
			obj['categoryname'] = issuecategory.data.categoryname;
			Ext.each(issuecategory.raw.divisions, function(data, index) {
                // define the field alias
                var fieldname = 'data_idx_' + index;
			    
                obj[fieldname] = data.issueCount;
                
			    if(!hasIdentifiedFields){
			    	fields.push({name : fieldname, type: 'String'});
                    legend.push(data.divisionName);
                    fieldAliasToDisplayName[fieldname] = data.divisionName;
			    }
                
			    var isNew = true;
			    for(var i = 0; i < data_fields.length; i++) {
			    	if(fieldname == data_fields[i]) {
			    		isNew = false;
			    	}
			    }
			    
			    if(isNew){
			    	data_fields.push(fieldname);
                    
			    }
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
		
        var columns = []; //Holds the dynamic table's columns
        
        //iterate through the data records
        Ext.each(data, function(data_obj, index){
            
            //define the first column
            var category_column = {
                text: 'Issue Category',
                width: 298,
                sortable: false,
                hideable: false,
                dataIndex: 'categoryname'
            };
            
            //the dynamic columns
            var statistics_column = [];
            for (var field in fieldAliasToDisplayName){
                statistics_column.push({
                    text: fieldAliasToDisplayName[field],
                    width: 100,
                    sortable: false,
                    hideable: false,
                    dataIndex: field
                });
            }
            
            columns.push([
                category_column,
                statistics_column
            ]);
            
            return false;
        });
        
        console.log(columns);
        
        var tableData = Ext.create('Ext.grid.Panel', {
            id: 'issuesreceivedtabledata',
		    store: dynaStore,
		    width: '100%',
		    height: 200,
		    title: 'Issues Received by Division',
		    columns: columns
		});
        
		var viewPort = this.getViewPort();
        viewPort.remove(this.getStackedBarChart());
        viewPort.remove(this.getTableData());
		viewPort.add(new stackedBar());
		viewPort.add(tableData);
		
	}
});