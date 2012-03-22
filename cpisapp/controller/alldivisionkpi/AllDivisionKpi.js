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
 * The Division KPI Controller
 */
Ext.define('CPIS.controller.alldivisionkpi.AllDivisionKpi', {
	extend: 'Ext.app.Controller',
	refs: [{
		ref: 'exportToXls',
		selector: '#exportToXlsButton'
	}, {
		ref: 'viewPanel',
		selector: 'viewport > panel > panel'
	}],
	stores: ['AllDivisionKpi', 'DivisionKpi'],
	onLaunch: function(){
		this.getAllDivisionKpiStore().load();
		var divisionKpiStore = this.getDivisionKpiStore();
		divisionKpiStore.on('load', this.onDivisionKpiStoreLoad, this);
		divisionKpiStore.load();
	},
	init: function(){
		this.control({
			'#exportToXlsButton' : {
				click: function(){
					//console.log('Hello world from exportToXlsButton');
					var divisionKpiStore = this.getDivisionKpiStore();
					divisionKpiStore.load();
				}
			}
		});
	},
	onDivisionKpiStoreLoad: function(store, records, options){
		var chartfield = [{name: 'month', type: 'String'}];
		var chartdata = [];
		var fieldsIdentified = false;
		var dataFields = [];
		var legend = []; //Holds the chart's legend array
		
		store.each(function(kpi, divisionIdx){
			var valueObj = {'month' : kpi.data.label};
			Ext.each(kpi.raw.divisions, function(divisions, kpiIdx){
				var fieldname = 'div_' + kpiIdx;
				if(!fieldsIdentified) {
					chartfield.push({name: fieldname, type: 'float'});
					dataFields.push(fieldname);
					legend.push(divisions.divisionName);
				}
				valueObj[fieldname] = divisions.percentage;
			});
			fieldsIdentified = true;
			chartdata.push(valueObj);
		});
		//console.log(chartdata);
		
		var model = Ext.define('DynamicModel', {
			extend: 'Ext.data.Model',
			fields: chartfield
		});
		
		//add the table data into the wrapper so that store can
        //make used of it
        var dataWrapper = new Object({'data' : chartdata});
		
		var store = Ext.create('Ext.data.Store', {
			model: model,
			required: model,
			data: dataWrapper, 
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'data'                    
                }
            }
		});
		
		var viewPanel = this.getViewPanel();
		
		var divisionKpiChart = Ext.getCmp('divisionkpichart');
		if(divisionKpiChart) {
			Ext.ComponentManager.unregister(divisionKpiChart);
			viewPanel.remove(divisionKpiChart);
		}
		
		var barChart = Ext.create('Ext.chart.Chart', {
			alias: 'widget.divisionkpichart',
            id: 'divisionkpichart',
			animate : true,
			store : store,
			width : 800,
			height : 250,
			shadow : true,
			insetPadding : 60,
			legend: {
		        position: 'right'
		    },
		    axes: [{
		        type: 'Numeric',
		        position: 'left',
		        fields: dataFields,
		        grid: true,
		        title: '% of Issues Closed',
		        minimum: 0,
		        maximum: 100
		    }, {
		        type: 'Category',
		        position: 'bottom',
		        fields: ['month'],
		        title: false,
		        label: {
		            rotate: {
		                degrees: -90
		            }
		        }
		    }],
		    series: [{
		        type: 'column',
		        axis: 'left',
		        xField: 'month',
		        yField: dataFields,
                title: legend,
		        stacked: false,
		        tips: {
		            trackMouse: true,
		            width: 80,
		            height: 28,
		            renderer: function(storeItem, item) {
		                this.setTitle(String(item.value[1]) + ' %');
		            }
		        }
		    }]
		});
		
		viewPanel.add(barChart);
	}
});