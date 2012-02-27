Ext.define('CPIS.controller.referredtotechdiv.ReferredToTechDiv', {
	extend : 'Ext.app.Controller',
	// ~ View refs =====================================
    refs:[{
        selector: 'viewport > panel',
        ref: 'viewPortPanel'
    }],
	// ~ Store definitions ===================================
	stores : [ 'Divisions', 'ReferredToTechDiv', 'Months', 'Years', 'ReferredToTechDivSummary'],

	// ~ Initialization methods =========================================

	/**
	 * In this method are stores (remote) being initialized.
	 */
	onLaunch : function() {
		this.getDivisionsStore().load();
		this.getMonthsStore().load();
		this.getYearsStore().load();
		this.getReferredToTechDivStore().load();
		var referredToTechDivStore = this.getReferredToTechDivSummaryStore();
		referredToTechDivStore.on('load', this.onReferredToTechDivStoreLoad, this);
        referredToTechDivStore.load();
	},

	/**
	 * Bind call back handlers to UI Views
	 */
	init : function() {
		this.control({
			'referredtotechdivsearchform button[action=search]' : {
				click : this.onReferredToTechDivSearch
			},
			'referredtotechdivsearchform button[action=export-to-xls]' : {
				click : function() {
					// post to export to xls url
					window.location = '/TSTS';
				}
			}
		});
	},
	
	onReferredToTechDivSearch: function(selModel, selection){
		var referredToTechDivStore = this.getReferredToTechDivSummaryStore();
         referredToTechDivStore.load();
	}, 
	
	onReferredToTechDivStoreLoad: function(store, records, options){
		var fields = [{name: 'division', type: 'String'}];
        var fieldsIdentified = false;
        var fieldAliasMap = new Object();
        var tableData = [];
        
        //iterate through the object in the store
        store.each(function(divisionObj, index){
           var tableRowData = new Object({'division' : divisionObj.data.divisionName});
           
           //iterate through the issue source in the division
           var divisionTotal = 0;
           Ext.each(divisionObj.raw.techdivlist, function(techDiv, techDivIdx){
                var fieldIdxName = 'techdiv_field_' + techDivIdx;
                if(!fieldsIdentified){
                    fields.push({name: fieldIdxName, type: 'int'});
                    fieldAliasMap[fieldIdxName] = techDiv.techdiv;
                }
                
                tableRowData[fieldIdxName] = techDiv.count;
                divisionTotal += techDiv.count;
           });
            tableRowData['divisiontotal'] = divisionTotal;
            fieldsIdentified = true;
            tableData.push(tableRowData);
        });
        fields.push({name: 'divisiontotal', type: 'int'});
        
        //add the table data into the wrapper so that store can
        //make used of it
        var dataWrapper = new Object({'data' : tableData});
        
        //create a model definitions with dynamic fields
        //depending on the number of issue source category
        var model = Ext.define('DynamicModel', {
            extend: 'Ext.data.Model',
            fields: fields
        });
        
        //Create an instance of a store having the model as the model we created above
        //and based on the data in the dataWrapper
        var store = Ext.create('Ext.data.Store', {
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
        
        //define the first column
        var table_columns = [{
            text: 'Division',
            sortable: false,
            hideable: false,
            dataIndex: 'division'
        }];
        
        for(var f in fieldAliasMap){
            table_columns.push({
                text: fieldAliasMap[f],
                sortable: false,
                width: Math.ceil(fieldAliasMap[f].length * 5.80) + 10, //calculate header width based on header length
                hideable: false,
                dataIndex: f
            });
        }
        
        table_columns.push({
            text: 'Total',
            sortable: false,
            width: 100, //calculate header width based on header length
            hideable: false,
            dataIndex: 'divisiontotal'
        });
        
        var viewPortPanel = this.getViewPortPanel();
        
        var issueSourceTableData = Ext.getCmp('techdivtabledata');
        if(issueSourceTableData){
            Ext.ComponentManager.unregister(issueSourceTableData);
            viewPort.remove(issueSourceTableData);
        }
        
        var table = Ext.create('Ext.grid.Panel', {
            viewConfig:{forceFit:true},
            store: store,
            id: 'techdivtabledata',
            width: '100%',
            height: 200,
            title: 'Issues Referred To Various Technical Divisions',
            columns: table_columns
        });
        
        viewPortPanel.add(table);
	}
});