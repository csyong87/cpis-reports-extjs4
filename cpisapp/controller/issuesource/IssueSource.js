Ext.define('CPIS.controller.issuesource.IssueSource', {
    extend: 'Ext.app.Controller',
    stores : ['Divisions', 'IssueSource', 'Months', 'Years'],
    onLaunch: function(){
        var divisionsStore = this.getDivisionsStore();
        divisionsStore.load();

        var monthsStore = this.getMonthsStore();
        monthsStore.load();

        var yearsStore = this.getYearsStore();
        yearsStore.load();
        
        var issueSourceStore = this.getIssueSourceStore();
        issueSourceStore.load();
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
    
    onIssueSourceSearch : function(){
        
    }
});