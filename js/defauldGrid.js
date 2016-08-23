// jQuery.extend(jQuery.jgrid.defaults, { altRows:true });
// altRows: false,
var lastsel2;
var id;
$(function() {
    $("#list").jqGrid({
            url: '../localdata/metadata.json',
            datatype: 'json',
            mtype: 'GET',
            colNames: ['ProductId', 'Name', 'Type', 'Price', 'Date', 'Description'],
            colModel: [{
                name: 'ProductId',
                index: 'ProductId',
                width: 55
            }, {
                name: 'Name',
                index: 'Name',
                editable: true,
                // editoptions:{size:"20",maxlength:"30"},
                width: 90
            }, {
                name: 'Type',
                index: 'Type',
                width: 80,
                editable: true,
                align: 'right'
            }, {
                name: 'Price',
                index: 'Price',
                width: 80,
                editable: true,
                align: 'right'
            }, {
                name: 'Date',
                index: 'Date',
                width: 80,
                editable: true,
                align: 'right'
            }, {
                name: 'Description',
                index: 'Description',
                width: 150,
                editable: true,
                sortable: false
            }],
            jsonReader: {
                repeatitems: false
            },
            pager: '#pager',
            rowNum: 5,
            rowList: [5, 10, 15],
            sortname: 'ProductId',
            sortorder: 'desc',
            viewrecords: true,
            gridview: false,
            caption: 'demo jqGrid',
            loadonce: true,
            autowidth: false,
            ondblClickRow: function(ProductId) {
                id = ProductId;
                // alert("You double click row with id: " + ProductId);
            },
            // onSelectRow: function(ProductId) {
            //     if (ProductId && ProductId !== lastsel2) {
            //         jQuery('#list').jqGrid('restoreRow', lastsel2);
            //         jQuery('#list').jqGrid('editRow', ProductId, true);
            //         lastsel2 = ProductId;
            //     }
            // },
            //editurl: "clientArray"


            // Solved error: jqGrid "No url is set"
            editurl: "clientArray",
            cellsubmit: 'clientArray',
            cellEdit: true
                // cellurl: '/url/to/handling/the/changed/cell/value'
        }).navGrid('#pager', {
            search: true,
            view: true,
            edit: false,
            add: true,
            del: true,
        })
        // .navButtonAdd('#pager', {
        //     caption: "Add",
        //     buttonicon: "ui-icon-add",
        //     onClickButton: function() {
        //         alert("Adding Row");
        //     },
        //     position: "last"
        // })
        // .navButtonAdd('#pager', {
        //     caption: "Del",
        //     buttonicon: "ui-icon-del",
        //     onClickButton: function() {
        //         alert("Deleting Row");
        //     },
        //     position: "last"
        // });

    jQuery("#ed4").click(function() {
        jQuery("#list").jqGrid('editRow', id);
        this.disabled = 'true';
        jQuery("#sved4").attr("disabled", false);
    });

    jQuery("#sved4").click(function() {
        jQuery("#list").jqGrid('saveRow', id, checksave);
        id = "";
        jQuery("#sved4").attr("disabled", true);
        jQuery("#ed4").attr("disabled", false);
    });
    jQuery("#dele").click(function() {
        jQuery("#list").jqGrid('delRowData', id);
    });


});

function checksave(result) {
    if (result.responseText == "") {
        alert("Update is missing!");
        return false;
    }
    return true;
}
