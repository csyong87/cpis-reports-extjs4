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