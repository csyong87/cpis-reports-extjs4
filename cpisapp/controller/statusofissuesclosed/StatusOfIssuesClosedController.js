Ext.define('CPIS.controller.statusofissuesclosed.StatusOfIssuesClosedController', {
    extend: 'Ext.app.Controller',
    
    // ~ View References ==================================
    refs : [ {
        selector : 'statusofissuesclosedsearchform combobox[name=division]',
        ref : 'selDivision'
    }, {
        selector : 'statusofissuesclosedsearchform combobox[name=month]',
        ref : 'selMonth'
    }, {
        selector : 'statusofissuesclosedsearchform combobox[name=year]',
        ref : 'selYear'
    },{
        selector: 'viewport > panel',
        ref: 'viewPort'
    }],
    
    stores : ['Divisions', 'StatusOfIssuesClosed', 'Months', 'Years'],
    onLaunch: function(){
        var divisionsStore = this.getDivisionsStore();
        divisionsStore.load();

        var monthsStore = this.getMonthsStore();
        monthsStore.load();

        var yearsStore = this.getYearsStore();
        yearsStore.load();
        
        var statusOfIssuesClosed = this.getStatusOfIssuesClosedStore();
        statusOfIssuesClosed.on('load', this.onStatusOfIssuesClosedStoreLoad, this);
        statusOfIssuesClosed.load();
    },
    init: function(){
         this.control({
            'issuesourcesearchform button[action=search]' : {
                click : this.onStatusOfIssuesClosedSearch
            },
            'issuesourcesearchform button[action=export-to-xls]' : {
                click : function() {
                    // post to export to xls url
                    window.location = '/TSTS';
                }
            }
        });
    },
    
    onStatusOfIssuesClosedSearch: function(selModel, selection){
        var statusOfIssuesClosed = this.getStatusOfIssuesClosedStore();
        statusOfIssuesClosed.on('load', this.onStatusOfIssuesClosedStoreLoad, this);
        statusOfIssuesClosed.load();
    },
    
    onStatusOfIssuesClosedStoreLoad : function(store, records, options){
        var viewPort = this.getViewPort();
        
        // ~ Dynamic component instances ==================================
        var chartDataGridView = Ext.getCmp('statusofissuescloseddata');
        var dynamicPieChart = Ext.getCmp('dynamicstatusofissuesclosedchart');
        
        //check if we have a valid reference of the chart and data grid
        //if we have, unregister it from the component manager because
        //we want to create a new component of the same id
        if(chartDataGridView && dynamicPieChart){
            Ext.ComponentManager.unregister(chartDataGridView);
            viewPort.remove(chartDataGridView);
            
            Ext.ComponentManager.unregister(dynamicPieChart);
            viewPort.remove(dynamicPieChart);
        }
        
        console.log(store);
        
        var newChart = Ext.create('Ext.chart.Chart', {
            alias: 'widget.dynamicstatusofissuesclosedchart',
            id: 'dynamicstatusofissuesclosedchart',
            animate : true,
            store: store,
            width : 800,
            height : 400,
            shadow : true,
            legend : {
                position : 'right'
            },
            insetPadding : 60,
            series : [ {
                type : 'pie',
                field : 'count',
                showInLegend : true,
                donut : false,
                tips : {
                    trackMouse : true,
                    width: 200,
                    height: 50,
                    renderer : function(storeItem, item) {
                        // calculate percentage.
                        var total = 0;
                        
                        store.each(function(rec) {
                           total += rec.get('count');
                        });
                        this.setTitle(storeItem.get('category') + ':'+ 
                                Math.round(storeItem.get('count') / total * 100) + '%');
                    }
                },
                highlight : {
                    segment : {
                        margin : 20
                    }
                },
                label : {
                    field       : 'category',
                    display     : 'rotate',
                    contrast    : false,
                    font        : '12px Arial'
                },
                listeners : {
                    itemmousedown: this.onToggleDrillDown
                }
            }]
        });
        
         var tableData = Ext.create('Ext.grid.Panel', {
            store: store,
            id: 'statusofissuescloseddata',
            width: '100%',
            height: 300,
            title: 'Issues By Category',
           columns: [
                {
                    text: 'Category',
                    width: 400,
                    sortable: false,
                    hideable: false,
                    dataIndex: 'category'
                },
                {
                    text: 'Count',
                    width: 198,
                    dataIndex: 'count'
                    
                }
            ]
        });
        
        viewPort.add(newChart);
        viewPort.add(tableData);
    },
    
    onToggleDrillDown : function(a, b, c, d, e){
       
        //get the selected category
        var selectedItem = a.storeItem.data.category;
        
        // get the references to the search form input boxes
        var division    = Ext.getCmp('divisionSel');
        var month       = Ext.getCmp('monthSel');
        var year        = Ext.getCmp('yearSel');
        
        //Toggle drill down
//        if(pieDrillDown == false){
//            var issueByCategoryStore = Ext.data.StoreManager.lookup('IssueByCategory');
//            issueByCategoryStore.load({params:{
//                pieDrillDown : 'true',
//                categoryName: selectedItem,
//                division: division.value,
//                month: month.value,
//                year: year.value
//                }
//            });
//            
//            pieDrillDown = true;
//        } else {
//            var issueByCategoryStore = Ext.data.StoreManager.lookup('IssueByCategory');
//            issueByCategoryStore.load({params:{
//                 division: division.value, 
//                 month: month.value, 
//                 year: year.value
//                }
//            });
//                                            
//            pieDrillDown = false;
//        }
        
    }
});