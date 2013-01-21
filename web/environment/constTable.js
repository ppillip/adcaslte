$(document).ready(function(){

    $("#modifyBtn").click(function(event){
        event.preventDefault();
        changeMode('edit');
    });

    $("#saveBtn").click(function(event){
        event.preventDefault();
        saveConstTable();
    });

    $("#cancelBtn").click(function(event){
        event.preventDefault();
        changeMode('view');
    });

    //CONST TABLE 쿼리
    selectConstTable();

});

/*===============================================================================
 * CONST TABLE 쿼리
 *
 *==============================================================================*/
function selectConstTable() {

    jQuery.post("/adcaslte/svc/Environment-selectConstTable",{},function(result,stat){

        var $tbody = $("#constTable").find("tbody");

        $tbody.find("tr").remove();

        $(result.rows).each(function(idx,row){
            $("<tr name='view'>"
                +"<td class='col1 tdCenterInfo'>"+row.RAMARK+"</td>"
                +"<td class='col2 tdRight'>"+row.CONST_VAL+"</td>"
                +"<td class='col3 tdCenter'>"+row.LASTUPDATE+"</td>"
                +"</tr>"
             +"<tr name='edit' style='display:none'>"
                +"<input type='hidden' name='CONST_TYPE' value='"+row.CONST_TYPE+"'>"
                //+"<td class='col3 tdCenterInfo'>"+row.CONST_TYPE+"</td>"
                +"<td><input type='text' name='RAMARK' style='width:150px;' value='"+row.RAMARK+"'></td>"
                +"<td><input type='text' name='CONST_VAL' style='width:70px; text-align: right;' value='"+row.CONST_VAL+"'></td>"
                +"<td class='col3 tdCenter'>"+row.LASTUPDATE+"</td>"
                +"</tr>")
                .data("row",row)
                .appendTo($tbody);

        });

    },"json");
}

/*===============================================================================
 * CONST TABLE 저장
 *
 *==============================================================================*/
function saveConstTable() {

    var param = $('form[id=constTableForm]').serializeArray();

    jQuery.post("/adcaslte/svc/Environment-updateConstTable",param,function(result,stat){

        if (result.status == "SUCCESS") {
            changeMode('view');
            selectConstTable();
        }

    },"json");

}

/*===============================================================================
 * 화면 변경
 *
 *==============================================================================*/
function changeMode(mode) {
    if (mode === 'view') {
        $("tr[name=view]").show();
        $("#modifyBtn").show();
        $("tr[name=edit]").hide();
        $("#saveBtn").hide();
        $("#cancelBtn").hide();
    } else if (mode === 'edit') {
        $("tr[name=view]").hide();
        $("#modifyBtn").hide();
        $("tr[name=edit]").show();
        $("#saveBtn").show();
        $("#cancelBtn").show();
    }
}