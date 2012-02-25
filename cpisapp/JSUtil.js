// Generate a model dynamically, provide fields
function modelFactory(name, fields) {
    return Ext.define(name, {
        extend: 'Ext.data.Model',
        fields: fields
    });
}

function addSeparatorsNF(nStr, inD, outD, sep)
{
    nStr += '';
    var dpos = nStr.indexOf(inD);
    var nStrEnd = '';
    if (dpos != -1) {
        nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
        nStr = nStr.substring(0, dpos);
    }
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(nStr)) {
        nStr = nStr.replace(rgx, '$1' + sep + '$2');
    }
    return nStr + nStrEnd;
}