$(document).ready(function(){

    $("#modifyBtn").click(function(event){
        event.preventDefault();
        changeMode('edit');
    });

    $("#saveBtn").click(function(event){
        event.preventDefault();
        saveConstUplink();
    });

    $("#cancelBtn").click(function(event){
        event.preventDefault();
        changeMode('view');
    });

    //CONST UPLINK 쿼리
    selectConstUplink();

});

/*===============================================================================
 * CONST UPLINK RSRP 쿼리
 *
 *==============================================================================*/
function selectConstUplink() {

    jQuery.post("/adcaslte/svc/Environment-selectConstUplink",{},function(result,stat){

        var $tbody = $("#constUplink").find("tbody");

        $tbody.find("tr").remove();

        $(result.rows).each(function(idx,row){
            $("<tr name='view'>"
                +"<td class='col1 tdCenterInfo'>"+row.RAMARK+"</td>"
                +"<td class='col2 tdRight'>"+row.CONST_VAL+"</td>"
                +"<td class='col3 tdCenter'>"+row.LASTUPDATE+"</td>"
                +"</tr>"
                +"<tr name='edit' style='display:none'>"
                +"<input type='hidden' name='CONST_TYPE' value='"+row.CONST_TYPE+"'>"
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
 * CONST UPLINK 저장
 *
 *==============================================================================*/
function saveConstUplink() {

    var param = $('form[id=constUplinkForm]').serializeArray();

    jQuery.post("/adcaslte/svc/Environment-updateConstUplink",param,function(result,stat){

        if (result.status == "SUCCESS") {
            changeMode('view');
            selectConstUplink();
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