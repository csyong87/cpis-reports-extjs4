Ext.define('CPIS.model.IssuesReceivedSummary', {
    extend: 'Ext.data.Model',
    field: [{
        name: 'division',
        type: 'String'
    }, {
        name: 'totalIssues',
        type: 'int'
    }, {
        name: 'issuesClosed',
        type: 'int'
    }, {
        name: 'percentageOfIssuesClosed',
        type: 'float'
    }]
});