$(document).ready(function(){

    $("#modifyBtn").click(function(event){
        event.preventDefault();
        changeMode('edit');
    });

    $("#saveBtn").click(function(event){
        event.preventDefault();
        saveConstUplinkRsrp();
    });

    $("#cancelBtn").click(function(event){
        event.preventDefault();
        changeMode('view');
    });

    //CONST UPLINK RSRP 쿼리
    selectConstUplinkRsrp();

});

/*===============================================================================
 * CONST UPLLINK RSRP 쿼리
 *
 *==============================================================================*/
function selectConstUplinkRsrp() {

    jQuery.post("/adcaslte/svc/Environment-selectConstUplinkRsrp",{},function(result,stat){

        var $tbody = $("#constUplinkRsrp").find("tbody");

        $tbody.find("tr").remove();

        $(result.rows).each(function(idx,row){
            $("<tr name='view'>"
                +"<td class='col1 tdCenter'>"+row.RSRP+"</td>"
                +"<td class='col2 tdCenter'>"+row.THRP+"</td>"
                +"</tr>"
                +"<tr name='edit' style='display:none'>"
                +"<td class='tdCenter'><input type='text' name='RSRP' style='width:90px;' value='"+row.RSRP+"'></td>"
                +"<td class='tdCenter'><input type='text' name='THRP' style='width:180px; text-align: center;' value='"+row.THRP+"'></td>"
                +"</tr>")
                .appendTo($tbody);

        });

    },"json");
}

/*===============================================================================
 * TEXTAREA에 있는 RSRP 값 적용
 *
 *==============================================================================*/
function uploadRsrp(event) {
    event.preventDefault();

    var $tbody = $("#constUplinkRsrp").find("tbody");
    $tbody.find("tr").remove();

    var rows = $("#rsrp").val().split(/[\n\f\r]/);
    for(var i= 0, max = rows.length; i < max; i++) {
        var row = rows[i].split(/[\t]/);
        if (row.length < 2) {
            continue;
        }
        /*if (row.length > 2) {
            alert('RSRP, THROUGHPUT 값 이외의 값이 존재합니다.(현재:'+row.length+'개)');
            return false;
        } else if (row.length < 2) {
            alert('RSRP, THROUGHPUT 값이 부족합니다.(현재:'+row.length+'개)');
            return false;
        }*/

        $("<tr name='view' style='display:none'>"
            +"<td class='col1 tdCenter'>"+row[0]+"</td>"
            +"<td class='col2 tdCenter'>"+row[1]+"</td>"
            +"</tr>"
            +"<tr name='edit'>"
            +"<td class='tdCenter'><input type='text' name='RSRP' style='width:90px;' value='"+row[0]+"'></td>"
            +"<td class='tdCenter'><input type='text' name='THRP' style='width:180px;' value='"+row[1]+"'></td>"
            +"</tr>")
            .appendTo($tbody);

            //$("input[name=CQI_"+(row[j].length === 1 ? '0'+j : j)+"]").val(row[j])
        //return false; // 한번만 적용
    }
    alert('적용되었습니다.');
}

/*===============================================================================
 * CONST UPLINK RSRP 저장
 *
 *==============================================================================*/
function saveConstUplinkRsrp() {

    var param = $('form[id=constUplinkRsrpForm]').serializeArray();

    jQuery.post("/adcaslte/svc/Environment-insertConstUplinkRsrp",param,function(result,stat){

        if (result.status == "SUCCESS") {
            changeMode('view');
            selectConstUplinkRsrp();
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
        $("#divUpload").hide();
    } else if (mode === 'edit') {
        $("tr[name=view]").hide();
        $("#modifyBtn").hide();
        $("tr[name=edit]").show();
        $("#saveBtn").show();
        $("#cancelBtn").show();
        $("#rsrp").val('');
        $("#divUpload").show();
    }
}