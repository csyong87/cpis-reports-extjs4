/*
 * This file is part of the CPIS application.
 * 
 * Copyright (c) 2012 Mahindra Satyam
 * 
 * GNU General Public License Usage
 * This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.
 * 
 */
Ext.define('CPIS.controller.Chart', {
	extend: 'Ext.app.Controller',
	stores: ['IssueByCategory'],
    
    refs: [{
        selector: 'issuebycategorychart',
        ref: 'issuecategorychart'
    }],
    
	onLaunch: function() {
		var issueByCategoryStore = this.getIssueByCategoryStore();
		issueByCategoryStore.load();
	},
    
    init : function() {        
//       this.application.on({
//	        categoryselected: this.onItemMouseDownOnPieChart,
//	        scope: this
//	    });
        
        this.control({
            'issuecategorychart': {
                itemmousedown: this.onItemMouseDownOnPieChart
            }
        });
    },
    
    onItemMouseDownOnPieChart : function(a,b,c,d,e){
      alert(a);
    }
});