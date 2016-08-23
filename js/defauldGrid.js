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
                formatter: "number",
                editable: true,
                align: 'right'
            }, {
                name: 'Date',
                index: 'Date',
                width: 80,
                edittype: 'date',
                editable: true,
                align: 'right'
            }, {
                name: 'Description',
                index: 'Description',
                width: 150,
                editable: true,
                sortable: false,
                edittype: "textarea"
            }],
            pager: '#pager',
            rowNum: 5,
            rowList: [5, 10, 15],
            sortname: 'ProductId',
            sortorder: 'desc',
            viewrecords: true,
            gridview: true,
            multiselect: false,
            caption: 'demo jqGrid',
            loadonce: true,
            autowidth: true,
            ondblClickRow: function(ProductId) {
                id = ProductId;
                // alert("You double click row with id: " + ProductId);
            },
            // onSelectRow: function(ProductId) {
            //     // if (ProductId && ProductId !== lastsel2) {
            //     //     jQuery('#list').jqGrid('restoreRow', lastsel2);
            //     //     jQuery('#list').jqGrid('editRow', ProductId, true);
            //     //     lastsel2 = ProductId;
            //     // }
            // },
            // editurl: "clientArray"


            // Solved error: jqGrid "No url is set"
            editurl: "clientArray",
            // cellsubmit: 'clientArray',
            // cellEdit: true
        }).navGrid('#pager', {
            search: true,
            view: true,
            edit: true,
            add: true,
            del: true
        })
        // .inlineNav('#pager', {
        //     search: true,
        //     view: true,
        //     edit: true,
        //     add: true,
        //     del: true,
        // })
        .jqGrid('filterToolbar', {
            autosearch: true,
            searchOnEnter: false,
            // multipleSearch: true,
            // multipleGroup: true
        });
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

    // Button
    jQuery("#ed4").click(function() {
        var newID = jQuery("#list").jqGrid('getGridParam', 'selrow');

        jQuery("#list").jqGrid('editRow', newID);
        this.disabled = 'true';
        jQuery("#sved4").attr("disabled", false);
    });

    jQuery("#sved4").click(function() {
        var newID = jQuery("#list").jqGrid('getGridParam', 'selrow');

        jQuery("#list").jqGrid('saveRow', newID, checksave);
        newID = "";
        jQuery("#sved4").attr("disabled", true);
        jQuery("#ed4").attr("disabled", false);
    });

    jQuery("#dele").click(function() {
        var newID = jQuery("#list").jqGrid('getGridParam', 'selrow');
        //delRowData
        jQuery("#list").jqGrid('delGridRow', newID);
    });

    $("#addnew").click(function() {
        jQuery("#list").jqGrid('editGridRow', "new", {
            height: 280,
            reloadAfterSubmit: true
        });
    });
    // save data
    jQuery("#save").click(function() {
        var rows = jQuery("#list").jqGrid('getRowData');
        alert("dadadadad " + rows[0].ProductId);
        // var paras = new Array();
        // for (var i = 0; i < rows.length; i++) {
        //     var row = rows[i];
        //     paras.push($.param(row));
        // }
        // $.ajax({
        //     type: "POST",
        //     url: "../localdata/metadata.json",
        //     data: paras.join('and'),
        //     success: function(msg) {
        //         alert(msg);
        //     }
        // });
    });

    function currencyFmatter(cellvalue, options, rowObject) {

        return "$" + cellvalue;
    }

    // Custom css view
    $("#list").css("font-size", "18px");
    $("#pager").css({
        "font-size": "18px",
        "padding": "10px"
    });
    $(".ui-jqgrid-hbox").css({
        "font-size": "18px",
        "padding": "10px",
        "margin-top  ": "10px"
    });

});

function checksave(result) {
    if (result.responseText == "") {
        alert("Update is missing!");
        return false;
    }
    return true;
}
