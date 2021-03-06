/*
 * This file is part of the CPIS application.
 * 
 * Copyright (c) 2012 Mahindra Satyam
 * 
 * GNU General Public License Usage
 * This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.
 * 
 */
Ext.define('CPIS.controller.issuesource.IssueSource', {
    extend: 'Ext.app.Controller',
    
    refs:[{
        selector: 'viewport > panel',
        ref: 'viewPortPanel'
    }],
    
    stores : ['Divisions', 'IssueSource', 'Months', 'Years', 'IssueSourceSummary'],
    onLaunch: function(){
        var divisionsStore = this.getDivisionsStore();
        divisionsStore.load();

        var monthsStore = this.getMonthsStore();
        monthsStore.load();

        var yearsStore = this.getYearsStore();
        yearsStore.load();
        
        var issueSourceStore = this.getIssueSourceStore();
        issueSourceStore.load();
        
        var issueSourceSummaryStore = this.getIssueSourceSummaryStore();
        issueSourceSummaryStore.on('load', this.onIssueSourceSummaryLoad, this);
        issueSourceSummaryStore.load();
    },
    
    init: function(){
        this.control({
            'issuesourcesearchform button[action=search]' : {
                click : this.onIssueSourceSearch
            },
            'issuesourcesearchform button[action=export-to-xls]' : {
                click : function() {
                    // post to export to xls url
                    window.location = '/TSTS';
                }
            }
        });
    },
    
    /**
     * Callback handler for the search button on Issue by source summary screen
     */
    onIssueSourceSearch : function(){
         var issueSourceSummaryStore = this.getIssueSourceSummaryStore();
          issueSourceSummaryStore.load();
    },
    
    /**
     * Callback handler for IssueSourceSummaryStore load event.
     * 
     * Refer to cpisapp/data/issue-source-summary.json for sample data format
     * 
     * @param {} store
     * @param {} records
     * @param {} options
     */
    onIssueSourceSummaryLoad: function(store, records, options){
        
        var fields = [{name: 'division', type: 'String'}];
        var fieldsIdentified = false;
        var fieldAliasMap = new Object();
        var tableData = [];
        
        //iterate through the object in the store
        store.each(function(divisionObj, index){
           var tableRowData = new Object({'division' : divisionObj.data.divisionName});
           
           //iterate through the issue source in the division
           var divisionTotal = 0;
           Ext.each(divisionObj.raw.issuesourcelist, function(issueSrc, issueSrcIdx){
                var fieldIdxName = 'issuesrc_field_' + issueSrcIdx;
                if(!fieldsIdentified){
                    fields.push({name: fieldIdxName, type: 'int'});
                    fieldAliasMap[fieldIdxName] = issueSrc.sourcecategory;
                }
                
                tableRowData[fieldIdxName] = issueSrc.count;
                divisionTotal += issueSrc.count;
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
                width: Math.ceil(fieldAliasMap[f].length * 5.80), //calculate header width based on header length
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
        
        var issueSourceTableData = Ext.getCmp('issuesourcetabledata');
        if(issueSourceTableData){
            Ext.ComponentManager.unregister(issueSourceTableData);
            viewPort.remove(issueSourceTableData);
        }
        
        var table = Ext.create('Ext.grid.Panel', {
            viewConfig:{forceFit:true},
            store: store,
            id: 'issuesourcetabledata',
            width: '100%',
            height: 200,
            title: 'Breakdown of issue by source by division',
            columns: table_columns
        });
        
        viewPortPanel.add(table);
    }
});